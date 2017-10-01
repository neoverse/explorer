import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const { string } = PropTypes;

export default class NotFound extends React.Component {
  static displayName = "NotFound";

  static propTypes = {
    url: string.isRequired
  };

  render = () => {
    return (
      <div>
        <h2>Not Found</h2>
        <p>The page you were looking for was not found.</p>
        <p><Link to="/">Return home</Link></p>
      </div>
    );
  }
}
