/* eslint-disable no-process-exit, no-console */

import { Vin, Transaction } from "../../src/server/database";
import VinProcessor from "../../src/sync/processors/vinProcessor";

async function execute(processor) {
  await Vin.destroy({ truncate: true });

  for await (const transaction of Transaction.batch({ order: ["id"], batchSize: 10000 })) {
    await processor.process([transaction]);
  }
}

execute(new VinProcessor())
  .then(() => {
    console.log("Done popluating vins.");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
