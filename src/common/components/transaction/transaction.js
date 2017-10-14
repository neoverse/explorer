import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import findAsset from "../../helpers/findAsset";
import getAssetName from "../../helpers/getAssetName";
import normalizeHex from "../../helpers/normalizeHex";
import transactionShape from "../../shapes/transactionShape";
import assetSummaryShape from "../../shapes/assetSummaryShape";
import { GAS_ID } from "../../values/assets";

const { arrayOf } = PropTypes;

export default class Transaction extends React.Component {
  static displayName = "Transaction";

  static propTypes = {
    transaction: transactionShape.isRequired,
    assets: arrayOf(assetSummaryShape).isRequired
  };

  render = () => {
    return (
      <div className="block-component">
        {this.renderTransaction()}
        {this.renderAsset()}
        {this.renderContract()}
      </div>
    );
  }

  renderTransaction = () => {
    const { transaction } = this.props;

    return (
      <Panel renderHeader={this.renderTransactionHeader}>
        <Attribute label="ID">
          {normalizeHex(transaction.txid)}
        </Attribute>

        <Attribute label="Type">
          {transaction.type.replace(/Transaction$/, "")}
        </Attribute>

        <Attribute label="Block">
          <Link to={`/blocks/${transaction.blockhash}`}>{transaction.blockhash}</Link>
        </Attribute>

        <Attribute label="Time">
          <TimeAgo date={transaction.blocktime} />
        </Attribute>

        <Attribute label="Nonce">
          {transaction.nonce || "N/A"}
        </Attribute>

        <Attribute label="Network Fee">
          {transaction.net_fee} {this.renderAssetName(GAS_ID)}
        </Attribute>

        <Attribute label="System Fee">
          {transaction.sys_fee} {this.renderAssetName(GAS_ID)}
        </Attribute>

        <Attribute label="Size">
          {transaction.size.toLocaleString()} bytes
        </Attribute>

        <Attribute label="Version">
          {transaction.version}
        </Attribute>

        <Attribute label="In">
          <ul>{this.renderVins(transaction.vin)}</ul>
        </Attribute>

        <Attribute label="Out">
          <ul>{this.renderVouts(transaction.vout)}</ul>
        </Attribute>

        <Attribute label="Scripts">
          <ul>{this.renderScripts(transaction.scripts)}</ul>
        </Attribute>
      </Panel>
    );
  }

  renderTransactionHeader = () => {
    return (
      <h2>Transaction {normalizeHex(this.props.transaction.txid)}</h2>
    );
  }

  renderVins = (vins) => {
    return vins.map((vin, i) => {
      return (
        <li key={i}>
          -{vin.value}
          {" "}
          {this.renderAssetName(vin.asset)}
          {" <= "}
          <Link to={`/addresses/${vin.address}`}>{vin.address}</Link>
        </li>
      );
    });
  }

  renderVouts = (vouts) => {
    return vouts.map((vout, i) => (
      <li key={i}>
        {vout.value}
        {" "}
        {this.renderAssetName(vout.asset)}
        {" => "}
        <Link to={`/addresses/${vout.address}`}>{vout.address}</Link>
      </li>
    ));
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

  renderAsset = () => {
    const { asset } = this.props.transaction;

    if (asset) {
      return (
        <Panel renderHeader={this.renderAssetHeader}>
          <Attribute label="Asset">
            {this.renderAssetName(asset.txid)}
          </Attribute>
        </Panel>
      );
    }
  }

  renderAssetHeader = () => {
    return (
      <span>Asset {this.props.transaction.asset.txid}</span>
    );
  }

  renderContract = () => {
    const { contract } = this.props.transaction;

    if (contract) {
      return (
        <Panel renderHeader={this.renderContractHeader}>
          <Attribute label="Hash">
            <Link to={`/contracts/${contract.hash}`}>{contract.hash}</Link>
          </Attribute>

          <Attribute label="Name">
            {contract.name}
          </Attribute>

          <Attribute label="Registered">
            <TimeAgo date={contract.registered} />
          </Attribute>
        </Panel>
      );
    }
  }

  renderContractHeader = () => {
    return (
      <span>Contract {this.props.transaction.contract.hash}</span>
    );
  }

  renderAssetName = (txid) => {
    const asset = findAsset(this.props.assets, txid);
    const name = asset ? getAssetName(asset, "en") : txid;

    return <Link to={`/assets/${txid}`}>{name}</Link>;
  }
}
