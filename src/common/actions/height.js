import client from "../util/client";

export const FETCH_HEIGHT_REQUEST = "BLOCKS/FETCH_HEIGHT_REQUEST";
export const FETCH_HEIGHT_SUCCESS = "BLOCKS/FETCH_HEIGHT_SUCCESS";
export const FETCH_HEIGHT_FAILURE = "BLOCKS/FETCH_HEIGHT_FAILURE";

export function fetchHeight() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_HEIGHT_REQUEST });

    client.getBlockCount()
      .then((height) => {
        dispatch({ type: FETCH_HEIGHT_SUCCESS, payload: height });
      })
      .catch((err) => {
        dispatch({ type: FETCH_HEIGHT_FAILURE, payload: err.message });
      });
  };
}
