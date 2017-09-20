import { GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";

import AssetSchema from "./assetSchema";
import { Asset } from "../../../database";
import { PAGE_SIZE } from "../../values";

export default {
  asset: {
    type: AssetSchema,
    args: {
      txid: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (_source, { txid }) => {
      return Asset.findOne({ where: { txid } });
    }
  },
  assets: {
    type: new GraphQLList(AssetSchema),
    args: {
      page: { type: GraphQLInt }
    },
    resolve: (_source, { page }) => {
      return Asset.findAll({
        offset: (Math.min(1, page || 1) - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        order: [["id", "asc"]]
      });
    }
  }
};
