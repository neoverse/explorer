import _ from "lodash";
import { all, takeEvery } from "redux-saga/effects";

import actionSaga from "./actionSaga";
import { actionTypeMatcher } from "../util/api/matchers";
import { isServer } from "../util/api/server";
import { ACTION_REQUEST } from "../values/api";

function asyncAction(action) {
  const isRequestAction = actionTypeMatcher(ACTION_REQUEST)(action);
  const runOnServer = !!_.get(action, "meta.runOnServer");
  const isClient = !isServer();

  return isRequestAction && (isClient || runOnServer);
}

export default function* root() {
  yield all([
    takeEvery(asyncAction, actionSaga)
  ]);
}
