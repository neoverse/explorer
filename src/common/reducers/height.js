import {
  FETCH_HEIGHT_REQUEST,
  FETCH_HEIGHT_SUCCESS,
  FETCH_HEIGHT_FAILURE
} from "../actions/height";
import { INITIAL, LOADING, LOADED, ERROR } from "../values/state";

const initialState = {
  state: INITIAL,
  data: 0,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEIGHT_REQUEST:
      return { ...state, state: LOADING };
    case FETCH_HEIGHT_SUCCESS:
      return { ...state, state: LOADED, data: action.payload };
    case FETCH_HEIGHT_FAILURE:
      return { ...state, state: ERROR, error: action.payload };
    default:
      return state;
  }
}
