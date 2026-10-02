import { portfolio } from '@/content/portfolio';

import { copy, formatDate } from './copy';
import type { Locale } from './copy';
import {
  Card,
  CardDetails,
  CardGrid,
  CardHeader,
  CardText,
  Item,
  ItemHeader,
  ItemList,
  ItemText,
  LinkSeries,
  Subsection,
} from './section-parts';

function WorkflowPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <div className='flex flex-col gap-6'>
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
      <BuildSection locale={locale} />
    </div>
  );
}

// Recommendations first, then the tools around them, both as cards.
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
      <CardGrid>
        {aiRecommendations.items.map((item) => (
          <Card key={item.task.en}>
            <CardHeader title={item.task[locale]} meta={item.model} />
            <CardDetails>{item.note[locale]}</CardDetails>
            <p className='type-label-md text-on-surface-variant mt-auto flex items-center gap-2 pt-3'>
              {t.thinkingLevel}
              <span className='bg-primary-container text-on-primary-container inline-flex h-6 items-center rounded-xs px-2 font-medium'>
                {item.effort}
              </span>
            </p>
          </Card>
        ))}
      </CardGrid>
      <CardGrid>
        {aiRecommendations.tips.map((tip) => (
          <Card key={tip.id}>
            <CardHeader title={tip.title[locale]} />
            <CardText>
              <span className='font-medium'>
                <LinkSeries items={tip.links} />
              </span>
            </CardText>
            <CardDetails>{tip.description[locale]}</CardDetails>
          </Card>
        ))}
      </CardGrid>
    </Subsection>
  );
}

// Choices rather than a badge inventory: topic, stack and the reason.
// Only named tools with a link get one.
function BuildSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const { portfolioBuild } = portfolio;

  return (
    <Subsection id='build-heading' heading={t.buildHeading}>
      <CardGrid>
        {portfolioBuild.items.map((item) => (
          <Card key={item.id}>
            <CardHeader title={item.topic[locale]} />
            <CardText>
              <span className='font-medium'>
                <LinkSeries
                  items={item.technologies.map((name) => ({
                    name,
                    url: portfolioBuild.links.find((link) => link.name === name)?.url,
                  }))}
                />
              </span>
            </CardText>
            <CardDetails>{item.description[locale]}</CardDetails>
          </Card>
        ))}
      </CardGrid>
    </Subsection>
  );
}

export { WorkflowPanel };
