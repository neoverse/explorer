import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
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

        <Panel>
          <table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Confirmations</th>
                <th>Size</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {this.renderBlocks()}
            </tbody>
          </table>
        </Panel>
      </div>
    );
  }

  renderBlocks = () => {
    return this.props.blocks.map((block) => {
      return (
        <tr key={block.index}>
          <td><Link to={`/blocks/${block.hash}`}>{block.index.toLocaleString()}</Link></td>
          <td>{block.confirmations}</td>
          <td>{block.size.toLocaleString()} bytes</td>
          <td><TimeAgo date={block.time} /></td>
        </tr>
      );
    });
  }
}
