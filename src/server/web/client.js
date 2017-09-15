import * as graphql from "graphql";
import { ApolloClient } from "react-apollo";
import { createLocalInterface } from "apollo-local-query";

import schema from "../graphql/schema";
import initialState from "../../common/boot/initialState";

const networkInterface = createLocalInterface(graphql, schema);

export default new ApolloClient({
  initialState,
  networkInterface,
  ssrMode: true
});
