import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

import TransactionSchema from "../transaction/transactionSchema";

export default new GraphQLObjectType({
  name: "Vin",
  description: "TODO",
  fields: {
    address: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    asset: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    value: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    previous_transaction: {
      type: TransactionSchema,
      description: "Previous transaction",
      resolve: (vout) => vout.getPreviousTransaction()
    }
  }
});
