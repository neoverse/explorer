import AddressProcessor from "./processors/addressProcessor";
import AssetProcessor from "./processors/assetProcessor";
import BlockProcessor from "./processors/blockProcessor";
import ContractProcessor from "./processors/contractProcessor";
import TransactionProcessor from "./processors/transactionProcessor";
import VoutProcessor from "./processors/voutProcessor";
import database from "../server/database";
import { REGISTER_TRANSACTION, PUBLISH_TRANSACTION } from "../common/values/transactions";

export default class Processor {
  constructor() {
    this.addressProcessor = new AddressProcessor();
    this.assetProcessor = new AssetProcessor();
    this.blockProcessor = new BlockProcessor();
    this.contractProcessor = new ContractProcessor();
    this.transactionProcessor = new TransactionProcessor();
    this.voutProcessor = new VoutProcessor();
  }

  process = async (block) => {
    const transaction = await database.transaction();

    try {
      await this.blockProcessor.process(block, { transaction });
      await this.transactionProcessor.process(block.tx, block, { transaction });
      await this.voutProcessor.process(block.tx, { transaction });
      await this.addressProcessor.process(block.tx, block, { transaction });
      await this._createAssociations(block.tx, block, { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  _createAssociations = async (transactions, block, options) => {
    await Promise.all(transactions.map(async (transaction) => {
      switch (transaction.type) {
        case REGISTER_TRANSACTION:
          await this.assetProcessor.process(transaction, block, options);
          break;
        case PUBLISH_TRANSACTION:
          await this.contractProcessor.process(transaction, block, options);
          break;
      }
    }));
  }
}
