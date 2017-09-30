import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import Search from "../components/search/search";
import Loading from "../components/search/loading";
import Failed from "../components/search/failed";
import NoMatches from "../components/search/noMatches";

const query = gql`
  query ($term: String!) {
    search(term: $term) {
      __typename
      ... on BlockSearchResult {
        hash
      }
      ... on TransactionSearchResult {
        txid
      }
      ... on AddressSearchResult {
        address
      }
    }
  }
`;

export default compose(
  withGraphQuery(query, { options: ({ match }) => ({ variables: { term: match.params.term } }) }),
  withGraphProgress({ Loading, Failed, NotFound: NoMatches, required: ["search"] }),
  setDisplayName("SearchContainer")
)(Search);
