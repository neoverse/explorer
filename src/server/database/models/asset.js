export default function defineAsset(sequelize) {
  const Sequelize = sequelize.constructor;

  const Asset = sequelize.define("assets", {
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

  Asset.associate = ({ Transaction }) => {
    Asset.belongsTo(Transaction, { foreignKey: "txid", targetKey: "txid" });
  };

  return Asset;
}
