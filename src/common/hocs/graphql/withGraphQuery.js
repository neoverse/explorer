import { graphql } from "react-apollo";
import { compose, setDisplayName, wrapDisplayName } from "recompose";

const withGraphQuery = (query, options = {}) => (Component) => {
  return compose(
    graphql(query, options),
    setDisplayName(wrapDisplayName(Component, "withGraphQuery"))
  )(Component);
};

export default withGraphQuery;
