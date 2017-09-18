import PropTypes from "prop-types";

const { shape, string, number, arrayOf } = PropTypes;

const nameEntryShape = shape({
  lang: string.isRequired,
  name: string.isRequired
});

export default shape({
  txid: string.isRequired,
  name: arrayOf(nameEntryShape).isRequired,
  type: string.isRequired,
  precision: number.isRequired,
  issued: number.isRequired,
  amount: number.isRequired,
  admin: string.isRequired,
  owner: string.isRequired,
  registered: string.isRequired
});
