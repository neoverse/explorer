import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Home from "../components/home/home";
import Loading from "../components/loading";
import Failed from "../components/failed";

const query = gql`
  {
    transactionHistory {
      date
      count
    }

    blocks {
      index
      hash
      confirmations
      size
      time
      version
    }

    transactions {
      txid
      blockhash
      blocktime
      type
      size
    }
  }
`;

export default compose(
  withGraphQuery(query),
  withGraphProgress({ Loading, Failed }),
  withTitle(),
  setDisplayName("HomeContainer")
)(Home);
