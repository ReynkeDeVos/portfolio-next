import { cn } from 'cn';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import { LinkChips } from './section-parts';
import { SegmentPill, segmentGroup } from './site-controls';
import { GateGlyph, StageBadge } from './workflow-stage-marks';

const statusByEmphasis = {
  quiet: 'bg-surface-container-highest text-on-surface-variant',
  primary: 'bg-primary-container text-on-primary-container',
  review: 'bg-tertiary-container text-on-tertiary-container',
} as const;

type WorkflowTier = ReturnType<typeof contentFor>['workflow']['ai']['tiers'][number];

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
                {candidate.emphasis === 'review' ? (
                  <GateGlyph id={candidate.id} active={isActive} />
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

// Each Locale has its own route, so switching languages remounts this section;
// keeping the chosen tier at module scope preserves it without hydration drift.
let selectedTierId: WorkflowTier['id'] | null = null;

// Interactive risk-tiered AI workflow visualizer. Starts on High risk so
// spec-driven planning, reviewer councils and open-code-review are visible on
// first glance, while smaller tiers show how ceremony scales down. All tiers
// share each stage's grid cell invisibly so switching tiers never shifts height.
function WorkflowPipeline({ locale }: { locale: Locale }) {
  const t = uiText[locale].aiPipeline;
  const { tiers } = contentFor(locale).workflow.ai;
  const initialTier = tiers.at(-1)?.id ?? 'high';

  const [selectedId, setSelectedId] = useState<WorkflowTier['id']>(
    () => selectedTierId ?? initialTier,
  );

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
                selectedTierId = tier.id;
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
                  'type-label-md text-on-surface-variant col-start-1 row-start-1 sm:text-right',
                  !isActive && 'pointer-events-none invisible select-none',
                )}
              >
                {tier.scope}
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
