exports.up = (db, Sequelize) => {
  return db.createTable("vins", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    txid: { type: Sequelize.STRING, allowNull: false },
    previous_txid: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    asset: { type: Sequelize.STRING, allowNull: false },
    value: { type: Sequelize.DECIMAL, allowNull: false },
    created_at: { type: Sequelize.DATE, notNull: true },
    updated_at: { type: Sequelize.DATE, notNull: true }
  }).then(() => {
    return db.addIndex("vins", ["txid"]);
  }).then(() => {
    return db.addIndex("vins", ["previous_txid"]);
  }).then(() => {
    return db.addIndex("vins", ["address"]);
  });
};

exports.down = (db, _Sequelize) => {
  return db.dropTable("vins");
};
