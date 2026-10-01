import { cn } from 'cn';
import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { Button } from '@/components/ui/button';

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />;
}

// Material scrim. Clicking it dismisses, so it carries the pointer cursor.
// Opening fades in; closing unmounts immediately without an exit animation.
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot='dialog-overlay'
      className={cn(
        'fixed inset-0 z-50 cursor-pointer bg-scrim data-[state=open]:animate-fade-in',
        className,
      )}
      {...props}
    />
  );
}

// Basic Material dialog: extra-large shape on surface-container-high, no
// shadow (tonal elevation). Radix keeps the focus trap, Escape and outside
// dismissal, and returns focus to the trigger.
// The close action sits in its own top row instead of floating over content,
// so media never hides it. Tonal fill keeps it legible in both themes, and as
// the first focusable element it receives initial focus.
function DialogContent({
  className,
  children,
  closeLabel,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  /** Accessible label for the corner close button; omit to hide it. */
  closeLabel?: string;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot='dialog-content'
        className={cn(
          'fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-max max-w-[calc(100vw-2rem)] -translate-1/2 flex-col gap-4 rounded-xl bg-surface-container-high p-4 text-on-surface outline-none data-[state=open]:animate-fade-in sm:p-6',
          className,
        )}
        {...props}
      >
        {closeLabel ? (
          <DialogPrimitive.Close asChild>
            <Button
              variant='tonal'
              size='icon'
              aria-label={closeLabel}
              title={closeLabel}
              className='-me-1 -mt-1 self-end sm:-me-2 sm:-mt-2'
            >
              <XIcon aria-hidden className='size-5' />
            </Button>
          </DialogPrimitive.Close>
        ) : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={cn('type-title-lg font-emphasized text-on-surface', className)}
      {...props}
    />
  );
}

export { Dialog, DialogContent, DialogTitle, DialogTrigger };
