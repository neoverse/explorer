import _ from "lodash";

import normalizeHex from "../../common/helpers/normalizeHex";
import { Vout } from "../../server/database";

export default class VoutProcessor {
  process = async (transactions, options = {}) => {
    return Vout.bulkCreate(_.flatMap(transactions, (tx) => tx.vout.map((vout) => ({
      txid: normalizeHex(tx.txid),
      address: vout.address,
      asset: normalizeHex(vout.asset),
      n: vout.n,
      value: vout.value
    }))), options);
  }
}
