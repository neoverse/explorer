import { compose } from "recompose";

import Blocks from "../components/blocks";
import heightActions from "../actions/height";
import withFetch from "../hocs/api/withFetch";
import withData from "../hocs/api/withData";

function mapActionToProps(height) {
  return { height };
}

export default compose(
  withFetch(heightActions),
  withData(heightActions, mapActionToProps)
)(Blocks);
