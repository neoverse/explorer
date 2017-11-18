exports.up = (db, Sequelize) => {
  const DATE_WITHOUT_TIMEZONE = "TIMESTAMP WITHOUT TIME ZONE";

  return db.changeColumn("blocks", "time", {
    type: DATE_WITHOUT_TIMEZONE,
    allowNull: false
  }).then(() => {
    return db.addIndex("blocks", [Sequelize.literal('CAST("time" AS date)'), "hash"], {
      name: "blocks_date_hash_index"
    });
  });
};

exports.down = (db, Sequelize) => {
  return db.removeIndex("blocks", "blocks_date_hash_index").then(() => {
    return db.changeColumn("blocks", "time", {
      type: Sequelize.DATE,
      allowNull: false
    });
  });
};
