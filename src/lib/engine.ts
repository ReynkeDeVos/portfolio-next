const storageKey = 'engine-note';

// Runs in the document head before first paint, so the note never shifts the
// layout. Only Chromium-based browsers (Blink) report a Chromium brand in
// User-Agent Client Hints; Gecko and WebKit do not implement them, and
// neither do insecure origins. The note stays off once dismissed.
const engineScript = `try{var b=navigator.userAgentData&&navigator.userAgentData.brands;if(!(b&&b.some(function(x){return x.brand==='Chromium'}))&&localStorage.getItem('${storageKey}')!=='dismissed')document.documentElement.dataset.engineNote='shown'}catch(e){}`;

function dismissEngineNote() {
  delete document.documentElement.dataset.engineNote;

  try {
    localStorage.setItem(storageKey, 'dismissed');
  } catch {
    // The note stays hidden for this page view.
  }
}

export { dismissEngineNote, engineScript };
