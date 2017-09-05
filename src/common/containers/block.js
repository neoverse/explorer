import React from "react";
import { mapProps, compose } from "recompose";

import Block from "../components/block";
import blockActions from "../actions/block";
import withFetch from "../hocs/api/withFetch";
import withData from "../hocs/api/withData";
import withProgressComponents from "../hocs/api/withProgressComponents";
import { LOADING, FAILED } from "../values/state";

function mapBlockToProps(block) {
  return { block };
}

function Loading(props) {
  return <div>Loading...</div>;
}

function Failed(props) {
  return <div>Failed</div>;
}

export default compose(
  mapProps((props) => ({ ...props, hash: props.match.params.hash })),
  withFetch(blockActions),
  withData(blockActions, mapBlockToProps),
  withProgressComponents(blockActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  })
)(Block);
