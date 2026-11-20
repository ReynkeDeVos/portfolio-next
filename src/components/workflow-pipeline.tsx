import { cn } from 'cn';
import { Compass, Rocket, ShieldCheck, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { CSSProperties } from 'react';

import { Button } from '@/components/ui/button';
import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { outlinePolygon } from '@/lib/outlines';
import type { OutlineName } from '@/lib/outlines';
import { uiText } from '@/ui-text/ui-text';

import { LinkChips } from './section-parts';
import { SegmentPill, segmentGroup } from './site-controls';

type StageMark = { outline: OutlineName; Icon: LucideIcon };

const defaultStageMark: StageMark = { outline: 'pentagon', Icon: Compass };

const stageMarks = new Map<string, StageMark>([
  ['plan', defaultStageMark],
  ['build', { outline: 'cookie4', Icon: Terminal }],
  ['review', { outline: 'softBurst', Icon: ShieldCheck }],
  ['ship', { outline: 'sunny', Icon: Rocket }],
]);

const badgeFillByEmphasis = {
  quiet: 'bg-surface-container-highest scale-90',
  primary: 'bg-primary-container',
  review: 'bg-tertiary-container rotate-12',
} as const;

const iconByEmphasis = {
  quiet: 'text-on-surface-variant',
  primary: 'text-on-primary-container',
  review: 'text-on-tertiary-container',
} as const;

const statusByEmphasis = {
  quiet: 'bg-surface-container-highest text-on-surface-variant',
  primary: 'bg-primary-container text-on-primary-container',
  review: 'bg-tertiary-container text-on-tertiary-container',
} as const;

type WorkflowTier = ReturnType<typeof contentFor>['workflow']['ai']['tiers'][number];

// Only the clipped Expressive outline turns and scales on emphasis changes;
// the icon itself stays upright, matching the Portrait frame's motion grammar.
function StageBadge({ id, emphasis }: { id: string; emphasis: keyof typeof badgeFillByEmphasis }) {
  const { outline, Icon } = stageMarks.get(id) ?? defaultStageMark;
  const clip: CSSProperties = { '--stage-outline': outlinePolygon(outline) };

  return (
    <span aria-hidden className='relative z-10 grid size-10 shrink-0 place-items-center'>
      <span
        style={clip}
        className={cn(
          'ease-spatial absolute inset-0 transition-transform duration-300 [clip-path:var(--stage-outline)]',
          badgeFillByEmphasis[emphasis],
        )}
      />
      <Icon className={cn('relative size-4.5', iconByEmphasis[emphasis])} />
    </span>
  );
}

// Three gentle pulsing dots represent independent model families deliberating
// together on medium and high-risk diffs. Rendered in inactive rows too (without
// animating) so wrapping never shifts card height on narrow screens.
function CouncilDots({ active }: { active: boolean }) {
  const dotClass = cn('bg-tertiary size-1.5 rounded-full', active && 'workflow-council-dot');

  return (
    <span aria-hidden className='inline-flex items-center gap-1 ps-0.5'>
      <span className={dotClass} />
      <span className={dotClass} />
      <span className={dotClass} />
    </span>
  );
}

function StageRow({
  stage,
  index,
  hasNext,
  activeTierId,
  tiers,
}: {
  stage: WorkflowTier['stages'][number];
  index: number;
  hasNext: boolean;
  activeTierId: WorkflowTier['id'];
  tiers: readonly WorkflowTier[];
}) {
  return (
    <li className={cn('relative flex items-start gap-4', hasNext && 'pb-5')}>
      {/* Each connector runs from this badge's centre to the next badge's
          centre behind the opaque z-10 outlines, so no polygon leaves a gap
          and the rail always terminates cleanly on the last stage. */}
      {hasNext ? (
        <span
          aria-hidden
          className='bg-outline-variant pointer-events-none absolute top-5 -bottom-5 left-5 w-0.5 -translate-x-1/2 overflow-hidden rounded-full'
        >
          <span
            data-tier={activeTierId}
            data-step={index}
            className={cn(
              'workflow-rail-pulse block h-5 w-full rounded-full',
              activeTierId === 'high' ? 'bg-tertiary' : 'bg-primary',
            )}
          />
        </span>
      ) : null}

      <StageBadge id={stage.id} emphasis={stage.emphasis} />
      <div className='grid min-w-0 flex-1 pt-0.5'>
        {tiers.map((tier) => {
          const candidate = tier.stages[index];

          if (!candidate) {
            return null;
          }

          const isActive = tier.id === activeTierId;

          return (
            <div
              key={tier.id}
              aria-hidden={!isActive || undefined}
              className={cn(
                'col-start-1 row-start-1',
                !isActive && 'pointer-events-none invisible select-none',
              )}
            >
              <div className='flex flex-wrap items-center gap-2'>
                {isActive ? (
                  <h4 className='type-title-sm text-on-surface font-semibold'>{candidate.title}</h4>
                ) : (
                  <span className='type-title-sm text-on-surface font-semibold'>
                    {candidate.title}
                  </span>
                )}
                <span
                  className={cn(
                    'type-label-md rounded-xs px-2 py-0.5 font-medium',
                    statusByEmphasis[candidate.emphasis],
                  )}
                >
                  {candidate.status}
                </span>
                {candidate.id === 'review' && candidate.emphasis === 'review' ? (
                  <CouncilDots active={isActive} />
                ) : null}
              </div>
              <p className='type-body-md text-on-surface-variant mt-1 max-w-[60ch]'>
                {candidate.summary}
              </p>
            </div>
          );
        })}
      </div>
    </li>
  );
}

// Interactive risk-tiered AI workflow visualizer. Starts on High risk so
// spec-driven planning, reviewer councils and open-code-review are visible on
// first glance, while smaller tiers show how ceremony scales down. All tiers
// share each stage's grid cell invisibly so switching tiers never shifts height.
function WorkflowPipeline({ locale }: { locale: Locale }) {
  const t = uiText[locale].aiPipeline;
  const { tiers } = contentFor(locale).workflow.ai;
  const initialTier = tiers.at(-1)?.id ?? 'high';
  const [selectedId, setSelectedId] = useState(initialTier);

  const activeIndex = Math.max(
    0,
    tiers.findIndex((tier) => tier.id === selectedId),
  );

  const activeTier = tiers[activeIndex];

  if (!activeTier) {
    return null;
  }

  return (
    <section
      aria-labelledby='ai-pipeline-heading'
      className='rounded-xl-inc bg-surface-group flex flex-col gap-5 p-5 sm:p-6'
    >
      <div className='flex flex-col gap-1'>
        <h3 id='ai-pipeline-heading' className='type-title-lg text-on-surface font-semibold'>
          {t.heading}
        </h3>
        <p className='type-body-md text-on-surface-variant max-w-[64ch]'>{t.lead}</p>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-3'>
        <fieldset aria-label={t.tierLabel} className={cn(segmentGroup, 'w-full sm:w-fit')}>
          <SegmentPill index={activeIndex} />
          {tiers.map((tier) => (
            <Button
              key={tier.id}
              type='button'
              variant='segment'
              size='segment'
              aria-pressed={tier.id === activeTier.id}
              onClick={() => {
                setSelectedId(tier.id);
              }}
            >
              {tier.label}
            </Button>
          ))}
        </fieldset>

        <div className='grid justify-items-start sm:justify-items-end'>
          {tiers.map((tier) => {
            const isActive = tier.id === activeTier.id;

            return (
              <p
                key={tier.id}
                aria-hidden={!isActive || undefined}
                className={cn(
                  'bg-surface-container-highest type-label-md text-on-surface-variant col-start-1 row-start-1 rounded-xs px-2.5 py-1 font-medium',
                  !isActive && 'pointer-events-none invisible select-none',
                )}
              >
                {tier.tagline}
              </p>
            );
          })}
        </div>
      </div>

      <ol aria-label={t.stagesLabel} className='flex flex-col'>
        {activeTier.stages.map((stage, index) => (
          <StageRow
            key={stage.id}
            stage={stage}
            index={index}
            hasNext={index < activeTier.stages.length - 1}
            activeTierId={activeTier.id}
            tiers={tiers}
          />
        ))}
      </ol>

      <div className='border-outline-variant grid border-t'>
        <p className='sr-only'>{t.toolsLabel}</p>
        {tiers.map((tier) => {
          const isActive = tier.id === activeTier.id;

          return (
            <div
              key={tier.id}
              aria-hidden={!isActive || undefined}
              inert={!isActive}
              className={cn(
                'col-start-1 row-start-1',
                !isActive && 'pointer-events-none invisible select-none',
              )}
            >
              <LinkChips links={tier.links} locale={locale} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { WorkflowPipeline };
