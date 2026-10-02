const sections = ['work', 'career', 'skills', 'workflow'] as const;

type Section = (typeof sections)[number];

const defaultSection = 'work' satisfies Section;

function isSection(value: string): value is Section {
  return sections.some((section) => section === value);
}

// The default Section needs no hash, so the bare address opens it.
function sectionHash(section: Section) {
  return section === defaultSection ? undefined : section;
}

export { defaultSection, isSection, sectionHash, sections };

export type { Section };
