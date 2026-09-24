// Theme toggle: <button data-theme-toggle> cycles light → dark → system. See [1]
const KEY = 'syrup-theme';
const MODES = ['light', 'dark', 'system'];
const root = document.documentElement;
const buttons = document.querySelectorAll('[data-theme-toggle]');

function stored() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

function apply(mode) {
  if (mode === 'system') delete root.dataset.theme;
  else root.dataset.theme = mode;

  try {
    if (mode === 'system') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, mode);
  } catch { /* storage blocked: theme still applies for this page */ }

  buttons.forEach((btn) => { btn.textContent = `Theme: ${mode}`; });
  document.dispatchEvent(new CustomEvent('themechange', { detail: { mode } }));
}

let mode = MODES.includes(stored()) ? stored() : 'system';
buttons.forEach((btn) => btn.addEventListener('click', () => {
  mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length];
  apply(mode);
}));
apply(mode);

/* Notes
 * [1] Pair with the inline <head> snippet (see styleguide pages) so a stored theme applies
 *     before first paint. "system" removes data-theme, so the OS decides.
 */
