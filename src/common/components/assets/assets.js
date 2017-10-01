import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import assetShape from "../../shapes/assetShape";
import getAssetName from "../../helpers/getAssetName";

const { arrayOf } = PropTypes;

export default class Assets extends React.Component {
  static displayName = "Assets";

  static propTypes = {
    assets: arrayOf(assetShape).isRequired
  };

  render = () => {
    return (
      <div className="assets-component">
        <h2>Assets</h2>

        <Panel>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th className="negligible">Type</th>
                <th className="negligible">Amount</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {this.renderAssets()}
            </tbody>
          </table>
        </Panel>
      </div>
    );
  }

  renderAssets = () => {
    return this.props.assets.map((asset) => {
      return (
        <tr key={asset.txid}>
          <td><Link to={`/assets/${asset.txid}`}>{getAssetName(asset, "en")}</Link></td>
          <td className="negligible">{asset.type}</td>
          <td className="negligible">{asset.amount.toLocaleString()}</td>
          <td><TimeAgo date={asset.registered} /></td>
        </tr>
      );
    });
  }
}
