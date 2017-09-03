import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "../reducers";

export default function configureStore(state) {
  const store = createStore(reducer, state, applyMiddleware(thunk));

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      store.replaceReducer(require("../reducers").default);
    });
  }

  return store;
};
