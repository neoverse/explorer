import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Transaction from "./transaction";
import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import blockShape from "../../shapes/blockShape";

export default class Block extends React.Component {
  static displayName = "Block";

  static propTypes = {
    block: blockShape.isRequired
  };

  render = () => {
    const { block } = this.props;

    return (
      <div className="block-component">
        <h1>Block {block.hash}</h1>

        <Panel>
          <Attribute label="Index">
            {block.index.toLocaleString()}
          </Attribute>

          <Attribute label="Hash">
            {block.hash}
          </Attribute>

          <Attribute label="Time">
            <TimeAgo date={block.time} />
          </Attribute>

          <Attribute label="Validator">
            <Link to={`/addresses/${block.nextconsensus}`}>{block.nextconsensus}</Link>
          </Attribute>

          <Attribute label="Confirmations">
            {block.confirmations}
          </Attribute>

          <Attribute label="Size">
            {block.size.toLocaleString()} bytes
          </Attribute>

          <Attribute label="Version">
            {block.version}
          </Attribute>

          <Attribute label="Nonce">
            {block.nonce}
          </Attribute>

          <Attribute label="Merkle Root">
            {block.merkleroot}
          </Attribute>

          <Attribute label="Previous Block">
            <Link to={`/blocks/${block.previousblockhash}`}>{block.previousblockhash}</Link>
          </Attribute>

          <Attribute label="Invocation Script">
            {block.script.invocation}
          </Attribute>

          <Attribute label="Verification Script">
            {block.script.verification}
          </Attribute>

          <Attribute label="Transactions">
            <ul>
              {this.renderTransactions()}
            </ul>
          </Attribute>
        </Panel>
      </div>
    );
  }

  renderTransactions = () => {
    const { block } = this.props;

    return block.transactions.map((transaction) => {
      return (
        <li key={transaction.txid}>
          <Transaction transaction={transaction} />
        </li>
      );
    });
  }
}
