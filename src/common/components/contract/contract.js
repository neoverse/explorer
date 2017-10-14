import React from "react";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import contractShape from "../../shapes/contractShape";

export default class Contract extends React.Component {
  static displayName = "Contract";

  static propTypes = {
    contract: contractShape.isRequired
  };

  render = () => {
    return (
      <div className="asset-component">
        {this.renderContract()}
        {this.renderTransaction()}
      </div>
    );
  }

  renderContract = () => {
    const { contract } = this.props;

    return (
      <Panel renderHeader={this.renderContractHeader}>
        <Attribute label="Name">
          {contract.name}
        </Attribute>

        <Attribute label="Description">
          {contract.description}
        </Attribute>

        <Attribute label="Version">
          {contract.version}
        </Attribute>

        <Attribute label="Author">
          {contract.author} (<a href={`mailto:${contract.email}`}>{contract.email}</a>)
        </Attribute>

        <Attribute label="Registered">
          <TimeAgo date={contract.registered} />
        </Attribute>
      </Panel>
    );
  }

  renderContractHeader = () => {
    return (
      <h2>Contract {this.props.contract.hash}</h2>
    );
  }

  renderTransaction = () => {
    const { transaction } = this.props.contract;

    return (
      <Panel renderHeader={this.renderTransactionHeader}>
        <Attribute label="Type">
          {transaction.type.replace(/Transaction$/, "")}
        </Attribute>

        <Attribute label="ID">
          <Link to={`/transactions/${transaction.txid}`}>{transaction.txid}</Link>
        </Attribute>

        <Attribute label="Time">
          <TimeAgo date={transaction.blocktime} />
        </Attribute>
      </Panel>
    );
  }

  renderTransactionHeader = () => {
    return (
      <span>Transaction</span>
    );
  }
}
