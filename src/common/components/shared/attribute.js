import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const { node } = PropTypes;

export default class Attribute extends React.Component {
  static displayName = "Attribute";

  static propTypes = {
    label: node.isRequired
  };

  render = () => {
    return (
      <div className={classNames("attribute-component")}>
        <div className="label">{this.props.label}</div>
        <div className="value">{this.props.children}</div>
      </div>
    );
  }
}
