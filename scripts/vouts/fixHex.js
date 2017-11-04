/* eslint-disable no-process-exit, no-console */

import { Vout } from "../../src/server/database";
import normalizeHex from "../../src/common/helpers/normalizeHex";

async function execute() {
  for await (const vout of Vout.batch({ order: [["id", "asc"]], batchSize: 10000 })) {
    const asset = normalizeHex(vout.asset);
    if (asset !== vout.asset) await vout.update({ asset });
  }
}

execute()
  .then(() => {
    console.log("Done fixing vout assets.");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
