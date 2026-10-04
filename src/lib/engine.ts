import { store } from './storage.ts';

const storageKey = 'engine-note';

// Runs in the document head before first paint, so the note never shifts the
// layout. Only Chromium-based browsers (Blink) report a Chromium brand in
// User-Agent Client Hints; Gecko and WebKit do not implement them, and
// neither do insecure origins. The note stays off once dismissed.
const engineScript = `try{if(!navigator.userAgentData?.brands.some((b)=>b.brand==='Chromium')&&localStorage.getItem('${storageKey}')!=='dismissed')document.documentElement.dataset.engineNote='shown'}catch{}`;

function dismissEngineNote() {
  delete document.documentElement.dataset.engineNote;
  store('localStorage', storageKey, 'dismissed');
}

export { dismissEngineNote, engineScript };
