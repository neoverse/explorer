import React from "react";
import { Link } from "react-router-dom";

import blockShape from "../../shapes/blockShape";

export default class Block extends React.Component {
  static propTypes = {
    block: blockShape.isRequired
  };

  render = () => {
    const { block } = this.props;

    return (
      <div className="block-component">
        <h1>Block #{block.index.toLocaleString()}</h1>

        <dl>
          <dt>Hash:</dt>
          <dd>{block.hash}</dd>

          <dt>Time:</dt>
          <dd>{block.time}</dd>

          <dt>Validator:</dt>
          <dd>{block.nextconsensus}</dd>

          <dt>Confirmations:</dt>
          <dd>{block.confirmations}</dd>

          <dt>Size:</dt>
          <dd>{block.size.toLocaleString()} bytes</dd>

          <dt>Version:</dt>
          <dd>{block.version}</dd>

          <dt>Nonce:</dt>
          <dd>{block.nonce}</dd>

          <dt>Merkle Root:</dt>
          <dd>{block.merkleroot}</dd>

          <dt>Previous Block:</dt>
          <dd>
            <Link to={`/blocks/hash/${block.previousblockhash}`}>{block.previousblockhash}</Link>
          </dd>

          <dt>Invocation Script:</dt>
          <dd>{block.script.invocation}</dd>

          <dt>Verification Script:</dt>
          <dd>{block.script.verification}</dd>

          <dt>Transactions:</dt>
          <dd>
            <ul>
              {this.renderTransactions()}
            </ul>
          </dd>
        </dl>
      </div>
    );
  }

  renderTransactions = () => {
    const { block } = this.props;
    const { tx: transactions } = block;

    return transactions.map((tx) => {
      return (
        <li key={tx.txid}>
          <span>{tx.type}</span>{" "}
          <span>{tx.txid}</span>{" "}
          <span>{block.time}</span>
        </li>
      );
    });
  }
}
