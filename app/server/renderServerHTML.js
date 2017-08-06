import { renderToString } from "react-dom/server";

export default function renderServerHTML(componentHTML) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>NEO Blockchain Explorer</title>
      </head>
      <body>
        <div id="app">${componentHTML}</div>
      </body>
    </html>
  `;
}
