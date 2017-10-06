export default function defineVout(sequelize) {
  const Sequelize = sequelize.constructor;

  const Vout = sequelize.define("vout", {
    txid: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    asset: { type: Sequelize.STRING, allowNull: false },
    n: { type: Sequelize.INTEGER, allowNull: false },
    value: { type: Sequelize.DECIMAL, allowNull: false }
  }, {
    tableName: "vouts",
    underscored: true,
    indexes: [
      { fields: ["txid"] }
    ]
  });

  Vout.associate = ({ Transaction, Asset, Address }) => {
    Vout.belongsTo(Transaction, { foreignKey: "txid", targetKey: "txid" });
    Vout.belongsTo(Asset, { foreignKey: "asset", targetKey: "txid", as: "vout_asset" });
    Vout.belongsTo(Address, { foreignKey: "address", targetKey: "address", as: "vout_address" });
  };

  return Vout;
}
