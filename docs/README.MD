# Syrup CSS Framework
*Personal framework for rapid site development*

## Philosophy
- **Layer-based architecture** for predictable cascade control
- **Modified BEM** with single underscore (cleaner than double)
- **Semantic naming** over utility-first approach
- **Built-in theming** with CSS custom properties
- **Mobile-first** responsive design

## Quick Reference

### Basic Structure
```html
<!DOCTYPE html>
<html data-theme="light" lang="en">
<head>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <div class="wrap">
    <button class="btn btn--primary">Click me</button>
  </div>
</body>
</html>
```

### Key Components
```html
<!-- Navigation -->
<nav class="nav">
  <a class="nav_logo">Brand</a>
  <div class="nav_section">Links</div>
</nav>

<!-- Buttons -->
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary btn--sm">Small Secondary</button>

<!-- Layout -->
<div class="wrap">Standard container</div>
<div class="grid-lg">Grid layout</div>
```

## Architecture Overview

### Layer System (CSS Cascade Layers)
1. **base** - Reset, typography, CSS variables
2. **layout** - Grid systems, containers, spacing  
3. **components** - UI components (buttons, forms, nav)
4. **utilities** - Helper classes (spacing, display)
5. **themes** - Dark mode, color variations
6. **custom** - Project-specific overrides

### BEM Conventions
- **Block**: `.component`
- **Element**: `.component_element` (single underscore)
- **Modifier**: `.component--modifier` (double dash)
- **Element Modifier**: `.component_element--modifier`

### Key Design Decisions
- **Single underscore BEM**: Cleaner appearance than `__`
- **Layer-based cascade**: No `!important` needed
- **Semantic classes**: Component-focused, not utility-first
- **CSS custom properties**: Everything themeable uses variables
- **Combined reset + base**: Fewer files to manage

## File Structure
```
css/
├── main.css              # Layer definitions & imports
├── 01-base.css          # Reset, typography, variables
├── 02-layout.css        # Grid, containers, spacing
├── 03-components.css    # UI components
├── 04-utilities.css     # Helper classes
├── 05-themes.css        # Dark mode, themes
└── 06-custom.css        # Project-specific styles
```

## Development Notes
- Style guide available at `/pages/styleguide.html`
- Dark mode controlled by `data-theme` attribute
- All components designed mobile-first
- Focus styles included for accessibility
- Uses GeistVF and Roboto Mono fonts

## Browser Support
- Modern browsers with CSS Cascade Layers support
- Chrome 99+, Firefox 97+, Safari 15.4+
- Graceful degradation for older browsers

---
*Built for personal projects with flexibility and maintainability in mind.*