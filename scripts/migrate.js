/* eslint-disable no-console, no-process-exit */

import _ from "lodash";
import Sequelize from "sequelize";
import Umzug from "umzug";

const sequelize = new Sequelize(process.env.DATABASE_URL);

const umzug = new Umzug({
  storage: "sequelize",
  storageOptions: { sequelize },
  migrations: {
    params: [
      sequelize.getQueryInterface(),
      sequelize.constructor
    ],
    path: "./migrations",
    pattern: /\.js$/
  }
});

function generateLogger(eventName) {
  return (name, _migration) => {
    console.log(`${name} ${eventName}`);
  };
}

umzug.on("migrating", generateLogger("migrating"));
umzug.on("migrated", generateLogger("migrated"));
umzug.on("reverting", generateLogger("reverting"));
umzug.on("reverted", generateLogger("reverted"));

function execute(command) {
  switch (command) {
    case "up":
      return umzug.up();
    case "down":
      return umzug.down();
    default:
      return Promise.reject(new Error(`Invalid command: "${command}"`));
  }
}

const command = _.trim(process.argv[3]);
const result = execute(command);

result
  .then((migrations) => {
    if (migrations.length > 0) {
      console.log(`Migrate ${command} done.`);
    } else {
      console.log("No pending migrations.");
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Migrate ${command} failed. ${err.message}`);
    process.exit(1);
  });
