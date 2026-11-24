// Shapes from the Material 3 Expressive set as radial outlines: each maps an
// angle to how far the outline reaches from the centre, as a share of the
// radius. Sampling any two at the same angles gives polygons with matching
// points, which the browser blends point by point.
type Outline = (angle: number) => number;

// Rounded lobes whose valleys sit at 1 - depth.
function lobed(count: number, depth: number): Outline {
  return (angle) => 1 - depth / 2 + (depth / 2) * Math.cos(count * angle);
}

// Lobes with narrower peaks, for the burst.
function burst(count: number, depth: number): Outline {
  return (angle) => 1 - depth + depth * ((1 + Math.cos(count * angle)) / 2) ** 2;
}

// A regular polygon, one corner up. Shrinking the angle within each side
// rounds the corners off while the sides stay nearly straight.
function polygon(sides: number, rounding: number): Outline {
  const sector = (Math.PI * 2) / sides;
  const corner = Math.cos(Math.PI / sides) / Math.cos((Math.PI / sides) * (1 - rounding));

  return (angle) => {
    const within = (((angle + Math.PI / 2) % sector) + sector) % sector;

    return Math.cos(Math.PI / sides) / Math.cos((within - sector / 2) * (1 - rounding)) / corner;
  };
}

// A horizontal stadium whose height is `height` of its length.
function pill(height: number): Outline {
  return (angle) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const flat = 1 - height;

    if (Math.abs((height * cos) / sin) <= flat) {
      return height / Math.abs(sin);
    }

    const centre = Math.sign(cos) * flat;

    return cos * centre + Math.sqrt((cos * centre) ** 2 - centre ** 2 + height ** 2);
  };
}

// An ellipse with the given minor axis, turned by `turn` radians.
function oval(minor: number, turn: number): Outline {
  return (angle) => minor / Math.hypot(minor * Math.cos(angle - turn), Math.sin(angle - turn));
}

const outlines = {
  softBurst: burst(10, 0.22),
  cookie9: lobed(9, 0.16),
  pentagon: polygon(5, 0.35),
  pill: pill(0.62),
  sunny: lobed(8, 0.12),
  cookie4: lobed(4, 0.22),
  oval: oval(0.72, -Math.PI / 4),
} satisfies Record<string, Outline>;

type OutlineName = keyof typeof outlines;

const polygonPoints = 72;

const polygonCache = new Map<OutlineName, string>();

// The outline as a CSS polygon() filling its box.
function outlinePolygon(name: OutlineName) {
  const cached = polygonCache.get(name);

  if (cached !== undefined) {
    return cached;
  }

  const outline = outlines[name];

  const list = Array.from({ length: polygonPoints }, (_, index) => {
    const angle = (index / polygonPoints) * Math.PI * 2;
    const reach = 50 * outline(angle);

    return `${(50 + reach * Math.cos(angle)).toFixed(2)}% ${(50 + reach * Math.sin(angle)).toFixed(2)}%`;
  });

  const value = `polygon(${list.join(',')})`;
  polygonCache.set(name, value);

  return value;
}

// Twelve-lobe "cookie" from the Expressive shape set, shared by the Portrait
// frame, its dialog morph and the theme reveal. A smaller `depth` flattens the
// lobes towards a circle at 94% of the radius so small blooms stay round.
const cookieLobes = 12;

function cookieReach(angle: number, depth = 1) {
  return 0.94 + 0.06 * depth * Math.cos(cookieLobes * angle);
}

// The cookie centred on (x, y) and turned by `turn` radians as an SVG path.
function cookiePath(radius: number, x = 0, y = 0, turn = 0, depth = 1) {
  const points = cookieLobes * 16;
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

  const cx = Math.sign(x) * (halfWidth - radius);
  const cy = Math.sign(y) * (halfHeight - radius);
  const along = cos * cx + sin * cy;
  const reach = along + Math.sqrt(Math.max(0, along ** 2 - (cx ** 2 + cy ** 2 - radius ** 2)));

  return [reach * cos, reach * sin] as const;
}

// Clip frames from the Portrait's cookie to a rounded dialog box, turning one
// lobe while flattening the lobes so the stretching shape never wobbles.
function morphFrames(width: number, height: number, radius: number) {
  if (width <= 0 || height <= 0) {
    return [];
  }

  const clampedRadius = Math.min(radius, width / 2, height / 2);
  // Forty points per lobe keep the dialog's corners round.
  const points = cookieLobes * 40;
  const steps = 8;

  return Array.from({ length: steps + 1 }, (_, step) => {
    const progress = step / steps;
    const turn = (progress * Math.PI * 2) / cookieLobes;

    const blend = (cookie: number, panel: number) =>
      (50 + cookie * (1 - progress) + panel * progress).toFixed(2);

    const list = Array.from({ length: points }, (__, index) => {
      const angle = (index / points) * Math.PI * 2;
      const cookie = 50 * cookieReach(angle - turn, 1 - progress);
      const [x, y] = roundedRectPoint(angle, width, height, clampedRadius);

      return `${blend(cookie * Math.cos(angle), (x / width) * 100)}% ${blend(cookie * Math.sin(angle), (y / height) * 100)}%`;
    });

    return { clipPath: `polygon(${list.join(',')})` };
  });
}

// The radius at which the reveal's lobes reach their full depth, about the
// largest Portrait frame's, and the deepest they get in pixels, so lobes stop
// growing into deep scallops along large viewports.
const fullLobes = 72;

const deepestLobe = 80;

const lobeSpan = cookieReach(0) - cookieReach(Math.PI / cookieLobes);

function revealLobeDepth(radius: number) {
  return Math.min(1, radius / fullLobes, deepestLobe / (lobeSpan * radius));
}

// Clip frames growing a cookie out of (x, y) until it clears every corner of
// the viewport, turning one lobe along the way.
function cookieRevealFrames(x: number, y: number, viewportWidth: number, viewportHeight: number) {
  const corners = [
    [0, 0],
    [viewportWidth, 0],
    [0, viewportHeight],
    [viewportWidth, viewportHeight],
  ] as const;

  const reaching = (depth: number) =>
    Math.max(
      ...corners.map(
        ([cx, cy]) => Math.hypot(cx - x, cy - y) / cookieReach(Math.atan2(cy - y, cx - x), depth),
      ),
    );

  let radius = reaching(1);

  for (let round = 0; round < 3; round += 1) {
    radius = reaching(revealLobeDepth(radius));
  }

  const steps = 22;

  return Array.from({ length: steps + 1 }, (_, step) => {
    const grown = (radius * step) / steps;
    const turn = (step / steps) * ((Math.PI * 2) / cookieLobes);

    return { clipPath: `path('${cookiePath(grown, x, y, turn, revealLobeDepth(grown))}')` };
  });
}

export { cookieLobes, cookiePath, cookieRevealFrames, morphFrames, outlinePolygon };

export type { OutlineName };
