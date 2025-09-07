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

## Key Principles

### No !important Rule
- CSS Layers handle cascade order
- Never use `!important` except in rare utility cases
- Layers provide predictable override hierarchy

### Custom Properties Strategy
- All themeable values use CSS variables
- Semantic naming over generic (--btn-primary not --blue-500)
- Component-specific tokens when needed
- Global design tokens in base layer

### Component-First Approach
- Semantic class names describe purpose
- Utilities used sparingly for spacing/display helpers

## File Structure

```
css/
├── main.css              # Layer definitions & imports only
├── 01-base.css          # Variables, reset, typography, fonts
├── 02-layout.css        # Grid, containers, spacing systems
├── 03-components.css    # All UI components
├── 04-utilities.css     # Helper classes (display, spacing)
├── 05-themes.css        # Dark mode, theme variations
└── 06-custom.css        # Project-specific sg
```

## When Making Changes

### Adding New Components
1. **Location**: Always add to `03-components.css`
2. **Structure**: Follow BEM pattern with base component first
3. **Naming**: Use semantic block names (btn, nav, card, modal)
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
2. **Naming**: Use descriptive, semantic names
3. **Purpose**: Only for commonly repeated patterns
4. **Scope**: Keep utilities simple and single-purpose

### Color/Theme Changes
1. **Location**: Update custom properties in `01-base.css`
2. **Consistency**: Maintain naming convention
3. **Dark Mode**: Update corresponding theme tokens in `05-themes.css`
4. **Testing**: Verify all components still work with changes

# CSS Writing Guidelines

## Property Declaration Order

1. **Custom Properties** - CSS variables
2. **Display & Positioning** - How element is rendered and positioned
3. **Typography** - Font, text structure (not color)
4. **Box Model (Inside-Out)** - width/height, padding, border, margin
5. **Layout** - Flexbox, grid, gap, alignment
6. **Visual** - Colors, backgrounds, shadows
7. **Interaction** - Cursor, transitions, animations
8. **Content** - Pseudo-element content

## Examples

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

.card {
    /* Custom Properties */
    --card-shadow: 0 2px 8px rgba(0,0,0,0.1);
    
    /* Display & Positioning */
    display: block;
    position: relative;
    
    /* Typography */
    font-size: var(--text);
    line-height: 1.5;
    
    /* Box Model */
    width: 100%;
    max-width: 400px;
    padding: 1.5rem;
    border: 1px solid var(--border-light);
    border-radius: var(--border-radius-lg);
    margin-bottom: 1rem;
    
    /* Layout */
    overflow: hidden;
    
    /* Visual */
    background: var(--bg-white);
    box-shadow: var(--card-shadow);
    
    /* Interaction */
    transition: transform 0.2s ease;
}
```

## Additional Guidelines

### Use Consistent Spacing
- Use 4 spaces for indentation (not tabs)
- Add a space after colons: `color: red;` not `color:red;`
- Group related properties with blank lines for readability

### BEM Naming Structure
Write selectors in this order within a component:
```css
/* 1. Base block */
.btn {
    /* properties */
}

/* 2. Elements */
.btn_icon {
    /* properties */
}

.btn_text {
    /* properties */
}

/* 3. Modifiers */
.btn--primary {
    /* properties */
}

.btn--large {
    /* properties */
}

/* 4. State variations */
.btn:hover {
    /* properties */
}

.btn:focus {
    /* properties */
}

.btn:disabled {
    /* properties */
}
```

### Custom Properties First
When using CSS custom properties, declare them at the top of the property list:
```css
.component {
    /* Custom properties */
    --component-bg: var(--color-primary);
    --component-color: var(--text-white);
    
    /* Then regular properties */
    display: flex;
    background: var(--component-bg);
    color: var(--component-color);
}
```

### Comment Organization
Use consistent comments to separate major sections:
```css
/* Component Name -------------------------------- */
.component {
    /* properties */
}

/* Responsive ------------------------------------ */
@media (min-width: 768px) {
    .component {
        /* responsive properties */
    }
}
```