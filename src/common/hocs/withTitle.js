import _ from "lodash";
import React from "react";
import DocumentTitle from "react-document-title";

import defaultTitle from "../values/defaultTitle";

const withTitle = (title = defaultTitle) => (Component) => {
  return class ComponentWithTitle extends React.Component {
    render = () => {
      return (
        <DocumentTitle title={this.getDocumentTitle()}>
          <Component {...this.props} />
        </DocumentTitle>
      );
    }

    getDocumentTitle = () => {
      const documentTitle = _.isFunction(title) ? title(this.props) : title;
      return documentTitle === defaultTitle ? defaultTitle : `${documentTitle} | ${defaultTitle}`;
    }
  };
};

export default withTitle;
