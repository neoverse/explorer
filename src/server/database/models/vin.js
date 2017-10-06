export default function defineVin(sequelize) {
  const Sequelize = sequelize.constructor;

  const Vin = sequelize.define("vins", {
    txid: { type: Sequelize.STRING, allowNull: false },
    previous_txid: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    asset: { type: Sequelize.STRING, allowNull: false },
    value: { type: Sequelize.DECIMAL, allowNull: false }
  }, {
    underscored: true,
    indexes: [
      { fields: ["txid"] },
      { fields: ["previous_txid"] },
      { fields: ["address"] }
    ]
  });

  Vin.associate = ({ Transaction, Address, Asset }) => {
    Vin.belongsTo(Transaction, { foreignKey: "txid", targetKey: "txid" });
    Vin.belongsTo(Transaction, { foreignKey: "previous_txid", targetKey: "txid", as: "previous_transaction" });
    Vin.belongsTo(Address, { foreignKey: "address", targetKey: "address", as: "vin_address" });
    Vin.belongsTo(Asset, { foreignKey: "asset", targetKey: "txid", as: "vin_asset" });
  };

  return Vin;
}
