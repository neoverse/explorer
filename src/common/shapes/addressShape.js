import PropTypes from "prop-types";

const { shape, string, number, arrayOf } = PropTypes;

const balanceShape = shape({
  asset: string.isRequired,
  value: number.isRequired
});

export default shape({
  address: string.isRequired,
  balance: arrayOf(balanceShape).isRequired
});
