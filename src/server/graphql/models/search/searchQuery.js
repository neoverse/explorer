import { GraphQLString, GraphQLNonNull } from "graphql";

import SearchSchema from "./searchSchema";
import db, { Block, Transaction, Address } from "../../../database";

const { Op } = db.constructor;

function getBlockConditions(term) {
  if (isNaN(term)) {
    return { hash: term };
  } else {
    return { [Op.or]: { hash: term, index: Number(term) } };
  }
}

export default {
  search: {
    type: SearchSchema,
    args: {
      term: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_source, { term }) => {
      return await Address.findOne({ where: { address: term } }) ||
        await Transaction.findOne({ where: { txid: term } }) ||
        Block.findOne({ where: getBlockConditions(term) });
    }
  }
};
