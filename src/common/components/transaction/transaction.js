import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import findAsset from "../../helpers/findAsset";
import getAssetName from "../../helpers/getAssetName";
import transactionShape from "../../shapes/transactionShape";
import assetSummaryShape from "../../shapes/assetSummaryShape";

const { arrayOf } = PropTypes;

export default class Transaction extends React.Component {
  static displayName = "Transaction";

  static propTypes = {
    transaction: transactionShape.isRequired,
    assets: arrayOf(assetSummaryShape).isRequired
  };

  render = () => {
    const { transaction } = this.props;

    return (
      <div className="block-component">
        <h2>Transaction {transaction.txid}</h2>

        <Panel>
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
            {transaction.net_fee}{" "}
            {this.renderAssetName("602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7")}
          </Attribute>

          <Attribute label="System Fee">
            {transaction.sys_fee}{" "}
            {this.renderAssetName("602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7")}
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

          {this.renderAsset(transaction.asset)}
        </Panel>
      </div>
    );
  }

  renderVins = (vins) => {
    return vins.map((vin, i) => {
      return <li key={i}>{vin.txid}</li>;
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

  renderAsset = (asset) => {
    if (asset) {
      return (
        <Attribute label="Asset">
          {this.renderAssetName(asset.txid)}
        </Attribute>
      );
    }
  }

  renderAssetName = (txid) => {
    const asset = findAsset(this.props.assets, txid);
    const name = asset ? getAssetName(asset, "en") : txid;

    return <Link to={`/assets/${txid}`}>{name}</Link>;
  }
}
