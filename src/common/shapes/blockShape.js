import PropTypes from "prop-types";

import scriptShape from "./scriptShape";
import transactionShape from "./transactionShape";

const { shape, string, number, arrayOf } = PropTypes;

export default shape({
  hash: string.isRequired,
  index: number.isRequired,
  confirmations: number.isRequired,
  merkleroot: string.isRequired,
  nextconsensus: string,
  nonce: string,
  previousblockhash: string,
  script: scriptShape.isRequired,
  size: number.isRequired,
  time: string.isRequired,
  version: number.isRequired,
  transactions: arrayOf(transactionShape).isRequired
});
