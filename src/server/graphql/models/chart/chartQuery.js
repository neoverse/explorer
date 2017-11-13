import { GraphQLList } from "graphql";

import TransactionHistorySchema from "./transactionHistorySchema";
import db from "../../../database";

export default {
  transactionHistory: {
    type: new GraphQLList(TransactionHistorySchema),
    resolve: () => {
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
  }
};
