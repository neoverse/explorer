import PropTypes from "prop-types";

import assetNameShape from "./assetNameShape";

const { shape, string, number, arrayOf } = PropTypes;

export default shape({
  txid: string.isRequired,
  name: arrayOf(assetNameShape).isRequired,
  type: string.isRequired,
  precision: number.isRequired,
  issued: number.isRequired,
  amount: number.isRequired,
  admin: string.isRequired,
  owner: string.isRequired,
  registered: string.isRequired
});
