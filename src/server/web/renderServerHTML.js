import serialize from "serialize-javascript";

import defaultTitle from "../../common/values/defaultTitle";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

function getAssetsCSS() {
  if (assets.client.css) {
    return `<link rel="stylesheet" href="${assets.client.css}" />`;
  } else {
    return "";
  }
}

function getAssetsJS() {
  return `<script src="${assets.client.js}" defer></script>`;
}

export default function renderServerHTML({ html = "", state = {}, title = defaultTitle } = {}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-tap-highlight" content="no" />
        <title>${title === defaultTitle ? title : `${title} | ${defaultTitle}`}</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-107269744-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
        </script>
        ${getAssetsCSS()}
        ${getAssetsJS()}
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="text/javascript">
          window.__PRELOADED_STATE__ = ${serialize(state, { isJSON: true })};
        </script>
      </body>
    </html>
  `;
}
