import { compose, mapProps, setDisplayName } from "recompose";

import Block from "./block";

export default compose(
  mapProps((props) => ({ ...props, hash: props.match.params.hash })),
  setDisplayName("BlockByHashContainer")
)(Block);
