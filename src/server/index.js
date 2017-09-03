import express from "express";

import handleRequest from "./handleRequest";

const app = express();

app.disable("x-powered-by");
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));
app.use(handleRequest);

export default app;
