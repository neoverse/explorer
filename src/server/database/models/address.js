import _ from "lodash";

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

  Address.associate = ({ Transaction, Vin, Vout }) => {
    Address.hasMany(Vin, { foreignKey: "address", sourceKey: "address" });
    Address.hasMany(Vout, { foreignKey: "address", sourceKey: "address" });

    Address.prototype.getTransactions = async function(options = {}) {
      const passDownOptions = _.pick(options, "transaction");

      const generateTxidSql = (model) => {
        return model.QueryGenerator.selectQuery(model.getTableName(options), {
          ...passDownOptions,
          attributes: ["txid"],
          where: { address: this.address }
        }, model).replace(/;$/, "");
      };

      const sql = [
        generateTxidSql(Vin),
        generateTxidSql(Vout)
      ].join(" UNION ");

      return Transaction.findAll({
        ...options,
        where: Sequelize.literal(`"txid" IN (${sql})`)
      });
    };
  };

  return Address;
}
