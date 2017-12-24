import * as neo from "neo-api";

import findBestNode from "./findBestNode";

const HOST = process.env.NEON_WALLET_API_HOST;

export default async function createClient() {
  const node = await findBestNode({ host: HOST });
  return neo.node(node.url);
}
