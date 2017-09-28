/* eslint-disable no-process-exit, no-console */

import _ from "lodash";

import db, { Block, Transaction, Address } from "../../src/server/database";
import AddressProcessor from "../../src/sync/processors/addressProcessor";

function formatTransaction(transaction) {
  const transactionData = _.omit(transaction.dataValues, "id", "data", "created_at", "updated_at");
  const extraData = transaction.data || {};

  return { ...transactionData, ...extraData };
}

async function execute(processor) {
  const transaction = await db.transaction();

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

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

execute(new AddressProcessor())
  .then(() => {
    console.log("Done recalculating address balances.");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
