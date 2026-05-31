# Changelog

All notable changes to the Syrup CSS Framework.

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

### Known Issues (carried forward)
- `.card_footer` carries a `margin-bottom` that adds space below the footer inside the card — likely a bug
- `.tabs--pills` references Tier 1 tokens (`--neutral-1`, `--neutral-2`) directly — should use semantic tokens for theme compatibility
- `--gap-*` scale is offset from `--size-*` (e.g. `--gap-sm` → `--size-base`) — confusing naming
- Icon button classes (`--icon-lg` etc.) conflate style and size

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
