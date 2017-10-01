import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import normalizeHex from "../../helpers/normalizeHex";
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
        <span>{transaction.type.replace(/Transaction$/, "")}</span>{" "}
        <span>
          <Link to={`/transactions/${normalizeHex(transaction.txid)}`}>
            {normalizeHex(transaction.txid)}
          </Link>
        </span>
        {" "}
        <span><TimeAgo date={transaction.blocktime} /></span>
      </div>
    );
  }
}
