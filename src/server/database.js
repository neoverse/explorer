/* eslint-disable no-console */

import Sequelize from "sequelize";

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

export const Block = sequelize.define("blocks", {
  hash: { type: Sequelize.STRING, allowNull: false },
  index: { type: Sequelize.INTEGER, allowNull: false },
  confirmations: { type: Sequelize.INTEGER, allowNull: false },
  merkleroot: { type: Sequelize.STRING, allowNull: false },
  nextconsensus: { type: Sequelize.STRING, allowNull: true },
  nonce: { type: Sequelize.STRING, allowNull: true },
  previousblockhash: { type: Sequelize.STRING, allowNull: true },
  script: { type: Sequelize.JSON, allowNull: false },
  size: { type: Sequelize.INTEGER, allowNull: false },
  time: { type: Sequelize.DATE, allowNull: false },
  version: { type: Sequelize.INTEGER, allowNull: false }
}, {
  underscored: true,
  indexes: [
    { fields: ["hash"], unique: true },
    { fields: ["index"], unique: true }
  ]
});

export const Transaction = sequelize.define("transactions", {
  txid: { type: Sequelize.STRING, allowNull: false },
  type: { type: Sequelize.STRING, allowNull: false },
  blockhash: { type: Sequelize.STRING, allowNull: false },
  blocktime: { type: Sequelize.DATE, allowNull: false },
  net_fee: { type: Sequelize.STRING, allowNull: false },
  sys_fee: { type: Sequelize.STRING, allowNull: false },
  nonce: { type: Sequelize.BIGINT, allowNull: true },
  size: { type: Sequelize.INTEGER, allowNull: false },
  version: { type: Sequelize.INTEGER, allowNull: false },
  attrs: { type: Sequelize.JSON, allowNull: false },
  scripts: { type: Sequelize.JSON, allowNull: false },
  vin: { type: Sequelize.JSON, allowNull: false },
  vout: { type: Sequelize.JSON, allowNull: false },
  data: { type: Sequelize.JSON, allowNull: true }
}, {
  underscored: true,
  indexes: [
    { fields: ["txid"], unique: true },
    { fields: ["blockhash"] }
  ]
});

export const Vout = sequelize.define("vouts", {
  txid: { type: Sequelize.STRING, allowNull: false },
  address: { type: Sequelize.STRING, allowNull: false },
  asset: { type: Sequelize.STRING, allowNull: false },
  n: { type: Sequelize.INTEGER, allowNull: false },
  value: { type: Sequelize.DECIMAL, allowNull: false }
}, {
  underscored: true,
  indexes: [
    { fields: ["txid"] }
  ]
});

export const Address = sequelize.define("addresses", {
  address: { type: Sequelize.STRING, allowNull: false },
  balances: { type: Sequelize.JSON, allowNull: false },
  claimed: { type: Sequelize.JSON, allowNull: false }
}, {
  underscored: true,
  indexes: [
    { fields: ["address"], unique: true }
  ]
});

export const AddressTransaction = sequelize.define("addresses_transactions", {
  address_id: { type: Sequelize.INTEGER, allowNull: false },
  transaction_id: { type: Sequelize.INTEGER, allowNull: false }
}, {
  underscored: true,
  indexes: [
    { fields: ["address_id", "transaction_id"], unique: true }
  ]
});

export const Asset = sequelize.define("assets", {
  txid: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.JSON, allowNull: false },
  type: { type: Sequelize.STRING, allowNull: false },
  precision: { type: Sequelize.INTEGER, allowNull: false },
  issued: { type: Sequelize.DECIMAL, allowNull: false },
  amount: { type: Sequelize.DECIMAL, allowNull: false },
  admin: { type: Sequelize.STRING, allowNull: false },
  owner: { type: Sequelize.STRING, allowNull: false },
  registered: { type: Sequelize.DATE, allowNull: false }
}, {
  underscored: true,
  indexes: [
    { fields: ["txid"], unique: true }
  ]
});

export const AssetTransaction = sequelize.define("assets_transactions", {
  asset_id: { type: Sequelize.INTEGER, allowNull: false },
  transaction_id: { type: Sequelize.INTEGER, allowNull: false }
}, {
  underscored: true,
  indexes: [
    { fields: ["asset_id", "transaction_id"], unique: true }
  ]
});

export const Contract = sequelize.define("contracts", {
  txid: { type: Sequelize.STRING, allowNull: false },
  hash: { type: Sequelize.STRING, allowNull: false },
  name: { type: Sequelize.STRING, allowNull: false },
  code: { type: Sequelize.JSON, allowNull: false },
  version: { type: Sequelize.STRING, allowNull: false },
  needstorage: { type: Sequelize.BOOLEAN, allowNull: false },
  author: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  registered: { type: Sequelize.DATE, allowNull: false }
}, {
  underscored: true,
  indexes: [
    { fields: ["txid"], unique: true },
    { fields: ["hash"], unique: true }
  ]
});

Block.hasMany(Transaction, {
  foreignKey: "blockhash",
  sourceKey: "hash"
});

Transaction.belongsTo(Block, {
  foreignKey: "blockhash",
  targetKey: "hash"
});

// Address.belongsToMany(Transaction, {
//   foreignKey: "address_id",
//   through: { model: AddressTransaction, unique: true }
// });

Vout.belongsTo(Transaction, {
  foreignKey: "txid",
  targetKey: "txid"
});

// Vout.belongsTo(Asset, {
//   foreignKey: "asset",
//   targetKey: "asset"
// });
//
// Vout.belongsTo(Address, {
//   foreignKey: "address",
//   targetKey: "address"
// });

Asset.belongsTo(Transaction, {
  foreignKey: "txid",
  targetKey: "txid"
});

// Asset.belongsToMany(Transaction, {
//   foreignKey: "asset_id",
//   through: { model: AssetTransaction, unique: true }
// });

Contract.belongsTo(Transaction, {
  foreignKey: "txid",
  targetKey: "txid"
});

export default sequelize;
