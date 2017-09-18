import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Contract from "../components/contract/contract";
import Loading from "../components/contract/loading";
import Failed from "../components/contract/failed";
import NotFound from "./notFound";
import defaultTitle from "../values/defaultTitle";

const query = gql`
  query ($hash: String!) {
    contract(hash: $hash) {
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
    }
  }
`;

export default compose(
  withGraphQuery(query, { options: ({ match }) => ({ variables: { hash: match.params.hash } }) }),
  withGraphProgress({ Loading, Failed, NotFound, required: ["contract"] }),
  withTitle(({ contract }) => `Contract ${contract.name} | ${defaultTitle}`),
  setDisplayName("ContractContainer")
)(Contract);
