import _ from "lodash";

import { NEO_ID, GAS_ID } from "../../../common/values/assets";
import { CLAIM_TRANSACTION } from "../../../common/values/transactions";

export default function defineAddress(sequelize) {
  const Sequelize = sequelize.constructor;
  const { Op } = Sequelize;

  const Address = sequelize.define("address", {
    address: { type: Sequelize.STRING, allowNull: false },
    balance: { type: Sequelize.JSON, allowNull: false },
    registered: { type: Sequelize.DATE, allowNull: false }
  }, {
    tableName: "addresses",
    underscored: true,
    indexes: [
      { fields: ["address"], unique: true }
    ]
  });

  Address.associate = ({ Block, Transaction, Vin, Vout }) => {
    Address.hasMany(Vin, { foreignKey: "address", sourceKey: "address" });
    Address.hasMany(Vout, { foreignKey: "address", sourceKey: "address" });

    Address.prototype.getTransactions = async function(options = {}) {
      const passDownOptions = _.pick(options, "transaction");

      const generateTxidSql = (model) => {
        return model.QueryGenerator.selectQuery(model.getTableName(options), {
          ...passDownOptions,
          attributes: ["txid"],
          where: { address: this.address }
        }, model).replace(/;$/, "");
      };

      const sql = [
        generateTxidSql(Vin),
        generateTxidSql(Vout)
      ].join(" UNION ");

      return Transaction.findAll({
        ...options,
        where: Sequelize.literal(`"txid" IN (${sql})`)
      });
    };

    Address.prototype.calculateUnclaimedGas = async function() {
      const amount = 0;

      function group(vinsOrVouts) {
        return _.reduce(vinsOrVouts, (accumulator, vinOrVout) => {
          accumulator[vinOrVout.asset].push(vinOrVout.attributes);
          return accumulator;
        }, {
          [NEO_ID]: [],
          [GAS_ID]: []
        });
      }

      async function getPastClaims(address, options = {}) {
        return Transaction.findAll({
          ...options,
          include: [{ model: Vout, where: { address } }],
          where: { type: CLAIM_TRANSACTION }
        });
      }

      function getClaimedTxids(claimTransactions) {
        const claimedIds = {};

        claimTransactions.forEach((transaction) => {
          transaction.data.claims.forEach((claim) => {
            claimedIds[claim.txid] || (claimedIds[claim.txid] = {});
            claimedIds[claim.txid][transaction.vout] = transaction;
          });
        });

        return claimedIds;
      }

      // function getValidClaims(sentTransactions, claimedTxids) {
      //
      // }

      const transaction = await sequelize.transaction();

      try {
        const vins = await this.getVins({
          where: { address: this.address, asset: { [Op.in]: [NEO_ID, GAS_ID] } },
          transaction
        });
        const vouts = await this.getVouts({
          where: { address: this.address, asset: { [Op.in]: [NEO_ID, GAS_ID] } },
          transaction
        });

        const groupedVins = group(vins);
        const groupedVouts = group(vouts);

        // const infoSent = groupedVins;
        // const sentNeo = collectTxids(infoSent)[NEO_ID]

        const pastClaims = await getPastClaims(this.address, { transaction });
        const claimedTxids = getClaimedTxids(pastClaims);

        // const validClaims = getValidClaims(groupedVouts, claimedTxids)

        // valid_claims = {k:v for k,v in sent_neo.items() if not k in claimed_neo}
        // valid_claims = filter_claimed_for_other_address(valid_claims)

        const height = await Block.getHeight({ transaction });

        console.log("height:", height);
        console.log("claimedTxids:", claimedTxids);
      } finally {
        transaction.rollback();
      }

      return amount;
    };
  };

  return Address;
}
