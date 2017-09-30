import { ApolloClient, createNetworkInterface } from "react-apollo";

import initialState from "../common/boot/initialState";
import fragmentMatcher from "../common/boot/fragmentMatcher";

const networkInterface = createNetworkInterface({ uri: "/graphql" });

export default new ApolloClient({
  initialState,
  networkInterface,
  fragmentMatcher
});
