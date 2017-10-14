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
      description: "Transaction ID"
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Transaction type"
    },
    blockhash: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Block hash"
    },
    blocktime: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: "Block time"
    },
    net_fee: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Network fee"
    },
    sys_fee: {
      type: new GraphQLNonNull(GraphQLString),
      description: "System fee"
    },
    nonce: {
      type: GraphQLBigInt,
      description: "Nonce"
    },
    size: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Byte size"
    },
    version: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Version"
    },
    attributes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(AttributeSchema))),
      description: "TODO",
      resolve: (transaction) => transaction.attrs
    },
    scripts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ScriptSchema))),
      description: "TODO"
    },
    vin: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(VinSchema))),
      description: "TODO",
      resolve: (transaction) => transaction.getVins()
    },
    vout: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(VoutSchema))),
      description: "TODO",
      resolve: (transaction) => transaction.getVouts()
    },
    asset: {
      type: AssetSchema,
      description: "Transaction asset",
      resolve: (transaction) => transaction.getAsset()
    },
    contract: {
      type: ContractSchema,
      description: "Transaction contract",
      resolve: (transaction) => transaction.getContract()
    }
  })
});
