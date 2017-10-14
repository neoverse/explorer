import React from "react";
import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

import Panel from "../shared/panel";
import addressShape from "../../shapes/addressShape";
import assetSummaryShape from "../../shapes/assetSummaryShape";
import findAsset from "../../helpers/findAsset";
import getAssetName from "../../helpers/getAssetName";
import normalizeHex from "../../helpers/normalizeHex";
import normalizeDecimal from "../../helpers/normalizeDecimal";

const { arrayOf } = PropTypes;

export default class Addresses extends React.Component {
  static displayName = "Addresses";

  static propTypes = {
    addresses: arrayOf(addressShape).isRequired,
    assets: arrayOf(assetSummaryShape).isRequired
  };

  render = () => {
    return (
      <div className="addresses-component">
        <Panel renderHeader={this.renderHeader}>
          <table>
            <thead>
              <tr>
                <th>Address</th>
                <th className="narrow">Balance</th>
                <th className="narrow negligible">Registered</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAddresses()}
            </tbody>
          </table>
        </Panel>
      </div>
    );
  }

  renderHeader = () => {
    return (
      <h2>Addresses</h2>
    );
  }

  renderAddresses = () => {
    return this.props.addresses.map((address) => {
      return (
        <tr key={address.address}>
          <td><Link to={`/addresses/${address.address}`}>{address.address}</Link></td>
          <td>{this.renderBalances(address.balance)}</td>
          <td className="negligible"><TimeAgo date={address.registered} /></td>
        </tr>
      );
    });
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
}
