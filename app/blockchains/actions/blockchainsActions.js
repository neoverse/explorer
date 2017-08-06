import axios from "axios";

export const LIST = "BLOCKCHAINS/LIST";

export function fetchList() {
  const request = axios.get("http://antchain.org/api/v1/block/get_current_height");
  return {
    type: FETCH_FLIGHT,
    payload: request
  };
}
