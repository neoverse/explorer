import React from "react";
import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

import Panel from "../shared/panel";
import transactionSummaryShape from "../../shapes/transactionSummaryShape";

const { arrayOf } = PropTypes;

export default class RecentTransactions extends React.Component {
  static displayName = "RecentTransactions";

  static propTypes = {
    transactions: arrayOf(transactionSummaryShape).isRequired
  };

  render = () => {
    return (
      <Panel className="recent-transactions-component" renderHeader={this.renderHeader}>
        <ul className="recent-transactions">
          {this.props.transactions.map(this.renderTransaction)}
        </ul>
      </Panel>
    );
  }

  renderHeader = () => {
    // TODO: Remove this inline style.  Perhaps introduce `renderHeaderLink` prop on Panel?
    return (
      <div>
        <span style={{ float: "right" }}><Link to="/transactions">View all transactions &raquo;</Link></span>
        <h2>Recent Transactions</h2>
      </div>
    );
  }

  renderTransaction = (transaction) => {
    return (
      <li className="recent-transaction" key={transaction.txid}>
        <div className="row">
          <Link to={`/transactions/${transaction.txid}`}>{transaction.txid}</Link>
          <TimeAgo date={transaction.blocktime} />
        </div>

        <div className="row">
          <span>{transaction.type.replace(/Transaction$/, "")}</span>
        </div>
      </li>
    );
  }
}
