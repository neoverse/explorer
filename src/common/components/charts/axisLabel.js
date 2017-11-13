import React from "react";
import PropTypes from "prop-types";

const { string, number, oneOf } = PropTypes;

export default function AxisLabel({ axisType, x, y, width, height, stroke, children }) {
  const isVert = axisType === "y";
  const cx = isVert ? x : x + (width / 2);
  const cy = isVert ? (height / 2) + y : y + height + 10;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
      {children}
    </text>
  );
}

AxisLabel.propTypes = {
  axisType: oneOf(["x", "y"]).isRequired,
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string
};
