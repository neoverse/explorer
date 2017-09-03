import React, { Component } from "react";
import PropTypes from "prop-types";

const { string } = PropTypes;

export default class Block extends Component {
  static propTypes = {
    id: string.isRequired
  };

  render = () => {
    return (
      <div className="block-component">
        Blockchain {this.props.id}
      </div>
    );
  }
}
