import _ from "lodash";
import React from "react";

export default function withoutProps(...propNames) {
  return (Component) => {
    const ComponentWithoutProps = (props) => {
      const passDownProps = _.omit(props, ...propNames);
      return <Component {...passDownProps} />;
    };

    return compose(
      setDisplayName(wrapDisplayName("withoutProps", Component))
    )(ComponentWithoutProps);
  };
}
