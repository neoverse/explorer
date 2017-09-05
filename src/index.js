/* eslint-disable no-console */

import server from "./server";
import { setServer } from "./common/util/api/server";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

setServer(true);

if (module.hot) {
  module.hot.accept("./server", function() {
    console.log("🔁  HMR Reloading `./server`...");
  });
  console.info("✅  Server-side HMR Enabled!");
}

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

export default server;
