import { GraphQLObjectType, GraphQLInt, GraphQLFloat, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";

const NameSchema = new GraphQLObjectType({
  name: "AssetName",
  description: "Asset name by language",
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Asset name"
    },
    lang: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Asset language"
    }
  }
});

export default new GraphQLObjectType({
  name: "Asset",
  description: "Asset registered to the NEO Blockchain",
  fields: {
    txid: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Transaction ID that registered the asset"
    },
    name: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(NameSchema))),
      description: "Asset names by language"
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Asset type"
    },
    precision: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Asset precision"
    },
    issued: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Issued amount of asset"
    },
    amount: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Total amount of asset"
    },
    admin: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Asset admin"
    },
    owner: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Asset owner"
    },
    registered: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: "Asset registered timestamp"
    }
  }
});
