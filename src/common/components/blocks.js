import React from "react";
import PropTypes from "prop-types";

const { number, func } = PropTypes;

export default class Blocks extends React.Component {
  static propTypes = {
    height: number,
    fetchHeight: func.isRequired
  };

  componentWillMount = () => {
    this.props.fetchHeight();
  }

  render = () => {
    return (
      <div className="blocks-component">
        <h2>Blocks</h2>
        <p>Current height: {this.props.height}</p>
      </div>
    );
  }
}
