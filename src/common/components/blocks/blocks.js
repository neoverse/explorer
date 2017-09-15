import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

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
        <table width="100%">
          <thead>
            <tr>
              <td>Index</td>
              <td>Time</td>
              <td>Confirmations</td>
              <td>Size</td>
            </tr>
          </thead>
          <tbody>
            {this.renderBlocks()}
          </tbody>
        </table>
      </div>
    );
  }

  renderBlocks = () => {
    return this.props.blocks.map((block) => {
      return (
        <tr key={block.index}>
          <td><Link to={`/blocks/${block.hash}`}>{block.index}</Link></td>
          <td><TimeAgo date={block.time} /></td>
          <td>{block.confirmations}</td>
          <td>{block.size}</td>
        </tr>
      );
    });
  }
}
