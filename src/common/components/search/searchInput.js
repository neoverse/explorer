import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import SvgIcon from "../shared/svgIcon";
import searchSvg from "../../icons/search.svg";

const { func } = PropTypes;

export default class SearchInput extends React.Component {
  static displayName = "SearchInput";

  static propTypes = {
    onSearch: func
  };

  static defaultProps = {
    onSearch: () => {}
  };

  constructor(props) {
    super(props);
    this.state = { term: null, focus: false };
  }

  render = () => {
    return (
      <span className={classNames("search-input-component", this.props.className, { focus: this.state.focus })}>
        <SvgIcon
          className="search-icon"
          svg={searchSvg}
          onClick={this.handleClickIcon} />
        <input
          ref={this.registerRef("input")}
          type="text"
          placeholder="Search by address, txid, block hash, or block index"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onKeyPress={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur} />
      </span>
    );
  }

  registerRef = (name) => {
    return (el) => { this[name] = el; };
  }

  handleClickIcon = () => {
    this.input.focus();
  }

  handleFocus = () => {
    this.setState({ focus: true });
  }

  handleBlur = () => {
    this.setState({ focus: false });
  }

  handleKeyPress = (event) => {
    const { target } = event;

    if (event.key === "Enter") {
      this.props.onSearch(target.value);
      target.value = "";
      target.blur();
    }
  }
}
