import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Assets from "../components/assets/assets";
import Loading from "../components/loading";
import Failed from "../components/failed";
import defaultTitle from "../values/defaultTitle";

const query = gql`
  { assets {
    txid
    name {
      name
      lang
    }
    type
    precision
    issued
    amount
    admin
    owner
    registered
  } }
`;

export default compose(
  withGraphQuery(query),
  withGraphProgress({ Loading, Failed }),
  withTitle(`Assets | ${defaultTitle}`),
  setDisplayName("AssetsContainer")
)(Assets);
