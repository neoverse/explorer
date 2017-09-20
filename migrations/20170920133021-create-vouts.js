exports.up = (db, Sequelize) => {
  return db.createTable("vouts", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    txid: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    asset: { type: Sequelize.STRING, allowNull: false },
    n: { type: Sequelize.INTEGER, allowNull: false },
    value: { type: Sequelize.DECIMAL, allowNull: false },
    created_at: { type: Sequelize.DATE, notNull: true },
    updated_at: { type: Sequelize.DATE, notNull: true }
  }).then(() => {
    return db.addIndex("vouts", ["txid"]);
  });
};

exports.down = (db, _Sequelize) => {
  return db.dropTable("vouts");
};
