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
      description: "Hash value of the block"
    },
    index: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Index value of the block"
    },
    confirmations: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Number of confirmations for the block"
    },
    merkleroot: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Merkle tree root for all transactions in the block"
    },
    nextconsensus: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Hash value of the next bookkeeper contract"
    },
    nonce: {
      type: GraphQLString,
      description: "Nonce value of the block"
    },
    previousblockhash: {
      type: GraphQLString,
      description: "Hash value of the previous block"
    },
    script: {
      type: new GraphQLNonNull(ScriptSchema),
      description: "Scripts for the block"
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Size of the block"
    },
    time: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: "Timestamp the block "
    },
    version: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Version number of the block"
    },
    transactions: {
      type: new GraphQLNonNull(new GraphQLList(TransactionSchema)),
      description: "Transactions within the block",
      resolve: (block) => block.getTransactions()
    }
  })
});
