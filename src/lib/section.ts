const sections = ['work', 'career', 'skills', 'workflow'] as const;

type Section = (typeof sections)[number];

const defaultSection = 'work' satisfies Section;

const otherSections = sections.filter((section) => section !== defaultSection);

function isSection(value: string): value is Section {
  return sections.some((section) => section === value);
}

// Hashes here are in the router's form, without '#'. The default Section needs
// none, so the bare address opens it; an empty hash clears the address's hash.
function sectionHash(section: Section) {
  return section === defaultSection ? '' : section;
}

// The Section a hash such as 'career' names. Anything else opens the default.
function sectionFromHash(hash: string): Section {
  return isSection(hash) ? hash : defaultSection;
}

// Runs in the document head before first paint. The prerendered page opens on
// the default Section; a hash link to another one marks the root with it, so
// CSS can show that Section until React takes over and clears the mark.
const sectionScript = `try{const h=location.hash.slice(1);if(${JSON.stringify(otherSections)}.includes(h))document.documentElement.dataset.section=h}catch{}`;

// The rules that act on the head script's mark, rendered into the document head
// so they apply before first paint. They move the indicator to the marked
// Section, show its panel and style its trigger as selected. They sit outside
// Tailwind's layers, so they win over the utilities that follow Radix's state.
// The colors are the theme roles the trigger's own utilities resolve to.
const sectionStyles = [
  ...otherSections.map(
    (section) => `:root[data-section='${section}']{--section-index:${sections.indexOf(section)}}`,
  ),
  ":root[data-section] [data-slot='tabs-list']{--tab-index:var(--section-index)!important}",
  ":root[data-section] [data-slot='tabs-trigger']{color:var(--color-on-surface-variant);font-weight:500}",
  ":root[data-section] [data-slot='tabs-content']{display:none}",
  ...otherSections.flatMap((section) => [
    `:root[data-section='${section}'] [data-slot='tabs-trigger'][data-section='${section}']{color:var(--color-on-secondary-container);font-weight:600}`,
    `:root[data-section='${section}'] [data-slot='tabs-content'][data-section='${section}']{display:block}`,
  ]),
].join('');

export {
  defaultSection,
  isSection,
  sectionFromHash,
  sectionHash,
  sections,
  sectionScript,
  sectionStyles,
};

export type { Section };
