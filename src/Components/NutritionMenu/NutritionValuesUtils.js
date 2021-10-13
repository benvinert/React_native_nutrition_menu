export const handleStringFixed = (valueString) => {
  if (typeof valueString == "string") {
    valueString = parseFloat(valueString).toFixed(2);
  } else {
    valueString = valueString.toFixed(2);
  }
  return valueString;
};
