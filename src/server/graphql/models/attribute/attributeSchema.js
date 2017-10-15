import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export default new GraphQLObjectType({
  name: "Attribute",
  description: "Transaction attribute",
  fields: {
    data: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Data of the attribute"
    },
    usage: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Usage of the attribute"
    }
  }
});
