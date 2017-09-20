exports.up = (db, Sequelize) => {
  return db.createTable("assets", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    txid: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.JSON, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false },
    precision: { type: Sequelize.INTEGER, allowNull: false },
    issued: { type: Sequelize.DECIMAL, allowNull: false },
    amount: { type: Sequelize.DECIMAL, allowNull: false },
    admin: { type: Sequelize.STRING, allowNull: false },
    owner: { type: Sequelize.STRING, allowNull: false },
    registered: { type: Sequelize.DATE, allowNull: false },
    created_at: { type: Sequelize.DATE, notNull: true },
    updated_at: { type: Sequelize.DATE, notNull: true }
  }).then(() => {
    return db.addIndex("assets", ["txid"], { unique: true });
  });
};

exports.down = (db, _Sequelize) => {
  return db.dropTable("assets");
};
