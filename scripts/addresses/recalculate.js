/* eslint-disable no-process-exit, no-console */

import _ from "lodash";

import db, { Block, Transaction, Address } from "../../src/server/database";
import AddressProcessor from "../../src/sync/processors/addressProcessor";

function formatTransaction(transaction) {
  const transactionData = _.omit(transaction.dataValues, "id", "data", "created_at", "updated_at");
  const extraData = transaction.data || {};

  return { ...transactionData, ...extraData };
}

async function execute(processor, { transactional = false } = {}) {
  const transaction = transactional ? await db.transaction() : null;

  try {
    await Address.destroy({ truncate: true, transaction });

    for await (const block of Block.batch({ order: [["index", "asc"]], batchSize: 10000, transaction })) {
      const transactions = await Transaction.findAll({
        where: { blockhash: block.hash },
        order: [["id", "asc"]],
        transaction
      });

      await processor.process(transactions.map(formatTransaction), { transaction });
    }

    if (transaction) await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
    throw err;
  }
}

const transactional = process.argv[3] === "--transactional";

execute(new AddressProcessor(), { transactional })
  .then(() => {
    console.log("Done recalculating address balances.");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
