import _ from "lodash";
import { all, takeEvery } from "redux-saga/effects";

import actionSaga from "./actionSaga";
import { isServer } from "../util/api/server";
import { ACTION_REQUEST } from "../values/api";

function asyncAction(action) {
  const isRequestAction = _.get(action, "meta.type") === ACTION_REQUEST;
  const runOnServer = !!_.get(action, "meta.runOnServer");
  const isClient = !isServer();

  return isRequestAction && (isClient || runOnServer);
}

export default function* root() {
  yield all([
    takeEvery(asyncAction, actionSaga)
  ]);
}
