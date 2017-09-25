/* eslint-disable no-console */

import db, { Transaction, Address } from "../src/server/database";

async function execute() {
  const transaction = await db.transaction();

  try {
    await Address.destroy({ truncate: true, transaction });

    // TODO: need to limit/offset the result set and loop over it
    const transactions = await Transaction.findAll({ transaction });

    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      // TODO: refactor updater so that I can reuse address creator/updater code here
    }

    await transaction.commit();
    console.log("Done recalculating address balances.");
  } catch (err) {
    await transaction.rollback();
    console.log("Error:", err.message);
  }
}

execute().then(process.exit);
