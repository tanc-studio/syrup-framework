# AI Collaboration Guide
*For Claude and other AI assistants working with Syrup CSS Framework*

## Framework Overview

**Syrup** is a personal CSS framework built for rapid site development with these core characteristics:

### Architecture
- **CSS Cascade Layers**: 6-layer system for predictable styling
- **Modified BEM**: Single underscore (`.block_element--modifier`)
- **CSS Custom Properties**: Everything themeable uses variables
- **Mobile-First**: Responsive design from small screens up
- **Semantic Components**: Not utility-first

### Layer System
```css
@layer base, layout, components, utilities, themes, custom;
```

1. **base** - Reset, typography, CSS variables, font loading
2. **layout** - Grid systems, containers, spacing helpers
3. **components** - UI components (buttons, nav, forms, etc.)
4. **utilities** - Display, spacing, color helpers
5. **themes** - Dark mode, theme variations
6. **custom** - Project-specific overrides and customizations

---

## Key Principles

### No !important Rule
- CSS Layers handle cascade order
- Never use `!important`
- Layers provide predictable override hierarchy

### Custom Properties Strategy
- All themeable values use CSS variables
- Semantic naming over generic (`--btn-primary` not `--blue-500`)
- Component-specific tokens when needed
- Global design tokens in base layer

### Component-First Approach
- Semantic class names describe purpose
- Utilities used sparingly for spacing/display helpers

---

## File Structure

```
css/
├── main.css              # Layer definitions & imports only
├── 01-base.css           # Variables, reset, typography, fonts
├── 02-layout.css         # Grid, containers, spacing systems
├── 03-components.css     # All UI components
├── 04-utilities.css      # Helper classes (display, spacing)
├── 05-themes.css         # Dark mode, theme variations
└── 06-custom.css         # Project-specific overrides

js/
├── syrup.js              # Framework JS only — ships with Syrup
└── styleguide.js         # Styleguide UI only — never in production
```

---

## JS Architecture

### `syrup.js` — framework only
Always loaded in every project. Contains:
- **ThemeManager** — dark/light mode, localStorage persistence, flash prevention
- **TabsManager** — tab switching, keyboard navigation, ARIA state

### `styleguide.js` — styleguide only
Never loaded in production projects. Contains:
- **StylesNavManager** — animated section nav (requires GSAP)
- **MobileNavManager** — mobile nav with backdrop and scroll lock

### Public API
```js
toggleTheme()        // Toggle between light and dark
setTheme('dark')     // Set explicitly: 'light' | 'dark'

// Listen for theme changes in project JS
window.addEventListener('themechange', (e) => {
    console.log(e.detail.theme); // 'light' | 'dark'
});
```

---

## JS Hook Naming Convention

Syrup uses a strict separation between CSS hooks and JS hooks.

**CSS hooks** — BEM classes, for styling only:
```html
<nav class="sg-groups-nav">
<button class="btn btn--primary">
<div class="card card--featured">
```

**JS hooks** — `data-` attributes, for behaviour only:
```html
<button data-action="submit">
<div data-component="accordion">
<section data-target="modal">
```

**One-off page-level elements** — camelCase IDs:
```html
<button id="darkmodeToggle">
<button id="mobileTrigger">
<div id="navTray">
```

### Rules
- **Never use a BEM class as a JS selector.** If JS needs to target it, give it a `data-` attribute or ID.
- **`data-` attributes** for components and repeated elements — no uniqueness constraint, scales to multiple instances.
- **camelCase IDs** for single, page-level elements (toggles, trays, overlays).
- **Separating concerns** means renaming a CSS class never breaks JS, and removing a JS hook never affects styling.

### Examples
```html
<!-- Tabs — data- attribute because multiple instances are possible -->
<div class="tabs" data-component="tabs">
  <button class="tab" data-action="tab-trigger">Tab One</button>
</div>

<!-- Dark mode toggle — ID because there is only ever one -->
<button class="btn btn--icon" id="darkmodeToggle" type="button">
```

```js
// Target by data attribute
document.querySelectorAll('[data-component="accordion"]')
document.querySelector('[data-action="submit"]')

// Target by ID
document.getElementById('darkmodeToggle')
```

---

## When Making Changes

