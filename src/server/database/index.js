/* eslint-disable no-console */

import Sequelize from "sequelize";

import batch from "./batch";
import iterator from "./iterator";
import defineBlock from "./models/block";
import defineTransaction from "./models/transaction";
import defineVin from "./models/vin";
import defineVout from "./models/vout";
import defineAddress from "./models/address";
import defineAsset from "./models/asset";
import defineContract from "./models/contract";

Sequelize.Model.batch = batch;
Sequelize.Model.iterator = iterator;

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: isProduction ? false : console.log,
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
  }
});

export const Block = defineBlock(sequelize);
export const Transaction = defineTransaction(sequelize);
export const Vin = defineVin(sequelize);
export const Vout = defineVout(sequelize);
export const Address = defineAddress(sequelize);
export const Asset = defineAsset(sequelize);
export const Contract = defineContract(sequelize);

[Block, Transaction, Vin, Vout, Address, Asset, Contract].forEach((model) => {
  model.associate({ Block, Transaction, Vin, Vout, Address, Asset, Contract });
});

export default sequelize;
