import { connect } from "react-redux";

import Blocks from "../components/blocks";
import { fetchHeight } from "../actions/blocks";

function mapStateToProps(state, ownProps) {
  // console.log("STATE:", state);
  // debugger;

  return {
    height: state.blocks.height
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  // console.log("MAPPING DISPATCH");
  // debugger;

  return {
    fetch: fetchHeight(dispatch, ownProps)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
