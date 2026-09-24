# Changelog

All notable changes to the Syrup CSS Framework.

---

## 2026-09-24 — v2 in progress (branch `v2`)

### Setup + tooling
- Branch `v2`; untracked `css/.DS_Store`, `js/.DS_Store`
- Stylelint (dev only): BEM single underscore, no raw colours in components, logical properties, nesting ≤ 2, no width `@media` in components, `!important` only in reset, no hardcoded `1px`, box-model property order (auto-fix). Run `npm run lint:css`

### Skeleton
- `main.css`: version header, v2 layer order `reset, tokens, base, layout, components, utilities, custom`
- New styleguide: 7 page shells + `styleguide.css` (own `sg` layer); v1 styleguide removed

### Tokens
- Fluid type `--font-size-xs`…`5xl`: six settings in `tokens.css` (screen min/max, base min/max, ratio min/max); maths in `scales.css`
- Space: fixed 4px grid `--size-2`…`--size-64`; fluid `--size-section-sm/md/lg`
- Primitives: `oklch()` colour (neutral ramp, brand, status), fonts, weights, line-height, letter-spacing, radius, border width, focus, shadow, motion
- Semantic colour with `light-dark()`; 21 text/background pairs pass AA in both themes
- `[data-theme]` on any element, `data-sizing="fixed"`, `prefers-contrast: more`, `forced-colors`, reduced motion
- Utilities: type presets `.display-sm/md/lg`, `.heading-sm`…`-3xl`, `.text-xs`…`-2xl`, `.caption`; `.text-start/center/end`; `.visually-hidden`, `.hide-mobile`/`.hide-desktop` (48rem). Shown on the type page
- Styleguide: nav fixed on wide screens with section links for the current page; smooth scroll to sections, with `scroll-margin` so the heading lands clear of the top
- `js/theme.js`: `<button data-theme-toggle>` cycles light → dark → system, saved in `localStorage` (`syrup-theme`), fires `themechange`. Inline `<head>` snippet applies it before paint. In the styleguide nav
- Styleguide token pages: colour (primitives + semantic, light and dark side by side), type (family, size, weight, line height, letter spacing), space & effects (space, radius, border, shadow, focus, motion)
- House fonts in `/fonts` (variable woff2, OFL): Geist (sans), Frank Ruhl Libre (serif), Roboto Mono (mono). `css/fonts.css`; remove by deleting its `@import`. Icon fonts dropped

### Reset + base
- `reset.css`: box-sizing, margin 0, form controls inherit font, wrapping, media fit, `ul[class]`/`ol[class]` lose bullets, `[hidden]`, reduced-motion block (the only `!important`)
- `base.css`: body type + colour, one `:focus-visible` ring, underlined links (`a:not([class])`), h1–h6 at body size, `::selection` + `accent-color`, `hr`, `code`/`pre`, `blockquote`, `table`, `summary`, `dialog` (re-centred), `@view-transition`
- `text-box: trim` dropped from base: it made unspaced lines overlap
- Styleguide elements page: headings, text, table, native form controls, details, dialog

### Layout
- `.wrap` (80rem; `--sm` 40, `--md` 60, `--full`) with fluid side padding: new token `--size-wrap-padding` (16 → 32px)
- `.grid` auto-fit columns; `--xs` 6, `--sm` 8, default 12, `--lg` 16, `--xl` 24rem minimum; `--grid-gap`
- `.stack` (`--stack-gap`), `.cluster` (`--cluster-gap`)
- Styleguide layout page

### Components (`css/components/`, one file each, header comment lists classes/modifiers/states/hook)
- `icon`: SVG only, 1em, `--sm`/`--lg`; colour from the SVG's `currentColor` (CSS doesn't set `fill`, so stroke icons work)
- `btn`: default outline + `--primary/--secondary/--tertiary`; `--sm`/`--xs`; `--icon` (square); `:disabled`/`aria-disabled`; loading is `aria-busy="true"` (replaces `--loading`). Dropped: `--form`, `--icon-lg/-sm/-xs`, `--square`, `--flat`. New shared token `--btn-height` (inputs use it too)
- `form`: `.form` is a plain column; `.form_input`/`.form_select` share one look; `:user-invalid` errors; native checkbox; radio pills focusable. Dropped: `.form_toggle`, horizontal/stretch/btn item modifiers, `.form_select-wrapper`, `.form_title`
- `tabs`: `[aria-selected]` state, `[hidden]` panels, `data-tabs` hook; `--pills`, `--vertical`; no JS = all panels show
- `card`: flat (border, no shadow); `--interactive` hover; `--primary` brand tint; padding grows via container query
- Old `01–05` CSS files deleted; `lint:css` now covers all of `css/`

