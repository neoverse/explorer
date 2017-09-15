import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import DocumentTitle from "react-document-title";
import "isomorphic-fetch";

import App from "../../common/boot/app";
import defaultTitle from "../../common/values/defaultTitle";
import renderServerHTML from "./renderServerHTML";
import client from "./client";

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
      const title = DocumentTitle.rewind() || defaultTitle;

      res.status(status).type("html").end(renderServerHTML({ html, state, title }));
    });
  }
}
