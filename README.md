# Syrup CSS Framework

A semantic, component-first CSS framework. Built for rapid site development with predictable cascade behaviour.

## What It Is

- **CSS Cascade Layers** — 6-layer system, no `!important` ever
- **Modified BEM** — single underscore: `.block_element--modifier`
- **Three-tier tokens** — raw values → semantic aliases → component tokens
- **Dark/light theming** — `data-theme` attribute with invert, force-dark/light variants
- **Fluid sizing** — `clamp()`-based scales for spacing and typography

## Quick Start

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tanc-studio/syrup-framework@v1.0.1/css/main.css">

<!-- JS (theme manager, tabs) -->
<script src="https://cdn.jsdelivr.net/gh/tanc-studio/syrup-framework@v1.0.1/js/syrup.js" defer></script>
```

Override brand tokens and add project styles in your own CSS file inside `@layer custom`.

## Structure

```
css/
├── main.css            ← imports all layers
├── 01-base.css         ← reset, root tokens, typography
├── 02-layout.css       ← grid, containers, spacing
├── 03-components.css   ← buttons, forms, cards, tabs, etc.
├── 04-utilities.css    ← helper classes
└── 05-themes.css       ← dark/light theme tokens

js/
└── syrup.js            ← ThemeManager + TabsManager

styleguide/             ← component validation environment
boilerplate/            ← project starter template
```

## Components

| Component | Key Classes |
|-----------|-------------|
| Button | `.btn`, `--sm/--xs`, `--primary/--secondary/--tertiary`, `--icon`, `--loading` |
| Form | `.form`, `_input`, `_select`, `_label`, `_radio-group`, `_toggle` |
| Card | `.card`, `_header/_body/_footer`, `--flat/--primary/--interactive` |
| Tabs | `.tabs`, `--horizontal/--vertical/--pills`, `.tab` |
| Icon | `.icon`, `--xs/--sm/--lg`, `.icon-svg` |
| Caption | `.caption`, `.caption-sm` |

## Docs

See [`CHANGELOG.md`](CHANGELOG.md) for version history.

## License

Personal framework by [tanc-studio](https://github.com/tanc-studio).
