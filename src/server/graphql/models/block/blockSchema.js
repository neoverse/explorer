import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";

import ScriptSchema from "../script/scriptSchema";
import TransactionSchema from "../transaction/transactionSchema";

export default new GraphQLObjectType({
  name: "Block",
  description: "Block in the NEO Blockchain",
  fields: () => ({
    hash: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Block hash"
    },
    index: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Block index"
    },
    confirmations: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Confirmation count"
    },
    merkleroot: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Merkle tree root value"
    },
    nextconsensus: {
      type: new GraphQLNonNull(GraphQLString),
      description: "TODO"
    },
    nonce: {
      type: GraphQLString,
      description: "TODO"
    },
    previousblockhash: {
      type: GraphQLString,
      description: "Hash for the previous block"
    },
    script: {
      type: new GraphQLNonNull(ScriptSchema),
      description: "TODO"
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "TODO"
    },
    time: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: "TODO"
    },
    version: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "TODO"
    },
    transactions: {
      type: new GraphQLNonNull(new GraphQLList(TransactionSchema)),
      description: "TODO",
      resolve: (block) => block.getTransactions()
    }
  })
});
