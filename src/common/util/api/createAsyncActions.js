import _ from "lodash";

import createActionTypes from "./createActionTypes";
import { ACTION_REQUEST, ACTION_RETRY, ACTION_CANCEL, ACTION_RESET } from "../../values/api";

function convertArgs(fnArgs, args) {
  if (_.isFunction(fnArgs)) {
    return fnArgs(args);
  } else {
    return args;
  }
}

export default function createAsyncActions(id, fn, fnArgs = [], { runOnServer = false } = {}) {
  const actionTypes = createActionTypes(id);

  const request = (...args) => ({
    type: actionTypes.REQUEST,
    meta: { type: ACTION_REQUEST, id, runOnServer },
    payload: { fn, args: convertArgs(fnArgs, args) }
  });

  const retry = (...args) => ({
    type: actionTypes.RETRY,
    meta: { type: ACTION_RETRY, id, runOnServer },
    payload: { fn, args: convertArgs(fnArgs, args) }
  });

  const cancel = (...args) => ({
    type: actionTypes.CANCEL,
    meta: { type: ACTION_CANCEL, id, runOnServer }
  });

  const reset = (...args) => ({
    type: actionTypes.RESET,
    meta: { type: ACTION_RESET, id, runOnServer }
  });

  return { id, request, retry, cancel, reset, actionTypes };
}
