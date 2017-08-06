import path from "path";
import express from "express";

import handleRequest from "./handleRequest";

const port = process.env.PORT;
const env = process.env.NODE_ENV;
const app = express();

app.use("/assets", express.static(path.join(__dirname, "..", "build"), {
  maxAge: env === "production" ? "365d" : "0"
}));

app.use(handleRequest);

app.listen(port, () => {
  if (env === "production") {
    console.log(`Server running on port ${port}`);
  } else {
    const myip = require("quick-local-ip");
    console.log(`Server running on network address ${myip.getLocalIP4()}:${port}`);
  }
});

export default app;
