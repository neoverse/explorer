import { FETCH_BLOCK_REQUEST, FETCH_BLOCK_SUCCESS, FETCH_BLOCK_FAILURE } from "../actions/blocks";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BLOCK_REQUEST:  // TODO
    case FETCH_BLOCK_SUCCESS:  // TODO
    case FETCH_BLOCK_FAILURE:  // TODO
      return { ...state };
    default:
      return state;
  }
}
