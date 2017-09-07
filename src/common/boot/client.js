import { ApolloClient, createNetworkInterface } from "react-apollo";

import initialState from "./initialState";

const networkInterface = createNetworkInterface({
  uri: typeof window === "object" ? "/graphql" : `${process.env.BASE_URL}/graphql`
});

export default new ApolloClient({ initialState, networkInterface });
