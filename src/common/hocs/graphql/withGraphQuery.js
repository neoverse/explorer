import _ from "lodash";
import { graphql } from "react-apollo";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

const DEFAULT_OPTIONS = {
  fetchPolicy: "network-first"
};

function wrapOptions(baseOptions) {
  return (...args) => {
    const result = baseOptions(...args);
    return { ...DEFAULT_OPTIONS, ...result };
  };
}

function extendOptions(baseOptions) {
  return { ...DEFAULT_OPTIONS, ...baseOptions };
}

const withGraphQuery = (query, baseConfig = {}) => (Component) => {
  const baseOptions = baseConfig.options || {};
  const options = _.isFunction(baseOptions) ? wrapOptions(baseOptions) : extendOptions(baseOptions);
  const config = { ...baseConfig, options };

  return compose(
    graphql(query, config),
    setDisplayName(wrapDisplayName(Component, "withGraphQuery"))
  )(Component);
};

export default withGraphQuery;
