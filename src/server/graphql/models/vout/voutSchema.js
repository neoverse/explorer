import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export default new GraphQLObjectType({
  name: "Vout",
  description: "Transaction output",
  fields: {
    address: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Address of the output"
    },
    asset: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Asset of the output"
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Value of the output"
    }
  }
});
