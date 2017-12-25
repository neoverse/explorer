/* eslint-disable no-process-exit, no-console */

import util from "util";

import createClient from "../../src/sync/helpers/createClient";

const VERBOSE = 1;

async function execute(height) {
  const client = await createClient();
  const index = Number(height || (await client.getBlockCount() - 1));
  const block = await client.getBlockByHeight(index, VERBOSE);

  console.log(util.inspect(block, { showHidden: false, depth: null }));
}

execute(process.argv[3])
  .then(() => {
    console.log("Done fixing block hashes.");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
