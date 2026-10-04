import { ChevronDown } from 'lucide-react';
import { Fragment } from 'react';

import { contentFor } from '@/content/content';
import type { Locale } from '@/lib/locale';
import { uiText } from '@/ui-text/ui-text';

import {
  Card,
  CardGrid,
  CardHeader,
  CardText,
  Item,
  ItemHeader,
  ItemList,
  ItemText,
  LinkChips,
  Subsection,
} from './section-parts';

function WorkflowPanel({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { interests } = contentFor(locale).workflow;

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.workflow}</h2>

      <ItemList>
        {interests.map((interest) => (
          <Item key={interest.id}>
            <ItemHeader title={interest.title} />
            <ItemText>{interest.description}</ItemText>
          </Item>
        ))}
      </ItemList>

      <AiSection locale={locale} />
      <ToolsSection locale={locale} />
      <BuildSection locale={locale} />
    </div>
  );
}

// A small dated table: one row per task, the note under the task name, then
// the thinking-level exceptions per model as quieter notes inside the card.
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
      <div className='rounded-lg-inc bg-surface-card px-5 sm:px-6'>
        <table aria-labelledby='ai-heading' className='w-full border-collapse text-left'>
          <thead>
            <tr className='type-label-md text-on-surface-variant'>
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
          <tbody className='divide-outline-variant border-outline-variant divide-y border-t'>
            {ai.items.map((item) => (
              <tr key={item.id} className='align-top'>
                <th scope='row' className='py-3 pr-4 text-left font-normal'>
                  <span className='type-body-md text-on-surface block font-medium'>
                    {item.task}
                  </span>
                  <span className='type-body-sm text-on-surface-variant block'>{item.note}</span>
                </th>
                <td className='type-body-md text-on-surface py-3 pr-4 whitespace-nowrap'>
                  {item.model}
                </td>
                {/* The thinking levels keep the English names the model tools show. */}
                <td
                  lang={locale === 'en' ? undefined : 'en'}
                  className='type-body-md text-on-surface py-3'
                >
                  {item.effort}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dl className='border-outline-variant grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-t py-4'>
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
            <LinkChips links={tip.links} locale={locale} className='mt-auto pt-4' />
          </Card>
        ))}
      </CardGrid>
    </Subsection>
  );
}

// Choices rather than a badge inventory: topic, the reason and its stack.
// Closed by default; technical readers open it, everyone else skips it. The
// summary carries the heading and a state layer; content opens instantly.
function BuildSection({ locale }: { locale: Locale }) {
  const t = uiText[locale];
  const { build } = contentFor(locale).workflow;

  return (
    <details className='group/disclosure'>
      <summary className='rounded-lg-inc bg-surface-card before:bg-on-surface before:ease-effects-fast before:rounded-inherit relative grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 p-5 select-none before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-8 sm:px-6 [&::-webkit-details-marker]:hidden'>
        <h3 className='type-headline-sm text-on-surface font-semibold'>{t.buildHeading}</h3>
        <ChevronDown
          aria-hidden
          className='text-on-surface ease-spatial row-span-2 size-6 transition-transform duration-300 group-open/disclosure:rotate-180'
        />
        <span className='type-body-md text-on-surface-variant'>
          {build.map((item) => item.topic).join(' · ')}
        </span>
      </summary>
      <div className='mt-3'>
        <CardGrid>
          {build.map((item) => (
            <Card key={item.id}>
              <CardHeader title={item.topic} />
              <CardText>{item.description}</CardText>
              <LinkChips links={item.links} locale={locale} className='mt-auto pt-4' />
            </Card>
          ))}
        </CardGrid>
      </div>
    </details>
  );
}

export { WorkflowPanel };
