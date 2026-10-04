import { cookieReach, lobes } from '../../lib/cookie.ts';

// Both outlines share one point per angle, so the browser can blend them
// point by point. Forty points per lobe keep the dialog's corners round.
const points = lobes * 40;

const steps = 8;

// Where a ray from the centre at `angle` leaves a width × height rectangle
// with rounded corners, relative to the centre.
function roundedRectPoint(angle: number, width: number, height: number, radius: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const edge = Math.min(halfWidth / Math.abs(cos), halfHeight / Math.abs(sin));
  const x = edge * cos;
  const y = edge * sin;

  if (Math.abs(x) <= halfWidth - radius || Math.abs(y) <= halfHeight - radius) {
    return [x, y] as const;
  }

  // The far crossing with the corner's circle.
  const cx = Math.sign(x) * (halfWidth - radius);
  const cy = Math.sign(y) * (halfHeight - radius);
  const along = cos * cx + sin * cy;
  const reach = along + Math.sqrt(along ** 2 - (cx ** 2 + cy ** 2 - radius ** 2));

  return [reach * cos, reach * sin] as const;
}

// Clip frames from the Portrait's cookie to the dialog's rounded rectangle,
// in percentages of the morph shape, which itself grows from the frame into
// the dialog. The cookie turns one lobe as its lobes smooth out, the way the
// theme reveal turns one lobe as it grows. The lobes flatten faster than the
// outlines blend, so the stretching shape never reads as a wobble.
function morphFrames(width: number, height: number, radius: number) {
  return Array.from({ length: steps + 1 }, (_, step) => {
    const progress = step / steps;
    const turn = (progress * Math.PI * 2) / lobes;

    const blend = (cookie: number, panel: number) =>
      (50 + cookie * (1 - progress) + panel * progress).toFixed(2);

    const polygon = Array.from({ length: points }, (__, index) => {
      const angle = (index / points) * Math.PI * 2;
      const cookie = 50 * cookieReach(angle - turn, 1 - progress);
      const [x, y] = roundedRectPoint(angle, width, height, radius);

      return `${blend(cookie * Math.cos(angle), (x / width) * 100)}% ${blend(cookie * Math.sin(angle), (y / height) * 100)}%`;
    });

    return { clipPath: `polygon(${polygon.join(',')})` };
  });
}

export { morphFrames };
