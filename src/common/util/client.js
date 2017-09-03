import * as neo from "neo-api-js";

// TODO: Calculate the best node to use.  Can model this after the approach used by Neon Wallet,
// which exposes a "best node" enpoint at http://api.neonwallet.com/v2/network/best_node
// The best node is based upon the current height & response time across all nodes (via
// http://api.neonwallet.com/v2/network/nodes).  Source for `get_highest_node` can be found here:
// https://github.com/CityOfZion/neon-wallet-db/blob/master/api/blockchain.py#L49

export default neo.node("http://seed1.cityofzion.io:8080");
