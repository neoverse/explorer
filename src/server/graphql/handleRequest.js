import graphql from "express-graphql";

import schema from "./schema";

export default graphql({
  schema,
  graphiql: process.env.NODE_ENV !== "production"
});
