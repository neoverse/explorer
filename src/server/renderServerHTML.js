const isProduction = process.env.NODE_ENV === "production";
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

function getAssetsCSS() {
  if (assets.client.css) {
    return `<link rel="stylesheet" href="${assets.client.css}">`;
  } else {
    return "";
  }
}

function getAssetsJS() {
  return `<script src="${assets.client.js}" defer${isProduction ? " defer" : ""}></script>`;
}

function serialize(obj) {
  return JSON.stringify(obj);
}

export default function renderServerHTML({ html = "", state = {} } = {}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>NEO Blockchain Explorer</title>
        ${getAssetsCSS()}
        ${getAssetsJS()}
      </head>
      <body>
        <div id="app">${html}</div>
        <script type="text/javascript">
          window.__PRELOADED_STATE__ = ${serialize(state)};
        </script>
      </body>
    </html>
  `;
}
