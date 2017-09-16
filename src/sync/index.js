/* eslint-disable no-process-exit */

import "babel-polyfill";

import Syncer from "./syncer";
import database from "../server/database";

const syncer = new Syncer({
  concurrency: Number(process.env.SYNC_CONCURRENCY || 5)
});

async function run() {
  await database.authenticate();
  await database.sync();  // TODO: remove this in favor of running a migration before the app starts

  syncer.start();
}

process.on("SIGINT", () => {
  syncer.stop();
  process.exit();
});

run();
