import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import Blocks from "../components/blocks/blocks";
import Loading from "../components/blocks/loading";
import Failed from "../components/blocks/failed";

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
  setDisplayName("BlocksContainer")
)(Blocks);
