import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import Panel from "../shared/panel";
import contractShape from "../../shapes/contractShape";

const { arrayOf } = PropTypes;

export default class Contracts extends React.Component {
  static displayName = "Contracts";

  static propTypes = {
    contracts: arrayOf(contractShape).isRequired
  };

  render = () => {
    return (
      <div className="contracts-component">
        <Panel renderHeader={this.renderHeader}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th className="negligible">Name</th>
                <th className="negligible">Author</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {this.renderContracts()}
            </tbody>
          </table>
        </Panel>
      </div>
    );
  }

  renderHeader = () => {
    return (
      <h2>Contracts</h2>
    );
  }

  renderContracts = () => {
    return this.props.contracts.map((contract) => {
      return (
        <tr key={contract.txid}>
          <td><Link to={`/contracts/${contract.txid}`}>{contract.txid}</Link></td>
          <td className="negligible">{contract.name}</td>
          <td className="negligible">{contract.author}</td>
          <td><TimeAgo date={contract.registered} /></td>
        </tr>
      );
    });
  }
}
