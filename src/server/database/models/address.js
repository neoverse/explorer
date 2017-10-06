export default function defineAddress(sequelize) {
  const Sequelize = sequelize.constructor;

  const Address = sequelize.define("address", {
    address: { type: Sequelize.STRING, allowNull: false },
    balance: { type: Sequelize.JSON, allowNull: false },
    registered: { type: Sequelize.DATE, allowNull: false }
  }, {
    tableName: "addresses",
    underscored: true,
    indexes: [
      { fields: ["address"], unique: true }
    ]
  });

  Address.associate = () => { /* noop */ };

  return Address;
}
