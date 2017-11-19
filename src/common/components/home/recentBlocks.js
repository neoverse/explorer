import React from "react";
import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

import Panel from "../shared/panel";
import blockSummaryShape from "../../shapes/blockSummaryShape";

const { arrayOf } = PropTypes;

export default class RecentBlocks extends React.Component {
  static displayName = "RecentBlocks";

  static propTypes = {
    blocks: arrayOf(blockSummaryShape).isRequired
  };

  render = () => {
    return (
      <Panel className="recent-blocks-component" renderHeader={this.renderHeader}>
        <ul className="recent-blocks">
          {this.props.blocks.map(this.renderBlock)}
        </ul>
      </Panel>
    );
  }

  renderHeader = () => {
    // TODO: Remove this inline style.  Perhaps introduce `renderHeaderLink` prop on Panel?
    return (
      <div>
        <span style={{ float: "right" }}><Link to="/blocks">View all blocks &raquo;</Link></span>
        <h2>Recent Blocks</h2>
      </div>
    );
  }

  renderBlock = (block) => {
    return (
      <li className="recent-block" key={block.hash}>
        <div className="row">
          <Link to={`/blocks/${block.hash}`}>{block.hash}</Link>
          <TimeAgo date={block.time} />
        </div>
        <div className="row">
          <span>Block #{block.index.toLocaleString()}</span>
        </div>
      </li>
    );
  }
}
