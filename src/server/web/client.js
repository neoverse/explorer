import * as graphql from "graphql";
import { ApolloClient } from "react-apollo";
import { createLocalInterface } from "apollo-local-query";

import schema from "../graphql/schema";
import initialState from "../../common/boot/initialState";
import fragmentMatcher from "../../common/boot/fragmentMatcher";

const networkInterface = createLocalInterface(graphql, schema);

export default new ApolloClient({
  initialState,
  networkInterface,
  fragmentMatcher,
  ssrMode: true
});
