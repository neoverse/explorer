import _ from "lodash";
import BigNumber from "bignumber.js";

import database, { Block, Transaction, Vout, Asset, Address, Contract } from "../server/database";
import {
  CLAIM_TRANSACTION,
  REGISTER_TRANSACTION,
  PUBLISH_TRANSACTION
} from "../common/values/transactions";

export default class Updater {
  update = async (block) => {
    const transaction = await database.transaction();

    try {
      await this._createBlock(block, { transaction });
      await this._createTransactions(block.tx, block, { transaction });
      await this._createVouts(block.tx, { transaction });
      await this._createAddresses(block.tx, { transaction });
      await this._createAssociations(block.tx, block, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  _createBlock = async (block, options) => {
    const attrs = _.pick(block, "hash", "index", "confirmations", "merkleroot", "nextconsensus",
      "nonce", "previousblockhash", "script", "size", "time", "version");

    return Block.create({ ...attrs, time: block.time * 1000 }, options);
  }

  _createTransactions = async (transactions, block, options) => {
    return Transaction.bulkCreate(transactions.map((tx) => {
      const attrs = _.pick(tx, "txid", "type", "size", "nonce", "sys_fee", "net_fee", "scripts",
        "version", "vin", "vout");

      return {
        ...attrs,
        attrs: tx.attributes,
        blockhash: block.hash,
        blocktime: block.time * 1000,
        data: this._getTransactionData(tx)
      };
    }), options);
  }

  _createVouts = async (transactions, options) => {
    return Vout.bulkCreate(_.flatMap(transactions, (tx) => tx.vout.map((vout) => {
      const attrs = _.pick(vout, "address", "asset", "n", "value");
      return { ...attrs, txid: tx.txid };
    })), options);
  }

  _createAddresses = async (transactions, options) => {
    await Promise.all(transactions.map(async (tx) => {
      const vinVouts = await this._getVouts(tx.vin, options);
      const claimVouts = await this._getVouts(tx.claims, options);
      const vouts = [...tx.vout, ...vinVouts, ...claimVouts];

      const existingAddresses = await this._getAddresses(vouts, options);
      const existingAddressList = _.map(existingAddresses, "address");

      await this._createAddressesFromVouts(_.filter(tx.vout, (vout) => {
        return !_.includes(existingAddressList, vout.address);
      }), options);

      await this._updateAddressesFromVouts(_.filter(tx.vout, (vout) => {
        return _.includes(existingAddressList, vout.address);
      }), existingAddresses, options);

      await this._updateAddressesFromVins(vinVouts, existingAddresses, options);

      await this._updateAddressesFromClaims(claimVouts, existingAddresses, options);
    }));
  }

  _createAddressesFromVouts = async (vouts, options) => {
    return Address.bulkCreate(vouts.map((vout) => ({
      address: vout.address,
      balance: { [vout.asset]: vout.value },
      claimed: {}
    })), options);
  }

  _updateAddressesFromVins = async (vins, addresses, options) => {
    await this._updateAddresses(vins, addresses, options, (balance, diff) => balance.minus(diff));
  }

  _updateAddressesFromVouts = async (vouts, addresses, options) => {
    await this._updateAddresses(vouts, addresses, options, (balance, diff) => balance.plus(diff));
  }

  _updateAddressesFromClaims = async (claims, addresses, options) => {
    await this._updateAddresses(claims, addresses, options, (balance, diff) => balance.plus(diff));
  }

  _updateAddresses = async (vouts, addresses, options, callback) => {
    await Promise.all(vouts.map(async (vout) => {
      const address = _.find(addresses, { address: vout.address });
      const balance = { ...address.balance };

      balance[vout.asset] = callback(
        new BigNumber(balance[vout.asset] || 0),
        new BigNumber(vout.value)
      );

      await address.update({ balance }, { where: { address: vout.address } }, options);
    }));
  }

  _createAssociations = async (transactions, block, options) => {
    await Promise.all(transactions.map(async (transaction) => {
      switch (transaction.type) {
        case REGISTER_TRANSACTION:
          await this._createAsset(transaction.asset, transaction.txid, block.time * 1000, options);
          break;
        case PUBLISH_TRANSACTION:
          await this._createContract(transaction.contract, transaction.txid, block.time * 1000, options);
          break;
      }
    }));
  }

  _createAsset = async (asset, txid, registered, options) => {
    const attrs = _.pick(asset, "name", "type", "precision", "amount", "admin", "owner");
    return Asset.create({ ...attrs, txid, registered, issued: asset.amount }, options);
  }

  _createContract = async (contract, txid, registered, options) => {
    const attrs = _.pick(contract, "name", "version", "code", "needstorage", "author", "email",
      "description");

    return Contract.create({ ...attrs, txid, registered, hash: contract.code.hash }, options);
  }

  _getTransactionData = (transaction) => {
    switch (transaction.type) {
      case CLAIM_TRANSACTION:
        return _.pick(transaction, "claims");
      case REGISTER_TRANSACTION:
        return _.pick(transaction, "asset");
      case PUBLISH_TRANSACTION:
        return _.pick(transaction, "contract");
      default:
        return null;
    }
  }

  _getVouts = async (vinsArray, options) => {
    const vins = vinsArray || [];

    if (vins.length === 0) {
      return [];
    } else {
      const createQueryItems = (objects) => objects.map((obj) => ({
        txid: obj.txid,
        n: obj.vout
      }));

      return Vout.findAll({ where: { $or: createQueryItems(vins) } }, options);
    }
  }

  _getAddresses = async (vouts, options) => {
    const recipientAddresses = _.map(vouts, "address");
    return Address.findAll({ where: { address: { $in: recipientAddresses } } }, options);
  }
}
