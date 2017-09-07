import _ from "lodash";

import {
  ACTION_REQUEST,
  ACTION_SUCCESS,
  ACTION_FAILURE,
  ACTION_RESET,
  ACTION_CANCEL
} from "../values/api";
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
      return { ...state, state: LOADING, rollbackState: state.state };
    case ACTION_SUCCESS:
      return { ...state, state: LOADED, rollbackState: LOADED, data: action.payload };
    case ACTION_FAILURE:
      return { ...state, state: FAILED, rollbackState: FAILED, error: action.payload };
    case ACTION_RESET:
      return { ...state, ...initialState };
    case ACTION_CANCEL:
      return { ...state, state: state.previousState };
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
