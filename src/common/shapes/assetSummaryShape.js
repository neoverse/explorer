import PropTypes from "prop-types";

import assetNameShape from "./assetNameShape";

const { shape, string, arrayOf } = PropTypes;

export default shape({
  txid: string.isRequired,
  name: arrayOf(assetNameShape).isRequired
});
