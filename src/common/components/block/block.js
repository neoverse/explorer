import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import blockShape from "../../shapes/blockShape";

export default class Block extends React.Component {
  static displayName = "Block";

  static propTypes = {
    block: blockShape.isRequired
  };

  render = () => {
    return (
      <div className="block-component">
        {this.renderBlock()}
        {this.renderTransactions()}
      </div>
    );
  }

  renderBlock = () => {
    const { block } = this.props;

    return (
      <Panel renderHeader={this.renderBlockHeader}>
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
      </Panel>
    );
  }

  renderBlockHeader = () => {
    return (
      <h2>Block {this.props.block.hash}</h2>
    );
  }

  renderTransactions = () => {
    return (
      <Panel renderHeader={this.renderTransactionsHeader}>
        <table>
          <thead>
            <tr>
              <th className="negligible narrow">Type</th>
              <th>ID</th>
              <th className="narrow">Time</th>
            </tr>
          </thead>
          <tbody>
            {this.props.block.transactions.map(this.renderTransaction)}
          </tbody>
        </table>
      </Panel>
    );
  }

  renderTransactionsHeader = () => {
    return (
      <span>Transactions</span>
    );
  }

  renderTransaction = (transaction) => {
    return (
      <tr key={transaction.txid}>
        <td className="negligible">{transaction.type.replace(/Transaction$/, "")}</td>
        <td><Link to={`/transactions/${transaction.txid}`}>{transaction.txid}</Link></td>
        <td><TimeAgo date={transaction.blocktime} /></td>
      </tr>
    );
  }
}
