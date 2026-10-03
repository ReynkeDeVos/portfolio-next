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

// The Section a location hash such as '#career' names. Anything else opens the default.
function sectionFromHash(hash: string): Section {
  const value = hash.slice(1);

  return isSection(value) ? value : defaultSection;
}

// The page address with the Section in its hash. Pathname and search stay, so
// a Locale or a ?ref= tag survives switching Sections.
function sectionAddress(
  section: Section,
  { pathname, search }: { pathname: string; search: string },
) {
  const hash = sectionHash(section);

  return hash === undefined ? `${pathname}${search}` : `${pathname}${search}#${hash}`;
}

// Runs in the document head before first paint. The prerendered page opens on
// the default Section; a hash link to another one marks the root with it, so
// CSS can show that Section until React takes over and clears the mark.
const sectionScript = `try{var h=location.hash.slice(1);if(${JSON.stringify(sections.filter((section) => section !== defaultSection))}.indexOf(h)>=0)document.documentElement.dataset.section=h}catch(e){}`;

export {
  defaultSection,
  isSection,
  sectionAddress,
  sectionFromHash,
  sectionHash,
  sections,
  sectionScript,
};

export type { Section };
