import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
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
        <h1>Transaction {transaction.txid}</h1>

        <Panel>
          <dl>
            <dt>Type:</dt>
            <dd>{transaction.type.replace(/Transaction$/, "")}</dd>
          </dl>

          <dl>
            <dt>Block:</dt>
            <dd><Link to={`/blocks/${transaction.blockhash}`}>{transaction.blockhash}</Link></dd>
          </dl>

          <dl>
            <dt>Time:</dt>
            <dd><TimeAgo date={transaction.blocktime} /></dd>
          </dl>

          <dl>
            <dt>Attributes:</dt>
            <dd>{transaction.attributes}</dd>
          </dl>

          <dl>
            <dt>Nonce:</dt>
            <dd>{transaction.nonce}</dd>
          </dl>

          <dl>
            <dt>Network Fee:</dt>
            <dd>
              {transaction.net_fee}{" "}
              {this.renderAssetName("602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7")}
            </dd>
          </dl>

          <dl>
            <dt>System Fee:</dt>
            <dd>
              {transaction.sys_fee}{" "}
              {this.renderAssetName("602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7")}
            </dd>
          </dl>

          <dl>
            <dt>Size:</dt>
            <dd>{transaction.size.toLocaleString()} bytes</dd>
          </dl>

          <dl>
            <dt>Version:</dt>
            <dd>{transaction.version}</dd>
          </dl>

          <dl>
            <dt>In:</dt>
            <dd><ul>{this.renderVins(transaction.vin)}</ul></dd>
          </dl>

          <dl>
            <dt>Out:</dt>
            <dd><ul>{this.renderVouts(transaction.vout)}</ul></dd>
          </dl>

          <dl>
            <dt>Scripts:</dt>
            <dd><ul>{this.renderScripts(transaction.scripts)}</ul></dd>
          </dl>

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
        <dl>
          <dt>Asset:</dt>
          <dd>{this.renderAssetName(asset.txid)}</dd>
        </dl>
      );
    }
  }

  renderAssetName = (txid) => {
    const asset = _.find(this.props.assets, { txid });
    const name = asset ? getAssetName(asset, "en") : txid;

    return <Link to={`/assets/${txid}`}>{name}</Link>;
  }
}
