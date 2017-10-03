import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Transaction from "../components/transaction/transaction";
import Loading from "../components/loading";
import Failed from "../components/failed";
import NotFound from "./notFound";
import defaultTitle from "../values/defaultTitle";

const query = gql`
  query ($txid: String!) {
    transaction(txid: $txid) {
      txid
      type
      size
      nonce
      version
      blockhash
      blocktime
      sys_fee
      net_fee
      vin {
        txid
        vout
      }
      vout {
        address
        asset
        n
        value
      }
      attributes {
        data
        usage
      }
      scripts {
        invocation
        verification
      }
      asset {
        txid
        name {
          name
          lang
        }
      }
    }

    assets {
      txid
      name {
        name
        lang
      }
    }
  }
`;

export default compose(
  withGraphQuery(query, { options: ({ match }) => ({ variables: { txid: match.params.txid } }) }),
  withGraphProgress({ Loading, Failed, NotFound, required: ["transaction"] }),
  withTitle(({ transaction }) => `Transaction ${transaction.txid} | ${defaultTitle}`),
  setDisplayName("TransactionContainer")
)(Transaction);
