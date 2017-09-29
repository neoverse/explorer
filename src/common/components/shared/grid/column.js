import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const { oneOf } = PropTypes;

const sizeShape = oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
const offsetShape = oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

export default class Column extends React.Component {
  static displayName = "Column";

  static propTypes = {
    s: sizeShape,
    m: sizeShape,
    l: sizeShape,
    xl: sizeShape,
    sOffset: offsetShape,
    mOffset: offsetShape,
    lOffset: offsetShape,
    xlOffset: offsetShape
  };

  static defaultProps = {
    sOffset: 0,
    mOffset: 0,
    lOffset: 0,
    xlOffset: 0
  };

  render = () => {
    const { s, m, l, xl, sOffset, mOffset, lOffset, xlOffset } = this.props;

    const className = classNames("column-component", this.props.className, {
      [`column-s${s}`]: !!s,
      [`column-m${m}`]: !!m,
      [`column-l${l}`]: !!l,
      [`column-xl${xl}`]: !!xl,
      [`column-offset-s${sOffset}`]: sOffset > 0,
      [`column-offset-m${mOffset}`]: mOffset > 0,
      [`column-offset-l${lOffset}`]: lOffset > 0,
      [`column-offset-xl${xlOffset}`]: xlOffset > 0
    });

    return <div className={className}>{this.props.children}</div>;
  }
}
