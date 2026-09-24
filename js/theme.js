// Theme toggle: <button data-theme-toggle> switches light ↔ dark. See [1]
const KEY = 'syrup-theme';
const root = document.documentElement;
const buttons = document.querySelectorAll('[data-theme-toggle]');
const osDark = matchMedia('(prefers-color-scheme: dark)');

function current() {
  return root.dataset.theme || (osDark.matches ? 'dark' : 'light');
}

function label() {
  buttons.forEach((btn) => { btn.textContent = `Theme: ${current()}`; });
}

buttons.forEach((btn) => btn.addEventListener('click', () => {
  const mode = current() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = mode;
  try { localStorage.setItem(KEY, mode); } catch { /* storage blocked: applies for this page only */ }
  label();
  document.dispatchEvent(new CustomEvent('themechange', { detail: { mode } }));
}));

osDark.addEventListener('change', label);
label();

/* Notes
 * [1] Pair with the inline <head> snippet (see styleguide pages) so a stored theme applies
 *     before first paint. Until the first click, no data-theme is set and the OS decides.
 */
