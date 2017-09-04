import { call, put, race } from "redux-saga/effects";

import { ACTION_SUCCESS, ACTION_FAILURE } from "../values/api";

function createSagaActions(meta) {
  function* request(payload, actions) {
    const { fn, args } = payload;

    try {
      const result = yield call(fn, ...args);
      yield put(actions.success(result));
    } catch (err) {
      yield put(actions.failure(err.message));
    }
  }

  function success(result) {
    return {
      type: `${meta.id}/${ACTION_SUCCESS}`,
      meta: { ...meta, type: ACTION_SUCCESS },
      payload: result
    };
  }

  function failure(error) {
    return {
      type: `${meta.id}/${ACTION_FAILURE}`,
      meta: { ...meta, type: ACTION_FAILURE },
      payload: error
    };
  }

  return { request, success, failure };
}

export default function* saga(action) {
  const sagaActions = createSagaActions(action.meta);

  yield race({
    request: call(sagaActions.request, action.payload, sagaActions)
    // retry: call(...todo),
    // cancel: call(...todo),
    // reset: call(...todo)
  });

  return true;
}
