import React from "react";
import PropTypes from "prop-types";

import Panel from "./shared/panel";
import TransactionHistoryChart from "./charts/transactionHistoryChart";

const { number, string, arrayOf, shape } = PropTypes;

const transactionHistoryShape = shape({
  date: string.isRequired,
  count: number.isRequired
});

export default class Home extends React.Component {
  static displayName = "Home";

  static propTypes = {
    transactionHistory: arrayOf(transactionHistoryShape).isRequired
  };

  render = () => {
    return (
      <div className="home-component">
        <Panel renderHeader={this.renderHeader}>
          <TransactionHistoryChart data={this.props.transactionHistory} />
        </Panel>
      </div>
    );
  }

  renderHeader = () => {
    return <h2>14-Day Transaction History</h2>;
  }
}
