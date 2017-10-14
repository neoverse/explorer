import React from "react";
import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import addressShape from "../../shapes/addressShape";
import assetSummaryShape from "../../shapes/assetSummaryShape";
import findAsset from "../../helpers/findAsset";
import getAssetName from "../../helpers/getAssetName";
import normalizeHex from "../../helpers/normalizeHex";
import normalizeDecimal from "../../helpers/normalizeDecimal";

const { arrayOf } = PropTypes;

export default class Address extends React.Component {
  static displayName = "Address";

  static propTypes = {
    address: addressShape.isRequired,
    assets: arrayOf(assetSummaryShape).isRequired
  };

  render = () => {
    return (
      <div className="address-component">
        {this.renderAddress()}
        {this.renderTransactions()}
      </div>
    );
  }

  renderAddress = () => {
    const { address } = this.props;

    return (
      <Panel renderHeader={this.renderAddressHeader}>
        <Attribute label="Address">
          {address.address}
        </Attribute>

        <Attribute label="Balance">
          {this.renderBalances(address.balance)}
        </Attribute>

        <Attribute label="Registered">
          <TimeAgo date={address.registered} />
        </Attribute>
      </Panel>
    );
  }

  renderAddressHeader = () => {
    return (
      <h2>Address {this.props.address.address}</h2>
    );
  }

  renderBalances = (balances) => {
    return balances.map((balance) => {
      const asset = findAsset(this.props.assets, balance.asset);

      return (
        <div key={balance.asset}>
          {normalizeDecimal(balance.value, asset.precision)}{" "}
          <Link to={`/assets/${normalizeHex(asset.txid)}`}>{getAssetName(asset, "en")}</Link>
        </div>
      );
    });
  }

  renderTransactions = () => {
    return (
      <Panel renderHeader={this.renderTransactionsHeader}>
        <table>
          <thead>
            <tr>
              <th className="narrow negligible">Type</th>
              <th>ID</th>
              <th className="narrow">Time</th>
            </tr>
          </thead>
          <tbody>
            {this.props.address.transactions.map(this.renderTransaction)}
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
