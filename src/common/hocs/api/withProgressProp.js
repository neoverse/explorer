import _ from "lodash";
import { connect } from "react-redux";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

import { PROGRESS_PROP } from "../../values/api";
import { INITIAL } from "../../values/state";

export default function withProgressProp(actions, propName = PROGRESS_PROP) {
  const mapProgressToProps = (progressState) => ({ [propName]: progressState });

  const mapStateToProps = (state) => {
    const progressState = _.get(state, `api.${actions.id}.state`) || INITIAL;
    return mapProgressToProps(progressState);
  };

  return (Component) => {
    return compose(
      connect(mapStateToProps),
      setDisplayName(wrapDisplayName(Component, "withProgressProp"))
    )(Component);
  };
}
