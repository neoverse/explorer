export const FETCH_BLOCKS_REQUEST = "BLOCKS/FETCH_BLOCKS_REQUEST";
export const FETCH_BLOCKS_SUCCESS = "BLOCKS/FETCH_BLOCKS_SUCCESS";
export const FETCH_BLOCKS_FAILURE = "BLOCKS/FETCH_BLOCKS_FAILURE";

export function fetchBlock(id) {
  return { type: FETCH_BLOCKS_REQUEST, payload: id };
}

export function fetchBlockSuccess(block) {
  return { type: FETCH_BLOCKS_SUCCESS, payload: block };
}

export function fetchBlockFailure(message) {
  return { type: FETCH_BLOCKS_FAILURE, payload: message };
}
