/* eslint-disable no-console */

import _ from "lodash";

import database, { Block, Transaction, Asset /* Address */ } from "../server/database";

const TRANSACTION_TYPE_REGISTER = "RegisterTransaction";
const TRANSACTION_TYPE_ISSUE = "IssueTransaction";
const TRANSACTION_TYPE_MINER = "MinerTransaction";

export default class Updater {
  update = async (block) => {
    const transaction = await database.transaction();

    try {
      await this._createBlock(block, { transaction });
      await this._createTransactions(block.tx, block, { transaction });
      await this._createAssociations(block.tx, { transaction });

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
        "asset", "version", "vin", "vout");

      return { ...attrs, attrs: tx.attributes, blockhash: block.hash, blocktime: block.time * 1000 };
    }), options);
  }

  _createAssociations = async (transactions, options = {}) => {
    await Promise.all(transactions.map(async (transaction) => {
      switch (transaction.type) {
        case TRANSACTION_TYPE_REGISTER:
          await this._createAsset(transaction.asset, transaction.txid, options);
          break;
      }
    }));
  }

  _createAsset = async (asset, txid, options = {}) => {
    const attrs = _.pick(asset, "name", "type", "precision", "amount", "admin", "owner");
    return Asset.create({ ...attrs, txid, issued: asset.amount }, options);
  }
}
