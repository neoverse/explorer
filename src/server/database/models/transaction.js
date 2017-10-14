export default function defineTransaction(sequelize) {
  const Sequelize = sequelize.constructor;

  const Transaction = sequelize.define("transaction", {
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
    tableName: "transactions",
    underscored: true,
    indexes: [
      { fields: ["txid"], unique: true },
      { fields: ["blockhash"] }
    ]
  });

  Transaction.associate = ({ Block, Vin, Vout, Asset, Contract }) => {
    Transaction.belongsTo(Block, { foreignKey: "blockhash", targetKey: "hash" });
    Transaction.hasMany(Vin, { foreignKey: "txid", sourceKey: "txid" });
    Transaction.hasMany(Vout, { foreignKey: "txid", sourceKey: "txid" });
    Transaction.belongsTo(Asset, { foreignKey: "txid", targetKey: "txid" });
    Transaction.belongsTo(Contract, { foreignKey: "txid", targetKey: "txid" });
  };

  return Transaction;
}
