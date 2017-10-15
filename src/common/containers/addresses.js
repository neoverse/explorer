import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Addresses from "../components/addresses/addresses";
import Loading from "../components/loading";
import Failed from "../components/failed";

const query = gql`
  {
    addresses {
      address
      balance {
        asset
        value
      }
      registered
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
  withGraphQuery(query),
  withGraphProgress({ Loading, Failed }),
  withTitle("Addresses"),
  setDisplayName("AddressesContainer")
)(Addresses);
