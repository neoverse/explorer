import client from "../util/client";

export const FETCH_BLOCK_REQUEST = "BLOCKS/FETCH_BLOCK_REQUEST";
export const FETCH_BLOCK_SUCCESS = "BLOCKS/FETCH_BLOCK_SUCCESS";
export const FETCH_BLOCK_FAILURE = "BLOCKS/FETCH_BLOCK_FAILURE";

export function fetchBlock(id) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_BLOCK_REQUEST });

    client.getLastBlockHash()
      .then((response) => {
        dispatch({ type: FETCH_BLOCK_SUCCESS, payload: response });
      })
      .catch((err) => {
        dispatch({ type: FETCH_BLOCK_FAILURE, payload: err.message });
      });
  };
}
