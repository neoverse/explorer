exports.up = (db, _Sequelize) => {
  return db.addIndex("vouts", ["address"]);
};

exports.down = (db, _Sequelize) => {
  return db.removeIndex("vouts", ["address"]);
};
