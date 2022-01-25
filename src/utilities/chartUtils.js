export function getMaxValue(data, key) {
  return Math.max.apply(Math, data.map(function(o) { return o[key]; }))
}

export function getMinValue(data, key) {
  return Math.min.apply(Math, data.map(function(o) { return o[key]; }))
}

export function getTicks(tickAmount, data, key) {
  const maxVal = getMaxValue(data, key);
  const minVal = getMinValue(data, key);
  const step = (maxVal - minVal) / tickAmount;
  const steps = Array.from(Array(tickAmount + 2).keys());
  return steps.map((tick) => tick * step);
}
