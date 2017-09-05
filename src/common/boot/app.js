import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import "../styles/app.scss";
import Home from "../containers/home";
import Blocks from "../containers/blocks";
import Block from "../containers/block";
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
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink exact to="/blocks">Blocks</NavLink></li>
          </ul>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/blocks" component={Blocks} />
            <Route exact path="/blocks/:hash" component={Block} />
            <Route component={withStatus(404)(NoMatch)} />
          </Switch>
        </div>
      </div>
    );
  }
}
