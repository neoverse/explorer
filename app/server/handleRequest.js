import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import routes from "../boot/routes";
import renderServerHTML from "./renderServerHTML";

export default function handleRequest(req, res) {
  const context = {};

  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      {routes}
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(302, context.url);
  } else {
    const status = context.status || 200;
    res.status(status).type("html").end(renderServerHTML(html));
  }
}
