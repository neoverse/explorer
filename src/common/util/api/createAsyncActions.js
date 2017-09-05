import _ from "lodash";

import createActionTypes from "./createActionTypes";
import { ACTION_REQUEST, ACTION_RETRY, ACTION_CANCEL, ACTION_RESET } from "../../values/api";

function convertArgs(args, props) {
  if (_.isFunction(args)) {
    return args(props);
  } else {
    return args;
  }
}

export default function createAsyncActions(id, fn, fnArgs = [], { runOnServer = false } = {}) {
  const actionTypes = createActionTypes(id);

  const request = (props) => ({
    type: actionTypes.REQUEST,
    meta: { type: ACTION_REQUEST, id, runOnServer },
    payload: { fn, args: convertArgs(fnArgs, props) }
  });

  const retry = (props) => ({
    type: actionTypes.RETRY,
    meta: { type: ACTION_RETRY, id, runOnServer },
    payload: { fn, args: convertArgs(fnArgs, props) }
  });

  const cancel = () => ({
    type: actionTypes.CANCEL,
    meta: { type: ACTION_CANCEL, id, runOnServer }
  });

  const reset = () => ({
    type: actionTypes.RESET,
    meta: { type: ACTION_RESET, id, runOnServer }
  });

  return { id, request, retry, cancel, reset, actionTypes };
}
