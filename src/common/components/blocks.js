import React from "react";
import PropTypes from "prop-types";

const { number } = PropTypes;

export default class Blocks extends React.Component {
  static propTypes = {
    height: number
  };

  render = () => {
    return (
      <div className="blocks-component">
        <h2>Blocks</h2>
        <p>Current height: {this.props.height}</p>
      </div>
    );
  }
}
