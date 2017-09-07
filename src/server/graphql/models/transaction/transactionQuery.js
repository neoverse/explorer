import { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";

import TransactionSchema from "./transactionSchema";
import { Transaction } from "../../../database";

const PAGE_SIZE = 50;

export default {
  transaction: {
    type: TransactionSchema,
    args: {
      txid: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (source, { txid }) => {
      return Transaction.findOne({ where: { txid } });
    }
  },
  transactions: {
    type: new GraphQLList(TransactionSchema),
    args: {
      page: { type: GraphQLInt }
    },
    resolve: (source, { page }) => {
      return Transaction.findAll({
        offset: (Math.min(1, page || 1) - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        order: [["index", "desc"]]
      });
    }
  }
};
