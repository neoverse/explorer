import { GraphQLObjectType } from "graphql";

import asset from "./models/asset/assetQuery";
import address from "./models/address/addressQuery";
import block from "./models/block/blockQuery";
import chart from "./models/chart/chartQuery";
import contract from "./models/contract/contractQuery";
import transaction from "./models/transaction/transactionQuery";
import search from "./models/search/searchQuery";

export default new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...asset,
    ...address,
    ...block,
    ...chart,
    ...contract,
    ...transaction,
    ...search
  })
});
