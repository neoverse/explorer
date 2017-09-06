import React from "react";
import PropTypes from "prop-types";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

import withProgressProp from "./withProgressProp";
import withoutProps from "../withoutProps";
import { PROGRESS_PROP } from "../../values/api";
import { INITIAL, LOADING, LOADED, FAILED } from "../../values/state";

const { oneOf } = PropTypes;

const progressShape = oneOf([INITIAL, LOADING, LOADED, FAILED]);

export default function withProgressComponents(actions, mapping = {}) {
  return (Component) => {
    class ComponentWithProgressComponents extends React.Component {
      static displayName = "ComponentWithProgressComponents";

      static propTypes = {
        [PROGRESS_PROP]: progressShape.isRequired
      };

      render = () => {
        const MappedComponent = mapping[this.props[PROGRESS_PROP]] || Component;
        const WrappedComponent = withoutProps(PROGRESS_PROP)(MappedComponent);
        return <WrappedComponent {...this.props} />;
      }
    }

    return compose(
      withProgressProp(actions),
      setDisplayName(wrapDisplayName(Component, "withProgressComponents"))
    )(ComponentWithProgressComponents);
  };
}
