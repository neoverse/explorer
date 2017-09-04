import { call, put, takeEvery } from "redux-saga/effects";

import client from "../util/client";
import {
  fetchBlocksSuccess,
  fetchBlocksFailure,
  FETCH_BLOCKS_REQUEST
} from "../actions/blocks";

export function* fetchBlocks() {
  try {
    const blocks = yield call([client, "getLastBlockHash"]);
    yield put(fetchBlocksSuccess(blocks));
  } catch (err) {
    yield put(fetchBlocksFailure(err.message));
  }
}

export default function* saga() {
  yield takeEvery(FETCH_BLOCKS_REQUEST, fetchBlocks);
}
