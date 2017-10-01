import _ from "lodash";

export default function findAsset(assets, txid) {
  const normalizedId = txid.replace(/^0x/, "");
  return _.find(assets, { txid: normalizedId });
}
