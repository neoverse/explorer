import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import SvgIcon from "./svgIcon";
import menuSvg from "../../icons/menu.svg";

const { string, node, arrayOf } = PropTypes;

export default class Navbar extends React.Component {
  static displayName = "Navbar";

  static propTypes = {
    title: string.isRequired,
    links: arrayOf(node)
  };

  static defaultProps = {
    links: []
  };

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render = () => {
    return (
      <div className={classNames("navbar-component", this.props.className)}>
        <div className="nav-topbar">
          <h1>{this.props.title}</h1>

          <ul className="nav-links">
            {this.renderLinks()}
          </ul>

          <button className="nav-toggle" type="button" onClick={this.handleToggleNav}>
            <SvgIcon className="nav-toggle-icon" svg={menuSvg} />
          </button>
        </div>

        <ul className={classNames("nav-drawer", { open: this.state.open })}>
          {this.renderLinks()}
        </ul>
      </div>
    );
  }

  renderLinks = () => {
    return this.props.links.map((link, i) => (
      <li key={i} className="nav-link">{link}</li>
    ));
  }

  handleToggleNav = () => {
    this.setState({ open: !this.state.open });
  }
}
