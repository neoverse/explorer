import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export default new GraphQLObjectType({
  name: "Vout",
  description: "TODO",
  fields: {
    address: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    asset: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    value: { type: new GraphQLNonNull(GraphQLString), description: "TODO" }
  }
});
