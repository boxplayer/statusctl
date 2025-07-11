export function makeFxAxis(values: number[]) {
  const step = 0.01;
  const min = Math.min(...values);
  const max = Math.max(...values);

  // snap down/up to nearest 0.01
  const floor = Math.floor(min / step) * step;
  const ceil = Math.ceil(max / step) * step;

  // build tick array
  const ticks: number[] = [];
  for (let v = floor; v <= ceil + 1e-9; v += step) ticks.push(+v.toFixed(2));

  return { domain: [floor, ceil] as const, ticks };
}
