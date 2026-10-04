import { XIcon } from 'lucide-react';
import type { Ref } from 'react';

import { Button } from '@/components/ui/button';
import { contentFor } from '@/content/content';
import { copy } from '@/copy/copy';
import type { Locale } from '@/lib/locale';

// The Portrait viewer, a basic Material dialog: extra-large shape on
// surface-container-high, no shadow (tonal elevation). The modal dialog traps
// focus and returns it to the thumbnail. Escape and a click on the scrim ask
// to close, and `onDismiss` closes with the morph instead. The scrim fades in
// on opening, disappears at once on closing and carries the pointer cursor.
// The surface skips its own fade: the morph view transition grows it out of
// the thumbnail and fades the content in place.
// The large image is lazy, so it loads only once the viewer opens.
function PortraitViewer({
  locale,
  ref,
  onDismiss,
}: {
  locale: Locale;
  ref: Ref<HTMLDialogElement>;
  onDismiss: () => void;
}) {
  const t = copy[locale];
  const { portrait, fullPortrait } = contentFor(locale).profile;

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
      <img
        src={fullPortrait.src}
        alt={fullPortrait.alt}
        width={fullPortrait.width}
        height={fullPortrait.height}
        loading='lazy'
        decoding='async'
        className='bg-surface-container view-transition-morph-content rounded-inherit mx-auto h-auto w-[min(calc(100vw-5rem),calc((100dvh-10rem)*2/3),960px)] object-contain'
      />
    </dialog>
  );
}

export { PortraitViewer };
