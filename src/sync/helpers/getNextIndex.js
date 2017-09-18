import { Block } from "../../server/database";

export default async function getNextIndex() {
  const lastBlock = await Block.findOne({ order: [["index", "desc"]] });
  return lastBlock ? lastBlock.index + 1 : 0;
}
