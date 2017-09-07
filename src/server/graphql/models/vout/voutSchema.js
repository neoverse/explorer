import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";

export default new GraphQLObjectType({
  name: "Vout",
  description: "TODO",
  fields: {
    address: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    asset: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    n: { type: new GraphQLNonNull(GraphQLInt), description: "TODO" },
    value: { type: new GraphQLNonNull(GraphQLString), description: "TODO" }
  }
});
