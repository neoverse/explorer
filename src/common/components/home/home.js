import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import { Row, Column } from "../shared/grid";
import Panel from "../shared/panel";
import TransactionHistoryChart from "../charts/transactionHistoryChart";
import RecentBlocks from "./recentBlocks";
import RecentTransactions from "./recentTransactions";
import blockSummaryShape from "../../shapes/blockSummaryShape";
import transactionSummaryShape from "../../shapes/transactionSummaryShape";

const { number, string, arrayOf, shape } = PropTypes;

const transactionHistoryShape = shape({
  date: string.isRequired,
  count: number.isRequired
});

export default class Home extends React.Component {
  static displayName = "Home";

  static propTypes = {
    transactionHistory: arrayOf(transactionHistoryShape).isRequired,
    blocks: arrayOf(blockSummaryShape).isRequired,
    transactions: arrayOf(transactionSummaryShape).isRequired
  };

  render = () => {
    return (
      <div className="home-component">
        <Panel renderHeader={this.renderHeader}>
          <TransactionHistoryChart data={this.props.transactionHistory} />
        </Panel>

        <Row>
          <Column s={12} xl={6}>
            <RecentBlocks blocks={_.take(this.props.blocks, 5)} />
          </Column>

          <Column s={12} xl={6}>
            <RecentTransactions transactions={_.take(this.props.transactions, 5)} />
          </Column>
        </Row>
      </div>
    );
  }

  renderHeader = () => {
    return <h2>14-Day Transaction History</h2>;
  }
}
