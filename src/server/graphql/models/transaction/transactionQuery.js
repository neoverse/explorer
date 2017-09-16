import { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";

import TransactionSchema from "./transactionSchema";
import { Transaction, Block } from "../../../database";
import { PAGE_SIZE } from "../../values";

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
        order: [[Block, "index", "desc"]],
        include: [{ model: Block, required: true }],
        // Prevent `include` model fields from being selected (https://github.com/sequelize/sequelize/issues/5481):
        includeIgnoreAttributes: false
      });
    }
  }
};
