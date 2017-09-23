/* eslint-disable no-process-exit, no-console */

import "babel-polyfill";

import QueueManager from "./queueManager";
import database from "../server/database";

const manager = new QueueManager({
  concurrency: Number(process.env.SYNC_CONCURRENCY || 5)
});

async function run() {
  await database.authenticate();
  await manager.start();
}

process.on("SIGINT", () => {
  manager.stop();
  process.exit();
});

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled rejection at:", p, "reason:", reason);
  process.exit(1);
});

run();
