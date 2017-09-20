exports.up = (db, Sequelize) => {
  return db.createTable("addresses", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: Sequelize.STRING, allowNull: false },
    balance: { type: Sequelize.JSON, allowNull: false },
    claimed: { type: Sequelize.JSON, allowNull: false },
    created_at: { type: Sequelize.DATE, notNull: true },
    updated_at: { type: Sequelize.DATE, notNull: true }
  }).then(() => {
    return db.addIndex("addresses", ["address"], { unique: true });
  });
};

exports.down = (db, _Sequelize) => {
  return db.dropTable("addresses");
};
