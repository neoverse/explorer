import React from "react";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import getAssetName from "../../helpers/getAssetName";
import normalizeHex from "../../helpers/normalizeHex";
import assetShape from "../../shapes/assetShape";

export default class Asset extends React.Component {
  static displayName = "Asset";

  static propTypes = {
    asset: assetShape.isRequired
  };

  render = () => {
    return (
      <div className="asset-component">
        {this.renderAsset()}
        {this.renderTransaction()}
      </div>
    );
  }

  renderAsset = () => {
    const { asset } = this.props;

    return (
      <Panel renderHeader={this.renderAssetHeader}>
        <Attribute label="Name">
          {getAssetName(asset, "en")}
        </Attribute>

        <Attribute label="Type">
          {asset.type}
        </Attribute>

        <Attribute label="Precision">
          {asset.precision}
        </Attribute>

        <Attribute label="Issued">
          {asset.issued.toLocaleString()}
        </Attribute>

        <Attribute label="Amount">
          {asset.amount.toLocaleString()}
        </Attribute>

        <Attribute label="Admin">
          <Link to={`/addresses/${asset.admin}`}>{asset.admin}</Link>
        </Attribute>

        <Attribute label="Owner">
          {asset.owner}
        </Attribute>

        <Attribute label="Registered">
          <TimeAgo date={asset.registered} />
        </Attribute>
      </Panel>
    );
  }

  renderAssetHeader = () => {
    return (
      <h2>Asset {normalizeHex(this.props.asset.txid)}</h2>
    );
  }

  renderTransaction = () => {
    const { transaction } = this.props.asset;

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
