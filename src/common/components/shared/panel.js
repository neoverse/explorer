import React from "react";

export default class Panel extends React.Component {
  static displayName = "Panel";

  render = () => {
    return (
      <div className="panel-component">
        {this.props.children}
      </div>
    );
  }
}
