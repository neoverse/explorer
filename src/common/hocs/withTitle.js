import _ from "lodash";
import React from "react";
import DocumentTitle from "react-document-title";

import defaultTitle from "../values/defaultTitle";

const withTitle = (title = defaultTitle) => (Component) => {
  return class ComponentWithTitle extends React.Component {
    render = () => {
      return (
        <DocumentTitle title={_.isFunction(title) ? title(this.props) : title}>
          <Component {...this.props} />
        </DocumentTitle>
      );
    }
  };
};

export default withTitle;
