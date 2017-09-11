import "babel-polyfill";
import _ from "lodash";
import * as neo from "neo-api-js";

import database, { Block, Transaction } from "../server/database";
import findBestNode from "./findBestNode";

const VERBOSE = 1;

async function createBlock(block, options = {}) {
  const attrs = _.pick(block, "hash", "index", "confirmations", "merkleroot", "nextconsensus",
    "nonce", "previousblockhash", "script", "size", "time", "version");

  return Block.create(attrs, options);
}

async function createTransactions(transactions, block, options = {}) {
  return Transaction.bulkCreate(transactions.map((tx) => {
    const attrs = _.pick(tx, "txid", "type", "size", "nonce", "sys_fee", "net_fee", "scripts",
      "version", "vin", "vout");

    return { ...attrs, attrs: tx.attributes, blockhash: block.hash, blocktime: block.time };
  }), options);
}

async function getLastIndex() {
  const lastBlock = await Block.findOne({ order: [["index", "desc"]] });
  return lastBlock ? lastBlock.index : -1;
}

async function run() {
  await database.authenticate();
  await database.sync();  // TODO: remove this in favor of running a migration before the app starts

  const node = await findBestNode();
  const client = neo.node(node.url);

  const lastIndex = await getLastIndex();
  const blockHeight = await client.getBlockCount();

  console.log(`Fetching blocks from ${lastIndex + 1} - ${blockHeight}`);

  for (let index = lastIndex + 1; index < blockHeight; index++) {
    let success = false;

    while (!success) {
      const transaction = await database.transaction();

      try {
        const block = await client.getBlockByHeight(index, VERBOSE);
        console.log(`Saving block #${block.index} (${block.hash})`);
        await createBlock(block, { transaction });
        await createTransactions(block.tx, block, { transaction });
        await transaction.commit();

        success = true;
      } catch (err) {
        console.error(err);  // eslint-disable-line no-console
        await transaction.rollback();
      }
    }
  }
}

run();
