const lobes = 12;

// How far the cookie reaches at `angle`, as a share of its radius. A smaller
// `depth` flattens the lobes towards a circle.
function cookieReach(angle: number, depth = 1) {
  return 0.94 + 0.06 * depth * Math.cos(lobes * angle);
}

// The twelve-lobe "cookie" from the Expressive shape set, centred on (x, y)
// and turned by `turn` radians. Peaks reach `radius`; valleys sit at 88% of it,
// or closer to the peaks with a smaller `depth`.
function cookiePath(radius: number, x = 0, y = 0, turn = 0, depth = 1) {
  const points = lobes * 16;
  let path = '';

  for (let index = 0; index < points; index += 1) {
    const angle = (index / points) * Math.PI * 2;
    const length = radius * cookieReach(angle, depth);
    const px = x + length * Math.cos(angle + turn);
    const py = y + length * Math.sin(angle + turn);
    path += `${index === 0 ? 'M' : 'L'}${px.toFixed(4)} ${py.toFixed(4)}`;
  }

  return `${path}Z`;
}

export { cookiePath, cookieReach, lobes };
