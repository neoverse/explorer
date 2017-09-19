exports.up = (db, Sequelize) => {
  return db.createTable("blocks", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
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
    version: { type: Sequelize.INTEGER, allowNull: false },
    created_at: { type: Sequelize.DATE, notNull: true },
    updated_at: { type: Sequelize.DATE, notNull: true }
  }).then(() => {
    return db.addIndex("blocks", ["hash"], { unique: true });
  }).then(() => {
    return db.addIndex("blocks", ["index"], { unique: true });
  });
};

exports.down = (db, Sequelize) => {
  return db.dropTable("blocks");
};
