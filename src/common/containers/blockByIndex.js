import { mapProps } from "recompose";

import Block from "./block";

export default mapProps((props) => ({ ...props, index: props.match.params.index }))(Block);
