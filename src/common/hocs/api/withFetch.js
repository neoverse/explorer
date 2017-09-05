import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

import withoutProps from "../withoutProps";
import { ACTION_PROP } from "../../values/api";
import { isServer } from "../../util/api/server";

const { bool, func } = PropTypes;

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
        runOnServer: bool,
        [ACTION_PROP]: func.isRequired
      };

      static defaultProps = {
        runOnServer: false
      };

      componentWillMount = () => {
        if (this.props.runOnServer || !isServer()) {
          this.props[ACTION_PROP](mapPropsToAction(this.props));
        }

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
