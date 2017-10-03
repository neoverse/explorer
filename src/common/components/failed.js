import React from "react";

export default class Failed extends React.Component {
  static displayName = "Failed";

  render = () => {
    return (
      <div className="failed-component">
        Failed
      </div>
    );
  }
}
