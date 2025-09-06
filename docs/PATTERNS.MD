# Coding Patterns & Conventions

## BEM Component Structure

### Standard Pattern
```css
/* Block - the component itself */
.component {
  /* Base component styles */
}

/* Element - parts of the component */
.component_element {
  /* Styles for component parts */
}

/* Modifier - variations of the component */
.component--modifier {
  /* Component variations */
}

/* Element Modifier - variations of component parts */
.component_element--modifier {
  /* Element variations */
}
```

### Real Examples
```css
/* Navigation component */
.nav { /* block */ }
.nav_logo { /* element */ }
.nav_section { /* element */ }
.nav--dark { /* block modifier */ }
.nav_logo--large { /* element modifier */ }

/* Button component */
.btn { /* block */ }
.btn--primary { /* modifier */ }
.btn--secondary { /* modifier */ }
.btn--sm { /* size modifier */ }
.btn--icon { /* type modifier */ }
```

## Naming Conventions

### Component Names (Blocks)
- **Use nouns** that describe the component's purpose
- **Keep short** but descriptive
- **Avoid abbreviations** unless universally understood

```css
/* Good */
.nav, .btn, .card, .modal, .dropdown

/* Avoid */
.navigation, .button, .crd, .popup, .dd
```

### Element Names
- **Describe function** within the component
- **Use clear, semantic names**
- **Single underscore** separator

```css
/* Good */
.nav_logo, .card_title, .btn_icon, .modal_header

/* Avoid */
.nav_logo_image, .card_title_text, .modal_top_part
```

### Modifier Names
- **Describe variation** or state
- **Use semantic names** over visual descriptions when possible
- **Double dash** separator

```css
/* Good - Semantic */
.btn--primary, .nav--mobile, .card--featured

/* Acceptable - Size/Style */
.btn--sm, .text--bold, .grid--lg

/* Avoid - Too visual */
.btn--blue, .text--big, .card--rounded
```

## CSS Custom Properties

### Naming System
```css
/* Size Scale */
--size-xs: 0.25rem;
--size-sm: 0.5rem;
--size: 1rem;
--size-lg: 1.5rem;
--size-xl: 2rem;

/* Typography Scale */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;

/* Color System */
--text-shade-black: hsl(0, 0%, 10%);
--text-shade-grey: hsl(0, 0%, 40%);
--bg-shade-white: hsl(0, 0%, 98%);
--bg-shade-black: hsl(0, 0%, 8%);

/* Component Tokens */
--btn-primary: var(--text-shade-black);
--btn-primary-hover: hsl(0, 0%, 20%);
--nav-height: 3rem;
```

### Usage Rules
- **Always use semantic tokens** for component styles
- **Avoid direct color values** in component CSS
- **Create component-specific** custom properties when needed
- **Follow the cascade**: global → component → modifier

```css
/* Good */
.btn--primary {
  background-color: var(--btn-primary);
  color: var(--btn-primary-text);
}

/* Avoid */
.btn--primary {
  background-color: hsl(0, 0%, 10%);
  color: white;
}
```

## File Organization

### Component Sections
```css
/* Major section header */
/*
===============================================
BUTTONS
===============================================
*/

/* Subsection */
/* Button Base -------------------------------- */

/* Minor grouping */
/* Size Variants */
```

### Order Within Files
1. **Base component** styles first
2. **Element** styles next
3. **Modifiers** grouped by type
4. **States** (hover, focus, disabled) after base
5. **Media queries** at the end of each section

### Import Order (main.css)
```css
@import '01-base.css';      /* Foundation */
@import '02-layout.css';    /* Structure */
@import '03-components.css'; /* UI Components */
@import '04-utilities.css'; /* Helpers */
@import '05-themes.css';    /* Theming */
@import '06-custom.css';    /* Overrides */
```

## Component Development Rules

### New Component Checklist
- [ ] Follows BEM naming convention
- [ ] Uses CSS custom properties for themeable values
- [ ] Includes focus styles for interactive elements
- [ ] Responsive behavior considered
- [ ] Dark theme compatibility
- [ ] Added to style guide
- [ ] Documented with code examples

### Responsive Patterns
```css
/* Mobile-first approach */
.component {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .component {
    /* Tablet and up */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop and up */
  }
}
```

### State Management
```css
/* Automatic states (preferred) */
.btn:hover { }
.btn:focus { }
.btn:disabled { }

/* Manual states (when needed) */
.btn--loading { }
.btn--error { }
.btn--success { }
```

## Common Patterns

### Container Patterns
```css
.wrap { max-width: 1400px; margin: 0 auto; }
.wrap-sm { max-width: 1000px; margin: 0 auto; }
.wrap-xs { max-width: 800px; margin: 0 auto; }
```

### Spacing Utilities
```css
.mb-sm { margin-bottom: var(--size-sm); }
.mt-lg { margin-top: var(--size-lg); }
.p-md { padding: var(--size-md); }
```

### Display Utilities
```css
.display-none { display: none; }
.display-block { display: block; }
.flex { display: flex; }
.grid { display: grid; }
```

### Grid Layouts
```css
.grid-sm { display: grid; gap: var(--gap-sm); }
.grid-md { display: grid; gap: var(--gap-md); }
.grid-lg { display: grid; gap: var(--gap-lg); }
```

---

## Anti-Patterns to Avoid

### CSS
- Using `!important` (layers handle specificity)
- Deep nesting beyond component structure
- Magic numbers without custom property definitions
- Inconsistent BEM naming
- Direct color values in component styles

### HTML
- Mixing semantic and presentational class names
- Over-nesting wrapper elements
- Missing accessibility attributes on interactive elements
- Using divs where semantic HTML exists

### Architecture
- Styles in wrong layer (components in utilities, etc.)
- Breaking the single underscore BEM convention
- Adding utility classes to component files
- Creating single-use custom properties