import createAsyncActions from "../util/api/createAsyncActions";
import client from "../util/client";

export default createAsyncActions("BLOCKS", [client, "getLastBlockHash"]);
