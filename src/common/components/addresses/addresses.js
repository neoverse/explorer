import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import addressShape from "../../shapes/addressShape";
import assetSummaryShape from "../../shapes/assetSummaryShape";
import findAsset from "../../helpers/findAsset";
import getAssetName from "../../helpers/getAssetName";
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
        <h2>Addresses</h2>

        <Panel>
          <table>
            <thead>
              <tr>
                <th>Address</th>
                {/* <th>Created</th> */}
                {/* <th>Last Transaction</th> */}
                <th className="narrow">Balance</th>
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

  renderAddresses = () => {
    return this.props.addresses.map((address) => {
      return (
        <tr key={address.address}>
          <td><Link to={`/addresses/${address.address}`}>{address.address}</Link></td>
          {/* <td><TimeAgo date={address.created} /></td> */}
          {/* <td>{address.lastTransactionTimestamp}</td> */}
          <td>{this.renderBalances(address.balance)}</td>
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
          <Link to={`/assets/${asset.txid}`}>{getAssetName(asset, "en")}</Link>
        </div>
      );
    });
  }
}
