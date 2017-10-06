import _ from "lodash";

import normalizeHex from "../../common/helpers/normalizeHex";
import { Vout } from "../../server/database";

export default class VoutProcessor {
  process = async (transactions, options = {}) => {
    return Vout.bulkCreate(_.flatMap(transactions, (tx) => tx.vout.map((vout) => {
      const attrs = _.pick(vout, "address", "asset", "n", "value");
      return { ...attrs, txid: normalizeHex(tx.txid) };
    })), options);
  }
}
