import _ from "lodash";
import { all, takeEvery } from "redux-saga/effects";

import actionSaga from "./actionSaga";
import { ACTION_REQUEST } from "../values/api";

function asyncAction(action) {
  return _.get(action, "meta.type") === ACTION_REQUEST;
}

export default function* root() {
  yield all([
    takeEvery(asyncAction, actionSaga)
  ]);
}
