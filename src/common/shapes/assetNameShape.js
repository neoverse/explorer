import PropTypes from "prop-types";

const { string, shape } = PropTypes;

export default shape({
  lang: string.isRequired,
  name: string.isRequired
});
