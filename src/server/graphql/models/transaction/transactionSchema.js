import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import GraphQLBigInt from "graphql-bigint";

import AssetSchema from "../asset/assetSchema";
import AttributeSchema from "../attribute/attributeSchema";
import ContractSchema from "../contract/contractSchema";
import ScriptSchema from "../script/scriptSchema";
import VinSchema from "../vin/vinSchema";
import VoutSchema from "../vout/voutSchema";

export default new GraphQLObjectType({
  name: "Transaction",
  description: "NEO transaction",
  fields: () => ({
    txid: {
      type: new GraphQLNonNull(GraphQLString),
      description: "ID of the transaction"
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Type of the transaction"
    },
    blockhash: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Hash of the transaction's block"
    },
    blocktime: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: "Timestamp of the transaction's block"
    },
    net_fee: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Network fee for the transaction"
    },
    sys_fee: {
      type: new GraphQLNonNull(GraphQLString),
      description: "System fee for the transaction"
    },
    nonce: {
      type: GraphQLBigInt,
      description: "Nonce of the transaction"
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Size of the transaction"
    },
    version: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Version of the transaction"
    },
    attributes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(AttributeSchema))),
      description: "Attributes of the transaction",
      resolve: (transaction) => transaction.attrs
    },
    scripts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ScriptSchema))),
      description: "Scripts for the transaction"
    },
    vin: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(VinSchema))),
      description: "Inputs for the transaction",
      resolve: (transaction) => transaction.getVins()
    },
    vout: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(VoutSchema))),
      description: "Outputs for the transaction",
      resolve: (transaction) => transaction.getVouts()
    },
    asset: {
      type: AssetSchema,
      description: "Asset registered by the transaction",
      resolve: (transaction) => transaction.getAsset()
    },
    contract: {
      type: ContractSchema,
      description: "Contract registered by the transaction",
      resolve: (transaction) => transaction.getContract()
    }
  })
});