### JS
- `js/tabs.js`: adds tab roles, `aria-controls`/`aria-labelledby`, roving `tabindex`, hides inactive panels. Arrow keys (up/down with `data-tabs="vertical"`), Home/End. Fires `tabchange` (bubbles; `detail: { index, tab, panel }`)
- `js/syrup.js` is now a module entry that imports `theme.js` + `tabs.js`; no globals. v1 `ThemeManager`, `TabsManager`, `includeHTML` removed. Styleguide pages load `syrup.js`

### Review (P9)
- Colour page: theme panels no longer overflow at 360px (`minmax(min(20rem, 100%), 1fr)`)
- Elements page: native form controls section removed (forms always use `.form` classes)
- `btn`: invisible 44px tap area on touch screens (`pointer: coarse`, `::before`); look unchanged

### Docs (P10)
- `README.md` and `CLAUDE.md` rewritten for v2
- `SKILL.md` (methodology) rewritten for v2; `SKILL-components.md` retired — component file headers replace it
- Button sizes: `--lg` (48px) added, default 40px, `--sm` 32px; `--xs` removed
- Theme toggle: light ↔ dark only ("system" removed); follows the OS until first click
- Styleguide nav: Overview / Foundations / Components groups, then that group's pages; theme toggle at the bottom; sticky top bar + dropdown under 48rem (closes on link click via `styleguide/styleguide.js`)
- Styleguide: `components.html` split into `styleguide/components/<name>.html` (icon, btn, form, tabs, card)

---

## 2026-07-17 — Bug Fixes + Cleanup (framework audit)

