import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export default new GraphQLObjectType({
  name: "Attribute",
  description: "TODO",
  fields: {
    data: { type: new GraphQLNonNull(GraphQLString), description: "TODO" },
    usage: { type: new GraphQLNonNull(GraphQLString), description: "TODO" }
  }
});
