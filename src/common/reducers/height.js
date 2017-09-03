import {
  FETCH_HEIGHT_REQUEST,
  FETCH_HEIGHT_SUCCESS,
  FETCH_HEIGHT_FAILURE
} from "../actions/height";

const STATE_INITIAL = "INITIAL";
const STATE_LOADING = "LOADING";
const STATE_LOADED = "LOADED";
const STATE_ERROR = "ERROR";

const initialState = {
  state: STATE_INITIAL,
  data: 0,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEIGHT_REQUEST:
      return { ...state, state: STATE_LOADING };
    case FETCH_HEIGHT_SUCCESS:
      return { ...state, state: STATE_LOADED, data: action.payload };
    case FETCH_HEIGHT_FAILURE:
      return { ...state, state: STATE_ERROR, error: action.payload };
    default:
      return state;
  }
}
