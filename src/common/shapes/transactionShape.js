import PropTypes from "prop-types";

const { shape, string, number, array } = PropTypes;

export default shape({
  txid: string.isRequired,
  attributes: array.isRequired,
  net_fee: string.isRequired,
  nonce: number,
  scripts: array.isRequired,
  size: number.isRequired,
  sys_fee: string.isRequired,
  type: string.isRequired,
  version: number.isRequired,
  vin: array.isRequired,
  vout: array.isRequired
});
