exports.up = (db, _Sequelize) => {
  return db.removeColumn("contracts", "hash");
};

exports.down = (db, _Sequelize) => {
  return db.addColumn("contracts", "hash").then(() => {
    return db.addIndex("contracts", ["hash"], { unique: true });
  });
};
