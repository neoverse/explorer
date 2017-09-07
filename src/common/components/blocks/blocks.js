import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import blockSummaryShape from "../../shapes/blockSummaryShape";

const { arrayOf } = PropTypes;

export default class Blocks extends React.Component {
  static displayName = "Blocks";

  static propTypes = {
    blocks: arrayOf(blockSummaryShape).isRequired
  };

  render = () => {
    return (
      <div className="blocks-component">
        <h2>Blocks</h2>
        <ul>
          {this.renderBlocks()}
        </ul>
      </div>
    );
  }

  renderBlocks = () => {
    return this.props.blocks.map((block) => {
      return (
        <li key={block.index}>
          <Link to={`/blocks/${block.hash}`}>{block.hash}</Link>
        </li>
      );
    });
  }
}
