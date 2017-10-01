export default function normalizeDecimal(number, precision) {
  return number.toFixed(precision).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, "$1");
}
