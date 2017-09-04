import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "../reducers";
import saga from "../sagas";

export default function configureStore(state = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, state, applyMiddleware(sagaMiddleware));

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      store.replaceReducer(require("../reducers").default);
    });
  }

  sagaMiddleware.run(saga);

  return store;
}
