import createAsyncActions from "../util/api/createAsyncActions";
import client from "../util/client";

export default createAsyncActions("TRANSACTION", [client, "getRawTransaction"], ({ id }) => {
  return [id, true];
});
