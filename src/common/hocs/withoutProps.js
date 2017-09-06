import _ from "lodash";
import React from "react";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

export default function withoutProps(...propNames) {
  return (Component) => {
    const ComponentWithoutProps = (props) => {
      const passDownProps = _.omit(props, ...propNames);
      return <Component {...passDownProps} />;
    };

    return compose(
      setDisplayName(wrapDisplayName(Component, "withoutProps"))
    )(ComponentWithoutProps);
  };
}
