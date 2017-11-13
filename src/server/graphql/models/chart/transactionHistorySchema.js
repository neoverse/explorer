import { GraphQLObjectType, GraphQLInt, GraphQLNonNull } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";

export default new GraphQLObjectType({
  name: "TransactionHistory",
  description: "14-Day Transaction History",
  fields: () => ({
    date: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: "Date"
    },
    count: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Number of transactions"
    }
  })
});
