import _ from "lodash";
import { connect } from "react-redux";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

import withoutProps from "../withoutProps";
import { ACTION_PROP } from "../../values/api";

const defaultMapActionToProps = (data) => data;

export default function withData(actions, mapActionToProps = defaultMapActionToProps) {
  const selectData = (state) => {
    const data = _.get(state, `api.${actions.id}.data`);
    return mapActionToProps(data);
  };

  return (Component) => {
    return compose(
      connect(selectData),
      withoutProps(ACTION_PROP),
      setDisplayName(wrapDisplayName("withData", Component))
    )(Component);
  };
}