### Adding New Components
1. **Location**: Always add to `03-components.css`
2. **Structure**: Follow BEM pattern with base component first
3. **Naming**: Use semantic block names (`btn`, `nav`, `card`, `modal`)
4. **Tokens**: Use existing CSS custom properties where possible
5. **States**: Include hover, focus, disabled states
6. **Responsive**: Consider mobile-first behavior
7. **Theme**: Test dark mode compatibility

### Modifying Existing Components
1. **Maintain BEM**: Keep naming consistent with existing patterns
2. **Use Layers**: Never add `!important` to override
3. **Custom Properties**: Update tokens rather than hardcoded values
4. **Backward Compatibility**: Don't break existing usage patterns

### Adding Utilities
1. **Location**: Add to `04-utilities.css`
2. **Naming**: Descriptive, semantic names
3. **Purpose**: Only for commonly repeated patterns
4. **Scope**: Keep utilities simple and single-purpose

### Color/Theme Changes
1. **Location**: Update custom properties in `01-base.css`
2. **Consistency**: Maintain naming convention
3. **Dark Mode**: Update corresponding theme tokens in `05-themes.css`
4. **Testing**: Verify all components still work with changes

---

## CSS Writing Guidelines

### Property Declaration Order

1. **Custom Properties** — CSS variables
2. **Display & Positioning** — How element is rendered and positioned
3. **Typography** — Font, text structure (not color)
4. **Box Model (Inside-Out)** — width/height, padding, border, margin
5. **Layout** — Flexbox, grid, gap, alignment
6. **Visual** — Colors, backgrounds, shadows
7. **Interaction** — Cursor, transitions, animations
8. **Content** — Pseudo-element content

### Example

```css
.btn {
    /* Custom Properties */
    --btn-bg: var(--color-primary);
    --btn-color: var(--text-white);

    /* Display & Positioning */
    display: inline-flex;
    position: relative;

    /* Typography */
    font-size: var(--text);
    font-weight: var(--text-medium);
    letter-spacing: var(--text-spacing-xs);
    white-space: nowrap;

    /* Box Model */
    height: 3rem;
    padding: 0 2rem;
    border: none;
    border-radius: 50vw;
    margin: 0;

    /* Layout */
    align-items: center;
    justify-content: center;
    gap: 0.5em;

    /* Visual */
    background-color: var(--btn-bg);
    color: var(--btn-color);

    /* Interaction */
    cursor: pointer;
    transition: all 0.2s ease;
}
```

### BEM Naming Structure
Write selectors in this order within a component:

```css
/* 1. Base block */
.btn { }

/* 2. Elements */
.btn_icon { }
.btn_text { }

/* 3. Modifiers */
.btn--primary { }
.btn--large { }

/* 4. States */
.btn:hover { }
.btn:focus { }
.btn:disabled { }
```

### Comment Organisation
```css
/* Component Name -------------------------------- */
.component { }

/* Responsive ------------------------------------ */
@media (min-width: 768px) {
    .component { }
}
```

---

## Deploying Syrup in a New Project

### HTML setup

```html
<html class="theme-loading" data-theme="light" lang="en">

<head>
  <!-- Syrup CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tanc-studio/syrup-framework@v1.0/css/main.css">
  <!-- Project overrides -->
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/custom.css">
</head>

<body>
  ...
  <!-- Syrup JS -->
  <script src="https://cdn.jsdelivr.net/gh/tanc-studio/syrup-framework@v1.0/js/syrup.js" defer></script>
</body>
```

### Project file structure

```
css/
├── tokens.css    ← brand tokens only (colours, fonts, radii)
└── custom.css    ← project components in @layer custom {}
```

### Token override pattern

Only declare what differs from Syrup defaults:

```css
@layer custom {
    :root {
        --color-primary:   hsl(220, 90%, 55%);
        --color-secondary: hsl(160, 60%, 45%);
        --text-sans: 'Your Font', sans-serif;
        --border-radius: 4px;
    }
}
```

### Versioning

| Tag     | Use case                       |
|---------|-------------------------------|
| `@main` | Development / testing only     |
| `@v1.0` | Stable — pin all live projects |

Changing the version tag is the only step needed to upgrade a project.
