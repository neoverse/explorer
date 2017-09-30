import React from "react";

import SearchInput from "./searchInput";
import matchShape from "../../shapes/matchShape";
import historyShape from "../../shapes/historyShape";
import getSearchPath from "../../helpers/getSearchPath";

export default class NoMatches extends React.Component {
  static displayName = "NoMatches";

  static propTypes = {
    match: matchShape.isRequired,
    history: historyShape.isRequired
  };

  render = () => {
    return (
      <div className="search-no-matches-component">
        <h2>No Matches</h2>
        <p>
          Your search for “<strong>{this.props.match.params.term}</strong>” did not match any
          blocks, transactions, or addresses in the NEO Blockchain.
        </p>
        <p>
          Try a new search:
        </p>
        <p>
          <SearchInput onSearch={this.handleSearch} />
        </p>
      </div>
    );
  }

  handleSearch = (term) => {
    this.props.history.push(getSearchPath(term));
  }
}
