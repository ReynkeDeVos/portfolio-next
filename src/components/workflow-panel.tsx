import { ChevronDown } from 'lucide-react';
import { Fragment, useLayoutEffect, useRef } from 'react';

import { contentFor } from '@/content/content';
import { buildDisclosureSlot, readBuildOpen, rememberBuildOpen } from '@/lib/build-disclosure';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import { Card, CardGrid, CardHeader, CardText, LinkChips, Subsection } from './section-parts';
import { WorkflowPipeline } from './workflow-pipeline';

function WorkflowPanel({ locale }: { locale: Locale }) {
  const t = uiText[locale];

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.workflow}</h2>

      <WorkflowPipeline locale={locale} />
      <AiSection locale={locale} />
      <ToolsSection locale={locale} />
      <BuildSection locale={locale} />
    </div>
  );
}

// A small dated table: one row per task, the note under the task name, then
// the thinking-level exceptions per model as quieter notes inside the card.
// On narrow containers each row stacks full-width so task notes never squeeze
// into tall columns beside fixed-width model cells.
function AiSection({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { ai } = contentFor(locale).workflow;

  return (
    <Subsection
      id='ai-heading'
      heading={t.aiHeading}
      aside={
        <p className='type-label-md text-on-surface-variant'>
          {t.updated}{' '}
          <time dateTime={ai.updated} className='tabular-nums'>
            {ai.updatedLabel}
          </time>
        </p>
      }
    >
      <div className='rounded-lg-inc bg-surface-card @container/routing px-5 sm:px-6'>
        <table
          aria-labelledby='ai-heading'
          className='w-full border-collapse text-left @max-[28rem]/routing:block'
        >
          <thead className='@max-[28rem]/routing:sr-only'>
            {/* A heading that wraps on narrow widths keeps its neighbours on its last line. */}
            <tr className='type-label-md text-on-surface-variant align-bottom'>
              <th scope='col' className='pt-4 pr-4 pb-2 font-medium'>
                {t.aiTable.task}
              </th>
              <th scope='col' className='pt-4 pr-4 pb-2 font-medium'>
                {t.aiTable.model}
              </th>
              <th scope='col' className='pt-4 pb-2 font-medium'>
                {t.thinkingLevel}
              </th>
            </tr>
          </thead>
          <tbody className='divide-outline-variant border-outline-variant divide-y border-t @max-[28rem]/routing:block @max-[28rem]/routing:border-t-0'>
            {ai.items.map((item) => (
              <tr
                key={item.id}
                className='align-top @max-[28rem]/routing:grid @max-[28rem]/routing:grid-cols-[auto_minmax(0,1fr)] @max-[28rem]/routing:items-baseline @max-[28rem]/routing:gap-x-3 @max-[28rem]/routing:gap-y-1.5 @max-[28rem]/routing:py-3.5'
              >
                <th
                  scope='row'
                  className='py-3 pr-4 text-left font-normal @max-[28rem]/routing:col-span-2 @max-[28rem]/routing:p-0'
                >
                  <span className='type-body-md text-on-surface block font-medium'>
                    {item.task}
                  </span>
                  <span className='type-body-sm text-on-surface-variant block'>{item.note}</span>
                </th>
                <td className='type-body-md text-on-surface py-3 pr-4 whitespace-nowrap @max-[28rem]/routing:p-0 @max-[28rem]/routing:font-medium'>
                  {item.model}
                </td>
                {/* The thinking levels keep the English names the model tools show,
                    on one line so Extra High never reads as two levels. */}
                <td className='type-body-md text-on-surface @max-[28rem]/routing:type-body-sm @max-[28rem]/routing:text-on-surface-variant py-3 whitespace-nowrap @max-[28rem]/routing:p-0'>
                  <span aria-hidden className='hidden @max-[28rem]/routing:inline'>
                    {t.thinkingLevel}:{' '}
                  </span>
                  <span lang={locale === 'en' ? undefined : 'en'}>{item.effort}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className='border-outline-variant grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 border-t py-4'>
          {ai.modelNotes.map((entry) => (
            <Fragment key={entry.model}>
              <dt className='type-body-sm text-on-surface font-medium whitespace-nowrap'>
                {entry.model}
              </dt>
              <dd className='type-body-sm text-on-surface-variant'>{entry.note}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </Subsection>
  );
}

// The tools around the models, each with its links as chips.
function ToolsSection({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { tips } = contentFor(locale).workflow;

  return (
    <Subsection id='tools-heading' heading={t.toolsHeading}>
      <CardGrid>
        {tips.map((tip) => (
          <Card key={tip.id}>
            <CardHeader title={tip.title} />
            <CardText>{tip.description}</CardText>
            <LinkChips links={tip.links} locale={locale} />
          </Card>
        ))}
      </CardGrid>
    </Subsection>
  );
}

// Choices rather than a badge inventory: topic, the reason and its stack.
// Closed by default; technical readers open it, everyone else skips it. The
// summary carries the heading and a state layer; content opens instantly.
// An open disclosure stays open across reloads in the tab: the head script
// reopens the prerendered one, and a page React renders itself reopens it
// before paint.
function BuildSection({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { build } = contentFor(locale).workflow;
  const disclosure = useRef<HTMLDetailsElement>(null);

  useLayoutEffect(() => {
    if (disclosure.current && readBuildOpen()) {
      disclosure.current.open = true;
    }
  }, []);

  return (
    <details
      ref={disclosure}
      data-slot={buildDisclosureSlot}
      // The head script may open it before React takes over.
      suppressHydrationWarning
      onToggle={(event) => {
        rememberBuildOpen(event.currentTarget.open);
      }}
      className='group/disclosure'
    >
      <summary className='rounded-lg-inc bg-surface-card before:bg-on-surface before:ease-effects-fast before:rounded-inherit relative grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 p-5 select-none before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-8 sm:px-6 [&::-webkit-details-marker]:hidden'>
        <h3 className='type-headline-sm text-on-surface font-semibold'>{t.buildHeading}</h3>
        <ChevronDown
          aria-hidden
          className='text-on-surface ease-spatial row-span-2 size-6 transition-transform duration-200 group-open/disclosure:rotate-180'
        />
        {/* No-break spaces keep each topic whole and its dot on the line before,
            so a wrapped line never starts with one. */}
        <span className='type-body-md text-on-surface-variant'>
          {build.map((item) => item.topic.replaceAll(' ', '\u00A0')).join('\u00A0· ')}
        </span>
      </summary>
      <div className='mt-3'>
        <CardGrid>
          {build.map((item) => (
            <Card key={item.id}>
              <CardHeader title={item.topic} />
              <CardText>{item.description}</CardText>
              <LinkChips links={item.links} locale={locale} />
            </Card>
          ))}
        </CardGrid>
      </div>
    </details>
  );
}

export { WorkflowPanel };
