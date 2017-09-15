import { ApolloClient, createNetworkInterface } from "react-apollo";

import initialState from "../common/boot/initialState";

const networkInterface = createNetworkInterface({ uri: "/graphql" });

export default new ApolloClient({ initialState, networkInterface });
