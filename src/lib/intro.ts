// The hero sequence plays once per browser session.
export const INTRO_STORAGE_KEY = "tms-hero-played";

// Length of the CSS sequence in globals.css, in milliseconds.
const INTRO_DURATION = 2600;

// Runs in <head> before first paint. Sets html[data-intro="play"] on the first visit of the
// session when reduced motion is off, which starts the CSS hero sequence. Afterwards it
// switches to "done" so the final state no longer depends on animation fill.
export const introScript = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${INTRO_STORAGE_KEY}"))return;sessionStorage.setItem("${INTRO_STORAGE_KEY}","1");d.dataset.intro="play";setTimeout(function(){d.dataset.intro="done"},${INTRO_DURATION})}catch(e){}})();`;
