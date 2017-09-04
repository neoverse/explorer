import {
  FETCH_BLOCKS_REQUEST,
  FETCH_BLOCKS_SUCCESS,
  FETCH_BLOCKS_FAILURE
} from "../actions/blocks";
import { INITIAL, LOADING, LOADED, ERROR } from "../values/state";

const initialState = {
  state: INITIAL,
  data: {},
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_BLOCKS_REQUEST:
      return { ...state, state: LOADING };
    case FETCH_BLOCKS_SUCCESS:
      return { ...state, state: LOADED, data: action.payload };
    case FETCH_BLOCKS_FAILURE:
      return { ...state, state: ERROR, error: action.payload };
    default:
      return state;
  }
}
