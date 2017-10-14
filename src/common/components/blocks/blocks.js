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
        <Panel renderHeader={this.renderHeader}>
          <table>
            <thead>
              <tr>
                <th className="narrow">Index</th>
                <th>Hash</th>
                <th className="narrow negligible">Confirmations</th>
                <th className="narrow negligible">Size</th>
                <th className="narrow">Time</th>
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

  renderHeader = () => {
    return (
      <h2>Blocks</h2>
    );
  }

  renderBlocks = () => {
    return this.props.blocks.map((block) => {
      return (
        <tr key={block.index}>
          <td>{block.index.toLocaleString()}</td>
          <td><Link to={`/blocks/${block.hash}`}>{block.hash}</Link></td>
          <td className="negligible">{block.confirmations}</td>
          <td className="negligible">{block.size.toLocaleString()} bytes</td>
          <td><TimeAgo date={block.time} /></td>
        </tr>
      );
    });
  }
}
