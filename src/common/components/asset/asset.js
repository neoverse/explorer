import React from "react";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
import getAssetName from "../../helpers/getAssetName";
import assetShape from "../../shapes/assetShape";

export default class Asset extends React.Component {
  static displayName = "Asset";

  static propTypes = {
    asset: assetShape.isRequired
  };

  render = () => {
    const { asset } = this.props;

    return (
      <div className="asset-component">
        <h2>Asset {asset.txid}</h2>

        <Panel>
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
      </div>
    );
  }
}
