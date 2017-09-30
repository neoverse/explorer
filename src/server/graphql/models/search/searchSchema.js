import { GraphQLUnionType, GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

import { Block, Transaction, Address } from "../../../database";

const BlockResultSchema = new GraphQLObjectType({
  name: "BlockSearchResult",
  description: "Block on the NEO Blockchain",
  fields: () => ({
    hash: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Hash value of the block"
    }
  })
});

const TransactionResultSchema = new GraphQLObjectType({
  name: "TransactionSearchResult",
  description: "NEO transaction",
  fields: () => ({
    txid: {
      type: new GraphQLNonNull(GraphQLString),
      description: "ID of the transaction"
    }
  })
});

const AddressResultSchema = new GraphQLObjectType({
  name: "AddressSearchResult",
  description: "Address on the NEO Blockchain",
  fields: () => ({
    address: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Address hash"
    }
  })
});

export default new GraphQLUnionType({
  name: "SearchResult",
  types: [AddressResultSchema, BlockResultSchema, TransactionResultSchema],
  resolveType: (object) => {
    if (object instanceof Address) {
      return AddressResultSchema;
    } else if (object instanceof Transaction) {
      return TransactionResultSchema;
    } else if (object instanceof Block) {
      return BlockResultSchema;
    }
  }
});
