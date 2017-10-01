import React from "react";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import Attribute from "../shared/attribute";
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
        <h2>Contract {contract.hash}</h2>

        <Panel>
          <Attribute label="Name">
            {contract.name}
          </Attribute>

          <Attribute label="Description">
            {contract.description}
          </Attribute>

          <Attribute label="Version">
            {contract.version}
          </Attribute>

          <Attribute label="Author">
            {contract.author} (<a href={`mailto:${contract.email}`}>{contract.email}</a>)
          </Attribute>

          <Attribute label="Registered">
            <TimeAgo date={contract.registered} />
          </Attribute>
        </Panel>
      </div>
    );
  }
}
