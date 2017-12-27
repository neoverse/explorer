import _ from "lodash";
import React from "react";
import Toggle from "react-toggle";
import PropTypes from "prop-types";

const { bool, func } = PropTypes;

export default class NetToggle extends React.Component {
  static displayName = "NetToggle";

  static propTypes = {
    on: bool,
    onToggle: func
  };

  static defaultProps = {
    on: false,
    onToggle: _.noop
  };

  render = () => {
    return (
      <label className="net-toggle-component">
        <Toggle
          className="toggle-value"
          icons={false}
          defaultChecked={this.props.on}
          onChange={this.props.onToggle} />
        <span className="label-text">
          {this.props.on ? "MainNet" : "TestNet"}
        </span>
      </label>
    );
  }
}
