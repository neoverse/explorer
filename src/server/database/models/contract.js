export default function defineContract(sequelize) {
  const Sequelize = sequelize.constructor;

  const Contract = sequelize.define("contract", {
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
    tableName: "contracts",
    underscored: true,
    indexes: [
      { fields: ["txid"], unique: true },
      { fields: ["hash"], unique: true }
    ]
  });

  Contract.associate = ({ Transaction }) => {
    Contract.belongsTo(Transaction, { foreignKey: "txid", targetKey: "txid" });
  };

  return Contract;
}
