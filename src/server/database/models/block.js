export default function defineBlock(sequelize) {
  const Sequelize = sequelize.constructor;

  const Block = sequelize.define("block", {
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
    tableName: "blocks",
    underscored: true,
    indexes: [
      { fields: ["hash"], unique: true },
      { fields: ["index"], unique: true }
    ]
  });

  Block.associate = ({ Transaction }) => {
    Block.hasMany(Transaction, { foreignKey: "blockhash", sourceKey: "hash" });
  };

  return Block;
}
