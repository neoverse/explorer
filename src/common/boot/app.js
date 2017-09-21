import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import "../styles/app.scss";
import Home from "../containers/home";
import Blocks from "../containers/blocks";
import Block from "../containers/block";
import Transactions from "../containers/transactions";
import Transaction from "../containers/transaction";
import Assets from "../containers/assets";
import Asset from "../containers/asset";
import Addresses from "../containers/addresses";
import Address from "../containers/address";
import Contracts from "../containers/contracts";
import Contract from "../containers/contract";
import NotFound from "../containers/notFound";

export default class App extends React.Component {
  render = () => {
    return (
      <div className="app-component">
        <div className="header">
          <h1>NEO Blockchain Explorer</h1>

          <ul className="nav">
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/blocks">Blocks</NavLink></li>
            <li><NavLink to="/transactions">Transactions</NavLink></li>
            <li><NavLink to="/addresses">Addresses</NavLink></li>
            <li><NavLink to="/assets">Assets</NavLink></li>
            <li><NavLink to="/contracts">Contracts</NavLink></li>
          </ul>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blocks" component={Blocks} />
            <Route exact path="/blocks/:hash" component={Block} />
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/transactions/:txid" component={Transaction} />
            <Route exact path="/addresses" component={Addresses} />
            <Route exact path="/addresses/:address" component={Address} />
            <Route exact path="/assets" component={Assets} />
            <Route exact path="/assets/:txid" component={Asset} />
            <Route exact path="/contracts" component={Contracts} />
            <Route exact path="/contracts/:hash" component={Contract} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}
