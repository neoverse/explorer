import { GraphQLObjectType } from "graphql";

import asset from "./models/asset/assetQuery";
import block from "./models/block/blockQuery";
import contract from "./models/contract/contractQuery";
import transaction from "./models/transaction/transactionQuery";

export default new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...asset,
    ...block,
    ...contract,
    ...transaction
  })
});
