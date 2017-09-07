import PropTypes from "prop-types";

const { shape, string, number } = PropTypes;

export default shape({
  hash: string.isRequired,
  index: number.isRequired,
  confirmations: number.isRequired,
  size: number.isRequired,
  time: string.isRequired,
  version: number.isRequired
});
