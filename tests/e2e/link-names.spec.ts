import { expect, test } from '@playwright/test';

import { waitForHydration } from './page.ts';

// Every link opens in a new tab. Sighted visitors see the ↗; assistive tech
// hears the notice at the end of the link's name, after any other hidden text.
const locales = [
  {
    path: '/',
    notice: 'opens in a new tab',
    project: ['Reputation Assistant', 'source on GitHub'],
    githubProfile: 'See more on my GitHub profile',
    career: 'Career',
    linkedinProfile: 'See more on my LinkedIn profile',
  },
  {
    path: '/de/',
    notice: 'öffnet in neuem Tab',
    project: ['Reputation Assistant', 'Quellcode auf GitHub'],
    githubProfile: 'Mehr auf meinem GitHub-Profil',
    career: 'Werdegang',
    linkedinProfile: 'Mehr auf meinem LinkedIn-Profil',
  },
];

// The whole name, its parts joined by commas. The hidden suffixes are
// absolutely positioned, so the name computation treats them as blocks and
// puts a space before each comma; screen readers don't voice it.
function fullName(parts: readonly string[]) {
  const escaped = parts.map((part) => part.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`));

  return new RegExp(`^${escaped.join(' ?, ')}$`, 'u');
}

for (const { path, notice, project, githubProfile, career, linkedinProfile } of locales) {
  test(`links that open a new tab say so in their names (${path})`, async ({ page }) => {
    await page.goto(path);
    await waitForHydration(page);

    const link = (...parts: string[]) =>
      page.getByRole('link', { name: fullName([...parts, notice]) });

    // Identity's contact buttons.
    await expect(link('GitHub')).toBeVisible();
    await expect(link('LinkedIn')).toBeVisible();

    // Work: a whole-item Project link and the profile button.
    await expect(link(...project)).toBeVisible();
    await expect(link(githubProfile)).toBeVisible();

    // Career: the organization link inside an entry and the profile button.
    await page.getByRole('tab', { name: career }).click();
    await expect(link('WBS Coding School')).toBeVisible();
    await expect(link(linkedinProfile)).toBeVisible();

    // Workflow: a chip, here the Design card's group of one.
    await page.getByRole('tab', { name: 'Workflow' }).click();
    await expect(link('Impeccable')).toBeVisible();
  });
}
