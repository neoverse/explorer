import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Layout extends Component {
  render = () => {
    return (
      <div className="body">
        <h1>NEO Blockchain Explorer</h1>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blockchains">Blockchains</Link></li>
        </ul>

        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
