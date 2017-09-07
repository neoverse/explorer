import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";

export default new GraphQLObjectType({
  name: "Vin",
  description: "TODO",
  fields: {
    txid: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    vout: { type: new GraphQLNonNull(GraphQLInt), description: "TODO" }
  }
});
