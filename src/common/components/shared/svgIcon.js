import _ from "lodash";
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
    const passDownProps = _.omit(this.props, "svg");

    return (
      <span
        {...passDownProps}
        className={classNames("svg-icon-component", this.props.className)}
        dangerouslySetInnerHTML={{ __html: this.props.svg }} />
    );
  }
}
