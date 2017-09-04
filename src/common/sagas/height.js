import { call, put, takeEvery } from "redux-saga/effects";

import client from "../util/client";
import {
  fetchHeightSuccess,
  fetchHeightFailure,
  FETCH_HEIGHT_REQUEST
} from "../actions/height";

export function* fetchHeight() {
  try {
    const height = yield call([client, "getBlockCount"]);
    yield put(fetchHeightSuccess(height));
  } catch (err) {
    yield put(fetchHeightFailure(err.message));
  }
}

export default function* saga() {
  yield takeEvery(FETCH_HEIGHT_REQUEST, fetchHeight);
}
