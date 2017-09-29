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
        <h2>Contracts</h2>

        <Panel>
          <table>
            <thead>
              <tr>
                <th>Hash</th>
                <th>Name</th>
                <th>Author</th>
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

  renderContracts = () => {
    return this.props.contracts.map((contract) => {
      return (
        <tr key={contract.hash}>
          <td><Link to={`/contracts/${contract.hash}`}>{contract.hash}</Link></td>
          <td>{contract.name}</td>
          <td>{contract.author}</td>
          <td><TimeAgo date={contract.registered} /></td>
        </tr>
      );
    });
  }
}
