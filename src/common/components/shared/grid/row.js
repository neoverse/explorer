import React from "react";
import classNames from "classnames";

export default class Row extends React.Component {
  static displayName = "Row";

  render = () => {
    const className = classNames("row-component", this.props.className);
    return <div className={className}>{this.props.children}</div>;
  }
}
