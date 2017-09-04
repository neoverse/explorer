import { all } from "redux-saga/effects";

import heightSaga from "./height";
import blocksSaga from "./blocks";

export default function* root() {
  yield all([
    heightSaga(),
    blocksSaga()
  ]);
}
