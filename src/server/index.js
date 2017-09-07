import express from "express";
import morgan from "morgan";
import compression from "compression";
import isHeroku from "is-heroku";

import handleGraphQLRequest from "./graphql/handleRequest";
import handleWebRequest from "./web/handleRequest";
import rateLimiter from "./rateLimiter";

const app = express();

// needed for rate limiting behind a proxy
if (isHeroku) app.enable("trust proxy");

app.disable("x-powered-by");
app.use(morgan("combined"));
app.use(compression());
app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));
app.use("/graphql", rateLimiter, handleGraphQLRequest);
app.use(handleWebRequest);

export default app;
