import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const { string } = PropTypes;

export default class SvgIcon extends React.Component {
  static displayName = "SvgIcon";

  static propTypes = {
    svg: string.isRequired
  };

  render = () => {
    return (
      <div
        className={classNames("svg-icon-component", this.props.className)}
        dangerouslySetInnerHTML={{ __html: this.props.svg }} />
    );
  }
}
