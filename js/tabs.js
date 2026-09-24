// Tabs: [data-tabs] > nav of buttons + content of panels. See [1]
let uid = 0;

document.querySelectorAll('[data-tabs]').forEach((root) => {
  const [nav, content] = root.children;
  const tabs = [...nav.querySelectorAll('button')];
  const panels = [...content.children];
  const vertical = root.dataset.tabs === 'vertical';
  const id = `tabs-${++uid}`;

  nav.setAttribute('role', 'tablist');
  if (vertical) nav.setAttribute('aria-orientation', 'vertical');

  tabs.forEach((tab, i) => {
    tab.id = `${id}-tab-${i}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', `${id}-panel-${i}`);
    panels[i].id = `${id}-panel-${i}`;
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    panels[i].tabIndex = 0;
  });

  function select(index, focus) {
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute('aria-selected', on);
      tab.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
    });
    if (focus) tabs[index].focus();
    root.dispatchEvent(new CustomEvent('tabchange', { bubbles: true, detail: { index, tab: tabs[index], panel: panels[index] } }));
  }

  const keys = vertical
    ? { ArrowUp: -1, ArrowDown: 1 }
    : { ArrowLeft: -1, ArrowRight: 1 };

  nav.addEventListener('click', (e) => {
    const i = tabs.indexOf(e.target.closest('button'));
    if (i > -1) select(i);
  });

  nav.addEventListener('keydown', (e) => {
    const current = tabs.indexOf(document.activeElement);
    let next;
    if (e.key in keys) next = (current + keys[e.key] + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    select(next, true);
  });

  const start = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  select(Math.max(start, 0));
});

/* Notes
 * [1] Markup has no roles or [hidden]; JS adds them, so without JS every panel shows.
 *     data-tabs="vertical" switches arrow keys to up/down (JS can't read the --vertical class).
 *     Arrow keys select as they move (automatic activation). Fires `tabchange` on the root.
 */
