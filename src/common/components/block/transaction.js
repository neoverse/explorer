import React from "react";
import { Link } from "react-router-dom";

import transactionShape from "../../shapes/transactionShape";

export default class Transaction extends React.Component {
  static displayName = "Transaction";

  static propTypes = {
    transaction: transactionShape.isRequired
  };

  render = () => {
    const { transaction } = this.props;

    return (
      <div className="block-transaction-component">
        <span>{transaction.type}</span>{" "}
        <span><Link to={`/transactions/${transaction.txid}`}>{transaction.txid}</Link></span>{" "}
        <span>{transaction.blocktime}</span>
      </div>
    );
  }
}
