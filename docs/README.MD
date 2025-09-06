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
└── 06-custom.css        # Project-specific styles
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

#