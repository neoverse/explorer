import PropTypes from "prop-types";

import scriptShape from "./scriptShape";
import transactionShape from "./transactionShape";

const { shape, string, number, arrayOf } = PropTypes;

export default shape({
  hash: string.isRequired,
  index: number.isRequired,
  confirmations: number.isRequired,
  merkleroot: string.isRequired,
  nextconsensus: string.isRequired,
  nonce: string,
  previousblockhash: string.isRequired,
  script: scriptShape.isRequired,
  size: number.isRequired,
  time: number.isRequired,
  tx: arrayOf(transactionShape).isRequired,
  version: number.isRequired
});
