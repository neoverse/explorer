import React from "react";
import { mapProps, compose } from "recompose";

import Blocks from "../components/blocks";
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

function Loading(props) {
  return <div>Loading...</div>;
}

function Failed(props) {
  return <div>Failed</div>;
}

const BlockContainer = compose(
  mapProps((props) => ({ ...props, hash: props.height - 1 })),  // convert the height to the last block index
  withFetch(blockActions),
  withData(blockActions, mapBlockToProps),
  withProgressComponents(blockActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  })
)(Blocks);

export default compose(
  withFetch(heightActions),
  withData(heightActions, mapHeightToProps),
  withProgressComponents(heightActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  })
)(BlockContainer);
