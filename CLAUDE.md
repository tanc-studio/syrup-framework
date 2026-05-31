# Syrup CSS Framework — CLAUDE.md

Public repo — distributed via jsDelivr CDN. Everything in this repo is public.

For current status, open questions, and backlog: read `.claude/sprints.md`

---

## What This Repo Is

- **Framework only** — CSS, JS, styleguide, and documentation
- **Not** a project starter — boilerplate lives at `~/Sites/Projects/boilerplate-syrup/`
- The skill file at `~/.claude/skills/syrup/SKILL.md` is the authoritative methodology reference for all projects

---

## Source Files

| File | Purpose |
|------|---------|
| `css/main.css` | Imports all layers in order |
| `css/01-base.css` | Reset, root tokens (sizing, typography, colour palette) |
| `css/02-layout.css` | Grid, containers, spacing |
| `css/03-components.css` | All UI components |
| `css/04-utilities.css` | Single-purpose helper classes |
| `css/05-themes.css` | Semantic colour aliases, dark/light theme tokens |
| `js/syrup.js` | ThemeManager, TabsManager, includeHTML |

---

## Layer Order

```css
@layer base, layout, components, utilities, themes, custom;
```

Never use `!important`. Layers handle all cascade order.

---

## Styleguide

- Serve from `syrup-framework/` as repo root using Live Server
- Navigate to `/styleguide/index.html`
- All paths are absolute from repo root — `/css/main.css`, `/styleguide/pages/...`
- Any change to a CSS file is visible immediately on refresh
- **Every new or modified component must be validated here before use in a project**

---

## CDN

```
https://cdn.jsdelivr.net/gh/tanc-studio/syrup-framework@v1.0.1/css/main.css
https://cdn.jsdelivr.net/gh/tanc-studio/syrup-framework@v1.0.1/js/syrup.js
```

CDN is versioned — bump the tag when ready to publish changes.

---

## After Every Session

1. Append changes to `CHANGELOG.md`
2. Update `.claude/sprints.md` — mark completed items, add anything new
3. Do not update memory files. CLAUDE.md is the single source of truth.
