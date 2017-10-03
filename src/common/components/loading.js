import React from "react";

import Spinner from "./shared/spinner";

export default class Loading extends React.Component {
  static displayName = "Loading";

  render = () => {
    return (
      <div className="loading-component">
        <Spinner />
      </div>
    );
  }
}
