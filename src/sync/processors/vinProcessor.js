import _ from "lodash";

import normalizeHex from "../../common/helpers/normalizeHex";
import { Vin, Vout } from "../../server/database";

function getVinVoutQueryConditions(vin) {
  return { txid: normalizeHex(vin.txid), n: vin.vout };
}

export default class VinProcessor {
  process = async (transactions, options = {}) => {
    const vinVouts = await this._findVinVouts(_.flatMap(transactions, "vin"), options);

    const vins = _.flatMap(transactions, (tx) => tx.vin.map((vin) => {
      const vout = _.find(vinVouts, getVinVoutQueryConditions(vin));

      return {
        txid: normalizeHex(tx.txid),
        previous_txid: normalizeHex(vin.txid),
        address: vout.address,
        asset: vout.asset,
        value: vout.value
      };
    }));

    return Vin.bulkCreate(vins, options);
  }

  _findVinVouts = async (vins, options) => {
    if (vins.length === 0) {
      return [];
    } else {
      return Vout.findAll({ ...options, where: { $or: vins.map(getVinVoutQueryConditions) } });
    }
  }
}
