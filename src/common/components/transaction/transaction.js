import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import transactionShape from "../../shapes/transactionShape";

export default class Transaction extends React.Component {
  static displayName = "Transaction";

  static propTypes = {
    transaction: transactionShape.isRequired
  };

  render = () => {
    const { transaction } = this.props;

    return (
      <div className="block-component">
        <h1>Transaction {transaction.txid}</h1>

        <dl>
          <dt>Type:</dt>
          <dd>{transaction.type}</dd>
        </dl>

        <dl>
          <dt>Block:</dt>
          <dd><Link to={`/blocks/${transaction.blockhash}`}>{transaction.blockhash}</Link></dd>
        </dl>

        <dl>
          <dt>Time:</dt>
          <dd><TimeAgo date={transaction.blocktime} /></dd>
        </dl>

        <dl>
          <dt>Attributes:</dt>
          <dd>{transaction.attributes}</dd>
        </dl>

        <dl>
          <dt>Nonce:</dt>
          <dd>{transaction.nonce}</dd>
        </dl>

        <dl>
          <dt>Network Fee:</dt>
          <dd>{transaction.net_fee} GAS</dd>
        </dl>

        <dl>
          <dt>System Fee:</dt>
          <dd>{transaction.sys_fee} GAS</dd>
        </dl>

        <dl>
          <dt>Size:</dt>
          <dd>{transaction.size.toLocaleString()} bytes</dd>
        </dl>

        <dl>
          <dt>Version:</dt>
          <dd>{transaction.version}</dd>
        </dl>

        <dl>
          <dt>In:</dt>
          <dd><ul>{this.renderVins(transaction.vin)}</ul></dd>
        </dl>

        <dl>
          <dt>Out:</dt>
          <dd><ul>{this.renderVouts(transaction.vout)}</ul></dd>
        </dl>

        <dl>
          <dt>Scripts:</dt>
          <dd><ul>{this.renderScripts(transaction.scripts)}</ul></dd>
        </dl>
      </div>
    );
  }

  renderVins = (vins) => {
    return vins.map((vin, i) => {
      return <li key={i}>{vin.txid}</li>;
    });
  }

  renderVouts = (vouts) => {
    return vouts.map((vout, i) => {
      return <li key={i}>{vout.value} {vout.asset} => {vout.address}</li>;
    });
  }

  renderScripts = (scripts) => {
    return scripts.map((script, i) => {
      return (
        <li key={i}>
          <div>Invocation: {script.invocation}</div>
          <div>Verification: {script.verification}</div>
        </li>
      );
    });
  }
}
