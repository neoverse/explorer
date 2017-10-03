import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Blocks from "../components/blocks/blocks";
import Loading from "../components/loading";
import Failed from "../components/failed";

const query = gql`
  { blocks {
    index
    hash
    confirmations
    size
    time
    version
  } }
`;

export default compose(
  withGraphQuery(query),
  withGraphProgress({ Loading, Failed }),
  withTitle("Blocks"),
  setDisplayName("BlocksContainer")
)(Blocks);
