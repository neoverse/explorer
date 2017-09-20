exports.up = (db, Sequelize) => {
  return db.createTable("contracts", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    txid: { type: Sequelize.STRING, allowNull: false },
    hash: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    code: { type: Sequelize.JSON, allowNull: false },
    version: { type: Sequelize.STRING, allowNull: false },
    needstorage: { type: Sequelize.BOOLEAN, allowNull: false },
    author: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.STRING, allowNull: false },
    registered: { type: Sequelize.DATE, allowNull: false },
    created_at: { type: Sequelize.DATE, notNull: true },
    updated_at: { type: Sequelize.DATE, notNull: true }
  }).then(() => {
    return db.addIndex("contracts", ["txid"], { unique: true });
  }).then(() => {
    return db.addIndex("contracts", ["hash"], { unique: true });
  });
};

exports.down = (db, _Sequelize) => {
  return db.dropTable("contracts");
};
