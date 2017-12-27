import * as neo from "neo-api";

import findBestNode from "./findBestNode";

const HOST = process.env.RAZZLE_TESTNET ? "testnet-api.neonwallet.com" : "api.neonwallet.com";

export default async function createClient() {
  const node = await findBestNode({ host: HOST });
  return neo.node(node.url);
}
