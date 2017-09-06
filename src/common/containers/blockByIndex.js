import { compose, mapProps, setDisplayName } from "recompose";

import Block from "./block";

export default compose(
  mapProps((props) => ({ ...props, index: props.match.params.index })),
  setDisplayName("BlockByIndexContainer")
)(Block);
