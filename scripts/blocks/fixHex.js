/* eslint-disable no-process-exit, no-console */

import db, { Block, Transaction } from "../../src/server/database";
import normalizeHex from "../../src/common/helpers/normalizeHex";

async function execute() {
  for await (const block of Block.batch({ order: [["id", "asc"]], batchSize: 10000 })) {
    const hash = normalizeHex(block.hash);
    const previousblockhash = normalizeHex(block.previousblockhash);

    if (hash !== block.hash || previousblockhash !== block.previousblockhash) {
      const transaction = await db.transaction();

      try {
        for await (const transaction of Transaction.batch({ where: { blockhash: block.hash } })) {
          await transaction.update({ blockhash: hash });
        }

        await block.update({ hash, previousblockhash });
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    }
  }
}

execute()
  .then(() => {
    console.log("Done fixing block hashes.");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
