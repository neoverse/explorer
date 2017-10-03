import React from "react";
import classNames from "classnames";

export default class Spinner extends React.Component {
  render = () => {
    return (
      <div className={classNames("spinner-component", this.props.className)}>
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    );
  }
}
