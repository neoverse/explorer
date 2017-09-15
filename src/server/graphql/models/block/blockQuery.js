import { GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";

import BlockSchema from "./blockSchema";
import { Block, Transaction } from "../../../database";
import { PAGE_SIZE } from "../../values";

export default {
  block: {
    type: BlockSchema,
    args: {
      hash: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (source, { hash }) => {
      return Block.findOne({ where: { hash }, include: [Transaction] });
    }
  },
  blocks: {
    type: new GraphQLList(BlockSchema),
    args: {
      page: { type: GraphQLInt }
    },
    resolve: (source, { page }) => {
      return Block.findAll({
        offset: (Math.min(1, page || 1) - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        order: [["index", "desc"]],
        include: [Transaction]
      });
    }
  }
};
