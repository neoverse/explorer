// import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import numeral from "numeral";

import AxisLabel from "./axisLabel";

const { string, object, arrayOf } = PropTypes;

export default class Home extends React.Component {
  static displayName = "Home";

  static propTypes = {
    data: arrayOf(object).isRequired,
    dateKey: string,
    countKey: string
  };

  static defaultProps = {
    dateKey: "date",
    countKey: "count"
  };

  render = () => {
    return (
      <ResponsiveContainer width="100%" height={300} className="transaction-history-chart-component">
        <LineChart data={this.props.data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
          <XAxis
            dataKey={this.props.dateKey}
            type="category"
            interval={0}
            tickFormatter={this.renderDate} />
          <YAxis
            label={this.renderAxisLabel("y", "# of Transactions")}
            scale="linear"
            axisLine={false}
            tickLine={false}
            tickFormatter={this.renderCount}
            domain={["auto", "auto"]} />
          <CartesianGrid
            stroke="#ccc"
            vertical={false} />
          <Tooltip
            formatter={this.handleFormatValue}
            labelFormatter={this.handleFormatLabel} />
          <Line
            dataKey={this.props.countKey}
            type="monotone"
            stroke="#8884d8"
            animationDuration={500}
            animationEasing="ease-out" />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  renderAxisLabel = (axisType, label = null) => {
    return ({ viewBox }) => <AxisLabel axisType={axisType} {...viewBox}>{label}</AxisLabel>;
  }

  renderDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  renderCount = (count) => {
    return numeral(count).format("0a");
  }

  handleFormatValue = (value) => {
    return numeral(value).format("0,0");
  }

  handleFormatLabel = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
}
