import _ from "lodash";
import BigNumber from "bignumber.js";

import normalizeHex from "../../common/helpers/normalizeHex";
import db, { Vout, Address } from "../../server/database";

const { Op } = db.constructor;

export default class AddressProcessor {
  process = async (transactions, block, options = {}) => {
    for (let i = 0; i < transactions.length; i++) {
      await this._processTransaction(transactions[i], block, options);
    }
  }

  _processTransaction = async (transaction, block, options) => {
    const vinVouts = await this._getVouts(transaction.vin, options);
    const allVouts = [...transaction.vout, ...vinVouts];

    const existingAddresses = await this._getAddresses(allVouts, options);
    const existingAddressList = _.map(existingAddresses, "address");

    await this._createAddressesFromVouts(_.filter(transaction.vout, (vout) => {
      return !_.includes(existingAddressList, vout.address);
    }), block, options);

    await this._updateAddressesFromVouts(_.filter(transaction.vout, (vout) => {
      return _.includes(existingAddressList, vout.address);
    }), existingAddresses, options);

    await this._updateAddressesFromVins(vinVouts, existingAddresses, options);
  }

  _createAddressesFromVouts = async (vouts, block, options) => {
    // An address may appear multiple times in the vout array, so we need to group by address here
    // and work some simple math magic to ensure we don't try to insert an address twice.
    const groupedVouts = _.groupBy(vouts, "address");

    const addresses = _.map(groupedVouts, (vouts, address) => {
      const voutBalances = vouts.map((vout) => ({
        [normalizeHex(vout.asset)]: vout.value
      }));

      const balance = _.reduce(voutBalances, (accumulator, balance) => {
        _.each(balance, (value, asset) => {
          const txid = normalizeHex(asset);
          accumulator[txid] = new BigNumber(accumulator[txid] || 0).plus(value);
        });

        return accumulator;
      }, {});

      return { address, balance, registered: block.time * 1000 };
    });

    return Address.bulkCreate(addresses, options);
  }

  _updateAddressesFromVins = async (vins, addresses, options) => {
    await this._updateAddresses(vins, addresses, options, (balance, diff) => balance.minus(diff));
  }

  _updateAddressesFromVouts = async (vouts, addresses, options) => {
    await this._updateAddresses(vouts, addresses, options, (balance, diff) => balance.plus(diff));
  }

  _updateAddresses = async (vouts, addresses, options, callback) => {
    await Promise.all(vouts.map(async (vout) => {
      const address = _.find(addresses, { address: vout.address });
      const balance = { ...address.balance };
      const txid = normalizeHex(vout.asset);

      balance[txid] = callback(
        new BigNumber(balance[txid] || 0),
        new BigNumber(vout.value)
      );

      await address.update({ balance }, { ...options, where: { address: vout.address } });
    }));
  }

  _getVouts = async (vinsArray, options) => {
    const vins = vinsArray || [];

    if (vins.length === 0) {
      return [];
    } else {
      const createQueryItems = (objects) => objects.map((obj) => ({
        txid: normalizeHex(obj.txid),
        n: obj.vout
      }));

      const vouts = await Vout.findAll({ ...options, where: { [Op.or]: createQueryItems(vins) } });

      if (vouts.length !== vins.length) {
        const vinsString = _.map(vins, "txid").join(", ");
        throw new Error(`Unable to find all vouts from transaction vins: ${vinsString}`);
      }

      return vouts;
    }
  }

  _getAddresses = async (vouts, options) => {
    const recipientAddresses = _.uniq(_.map(vouts, "address"));

    if (recipientAddresses.length === 0) {
      return [];
    } else {
      return Address.findAll({ ...options, where: { address: { [Op.in]: recipientAddresses } } });
    }
  }
}
