import _ from "lodash";

import { Vout } from "../../server/database";

export default class BlockProcessor {
  process = async (transactions, options = {}) => {
    return Vout.bulkCreate(_.flatMap(transactions, (tx) => tx.vout.map((vout) => {
      const attrs = _.pick(vout, "address", "asset", "n", "value");
      return { ...attrs, txid: tx.txid };
    })), options);
  }
}
