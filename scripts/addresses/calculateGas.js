/* eslint-disable no-process-exit, no-console */

import { Address } from "../../src/server/database";

async function execute(addr) {
  const address = await Address.findOne({ where: { address: addr } });

  if (!addr) {
    throw new Error(`Invalid address: "${addr}"`);
  }

  return address.calculateUnclaimedGas();
}

execute(process.argv[3])
  .then((unclaimedGas) => {
    console.log(`Unclaimed GAS: ${unclaimedGas}`);
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
