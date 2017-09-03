import { connect } from "react-redux";

import Blocks from "../components/blocks";
import { fetchHeight } from "../actions/height";

function mapStateToProps(state, ownProps) {
  return {
    height: state.height.data
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchHeight: () => dispatch(fetchHeight())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks);
