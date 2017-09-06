import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import blockShape from "../shapes/blockShape";

const { number, arrayOf } = PropTypes;

export default class Blocks extends React.Component {
  static propTypes = {
    height: number,
    blocks: arrayOf(blockShape).isRequired
  };

  render = () => {
    return (
      <div className="blocks-component">
        <h2>Blocks</h2>
        <p>Current height: {this.props.height}</p>
        {this.renderBlocks()}
      </div>
    );
  }

  renderBlocks = () => {
    return this.props.blocks.map((block) => {
      return (
        <p key={block.index}>
          <Link to={`/blocks/${block.index}`}>#{block.index}</Link>
        </p>
      );
    });
  }
}
