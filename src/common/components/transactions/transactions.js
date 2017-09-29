import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import transactionSummaryShape from "../../shapes/transactionSummaryShape";

const { arrayOf } = PropTypes;

export default class Transactions extends React.Component {
  static displayName = "Transactions";

  static propTypes = {
    transactions: arrayOf(transactionSummaryShape).isRequired
  };

  render = () => {
    return (
      <div className="transactions-component">
        <h2>Transactions</h2>

        <Panel>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>ID</th>
                <th>Size</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTransactions()}
            </tbody>
          </table>
        </Panel>
      </div>
    );
  }

  renderTransactions = () => {
    return this.props.transactions.map((transaction) => {
      return (
        <tr key={transaction.txid}>
          <td>{transaction.type.replace(/Transaction$/, "")}</td>
          <td><Link to={`/transactions/${transaction.txid}`}>{transaction.txid}</Link></td>
          <td>{transaction.size.toLocaleString()} bytes</td>
          <td><TimeAgo date={transaction.blocktime} /></td>
        </tr>
      );
    });
  }
}
