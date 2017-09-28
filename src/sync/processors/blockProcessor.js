import _ from "lodash";

import { Block } from "../../server/database";

export default class BlockProcessor {
  process = async (block, options = {}) => {
    const attrs = _.pick(block, "hash", "index", "confirmations", "merkleroot", "nextconsensus",
      "nonce", "previousblockhash", "script", "size", "time", "version");

    return Block.create({ ...attrs, time: block.time * 1000 }, options);
  }
}
