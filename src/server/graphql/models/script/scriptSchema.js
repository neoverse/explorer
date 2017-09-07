import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export default new GraphQLObjectType({
  name: "Script",
  description: "NEO script",
  fields: {
    invocation: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Invocation script"
    },
    verification: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Verification script"
    }
  }
});
