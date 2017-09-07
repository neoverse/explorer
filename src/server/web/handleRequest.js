import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import "isomorphic-fetch";

import App from "../../common/boot/app";
import client from "../../common/boot/client";
import renderServerHTML from "./renderServerHTML";

export default function handleRequest(req, res) {
  const context = {};

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    const status = context.status || 200;
    const app = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    );

    getDataFromTree(app).then(() => {
      const html = renderToString(app);
      const state = { [client.reduxRootKey || "apollo"]: client.getInitialState() };

      res.status(status).type("html").end(renderServerHTML({ html, state }));
    });
  }
}
