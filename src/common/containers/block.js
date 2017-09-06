import { compose } from "recompose";

import Block from "../components/block/block";
import Loading from "../components/block/loading";
import Failed from "../components/block/failed";
import blockActions from "../actions/block";
import withFetch from "../hocs/api/withFetch";
import withData from "../hocs/api/withData";
import withProgressComponents from "../hocs/api/withProgressComponents";
import { LOADING, FAILED } from "../values/state";

function mapBlockToProps(block) {
  return { block };
}

export default compose(
  withFetch(blockActions),
  withData(blockActions, mapBlockToProps),
  withProgressComponents(blockActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  })
)(Block);
