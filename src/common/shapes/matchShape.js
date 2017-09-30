import PropTypes from "prop-types";

const { bool, string, object, shape } = PropTypes;

export default shape({
  isExact: bool.isRequired,
  params: object.isRequired,
  path: string.isRequired,
  url: string.isRequired
});
