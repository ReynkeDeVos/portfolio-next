// Shapes from the Material 3 Expressive set as radial outlines: each maps an
// angle to how far the outline reaches from the centre, as a share of the
// radius. Sampling any two at the same angles gives polygons with matching
// points, which the browser blends point by point.
type Outline = (angle: number) => number;

// Rounded lobes whose valleys sit at 1 - depth, like the Portrait's cookie.
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

    return (
      Math.cos(Math.PI / sides) / Math.cos((within - sector / 2) * (1 - rounding)) / corner
    );
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

type ShapeName = keyof typeof outlines;

const points = 72;

// The shape as a CSS polygon() filling its box.
function shapePolygon(name: ShapeName) {
  const outline = outlines[name];
  const list = Array.from({ length: points }, (_, index) => {
    const angle = (index / points) * Math.PI * 2;
    const reach = 50 * outline(angle);

    return `${(50 + reach * Math.cos(angle)).toFixed(2)}% ${(50 + reach * Math.sin(angle)).toFixed(2)}%`;
  });

  return `polygon(${list.join(',')})`;
}

export { shapePolygon };

export type { ShapeName };
