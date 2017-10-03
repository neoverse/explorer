import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import getAssetName from "../helpers/getAssetName";
import Asset from "../components/asset/asset";
import Loading from "../components/loading";
import Failed from "../components/failed";
import NotFound from "./notFound";

const query = gql`
  query ($txid: String!) {
    asset(txid: $txid) {
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
    }
  }
`;

export default compose(
  withGraphQuery(query, { options: ({ match }) => ({ variables: { txid: match.params.txid } }) }),
  withGraphProgress({ Loading, Failed, NotFound, required: ["asset"] }),
  withTitle(({ asset }) => getAssetName(asset, "en")),
  setDisplayName("TransactionContainer")
)(Asset);
