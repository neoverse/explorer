import _ from "lodash";
import { call, put, race, take } from "redux-saga/effects";

import { actionMatcher } from "../util/api/matchers";
import {
  ACTION_SUCCESS,
  ACTION_FAILURE,
  ACTION_RETRY,
  ACTION_RESET,
  ACTION_CANCEL
} from "../values/api";

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

function retryAction(id) {
  return (action) => {
    return actionMatcher(ACTION_RETRY, id)(action);
  };
}

export default function* saga(action) {
  const id = _.get(action, "meta.id");
  const sagaActions = createSagaActions(action.meta);

  yield race({
    request: call(sagaActions.request, action.payload, sagaActions),
    retry: take(retryAction(id)),
    cancel: take(actionMatcher(ACTION_CANCEL, id)),
    reset: take(actionMatcher(ACTION_RESET, id))
  });

  return true;
}
