import { XIcon } from 'lucide-react';
import { Dialog } from 'radix-ui';

import { Button } from '@/components/ui/button';
import { contentFor } from '@/content/content';
import { copy } from '@/copy/copy';
import type { Locale } from '@/lib/locale';

// The Portrait viewer's surface, rendered inside the Portrait's Dialog root.
// Basic Material dialog: extra-large shape on surface-container-high, no
// shadow (tonal elevation). Radix keeps the focus trap, Escape and outside
// dismissal, and returns focus to the thumbnail.
// The surface skips its own fade: the morph view transition grows it out of
// the thumbnail and fades the content in place.
// Content mounts only while open, so the large image loads on demand.
function PortraitViewer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { portrait, fullPortrait } = contentFor(locale).profile;

  return (
    <Dialog.Portal>
      {/* Material scrim. Clicking it dismisses, so it carries the pointer
          cursor. Opening fades in; closing unmounts immediately without an
          exit animation. */}
      <Dialog.Overlay className='bg-scrim data-[state=open]:animate-fade-in fixed inset-0 z-50 cursor-pointer' />
      <Dialog.Content
        aria-describedby={undefined}
        className='rounded-xl-inc bg-surface-container-high text-on-surface view-transition-morph fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-max max-w-[calc(100vw-2rem)] -translate-1/2 flex-col gap-4 p-4 outline-none sm:p-6'
      >
        {/* The close action sits in its own top row instead of floating over
            the photo, so the photo never hides it. Tonal fill keeps it legible
            in both themes, and as the first focusable element it receives
            initial focus. */}
        <Dialog.Close asChild>
          <Button
            variant='tonal'
            size='icon'
            aria-label={t.photoClose}
            title={t.photoClose}
            // The morph utility only names the button during the transition;
            // it leaves the Button's look alone.
            // oxlint-disable-next-line shadcn/no-restyle
            className='view-transition-morph-control -me-1 -mt-1 self-end sm:-me-2 sm:-mt-2'
          >
            <XIcon aria-hidden className='size-5' />
          </Button>
        </Dialog.Close>
        <Dialog.Title className='sr-only'>{portrait.alt}</Dialog.Title>
        {/* Both viewport axes bound the photo without another display crop.
            The height budget covers viewport margin, padding and the close row. */}
        <img
          src={fullPortrait.src}
          alt={fullPortrait.alt}
          width={fullPortrait.width}
          height={fullPortrait.height}
          decoding='async'
          className='bg-surface-container view-transition-morph-content rounded-inherit mx-auto h-auto w-[min(calc(100vw-5rem),calc((100dvh-10rem)*2/3),960px)] object-contain'
        />
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export { PortraitViewer };
