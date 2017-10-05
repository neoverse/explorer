// TODO: make this function remove trailing 0's after the decimal
export default function normalizeDecimal(number, precision) {
  return number.toFixed(precision);
}
