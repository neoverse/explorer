import React from "react";
import classNames from "classnames";

export default class Container extends React.Component {
  static displayName = "Container";

  render = () => {
    const className = classNames("container-component", this.props.className);
    return <div {...this.props} className={className} />;
  }
}
