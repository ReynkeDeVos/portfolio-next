import { XIcon } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import type { Ref } from 'react';

import { Button } from '@/components/ui/button';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

// The Portrait viewer, a basic Material dialog: extra-large shape on
// surface-container-high, no shadow (tonal elevation). The modal dialog traps
// focus and returns it to the thumbnail. Escape and a click on the scrim ask
// to close, and `onDismiss` closes with the morph instead. The scrim fades in
// on opening, disappears at once on closing and carries the pointer cursor.
// The surface skips its own fade: the morph view transition grows it out of
// the thumbnail and fades the content in place.
// The large image is lazy, so it loads only once the viewer opens. Should it
// take longer than a moment, the Expressive loading indicator fades in where
// it will appear; a quick load never shows it.
function PortraitViewer({
  locale,
  ref,
  onDismiss,
}: {
  locale: Locale;
  ref: Ref<HTMLDialogElement>;
  onDismiss: () => void;
}) {
  const t = uiText[locale];
  const { portrait, fullPortrait } = contentFor(locale).profile;
  const [loaded, setLoaded] = useState(false);
  const photo = useRef<HTMLImageElement>(null);

  // After a reload the photo can come from the memory cache while the page is
  // still parsing, before React listens for its load event.
  useLayoutEffect(() => {
    if (photo.current?.complete) {
      // Only the element knows it has already loaded.
      // oxlint-disable-next-line react/set-state-in-effect
      setLoaded(true);
    }
  }, []);

  return (
    <dialog
      ref={ref}
      aria-label={portrait.alt}
      closedby='any'
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      className='rounded-xl-inc bg-surface-container-high text-on-surface view-transition-morph backdrop:bg-scrim backdrop:animate-fade-in fixed top-1/2 left-1/2 max-h-[calc(100dvh-2rem)] w-max max-w-[calc(100vw-2rem)] -translate-1/2 flex-col gap-4 p-4 backdrop:cursor-pointer open:flex sm:p-6'
    >
      {/* The close action sits in its own top row instead of floating over
          the photo, so the photo never hides it. Tonal fill keeps it legible
          in both themes, and as the first focusable element it receives
          initial focus. */}
      <Button
        variant='tonal'
        size='icon'
        aria-label={t.photoClose}
        title={t.photoClose}
        onClick={onDismiss}
        // The morph utility only names the button during the transition;
        // it leaves the Button's look alone.
        // oxlint-disable-next-line shadcn/no-restyle
        className='view-transition-morph-control -me-1 -mt-1 self-end sm:-me-2 sm:-mt-2'
      >
        <XIcon aria-hidden className='size-5' />
      </Button>
      {/* Both viewport axes bound the photo without another display crop.
          The height budget covers viewport margin, padding and the close row. */}
      <div className='rounded-inherit relative mx-auto'>
        <img
          ref={photo}
          src={fullPortrait.src}
          alt={fullPortrait.alt}
          width={fullPortrait.width}
          height={fullPortrait.height}
          loading='lazy'
          decoding='async'
          onLoad={() => {
            setLoaded(true);
          }}
          onError={() => {
            setLoaded(true);
          }}
          className='bg-surface-container view-transition-morph-content rounded-inherit h-auto w-[min(calc(100vw-5rem),calc((100dvh-10rem)*2/3),960px)] object-contain'
        />
        {loaded ? null : (
          <div className='animate-fade-in-late pointer-events-none absolute inset-0 grid place-items-center'>
            <LoadingIndicator label={t.photoLoading} />
          </div>
        )}
      </div>
    </dialog>
  );
}

export { PortraitViewer };
