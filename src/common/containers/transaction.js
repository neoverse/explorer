import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import Transaction from "../components/transaction/transaction";
import Loading from "../components/transaction/loading";
import Failed from "../components/transaction/failed";

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
    }
  }
`;

export default compose(
  withGraphQuery(query, { options: ({ match }) => ({ variables: { txid: match.params.txid } }) }),
  withGraphProgress({ Loading, Failed }),
  setDisplayName("TransactionContainer")
)(Transaction);
