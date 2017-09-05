import React from "react";
import { compose } from "recompose";

import Blocks from "../components/blocks";
import heightActions from "../actions/height";
import withFetch from "../hocs/api/withFetch";
import withData from "../hocs/api/withData";
import withProgressComponents from "../hocs/api/withProgressComponents";
import { LOADING, FAILED } from "../values/state";

function mapActionToProps(height) {
  return { height };
}

function Loading(props) {
  return <div>Loading...</div>;
}

function Failed(props) {
  return <div>Failed</div>;
}

export default compose(
  withFetch(heightActions),
  withData(heightActions, mapActionToProps),
  withProgressComponents(heightActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  })
)(Blocks);
