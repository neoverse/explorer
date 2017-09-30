/* eslint-disable default-case */

import React from "react";
import PropTypes from "prop-types";

import historyShape from "../../shapes/historyShape";

const { string, oneOf, oneOfType, shape } = PropTypes;

const BLOCK = "BlockSearchResult";
const TRANSACTION = "TransactionSearchResult";
const ADDRESS = "AddressSearchResult";

const searchResultShape = oneOfType([
  shape({ __typename: oneOf([BLOCK]).isRequired, hash: string.isRequired }),
  shape({ __typename: oneOf([TRANSACTION]).isRequired, txid: string.isRequired }),
  shape({ __typename: oneOf([ADDRESS]).isRequired, address: string.isRequired })
]);

export default class Search extends React.Component {
  static displayName = "Search";

  static propTypes = {
    search: searchResultShape,
    history: historyShape
  };

  componentDidMount = () => {
    this.props.history.push(this.getRedirectPath());
  }

  render = () => {
    return null;
  }

  getRedirectPath = () => {
    const { search } = this.props;

    switch (search.__typename) {
      case BLOCK: return `/blocks/${search.hash}`;
      case TRANSACTION: return `/transactions/${search.txid}`;
      case ADDRESS: return `/addresses/${search.address}`;
    }
  }
}
