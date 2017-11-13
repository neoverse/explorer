exports.up = (db, Sequelize) => {
  const DATE_WITHOUT_TIMEZONE = "TIMESTAMP WITHOUT TIME ZONE";

  return db.changeColumn("blocks", "time", {
    type: DATE_WITHOUT_TIMEZONE,
    allowNull: false
  }).then(() => {
    return db.changeColumn("transactions", "blocktime", {
      type: DATE_WITHOUT_TIMEZONE,
      allowNull: false
    });
  }).then(() => {
    return db.addIndex("transactions", [Sequelize.literal('CAST("blocktime" AS date)')], {
      name: "transactions_date_index"
    });
  });
};

exports.down = (db, Sequelize) => {
  return db.removeIndex("transactions", "blocks_date_index").then(() => {
    return db.changeColumn("transactions", "blocktime", { type: Sequelize.DATE, allowNull: false });
  }).then(() => {
    return db.changeColumn("blocks", "time", { type: Sequelize.DATE, allowNull: false });
  });
};