### Bug Fixes
- **High-contrast media query never fired** — `prefers-contrast: high` is not a valid value; changed to `prefers-contrast: more`
- **Radios/toggles unusable by keyboard** — `.form_radio` and `.form_toggle-input` were `display: none`, so they could never receive focus and their `:focus-visible + label` rules were dead. Now hidden with the visually-hidden pattern (focusable)
- **`.form_select:focus` ring invisible** — `box-shadow: 0 0 0 var(--color-focus)` parsed as a zero-spread (invisible) shadow; now matches `.form_input` (`0 0 0 var(--focus-ring-offset) var(--color-focus)`)
- **Dark theme `--color-bg-subtle` was identical to `--color-bg`** (both `neutral-9`) — pills tabs invisible against the page in dark mode. Now `neutral-8` (mirrors light theme's one-step offset)
- **ThemeManager baked in the system theme on first visit** — `applyTheme()` stored every theme it applied, so `watchSystemTheme()`'s "no manual choice" check never passed after first load. Persistence now happens only in `toggle()`/`setTheme()` (explicit user choice)
- **ThemeManager no-animate path was ineffective** — inline `transition` on `<html>` doesn't stop child transitions; now uses the existing `.theme-loading` class (without clobbering a page-set FOUC guard)

### Cleanup
- Theme-transition selector list: removed stale `[class*="bg-"]`/`[class*="text-"]`/`[class*="border-"]` (those utilities were culled 2026-05-31); added `.card` so cards transition with the theme instead of snapping
- `.card--flat`: removed duplicate `border` declaration (base `.card` already sets it)
- `.grid-wrap`: hardcoded `gap: 1rem` → `var(--size-base)`
- Rewrote stale root `README.md` in the outer `Syrup` repo (still described the pre-cull utility-first framework, npm install, 7 layers)
- Registry (`SKILL-components.md`): corrected Icon sizing note (rem, not em) and flagged `--icon-site-family` as a required project override

---

## 2026-05-31 — Sprint Cleanup + Bug Fixes

### Bug Fixes
- **`.card_footer` margin-bottom** — removed erroneous `margin-bottom: var(--card-gap)` that pushed space below the footer inside the card
- **`.tabs--pills` Tier 1 tokens** — replaced `--neutral-1`/`--neutral-2` with semantic `--color-bg-subtle`/`--color-bg-muted` for dark-mode compatibility
- **`--gap-*` scale removed** — eliminated the confusing offset naming (`--gap-sm` → `--size-base`); all usages replaced with direct `--size-*` tokens; definitions removed from `01-base.css`

### Sizing Scale
- Trimmed from 21 to 11 steps — removed `--size-6xl` through `--size-15xl` (unused in framework and all consuming projects)

### Styleguide Prune
- Replaced dead utility-class colour/shade/gradient/shadow demos with inline-style token swatches showing actual `--color-*` and `--neutral-*` values
- Fixed typeface section — was using nonexistent `.text-sans`/`.text-bold` utility classes; now uses inline `font-family`/`font-weight` with CSS custom properties
- Removed dead `.eyebrow` demo, added `.caption-sm`
- Components page: removed dead `u-heading-lg`, `w-full`; trimmed 16 duplicate pricing cards to a clean grid demo; added pills tab variant demo
- Updated nav links to match new section structure

### Skill Files
- Tightened `em` usage rule — explicit property list instead of vague guidance
- Added file-naming convention note (framework: numbered, projects: descriptive)
- Marked modal, table, dropdown as project-local in Summit in component registry
- Documented JS init convention (auto-init, CSS class selection, `data-` attribute pattern for new components)
- Removed resolved known issues (tabs pills, gap scale)

### Token Audit
- Moved orphan layout tokens (`--nav-height`, `--nav-tray-width`, `--page-padding`) from `01-base.css` to `style-guide.css` — no framework component consumed them; framework tokens must be paired with framework CSS

### Styleguide Navigation
- Added page links (Styles / Components) to header — visible inline on desktop, collapsed into "Go to" slide-out on mobile
- Replaced `includeHTML`-based nav with inline markup; removed old `sg-nav-sections` CSS

### Known Issues (resolved this session)
- ~~`.card_footer` margin-bottom bug~~ — fixed
- ~~`.tabs--pills` Tier 1 tokens~~ — fixed
- ~~`--gap-*` naming confusion~~ — removed entirely
- ~~`icon-svg--sm` identical to base~~ — was already differentiated (0.75em vs 1em)

---

## 2026-05-31 — Utilities Trim + Skill File Restructure

### Utilities (`04-utilities.css`)
- Stripped utilities back to a minimal set that earns its place in a component-first framework. **File reduced 482 → 62 lines.**
- **Retained:** type presets (`headline-*`/`heading-*`), text alignment, visibility (`hidden`/`visually-hidden`/`block`/`inline`), responsive visibility (`sm:`/`lg:`)
- **Removed:** spacing grid (`.m-*`/`.p-*`, ~130 classes), legacy grid spans, `.transform-none`, duplicate hidden classes (`.display-none` with `!important`, `.sr-only`), all text-colour, font-family, font-weight, text-style, background (brand/status/semantic), gradient, shadow, position, overflow, width/height, z-index, opacity, transition, focus, hover, cursor, select, and border utilities
- Rationale: utilities that style what belongs in a component or custom CSS (position, z-index, transition, focus, shadow) leak styling into markup and work against the methodology. Colour/spacing/sizing now come from component tokens, the `@layer custom`, or `[data-theme]` scoping (dark-section text)

### Styleguide
- Swapped `display-none` → `hidden` across index, header, sg-widget, sg-styleguide, sg-components
- Stripped redundant `text-normal` from the pricing demo markup
- Replaced demo `mt-05` spacing with a styleguide-local `.sg-price` rule in `style-guide.css` — the consumer owns its own demo spacing
- **Outstanding:** the styleguide still references ~100 removed utility classes — chiefly the colour/background/shadow/gradient swatch demos (which now document nothing) plus `w-full` layout helpers. Needs a deliberate showcase prune (tracked in sprints)

### Skill Files (`~/.claude/skills/syrup/`)
- Rewrote `SKILL.md` — separated non-negotiable rules from flexible guidance, relaxed token-tier usage, added project-scale adaptation (small/medium/large), documented CDN delivery and responsive approach, tightened component-promotion criteria
- Rewrote `SKILL-components.md` — added workflow for project-local vs framework components, a Notes column on the registry, and complexity estimates on the not-yet-built list

### Known Issues (carried forward — all resolved in next session entry above)
- ~~`.card_footer` margin-bottom bug~~
- ~~`.tabs--pills` Tier 1 tokens~~
- ~~`--gap-*` naming confusion~~
- Icon button classes (`--icon-lg` etc.) conflate style and size — deferred, tracked as known debt

---

## 2026-05-28 — Component Tokenization + Repo Consolidation

### Styleguide Path Fix
- All styleguide paths converted from mixed relative/absolute to absolute-from-repo-root
- Live Server now serves from `syrup-framework/` root (removed `/styleguide` root override)
- Fixed: CSS wasn't loading because `../css/main.css` couldn't escape the server root
- Updated all HTML files, includes, and nav links to use `/styleguide/...` and `/css/...` paths
- Consistent path scheme: every file at any depth resolves identically

### Components (`03-components.css`)
- Added three-tier component tokens to all components (buttons, forms, tabs, cards, caption)
- Button: `--btn-height`, `--btn-padding-x`, `--btn-gap`, `--btn-font-size`, `--btn-font-weight`, `--btn-letter-spacing`, `--btn-radius`
- Form: `--form-padding`, `--form-max-width`, `--form-font-size`, `--form-gap`, `--form-label-weight`, `--input-height`, `--input-padding`, `--input-font-size`
- Tabs: `--tabs-max-width`, `--tabs-gap`, `--tab-padding-x`, `--tab-padding-y`, `--tab-font-size`, `--tab-font-weight`, `--tab-letter-spacing`
- Card: `--card-padding`, `--card-radius`, `--card-bg`, `--card-border`, `--card-shadow`, `--card-gap`
- Caption: `--caption-weight`, `--caption-spacing`
- Size modifiers now override tokens instead of repeating properties
- Eliminated hardcoded `rem`/`px` magic numbers (except `1px` border-width)
- Card `--flat` and `--primary` modifiers use token overrides
- Removed orphan `transition` on base `.card` — only `--interactive` variant gets it
- Icon button internal sizes switched to `em` units
- Form radio-label padding switched to `em`

### Repo Structure
- Moved `syrup-styleguide/` into `syrup-framework/styleguide/`
- Moved `syrup-boilerplate/` into `syrup-framework/boilerplate/`
- Styleguide now references framework CSS via relative path (`../css/main.css`)
- Deleted standalone `syrup-styleguide/` and `syrup-boilerplate/` folders

### Docs
- Created root `README.md`
- Created `CHANGELOG.md`
- Removed `docs/` folder — AI workflow guide lives privately in `~/.claude/skills/syrup/SKILL.md`
- Updated skill file with component tokens, three-tier model, corrected layer names

### Known Issues (carried forward)
- Icon button classes (`--icon-lg`, `--icon-sm`, etc.) conflate style and size — future refactor to separate concerns
- Boilerplate `index.html` references `@v1.0.1` CDN tag — bump when next version is tagged

---

## 2025-02-19 — v1.0.1 Release + Repo Split

- Framework cleaned for CDN distribution (removed project-specific fonts, brand colours, FontAwesome)
- Tagged `v1.0.1` on GitHub, available via jsDelivr
- Split into two repos: `syrup-framework` (public/CDN) and `syrup` (private/boilerplate+styleguide)
- Icon components converted to use `--icon-site-family` CSS custom property
- Neutral grey defaults replace brand colours in base tokens

---

## Pre-2025 — Initial Development

- 6-layer cascade architecture established
- BEM with single underscore convention adopted
- Core components: buttons, forms, tabs, cards, icons, caption, toggle
- Theme system: `data-theme` attribute with light/dark/invert/only-dark/only-light
- ThemeManager JS with localStorage persistence and FOUC prevention
- TabsManager JS with keyboard navigation and ARIA support
- Fluid `clamp()` sizing and typography scales
- Focus-visible accessibility pattern across interactive elements
- Touch target enforcement via `@media (pointer: coarse)`
