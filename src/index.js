/* eslint-disable no-console */

import server from "./server";
import database from "./server/database";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

if (module.hot) {
  module.hot.accept("./server", function() {
    console.log("🔁  HMR Reloading `./server`...");
  });
  console.info("✅  Server-side HMR Enabled!");
}

async function listen() {
  await database.authenticate();

  server.listen(port, (err) => {
    if (err) {
      console.error(err);
    } else if (isProduction) {
      console.log(`Server running on port ${port}`);
    } else {
      const myip = require("quick-local-ip");
      console.log(`Server running on network address ${myip.getLocalIP4()}:${port}`);
    }
  });
}

listen();

export default server;
