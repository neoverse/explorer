import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { wrapDisplayName } from "recompose";

const { object, shape } = PropTypes;

const withStatus = (statusCode) => (Component) => {
  class StatusComponent extends React.Component {
    static displayName = wrapDisplayName("withStatus", Component);

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
      return <Component {...this.props} />;
    }
  }

  return withRouter(StatusComponent);
};

export default withStatus;
