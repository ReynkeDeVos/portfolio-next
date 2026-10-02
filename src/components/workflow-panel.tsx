import { portfolio } from '@/content/portfolio';

import { copy, formatDate } from './copy';
import type { Locale } from './copy';
import {
  Card,
  CardGrid,
  CardHeader,
  CardText,
  Disclosure,
  Item,
  ItemHeader,
  ItemList,
  ItemText,
  LinkChips,
  Subsection,
} from './section-parts';

function WorkflowPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='sr-only'>{t.sectionHeadings.workflow}</h2>

      <ItemList>
        {portfolio.interests.map((interest) => (
          <Item key={interest.id}>
            <ItemHeader title={interest.title[locale]} />
            <ItemText>{interest.description[locale]}</ItemText>
          </Item>
        ))}
      </ItemList>

      <AiSection locale={locale} />
      <ToolsSection locale={locale} />
      <BuildSection locale={locale} />
    </div>
  );
}

// A small dated table: one row per task, the note under the task name.
function AiSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { aiRecommendations } = portfolio;

  return (
    <Subsection
      id='ai-heading'
      heading={t.aiHeading}
      aside={
        <p className='type-label-md text-on-surface-variant'>
          {t.updated}{' '}
          <time dateTime={aiRecommendations.updated} className='tabular-nums'>
            {formatDate(aiRecommendations.updated, locale)}
          </time>
        </p>
      }
    >
      <p className='type-body-md text-on-surface-variant max-w-[68ch] px-1'>
        {aiRecommendations.introduction[locale]}
      </p>
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
            {aiRecommendations.items.map((item) => (
              <tr key={item.task.en} className='align-top'>
                <th scope='row' className='py-3 pr-4 text-left font-normal'>
                  <span className='type-body-md text-on-surface block font-medium'>
                    {item.task[locale]}
                  </span>
                  <span className='type-body-sm text-on-surface-variant block'>
                    {item.note[locale]}
                  </span>
                </th>
                <td className='type-body-md text-on-surface py-3 pr-4 whitespace-nowrap'>
                  {item.model}
                </td>
                <td className='type-body-md text-on-surface py-3'>{item.effort}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Subsection>
  );
}

// The tools around the models, each with its links as chips.
function ToolsSection({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <Subsection id='tools-heading' heading={t.toolsHeading}>
      <CardGrid>
        {portfolio.aiRecommendations.tips.map((tip) => (
          <Card key={tip.id}>
            <CardHeader title={tip.title[locale]} />
            <CardText>{tip.description[locale]}</CardText>
            <LinkChips links={tip.links} className='mt-auto pt-4' />
          </Card>
        ))}
      </CardGrid>
    </Subsection>
  );
}

// Choices rather than a badge inventory: topic, the reason and its stack.
// Closed by default; technical readers open it, everyone else skips it.
function BuildSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { portfolioBuild } = portfolio;

  return (
    <Disclosure
      id='build-heading'
      heading={t.buildHeading}
      summary={portfolioBuild.items.map((item) => item.topic[locale]).join(' · ')}
    >
      <CardGrid>
        {portfolioBuild.items.map((item) => (
          <Card key={item.id}>
            <CardHeader title={item.topic[locale]} />
            <CardText>{item.description[locale]}</CardText>
            <LinkChips
              links={item.technologies.flatMap((name) => {
                const link = portfolioBuild.links.find((candidate) => candidate.name === name);

                return link ? [link] : [];
              })}
              className='mt-auto pt-4'
            />
          </Card>
        ))}
      </CardGrid>
    </Disclosure>
  );
}

export { WorkflowPanel };
