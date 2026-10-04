import stillUrl from '@/assets/console/hello-there-still.avif?no-inline';
import animationUrl from '@/assets/console/hello-there.avif?no-inline';

// The images stay separate fingerprinted files instead of entering the
// bundle. DevTools only accepts data: URLs in console CSS, so the selected
// file is fetched and converted at startup. A closed Console buffers the
// messages, so visitors see them whenever they open it.

const sourceUrl = 'https://github.com/ReynkeDeVos/portfolio-next';

// DevTools drops width and height, so the padding box sets a 320x160 area. The
// 480x240 image is the source's full resolution: 2x screens draw that area
// with 640x320 pixels and would blur a 320x160 file.
const imageStyle = (dataUrl: string) =>
  'font-size:0;line-height:0;padding:80px 160px;' +
  `background:url("${dataUrl}") center / contain no-repeat`;

// Self-contained colors from the dark theme stay readable in both DevTools
// themes. The URL stays unstyled so DevTools gives it a theme-aware link color.
const line = (color: string, font: string) =>
  `color:${color};background:oklch(25.5% 0.016 60);font:${font} system-ui,sans-serif;` +
  'padding:3px 10px;border-radius:6px';

const headingStyle = line('oklch(80% 0.08 145)', '700 15px/1.7');

const linkStyle = line('oklch(78% 0.1 50)', 'italic 12px/1.7');

const copy = {
  opening: '…and welcome fellow dev! 👋',
  fallbackOpening: 'Hello there, and welcome fellow dev! 👋',
  link: 'Curious how this site is built? The source is on GitHub:',
};

function logGreeting(withImage: boolean) {
  console.log(
    `%c${withImage ? copy.opening : copy.fallbackOpening}%c\n%c${copy.link}%c\n${sourceUrl}`,
    headingStyle,
    '',
    linkStyle,
    '',
  );
}

// Only called with the two bundled greeting images.
async function loadDataUrl(url: string) {
  // fallow-ignore-next-line security-sink
  const response = await fetch(url, { priority: 'low', signal: AbortSignal.timeout(20_000) });

  if (!response.ok) {
    throw new Error(`Console greeting image returned ${response.status}`);
  }

  const bytes = await response.bytes();

  return `data:image/avif;base64,${bytes.toBase64()}`;
}

async function startConsoleGreeting() {
  // Phones and tablets have no built-in DevTools, so they skip the download.
  // Remote debugging from a desktop still shows the text greeting.
  if (matchMedia('(pointer: coarse)').matches) {
    logGreeting(false);

    return;
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  try {
    const dataUrl = await loadDataUrl(reducedMotion ? stillUrl : animationUrl);
    console.log('%c\u00A0', imageStyle(dataUrl));
    logGreeting(true);
  } catch {
    logGreeting(false);
  }
}

export { startConsoleGreeting };
