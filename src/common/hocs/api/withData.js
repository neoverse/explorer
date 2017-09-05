import _ from "lodash";
import { connect } from "react-redux";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

import withoutProps from "../withoutProps";
import { ACTION_PROP } from "../../values/api";

const defaultMapDataToProps = (data) => data;

export default function withData(actions, mapDataToProps = defaultMapDataToProps) {
  const mapStateToProps = (state) => {
    const data = _.get(state, `api.${actions.id}.data`);
    return mapDataToProps(data);
  };

  return (Component) => {
    return compose(
      connect(mapStateToProps),
      withoutProps(ACTION_PROP),
      setDisplayName(wrapDisplayName("withData", Component))
    )(Component);
  };
}
