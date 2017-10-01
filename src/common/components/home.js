import React from "react";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  static displayName = "Home";

  render = () => {
    return (
      <div className="home-component">
        <h2>Welcome</h2>
        <p>
          Coming soon: interesting charts about blocks, transactions, addresses, etc.
        </p>
        <p>
          For now, explore the latest <Link to="/blocks">blocks</Link> and{" "}
          <Link to="/transactions">transactions</Link>.
        </p>
      </div>
    );
  }
}
