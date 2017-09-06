import PropTypes from "prop-types";

import scriptShape from "./scriptShape";

const { shape, string, number, array, arrayOf } = PropTypes;

const vinShape = shape({
  txid: string.isRequired,
  vout: number.isRequired
});

const voutShape = shape({
  address: string.isRequired,
  asset: string.isRequired,
  n: number.isRequired,
  value: string.isRequired
});

export default shape({
  txid: string.isRequired,
  attributes: array.isRequired,
  net_fee: string.isRequired,
  nonce: number,
  scripts: arrayOf(scriptShape).isRequired,
  size: number.isRequired,
  sys_fee: string.isRequired,
  type: string.isRequired,
  version: number.isRequired,
  vin: arrayOf(vinShape).isRequired,
  vout: arrayOf(voutShape).isRequired
});
