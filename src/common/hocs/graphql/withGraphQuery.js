import _ from "lodash";
import { graphql } from "react-apollo";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

// const isServer = typeof window !== "object";

const DEFAULT_OPTIONS = {
  // TODO: Using the "network-first" fetchPolicy *should* prevent caching on the server, but it's
  //       not due to a bug in react-apollo.  Need to closely follow this issue to fix ASAP.  Until
  //       then, the `ssr: false` option allows the loading state to be returned from the server.
  //       (https://github.com/apollographql/react-apollo/issues/556)
  // fetchPolicy: isServer ? "network-first" : "cache-and-network"
  ssr: false
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
