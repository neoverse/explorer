import PropTypes from "prop-types";

const { string, shape } = PropTypes;

export default shape({
  invocation: string.isRequired,
  verification: string.isRequired
});
