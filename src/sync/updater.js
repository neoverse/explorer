/* eslint-disable no-console */

import _ from "lodash";

import database, { Block, Transaction, Asset, Contract /* Address */ } from "../server/database";
import { REGISTER_TRANSACTION, PUBLISH_TRANSACTION } from "../common/values/transactions";

export default class Updater {
  update = async (block) => {
    const transaction = await database.transaction();

    try {
      await this._createBlock(block, { transaction });
      await this._createTransactions(block.tx, block, { transaction });
      await this._createAssociations(block.tx, block, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  _createBlock = async (block, options = {}) => {
    const attrs = _.pick(block, "hash", "index", "confirmations", "merkleroot", "nextconsensus",
      "nonce", "previousblockhash", "script", "size", "time", "version");

    return Block.create({ ...attrs, time: block.time * 1000 }, options);
  }

  _createTransactions = async (transactions, block, options = {}) => {
    return Transaction.bulkCreate(transactions.map((tx) => {
      const attrs = _.pick(tx, "txid", "type", "size", "nonce", "sys_fee", "net_fee", "scripts",
        "version", "vin", "vout");

      return {
        ...attrs,
        attrs: tx.attributes,
        blockhash: block.hash,
        blocktime: block.time * 1000,
        data: this._getTransactionData(tx)
      };
    }), options);
  }

  _createAssociations = async (transactions, block, options = {}) => {
    await Promise.all(transactions.map(async (transaction) => {
      switch (transaction.type) {
        case REGISTER_TRANSACTION:
          await this._createAsset(transaction.asset, transaction.txid, block.time * 1000, options);
          break;
        case PUBLISH_TRANSACTION:
          await this._createContract(transaction.contract, transaction.txid, block.time * 1000, options);
          break;
      }
    }));
  }

  _createAsset = async (asset, txid, registered, options = {}) => {
    const attrs = _.pick(asset, "name", "type", "precision", "amount", "admin", "owner");
    return Asset.create({ ...attrs, txid, registered, issued: asset.amount }, options);
  }

  _createContract = async (contract, txid, registered, options = {}) => {
    const attrs = _.pick(contract, "name", "version", "code", "needstorage", "author", "email",
      "description");

    return Contract.create({ ...attrs, txid, registered, hash: contract.code.hash }, options);
  }

  _getTransactionData = (transaction) => {
    switch (transaction.type) {
      case REGISTER_TRANSACTION:
        return _.pick(transaction, "asset");
      case PUBLISH_TRANSACTION:
        return _.pick(transaction, "contract");
      default:
        return null;
    }
  }
}
