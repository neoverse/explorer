import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";

import Home from "../containers/home";
import Blocks from "../containers/blocks";
import Block from "../containers/block";
import withStatus from "../hocs/withStatus";

const NoMatch = () => {
  return <div>Not found</div>;
};

export default class App extends Component {
  render = () => {
    return (
      <div className="body">
        <h1>NEO Blockchain Explorer</h1>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blocks">Blocks</Link></li>
        </ul>

        <div className="content">
          <Switch>
            <Route exact path="/blocks" component={Blocks} />
            <Route exact path="/blocks/:id" component={Block} />
            <Route exact path="/" component={Home} />
            <Route component={withStatus(404)(NoMatch)} />
          </Switch>
        </div>
      </div>
    );
  }
}
