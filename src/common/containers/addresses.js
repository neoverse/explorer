import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Addresses from "../components/addresses/addresses";
import Loading from "../components/addresses/loading";
import Failed from "../components/addresses/failed";
import defaultTitle from "../values/defaultTitle";

const query = gql`
  {
    addresses {
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
  withGraphQuery(query),
  // withGraphQuery(assetsQuery),  // TODO: this should happen in the same request as above
  withGraphProgress({ Loading, Failed }),
  withTitle(`Addresses | ${defaultTitle}`),
  setDisplayName("AddressesContainer")
)(Addresses);
