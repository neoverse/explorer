import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./layout";
import withStatus from "../hocs/withStatus";
import Blockchains from "../blockchains/components/blockchains";
import Blockchain from "../blockchain/components/blockchain";

const Home = () => {
  return <div>Welcome</div>;
};

const NoMatch = () => {
  return <div>Not found</div>;
};

export default (
  <Layout>
    <Switch>
      <Route exact path="/blockchains" component={Blockchains} />
      <Route exact path="/blockchains/:id" component={Blockchain} />
      <Route exact path="/" component={Home} />
      <Route component={withStatus(404)(NoMatch)} />
    </Switch>
  </Layout>
);
