import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import App from "../common/containers/app";
import createClient from "./createClient";

const client = createClient();

ReactDOM.render((
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
), document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
