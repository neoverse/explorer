import { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";

import AddressSchema from "./addressSchema";
import { Address } from "../../../database";
import { PAGE_SIZE } from "../../values";

export default {
  address: {
    type: AddressSchema,
    args: {
      address: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (_source, { address }) => {
      return Address.findOne({ where: { address } });
    }
  },
  addresses: {
    type: new GraphQLList(AddressSchema),
    args: {
      page: { type: GraphQLInt }
    },
    resolve: (_source, { page }) => {
      return Address.findAll({
        offset: (Math.min(1, page || 1) - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        order: [["id", "desc"]]
      });
    }
  }
};
