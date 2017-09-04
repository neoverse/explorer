import _ from "lodash";

import { ACTION_REQUEST, ACTION_SUCCESS, ACTION_FAILURE } from "../values/api";
import { INITIAL, LOADING, LOADED, FAILED } from "../values/state";

const initialState = {
  state: INITIAL,
  data: null,
  error: null
};

function reduceRequest(state = initialState, action) {
  const requestType = _.get(action, "meta.type");

  switch (requestType) {
    case ACTION_REQUEST:
      return { ...state, state: LOADING };
    case ACTION_SUCCESS:
      return { ...state, state: LOADED, data: action.payload };
    case ACTION_FAILURE:
      return { ...state, state: FAILED, error: action.payload };
    default:
      return state;
  }
}

export default function apiReducer(state = {}, action) {
  const requestId = _.get(action, "meta.id");
  const requestType = _.get(action, "meta.type");

  if (requestType) {
    return {
      ...state,
      [requestId]: reduceRequest(state[requestId], action)
    };
  } else {
    return state;
  }
}
