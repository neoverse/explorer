import { compose, mapProps, setDisplayName } from "recompose";

import Blocks from "../components/blocks/blocks";
import Loading from "../components/blocks/loading";
import Failed from "../components/blocks/failed";
import blockActions from "../actions/block";
import heightActions from "../actions/height";
import withFetch from "../hocs/api/withFetch";
import withData from "../hocs/api/withData";
import withProgressComponents from "../hocs/api/withProgressComponents";
import { LOADING, FAILED } from "../values/state";

function mapHeightToProps(height) {
  return { height };
}

function mapBlockToProps(block) {
  return {
    blocks: [block]
  };
}

const BlocksContainer = compose(
  mapProps((props) => ({ ...props, index: props.height - 1 })),
  withFetch(blockActions),
  withData(blockActions, mapBlockToProps),
  withProgressComponents(blockActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  setDisplayName("BlocksContainer")
)(Blocks);

export default compose(
  withFetch(heightActions),
  withData(heightActions, mapHeightToProps),
  withProgressComponents(heightActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  setDisplayName("BlocksContainerContainer")
)(BlocksContainer);
