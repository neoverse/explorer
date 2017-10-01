import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Address from "../components/address/address";
import Loading from "../components/address/loading";
import Failed from "../components/address/failed";
import NotFound from "./notFound";
import defaultTitle from "../values/defaultTitle";

const query = gql`
  query ($address: String!) {
    address(address: $address) {
      address
      balance {
        asset
        value
      }
    }

    assets {
      txid
      name {
        name
        lang
      }
      precision
    }
  }
`;

export default compose(
  withGraphQuery(query, { options: ({ match }) => ({ variables: { address: match.params.address } }) }),
  withGraphProgress({ Loading, Failed, NotFound, required: ["address"] }),
  withTitle(({ address }) => `Address ${address.address} | ${defaultTitle}`),
  setDisplayName("AddressContainer")
)(Address);
