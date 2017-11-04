import _ from "lodash";

import normalizeHex from "../../common/helpers/normalizeHex";
import { Transaction } from "../../server/database";
import {
  CLAIM_TRANSACTION,
  REGISTER_TRANSACTION,
  PUBLISH_TRANSACTION
} from "../../common/values/transactions";

export default class TransactionProcessor {
  process = async (transactions, block, options = {}) => {
    return Transaction.bulkCreate(transactions.map((tx) => {
      const attrs = _.pick(tx, "type", "size", "nonce", "sys_fee", "net_fee", "scripts", "version",
        "vin", "vout");

      return {
        ...attrs,
        txid: normalizeHex(tx.txid),
        attrs: tx.attributes,
        blockhash: normalizeHex(block.hash),
        blocktime: block.time * 1000,
        data: this._getTransactionData(tx)
      };
    }), options);
  }

  _getTransactionData = (transaction) => {
    switch (transaction.type) {
      case CLAIM_TRANSACTION:
        return _.pick(transaction, "claims");
      case REGISTER_TRANSACTION:
        return _.pick(transaction, "asset");
      case PUBLISH_TRANSACTION:
        return _.pick(transaction, "contract");
      default:
        return null;
    }
  }
}
