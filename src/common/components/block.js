import React from "react";
import PropTypes from "prop-types";

import blockShape from "../shapes/blockShape";

const { string } = PropTypes;

export default class Block extends React.Component {
  static propTypes = {
    index: string.isRequired,
    block: blockShape.isRequired
  };

  render = () => {
    const { block } = this.props;

    return (
      <div className="block-component">
        <h1>Block #{this.props.index}</h1>

        <dl>
          <dt>Confirmations:</dt>
          <dd>{block.confirmations}</dd>

          <dt>Size:</dt>
          <dd>{block.size}</dd>
        </dl>
      </div>
    );
  }
}
