import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import Block from "../components/block/block";
import Loading from "../components/block/loading";
import Failed from "../components/block/failed";
import NotFound from "./notFound";

const query = gql`
  query ($hash: String!) {
    block(hash: $hash) {
      hash
      index
      confirmations
      merkleroot
      nextconsensus
      nonce
      previousblockhash
      script {
        invocation
        verification
      }
      size
      time
      version
      transactions {
        txid
        type
        blockhash
        blocktime
        net_fee
        sys_fee
        nonce
        size
        version
        attributes {
          data
          usage
        }
        scripts {
          invocation
          verification
        }
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
      }
    }
  }
`;

export default compose(
  withGraphQuery(query, { options: ({ match }) => ({ variables: { hash: match.params.hash } }) }),
  withGraphProgress({ Loading, Failed, NotFound, required: ["block"] }),
  setDisplayName("BlockContainer")
)(Block);
