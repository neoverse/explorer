import { GraphQLList } from "graphql";

import TransactionHistorySchema from "./transactionHistorySchema";
import db from "../../../database";
import redis from "../../../redis";

async function queryHistory() {
  const query = `
    SELECT CAST("blocktime" AS DATE) AS "date", COUNT("id") as "count"
    FROM "transactions"
    WHERE CAST("blocktime" AS DATE) BETWEEN
      CAST((LOCALTIMESTAMP - INTERVAL '14 days') AS DATE) AND
      CAST((LOCALTIMESTAMP - INTERVAL '1 day') AS DATE)
    GROUP BY "date"
    ORDER BY "date";
  `;

  return db.query(query, { type: db.QueryTypes.SELECT });
}

export default {
  transactionHistory: {
    type: new GraphQLList(TransactionHistorySchema),
    resolve: async () => {
      const key = "daily-transaction-history";
      let history = await redis.get(key);

      if (history) {
        history = JSON.parse(history);
      } else {
        history = await queryHistory();
        const offset = new Date().getTimezoneOffset() * 60000;  // # of hours offset * 60 min/hour * 1000 ms/sec
        const endOfDay = parseInt((new Date().setHours(23, 59, 59, 999) - new Date() - offset) / 1000, 10);
        await redis.set(key, JSON.stringify(history), "EX", endOfDay);
      }

      return history;
    }
  }
};
