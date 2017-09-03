import client from "../util/client";

const FETCH_HEIGHT_REQUEST = "BLOCKS/FETCH_HEIGHT_REQUEST";
const FETCH_HEIGHT_SUCCESS = "BLOCKS/FETCH_HEIGHT_SUCCESS";
const FETCH_HEIGHT_FAILURE = "BLOCKS/FETCH_HEIGHT_FAILURE";

const FETCH_BLOCK_REQUEST = "BLOCKS/FETCH_BLOCK_REQUEST";
const FETCH_BLOCK_SUCCESS = "BLOCKS/FETCH_BLOCK_SUCCESS";
const FETCH_BLOCK_FAILURE = "BLOCKS/FETCH_BLOCK_FAILURE";

export function fetchHeight() {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_HEIGHT_REQUEST });

    client.getBlockCount()
      .then((height) => {
        dispatch({ type: FETCH_HEIGHT_SUCCESS, payload: height });
      })
      .catch((err) => {
        dispatch({ type: FETCH_HEIGHT_FAILURE, payload: err });
      });
  };
}

export function fetchBlock(id) {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_BLOCK_REQUEST });

    client.getLastBlockHash()
      .then((response) => {
        console.log("fetchBlock response:", response);
        dispatch({ type: FETCH_BLOCK_SUCCESS, payload: response });
      })
      .catch((err) => {
        console.log("fetchBlock error:", err);
        dispatch({ type: FETCH_BLOCK_FAILURE, payload: err.message });
      });
  };
}
