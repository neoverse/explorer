import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Contracts from "../components/contracts/contracts";
import Loading from "../components/contracts/loading";
import Failed from "../components/contracts/failed";
import defaultTitle from "../values/defaultTitle";

const query = gql`
  { contracts {
    txid
    hash
    name
    code {
      hash
      script
      parameters
      returntype
    }
    version
    needstorage
    author
    email
    description
    registered
  } }
`;

export default compose(
  withGraphQuery(query),
  withGraphProgress({ Loading, Failed }),
  withTitle(`Contracts | ${defaultTitle}`),
  setDisplayName("ContractsContainer")
)(Contracts);
