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
  attrs: { type: Sequelize.JSON, allowNull: false },  // TODO: this should be named "attributes"
  scripts: { type: Sequelize.JSON, allowNull: false },
  vin: { type: Sequelize.JSON, allowNull: false },
  vout: { type: Sequelize.JSON, allowNull: false }
}, {
  underscored: true,
  indexes: [
    { fields: ["txid"], unique: true }
  ]
});

Block.hasMany(Transaction, { foreignKey: "blockhash", sourceKey: "hash" });
Transaction.belongsTo(Block, { foreignKey: "blockhash", targetKey: "hash" });

export default sequelize;
