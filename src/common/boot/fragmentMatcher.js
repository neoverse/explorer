import { IntrospectionFragmentMatcher } from "apollo-client";

export default new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [{
        kind: "UNION",
        name: "SearchResult",
        possibleTypes: [
          { name: "AddressSearchResult" },
          { name: "BlockSearchResult" },
          { name: "TransactionSearchResult" }
        ]
      }]
    }
  }
});
