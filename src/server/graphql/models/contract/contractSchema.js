import { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";

import TransactionSchema from "../transaction/transactionSchema";

const CodeSchema = new GraphQLObjectType({
  name: "ContractCode",
  description: "NEO contract code",
  fields: {
    hash: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Code hash"
    },
    script: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Code script"
    },
    parameters: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
      description: "Code parameters"
    },
    returntype: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Code return type"
    }
  }
});

export default new GraphQLObjectType({
  name: "Contract",
  description: "NEO contract",
  fields: () => ({
    txid: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Transaction ID"
    },
    hash: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Contract hash"
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Contract name"
    },
    code: {
      type: new GraphQLNonNull(CodeSchema),
      description: "Contract code"
    },
    version: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Contract version"
    },
    needstorage: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Whether the contract depends on storage"
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Contract author"
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Contract email"
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Contract description"
    },
    registered: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: "Contract registered timestamp"
    },
    transaction: {
      type: new GraphQLNonNull(TransactionSchema),
      description: "Contract registered transaction",
      resolve: (contract) => contract.getTransaction()
    }
  })
});
