# Syrup CSS Framework

A modern, lightweight CSS framework built with a 7-layer architecture, design tokens, and utility-first approach.

## Features

- **7-Layer CSS Architecture** - Predictable cascade order using CSS `@layer`
- **Design System Foundation** - CSS custom properties for consistent theming
- **Multi-Theme Support** - Built-in light/dark mode with smooth transitions
- **Utility Classes** - Comprehensive set of utility classes for rapid development
- **Component Library** - Pre-built components (buttons, forms, navigation)
- **Responsive Design** - Mobile-first responsive utilities
- **Modern CSS** - Uses latest CSS features like custom properties and layers

## Installation

```bash
npm install syrup-css-framework
```

## Usage

### Complete Framework
```css
@import 'syrup-css-framework/css/main.css';
```

### Selective Import
```css
/* Import only what you need */
@import 'syrup-css-framework/css/01-settings.css';
@import 'syrup-css-framework/css/06-utilities.css';
@import 'syrup-css-framework/css/05-components.css';
```

### HTML Link
```html
<link rel="stylesheet" href="node_modules/syrup-css-framework/css/main.css">
```

## Layer Architecture

1. **reset** - CSS reset & font loading
2. **base** - Element defaults & typography
3. **layout** - Grid systems & containers
4. **components** - UI components
5. **utilities** - Helper classes
6. **themes** - Theme variations
7. **user** - Your custom styles

## Quick Start

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="node_modules/syrup-css-framework/css/main.css">
</head>
<body>
  <div class="wrap">
    <button class="btn btn--primary">Primary Button</button>
    <div class="grid grid--3-col gap-4">
      <div class="bg-primary text-white p-4">Grid Item 1</div>
      <div class="bg-secondary text-white p-4">Grid Item 2</div>
      <div class="bg-tertiary text-white p-4">Grid Item 3</div>
    </div>
  </div>
</body>
</html>
```

## Utility Classes

- **Spacing**: `p-1`, `m-2`, `gap-4`
- **Colors**: `bg-primary`, `text-secondary`
- **Layout**: `grid`, `flex`, `position-relative`
- **Typography**: `text-xl`, `font-bold`
- **Z-Index**: `z-10`, `z-20`, `z-50`

## Components

- **Buttons**: `.btn`, `.btn--primary`, `.btn--secondary`
- **Forms**: `.form`, `.form_input`, `.form_label`
- **Navigation**: `.nav`, `.nav_item`
- **Icons**: `.icon`, `.icon--sm`, `.icon--lg`

## Theming

The framework uses CSS custom properties for easy theming:

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --font-family-primary: 'Your Font';
}
```

## Dark Mode

Dark mode is automatically applied based on user preference:

```css
@media (prefers-color-scheme: dark) {
  /* Dark theme automatically applied */
}
```

## Browser Support

- Chrome 99+
- Firefox 97+
- Safari 15.4+
- Edge 99+

## License

MIT License - feel free to use in personal and commercial projects.

## Contributing

Contributions welcome! Please read our contributing guidelines before submitting PRs.