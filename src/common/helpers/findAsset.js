import _ from "lodash";

import normalizeHex from "../../helpers/normalizeHex";

export default function findAsset(assets, txid) {
  const normalizedId = normalizeHex(txid);
  return _.find(assets, { txid: normalizedId });
}
