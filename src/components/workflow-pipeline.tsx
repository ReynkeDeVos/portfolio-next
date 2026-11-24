import { cn } from 'cn';
import { useState } from 'react';

import { SegmentedGroup, SegmentedOption } from '@/components/ui/segmented-control';
import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { gateKindFor, groupStagesBySlot, tierRailPulse } from '@/lib/workflow-stages';
import type { WorkflowTierId } from '@/lib/workflow-stages';
import { uiText } from '@/ui-text/ui-text';

import { LinkChips } from './section-parts';
import { GateGlyph, StackedSlot, StageBadge, statusByEmphasis } from './workflow-stage-marks';

type StageSlot = ReturnType<typeof groupStagesBySlot>[number];

function StageRow({
  slot,
  stepIndex,
  hasNext,
  activeTierId,
}: {
  slot: StageSlot;
  stepIndex: number;
  hasNext: boolean;
  activeTierId: WorkflowTierId;
}) {
  const activeStage = slot.byTier.find((entry) => entry.tierId === activeTierId)?.stage;

  if (!activeStage) {
    return null;
  }

  const rail = tierRailPulse[activeTierId];

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
            data-pace={rail.pace}
            data-step={stepIndex}
            className={cn(
              'workflow-rail-pulse block h-5 w-full rounded-full',
              rail.accent === 'tertiary' ? 'bg-tertiary' : 'bg-primary',
            )}
          />
        </span>
      ) : null}

      <StageBadge id={slot.id} emphasis={activeStage.emphasis} />
      <div className='grid min-w-0 flex-1 pt-0.5'>
        {slot.byTier.map(({ tierId, stage }) => {
          const isActive = tierId === activeTierId;
          const gateKind = gateKindFor(stage.id, stage.emphasis);

          return (
            <StackedSlot key={tierId} active={isActive}>
              <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
                {isActive ? (
                  <h4 className='type-title-sm text-on-surface font-semibold'>{stage.title}</h4>
                ) : (
                  <span className='type-title-sm text-on-surface font-semibold'>{stage.title}</span>
                )}
                {/* Keep the status pill and its gate glyph together so narrow
                    mobile widths never strand the glyph alone on a new line. */}
                <span className='inline-flex items-center gap-1.5'>
                  <span
                    className={cn(
                      'type-label-md rounded-xs px-2 py-0.5 font-medium',
                      statusByEmphasis[stage.emphasis],
                    )}
                  >
                    {stage.status}
                  </span>
                  {gateKind ? <GateGlyph kind={gateKind} active={isActive} /> : null}
                </span>
              </div>
              <p className='type-body-md text-on-surface-variant mt-1 max-w-[60ch]'>
                {stage.summary}
              </p>
            </StackedSlot>
          );
        })}
      </div>
    </li>
  );
}

// Each Locale has its own route, so switching languages remounts this section;
// keeping the chosen tier at module scope preserves it without hydration drift.
let selectedTierId: WorkflowTierId | null = null;

// Interactive risk-tiered AI workflow visualizer. Starts on High risk so
// spec-driven planning, reviewer councils and open-code-review are visible on
// first glance, while smaller tiers show how ceremony scales down.
function WorkflowPipeline({ locale }: { locale: Locale }) {
  const t = uiText[locale].aiPipeline;
  const { tiers } = contentFor(locale).workflow.ai;
  const initialTier: WorkflowTierId = tiers.at(-1)?.id ?? 'high';

  const [selectedId, setSelectedId] = useState<WorkflowTierId>(() => selectedTierId ?? initialTier);

  const activeIndex = Math.max(
    0,
    tiers.findIndex((tier) => tier.id === selectedId),
  );

  const activeTier = tiers[activeIndex];

  if (!activeTier) {
    return null;
  }

  const slots = groupStagesBySlot(tiers);

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
        <SegmentedGroup
          as='fieldset'
          label={t.tierLabel}
          index={activeIndex}
          className='w-full sm:w-88'
        >
          {tiers.map((tier) => (
            <SegmentedOption
              key={tier.id}
              pressed={tier.id === activeTier.id}
              onClick={() => {
                selectedTierId = tier.id;
                setSelectedId(tier.id);
              }}
            >
              {tier.label}
            </SegmentedOption>
          ))}
        </SegmentedGroup>

        <div className='grid justify-items-start sm:justify-items-end'>
          {tiers.map((tier) => (
            <StackedSlot key={tier.id} active={tier.id === activeTier.id}>
              <p className='type-label-md text-on-surface-variant sm:text-right'>{tier.scope}</p>
            </StackedSlot>
          ))}
        </div>
      </div>

      <ol aria-label={t.stagesLabel} className='flex flex-col'>
        {slots.map((slot, index) => (
          <StageRow
            key={slot.id}
            slot={slot}
            stepIndex={index}
            hasNext={index < slots.length - 1}
            activeTierId={activeTier.id}
          />
        ))}
      </ol>

      <div className='border-outline-variant grid border-t'>
        <p className='sr-only'>{t.toolsLabel}</p>
        {tiers.map((tier) => (
          <StackedSlot key={tier.id} active={tier.id === activeTier.id}>
            <LinkChips links={tier.links} locale={locale} />
          </StackedSlot>
        ))}
      </div>
    </section>
  );
}

export { WorkflowPipeline };
