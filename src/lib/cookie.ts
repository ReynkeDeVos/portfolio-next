const lobes = 12;

// The twelve-lobe "cookie" from the Expressive shape set, centred on (x, y)
// and turned by `turn` radians. Peaks reach `radius`; valleys sit at 94% of it.
function cookiePath(radius: number, x = 0, y = 0, turn = 0) {
  const points = lobes * 16;
  let path = '';

  for (let index = 0; index < points; index += 1) {
    const angle = (index / points) * Math.PI * 2;
    const length = radius * (0.94 + 0.06 * Math.cos(lobes * angle));
    const px = x + length * Math.cos(angle + turn);
    const py = y + length * Math.sin(angle + turn);
    path += `${index === 0 ? 'M' : 'L'}${px.toFixed(4)} ${py.toFixed(4)}`;
  }

  return `${path}Z`;
}

export { cookiePath, lobes };
