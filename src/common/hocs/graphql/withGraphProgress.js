import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { wrapDisplayName } from "recompose";

const { bool, number, object, func, shape } = PropTypes;

const dataShape = shape({
  loading: bool,
  error: object,
  networkStatus: number.isRequired,
  variables: object,
  refetch: func.isRequired,
  fetchMore: func.isRequired,
  updateQuery: func.isRequired,
  startPolling: func.isRequired,
  stopPolling: func.isRequired,
  subscribeToMore: func.isRequired
});

const withGraphProgress = ({ Loading, Failed }) => (Component) => {
  return class ComponentWithProgress extends React.Component {
    static displayName = wrapDisplayName(Component, "withGraphProgress");

    static propTypes = {
      data: dataShape.isRequired
    };

    render = () => {
      const { data } = this.props;

      const passDownProps = _.omit(this.props, "data");
      const passDownData = _.omit(data, "loading", "error", "networkStatus", "variables", "refetch",
        "fetchMore", "updateQuery", "startPolling", "stopPolling", "subscribeToMore");

      if (data.loading) {
        return <Loading {...passDownProps} />;
      } else if (data.error) {
        return <Failed {...passDownProps} />;
      } else {
        return <Component {...passDownProps} {...passDownData} />;
      }
    }
  };
};

export default withGraphProgress;
