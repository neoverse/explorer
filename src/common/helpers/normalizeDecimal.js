export default function normalizeDecimal(number, precision) {
  const [integer, decimal] = number.toFixed(precision).split(".");

  if (decimal) {
    return `${integer}.${decimal.replace(/0+$/, "")}`.replace(/\.$/, "");
  } else {
    return integer;
  }
}
