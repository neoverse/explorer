import { compose, mapProps, setDisplayName } from "recompose";

import Transaction from "../components/transaction/transaction";
import Loading from "../components/transaction/loading";
import Failed from "../components/transaction/failed";
import transactionActions from "../actions/transaction";
import withFetch from "../hocs/api/withFetch";
import withData from "../hocs/api/withData";
import withProgressComponents from "../hocs/api/withProgressComponents";
import { LOADING, FAILED } from "../values/state";

function mapTransactionToProps(transaction) {
  return { transaction };
}

export default compose(
  mapProps((props) => ({ ...props, id: props.match.params.id })),
  withFetch(transactionActions),
  withData(transactionActions, mapTransactionToProps),
  withProgressComponents(transactionActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  setDisplayName("TransactionContainer")
)(Transaction);
