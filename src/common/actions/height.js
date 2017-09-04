export const FETCH_HEIGHT_REQUEST = "BLOCKS/FETCH_HEIGHT_REQUEST";
export const FETCH_HEIGHT_SUCCESS = "BLOCKS/FETCH_HEIGHT_SUCCESS";
export const FETCH_HEIGHT_FAILURE = "BLOCKS/FETCH_HEIGHT_FAILURE";

export function fetchHeight() {
  return { type: FETCH_HEIGHT_REQUEST };
}

export function fetchHeightSuccess(height) {
  return { type: FETCH_HEIGHT_SUCCESS, payload: height };
}

export function fetchHeightFailure(message) {
  return { type: FETCH_HEIGHT_FAILURE, payload: message };
}
