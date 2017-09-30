import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
// import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import addressShape from "../../shapes/addressShape";
import assetSummaryShape from "../../shapes/assetSummaryShape";
import getAssetName from "../../helpers/getAssetName";

const { arrayOf } = PropTypes;

export default class Address extends React.Component {
  static displayName = "Address";

  static propTypes = {
    address: addressShape.isRequired,
    assets: arrayOf(assetSummaryShape).isRequired
  };

  render = () => {
    const { address } = this.props;

    return (
      <div className="address-component">
        <h1>Address {address.address}</h1>

        <Panel>
          <Attribute label="Address">
            {address.address}
          </Attribute>

          <Attribute label="Balance">
            {this.renderBalances(address.balance)}
          </Attribute>
        </Panel>
      </div>
    );
  }

  renderBalances = (balances) => {
    return balances.map((balance) => {
      const asset = _.find(this.props.assets, { txid: balance.asset });

      return (
        <div key={balance.asset}>
          {balance.value.toLocaleString()}{" "}
          <Link to={`/assets/${asset.txid}`}>{getAssetName(asset, "en")}</Link>
        </div>
      );
    });
  }
}
