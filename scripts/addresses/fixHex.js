/* eslint-disable no-process-exit, no-console */

import _ from "lodash";
import BigNumber from "bignumber.js";

import db, { Address } from "../../src/server/database";
import normalizeHex from "../../src/common/helpers/normalizeHex";

async function execute() {
  const transaction = await db.transaction();

  try {
    for await (const address of Address.batch({ batchSize: 10000 })) {
      const balance = _.reduce(address.balance, (accumulator, value, asset) => {
        const txid = normalizeHex(asset);
        accumulator[txid] || (accumulator[txid] = new BigNumber(0));
        accumulator[txid] = accumulator[txid].plus(value);
        return accumulator;
      }, {});

      address.update({ balance });
    }

    if (transaction) await transaction.commit();
  } catch (err) {
    if (transaction) await transaction.rollback();
    throw err;
  }
}

execute()
  .then(() => {
    console.log("Done recalculating address balances.");
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err.message);
    process.exit(1);
  });
