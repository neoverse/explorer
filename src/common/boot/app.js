import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import "../styles/app.scss";
import Home from "../containers/home";
import Blocks from "../containers/blocks";
import BlockByHash from "../containers/blockByHash";
import BlockByIndex from "../containers/blockByIndex";
import Transaction from "../containers/transaction";
import withStatus from "../hocs/withStatus";

const NoMatch = () => {
  return <div>Not found</div>;
};

export default class App extends React.Component {
  render = () => {
    return (
      <div className="app-component">
        <div className="header">
          <h1>NEO Blockchain Explorer</h1>

          <ul className="nav">
            <li><NavLink to="/" exact>Home</NavLink></li>
            <li><NavLink to="/blocks">Blocks</NavLink></li>
          </ul>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blocks" component={Blocks} />
            <Route exact path="/blocks/hash/:hash" component={BlockByHash} />
            <Route exact path="/blocks/height/:index" component={BlockByIndex} />
            <Route exact path="/transactions/:id" component={Transaction} />
            <Route component={withStatus(404)(NoMatch)} />
          </Switch>
        </div>
      </div>
    );
  }
}
