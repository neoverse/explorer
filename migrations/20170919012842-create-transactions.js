exports.up = (db, Sequelize) => {
  return db.createTable("transactions", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    txid: { type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false },
    blockhash: { type: Sequelize.STRING, allowNull: false },
    blocktime: { type: Sequelize.DATE, allowNull: false },
    net_fee: { type: Sequelize.STRING, allowNull: false },
    sys_fee: { type: Sequelize.STRING, allowNull: false },
    nonce: { type: Sequelize.BIGINT, allowNull: true },
    size: { type: Sequelize.INTEGER, allowNull: false },
    version: { type: Sequelize.INTEGER, allowNull: false },
    attrs: { type: Sequelize.JSON, allowNull: false },
    scripts: { type: Sequelize.JSON, allowNull: false },
    vin: { type: Sequelize.JSON, allowNull: false },
    vout: { type: Sequelize.JSON, allowNull: false },
    data: { type: Sequelize.JSON, allowNull: true },
    created_at: { type: Sequelize.DATE, notNull: true },
    updated_at: { type: Sequelize.DATE, notNull: true }
  }).then(() => {
    return db.addIndex("transactions", ["txid"], { unique: true });
  }).then(() => {
    return db.addIndex("transactions", ["blockhash"]);
  });
};

exports.down = (db, _Sequelize) => {
  return db.dropTable("transactions");
};
