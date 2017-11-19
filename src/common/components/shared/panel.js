import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const { func } = PropTypes;

export default class Panel extends React.Component {
  static displayName = "Panel";

  static propTypes = {
    renderHeader: func,
    renderFooter: func
  };

  render = () => {
    return (
      <div className={classNames("panel-component", this.props.className)}>
        {this.renderHeader()}

        <div className="panel-content">
          {this.props.children}
        </div>

        {this.renderFooter()}
      </div>
    );
  }

  renderHeader = () => {
    if (this.props.renderHeader) {
      return (
        <div className="panel-header">
          {this.props.renderHeader()}
        </div>
      );
    }
  }

  renderFooter = () => {
    if (this.props.renderFooter) {
      return (
        <div className="panel-footer">
          {this.props.renderFooter()}
        </div>
      );
    }
  }
}
