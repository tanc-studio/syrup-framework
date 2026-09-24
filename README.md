# Syrup CSS Framework

A small, semantic, component-first CSS framework. Reset, tokens, base styles, layout primitives, a few utilities and components, plus a tiny optional JS module. The default look is a greyscale wireframe; brand it by changing tokens.

## What It Is

- **Cascade layers** — `reset, tokens, base, layout, components, utilities, custom`; no `!important`
- **BEM, single underscore** — `.block_element--modifier`
- **Two-tier tokens** — primitives (`--font-size-md`, `--size-16`) and semantic colour (`--color-text-muted`)
- **Light/dark without JS** — follows the OS via `light-dark()`; `data-theme="light|dark"` pins any element
- **Fluid type** — Utopia-style scale calculated live in CSS; `data-sizing="fixed"` locks it
- **Accessible by default** — one global focus ring, `prefers-contrast`, `forced-colors`, reduced motion, 44px tap areas on touch
- **Modern CSS** — logical properties, `oklch()`, container queries, native nesting; no build step

## Get It

Copy `css/`, `js/`, `fonts/` and `styleguide/` into your project and own them — edit the files directly. Or, for prototypes, load from jsDelivr (pin the tag):

```html
<head>
  <!-- Apply a saved theme before first paint (only needed with the theme toggle) -->
  <script>try { const t = localStorage.getItem('syrup-theme'); if (t) document.documentElement.dataset.theme = t; } catch {}</script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tanc-studio/syrup-framework@v2.0.0/css/main.css">
  <script type="module" src="https://cdn.jsdelivr.net/gh/tanc-studio/syrup-framework@v2.0.0/js/syrup.js"></script>
</head>
```

Project styles go after Syrup, optionally in `@layer custom`. v1 users: stay pinned to `@v1.0.1` — v2 is a clean break.

## Structure

```
css/
├── main.css            ← layer order + imports + version
├── reset.css
├── tokens.css          ← primitives, semantic colour, themes, contrast
├── scales.css          ← fluid type + section space maths
├── fonts.css           ← house fonts (delete the import to drop them)
├── base.css            ← elements, focus, native elements
├── layout.css          ← .wrap, .grid, .stack, .cluster
├── utilities.css       ← type presets, alignment, visibility
└── components/         ← one file per component
js/
├── syrup.js            ← module entry; delete imports you don't use
├── theme.js            ← <button data-theme-toggle>
└── tabs.js             ← [data-tabs]
fonts/                  ← Geist, Frank Ruhl Libre, Roboto Mono (OFL)
styleguide/             ← every token and component, both themes
```

## Components

Each file in `css/components/` starts with a header comment listing its classes, modifiers, states and JS hook.

| Component | Classes |
|-----------|---------|
| Button | `.btn`, `--primary/--secondary/--tertiary`, `--lg/--sm`, `--icon` |
| Form | `.form`, `_item`, `_label`, `_input`, `_select`, `_message`, `_checkbox-group`, `_radio-group` |
| Tabs | `.tabs`, `_nav`, `_content`, `_panel`, `.tab`, `--pills/--vertical` |
| Card | `.card`, `_header/_body/_footer`, `--interactive/--primary` |
| Icon | `.icon`, `--sm/--lg` |

## Styleguide

Serve the repo root (e.g. `npx serve`) and open `/styleguide/index.html`.

## Development

```
npm install
npm run lint:css
```

Stylelint enforces the conventions (naming, tokens, logical properties, nesting, property order).

## Docs

See [`CHANGELOG.md`](CHANGELOG.md) for version history.

## License

Personal framework by [tanc-studio](https://github.com/tanc-studio). Fonts are under the SIL Open Font License (see `fonts/`).
