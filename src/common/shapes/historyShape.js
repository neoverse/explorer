import PropTypes from "prop-types";

const { func, shape } = PropTypes;

export default shape({
  push: func.isRequired
});
