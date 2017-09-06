import { mapProps } from "recompose";

import Block from "./block";

export default mapProps((props) => ({ ...props, hash: props.match.params.hash }))(Block);
