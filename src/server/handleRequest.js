import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "../common/boot/app";
import configureStore from '../common/boot/configureStore';
import renderServerHTML from "./renderServerHTML";

export default function handleRequest(req, res) {
  const context = {};
  const state = {};
  const store = configureStore(state);

  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    const status = context.status || 200;
    res.status(status).type("html").end(renderServerHTML({ html, state }));
  }
}
