/* eslint-disable no-process-exit, no-console */

import { Vin } from "../../src/server/database";
import normalizeHex from "../../src/common/helpers/normalizeHex";

async function execute() {
  for await (const vin of Vin.batch({ order: [["id", "asc"]], batchSize: 10000 })) {
    const asset = normalizeHex(vin.asset);
    if (asset !== vin.asset) await vin.update({ asset });
  }
}

execute()
  .then(() => {
    console.log("Done fixing vin assets.");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
