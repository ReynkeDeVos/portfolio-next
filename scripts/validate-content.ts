import { portfolio } from '../src/content/portfolio.ts';
import { validateContent } from '../src/content/validate.ts';

const problems = validateContent(portfolio);

if (problems.length > 0) {
  process.stderr.write(`Invalid content:\n- ${problems.join('\n- ')}\n`);
  process.exit(1);
}

process.stdout.write(`Validated bilingual content for ${portfolio.name}.\n`);
