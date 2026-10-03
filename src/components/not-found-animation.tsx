import type { AnimationItem } from 'lottie-web';
import { useEffect, useRef } from 'react';

import animationUrl from '@/assets/not-found-cat.json?url';

// The cat is decorative and only ships with the 404 page: the light SVG player
// and the animation load after hydration into a box that already has the final
// size, so nothing shifts. Reduced motion shows the first frame as a still. If
// either request fails, the box stays empty and the page reads the same.
function NotFoundAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let animation: AnimationItem | null = null;

    async function start() {
      try {
        const [{ default: lottie }, response] = await Promise.all([
          import('lottie-web/build/player/lottie_light'),
          // fallow-ignore-next-line security-sink -- a bundled asset URL
          fetch(animationUrl),
        ]);

        const animationData: unknown = await response.json();

        if (cancelled || !container.current) {
          return;
        }

        const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
        animation = lottie.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: !still,
          autoplay: !still,
          animationData,
        });

        if (still) {
          animation.goToAndStop(0, true);
        }
      } catch {
        // Decorative only; the heading and link carry the page.
      }
    }

    void start();

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, []);

  return <div ref={container} aria-hidden className='aspect-424/403 w-56' />;
}

export { NotFoundAnimation };
