import React from "react";
import { Link } from "react-router-dom";

export default class NotFound extends React.Component {
  static displayName = "NotFound";

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
