import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "../common/boot/app";
import configureStore from "../common/boot/configureStore";

const store = configureStore(window.__PRELOADED_STATE__);

delete window.__PRELOADED_STATE__;

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
