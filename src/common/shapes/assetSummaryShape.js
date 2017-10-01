import PropTypes from "prop-types";

import assetNameShape from "./assetNameShape";

const { shape, string, number, arrayOf } = PropTypes;

export default shape({
  txid: string.isRequired,
  name: arrayOf(assetNameShape).isRequired,
  precision: number.isRequired
});
