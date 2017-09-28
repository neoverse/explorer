import _ from "lodash";

import { Asset } from "../../server/database";

export default class AddressProcessor {
  process = async (transaction, block, options = {}) => {
    const { asset } = transaction;
    const attrs = _.pick(asset, "name", "type", "precision", "amount", "admin", "owner");

    return Asset.create({
      ...attrs,
      txid: transaction.txid,
      registered: block.time * 1000,
      issued: asset.amount
    }, options);
  }
}
