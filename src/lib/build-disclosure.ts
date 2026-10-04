const storageKey = 'build-open';

// The tab remembers an open build explanation, so a reload lays the page out
// at the height it was scrolled at and the browser can restore the position.
// Runs in the document head and reopens the disclosure once the page has
// parsed, before the browser restores the scroll position.
const buildDisclosureScript = `try{if(sessionStorage.getItem('${storageKey}'))addEventListener('DOMContentLoaded',()=>{document.querySelector('[data-slot="build-disclosure"]')?.setAttribute('open','')})}catch{}`;

function readBuildOpen() {
  try {
    return sessionStorage.getItem(storageKey) !== null;
  } catch {
    // Blocked storage leaves it closed.
    return false;
  }
}

function rememberBuildOpen(open: boolean) {
  try {
    if (open) {
      sessionStorage.setItem(storageKey, '1');
    } else {
      sessionStorage.removeItem(storageKey);
    }
  } catch {
    // The disclosure still works; a reload just starts closed.
  }
}

export { buildDisclosureScript, readBuildOpen, rememberBuildOpen };
