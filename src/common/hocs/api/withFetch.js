import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

import withoutProps from "../withoutProps";
import { ACTION_PROP } from "../../values/api";

const { func } = PropTypes;

function defaultMapPropsToAction(props) {
  return props;
}

export default function withFetch(action, mapPropsToAction = defaultMapPropsToAction) {
  function mapDispatchToProps(dispatch) {
    return {
      [ACTION_PROP]: (props) => dispatch(action.request(props))
    };
  }

  return (Component) => {
    class ComponentWithFetch extends React.Component {
      static displayName = "ComponentWithFetch";

      static propTypes = {
        [ACTION_PROP]: func.isRequired
      };

      componentWillMount = () => {
        this.props[ACTION_PROP](mapPropsToAction(this.props));
        this.Component = withoutProps("runOnServer", ACTION_PROP)(Component);
      }

      render = () => {
        return <this.Component {...this.props} />;
      }
    }

    return compose(
      connect(null, mapDispatchToProps),
      setDisplayName(wrapDisplayName("withFetch", Component))
    )(ComponentWithFetch);
  };
}
