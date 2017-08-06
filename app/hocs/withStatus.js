import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const { object, shape } = PropTypes;

const withStatus = (statusCode) => (MyComponent) => {
  class StatusComponent extends Component {
    static contextTypes = {
      router: shape({ staticContext: object }).isRequired
    };

    componentWillMount = () => {
      const { staticContext } = this.context.router;

      if (staticContext) {
        staticContext.status = statusCode;
      }
    }

    render = () => {
      return <MyComponent {...this.props} />;
    }
  }

  return withRouter(StatusComponent);
};

export default withStatus;
