import React from "react";
import { Route, Switch, NavLink, Link } from "react-router-dom";

import "../styles/index.scss";
import Home from "../containers/home";
import Blocks from "../containers/blocks";
import Block from "../containers/block";
import Transactions from "../containers/transactions";
import Transaction from "../containers/transaction";
import Assets from "../containers/assets";
import Asset from "../containers/asset";
import Addresses from "../containers/addresses";
import Address from "../containers/address";
import Contracts from "../containers/contracts";
import Contract from "../containers/contract";
import Search from "../containers/search";
import NotFound from "../containers/notFound";
import Navbar from "../components/shared/navbar";
import SvgIcon from "../components/shared/svgIcon";
import NetToggle from "../components/shared/netToggle";
import { Container, Row, Column } from "../components/shared/grid";
import SearchInput from "../components/search/searchInput";
import historyShape from "../shapes/historyShape";
import getSearchPath from "../helpers/getSearchPath";
import rssSvg from "../icons/rss.svg";
import twitterSvg from "../icons/twitter.svg";
import githubSvg from "../icons/github.svg";

export default class App extends React.Component {
  static displayName = "App";

  static propTypes = {
    history: historyShape.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { navOpen: false };
  }

  render = () => {
    return (
      <div className="app-component">
        <Navbar
          className="header"
          title="NEOverse Explorer"
          open={this.state.navOpen}
          onToggle={this.handleToggleNav}
          links={[
            <NavLink to="/blocks" onClick={this.handleToggleNav}>Blocks</NavLink>,
            <NavLink to="/transactions" onClick={this.handleToggleNav}>Transactions</NavLink>,
            <NavLink to="/addresses" onClick={this.handleToggleNav}>Addresses</NavLink>,
            <NavLink to="/assets" onClick={this.handleToggleNav}>Assets</NavLink>,
            <NavLink to="/contracts" onClick={this.handleToggleNav}>Contracts</NavLink>,
            <SearchInput className="search-input" onSearch={this.handleSearch} />,
            <NetToggle on={!process.env.RAZZLE_TESTNET} onToggle={this.handleToggleNet} />
          ]} />

        <div className="content">
          <Container>
            <Row>
              <Column s={12}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/blocks" component={Blocks} />
                  <Route exact path="/blocks/:hash" component={Block} />
                  <Route exact path="/transactions" component={Transactions} />
                  <Route exact path="/transactions/:txid" component={Transaction} />
                  <Route exact path="/addresses" component={Addresses} />
                  <Route exact path="/addresses/:address" component={Address} />
                  <Route exact path="/assets" component={Assets} />
                  <Route exact path="/assets/:txid" component={Asset} />
                  <Route exact path="/contracts" component={Contracts} />
                  <Route exact path="/contracts/:txid" component={Contract} />
                  <Route exact path="/search/:term" component={Search} />
                  <Route component={NotFound} />
                </Switch>
              </Column>
            </Row>
          </Container>
        </div>

        <div className="footer">
          <Container>
            <Row>
              <Column l={6}>
                <h5>Help NEOverse Grow</h5>
                <p>
                  The <a href="http://neoverse.io">NEOverse.io</a> domain is managed by one developer
                  in his spare time. If you would like to help the site going, please consider donating
                  NEO or GAS at the address below.
                </p>
                <p>
                  Donate:{" "}
                  <Link to="/addresses/APEo8vB7TnYbzmCJ49wSrFktdcGdojov11">
                    APEo8vB7TnYbzmCJ49wSrFktdcGdojov11
                  </Link>
                </p>
              </Column>

              <Column l={4} lOffset={2}>
                <h5>Social</h5>
                <ul>
                  <li>
                    <SvgIcon svg={rssSvg} />
                    <a href="https://steemit.com/@neoverse" target="_blank" rel="noopener noreferrer">
                      Blog
                    </a>
                  </li>
                  <li>
                    <SvgIcon svg={twitterSvg} />
                    <a href="https://twitter.com/NEOverse_io" target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <SvgIcon svg={githubSvg} />
                    <a href="https://github.com/neoverse/explorer" target="_blank" rel="noopener noreferrer">
                      Github
                    </a>
                  </li>
                </ul>
              </Column>
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  handleToggleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  }

  handleToggleNet = (value) => {
    const { location } = window;
    const { host, href } = location;

    const newHost = value
      ? host.replace("testnet.", "explorer.")
      : host.replace("explorer.", "testnet.");

    location.href = href.replace(host, newHost);
  }

  handleSearch = (term) => {
    this.setState({ navOpen: false }, () => {
      this.props.history.push(getSearchPath(term));
    });
  }
}
