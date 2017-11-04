import _ from "lodash";

import normalizeHex from "../../common/helpers/normalizeHex";
import { Block } from "../../server/database";

export default class BlockProcessor {
  process = async (block, options = {}) => {
    const attrs = _.pick(block, "index", "confirmations", "merkleroot", "nextconsensus", "nonce",
      "script", "size", "time", "version");

    return Block.create({
      ...attrs,
      hash: normalizeHex(block.hash),
      previousblockhash: normalizeHex(block.previousblockhash),
      time: block.time * 1000
    }, options);
  }
}
