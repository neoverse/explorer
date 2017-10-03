import { compose } from "recompose";

import withStatus from "../hocs/withStatus";
import withTitle from "../hocs/withTitle";
import NotFound from "../components/notFound";

export default compose(
  withStatus(404),
  withTitle("Not Found")
)(NotFound);
