import PropTypes from "prop-types";

const { shape, string, number } = PropTypes;

export default shape({
  txid: string.isRequired,
  blockhash: string.isRequired,
  blocktime: string.isRequired,
  size: number.isRequired,
  type: string.isRequired
});
