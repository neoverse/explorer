import React from "react";

import historyShape from "../shapes/historyShape";

export default class Home extends React.Component {
  static displayName = "Home";

  static propTypes = {
    history: historyShape.isRequired
  };

  componentDidMount = () => {
    this.props.history.replace("/blocks");
  }

  render = () => {
    return null;
  }
}
