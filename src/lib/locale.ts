import type { Locale } from '@/components/copy';

const storageKey = 'locale';

// Runs in the document head before first paint. Only the bare root follows the
// stored choice, so explicit /de links and section hashes keep working. Hiding
// the page avoids a flash of English while the German page loads. The trailing
// slash matches the static asset path and skips Cloudflare's slash redirect.
const localeScript = `try{if(location.pathname==='/'&&localStorage.getItem('${storageKey}')==='de'){location.replace('/de/'+location.search+location.hash);document.documentElement.hidden=true}}catch(e){}`;

function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(storageKey, locale);
  } catch {
    // The URL still carries the language for this visit.
  }
}

export { localeScript, rememberLocale };
