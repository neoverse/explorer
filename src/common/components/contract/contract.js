import React from "react";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import contractShape from "../../shapes/contractShape";

export default class Contract extends React.Component {
  static displayName = "Contract";

  static propTypes = {
    contract: contractShape.isRequired
  };

  render = () => {
    const { contract } = this.props;

    return (
      <div className="asset-component">
        <h1>Contract {contract.hash}</h1>

        <Panel>
          <dl>
            <dt>Name:</dt>
            <dd>{contract.name}</dd>

            <dt>Description:</dt>
            <dd>{contract.description}</dd>

            <dt>Version:</dt>
            <dd>{contract.version}</dd>

            <dt>Author:</dt>
            <dd>{contract.author}</dd>

            <dt>Registered:</dt>
            <dd><TimeAgo date={contract.registered} /></dd>
          </dl>
        </Panel>
      </div>
    );
  }
}
