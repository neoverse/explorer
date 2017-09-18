import PropTypes from "prop-types";

const { string, bool, arrayOf, shape } = PropTypes;

const codeShape = shape({
  hash: string.isRequired,
  script: string.isRequired,
  parameters: arrayOf(string).isRequired,
  returntype: string.isRequired
});

export default shape({
  txid: string.isRequired,
  hash: string.isRequired,
  name: string.isRequired,
  code: codeShape.isRequired,
  version: string.isRequired,
  needstorage: bool.isRequired,
  author: string.isRequired,
  email: string.isRequired,
  description: string.isRequired
});
