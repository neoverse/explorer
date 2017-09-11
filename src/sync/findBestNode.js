import "isomorphic-fetch";
import _ from "lodash";

export default async function findBestNode() {
  const response = await fetch("http://api.neonwallet.com/v2/network/nodes");

  if (response.status !== 200) {
    throw new Error(`Bad response: ${response.status}`);
  }

  const { nodes } = await response.json();

  const filteredNodes = _.filter(nodes, "block_height");
  const sortedNodes = _.orderBy(filteredNodes, ["block_height", "time"], ["desc", "asc"]);

  return sortedNodes[0];
}
