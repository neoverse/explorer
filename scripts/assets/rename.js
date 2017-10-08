/* eslint-disable no-process-exit, no-console */

import db, { Asset } from "../../src/server/database";
import { NEO_ID, GAS_ID } from "../../src/common/values/assets";

async function execute() {
  const transaction = await db.transaction();

  try {
    await Asset.update({
      name: [{ name: "小蚁股", lang: "zh-CN" }, { name: "NEO", lang: "en" }]
    }, {
      where: { txid: NEO_ID },
      transaction
    });

    await Asset.update({
      name: [{ name: "小蚁币", lang: "zh-CN" }, { name: "GAS", lang: "en" }]
    }, {
      where: { txid: GAS_ID },
      transaction
    });

    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

execute()
  .then(() => {
    console.log("Done renaming NEO & GAS assets.");
    process.exit();
  })
  .catch((err) => {
    console.log("Error:", err.message);
    process.exit(1);
  });
