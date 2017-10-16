import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

import TransactionSchema from "../transaction/transactionSchema";

export default new GraphQLObjectType({
  name: "Vin",
  description: "Transaction input",
  fields: () => ({
    address: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Address of the input"
    },
    asset: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Asset of the input"
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Value of the input"
    },
    previous_transaction: {
      type: TransactionSchema,
      description: "Previous transaction",
      resolve: (vout) => vout.getPreviousTransaction()
    }
  })
});
