/* eslint-disable no-console */

import db, { Asset } from "../src/server/database";

async function execute() {
  const transaction = await db.transaction();

  try {
    await Asset.update({
      name: [{ name: "小蚁股", lang: "zh-CN" }, { name: "NEO", lang: "en" }]
    }, {
      where: { txid: "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b" },
      transaction
    });

    await Asset.update({
      name: [{ name: "小蚁币", lang: "zh-CN" }, { name: "GAS", lang: "en" }]
    }, {
      where: { txid: "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7" },
      transaction
    });

    await transaction.commit();
    console.log("Done renaming NEO & GAS assets.");
  } catch (err) {
    await transaction.rollback();
    console.log("Error:", err.message);
  }
}

execute().then(process.exit);
