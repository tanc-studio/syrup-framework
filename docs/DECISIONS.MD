# Architectural Decision Records

## Layer-Based Architecture
**Decision**: Adopt CSS Cascade Layers for framework organization  
**Date**: Early development  
**Reasoning**:
- Eliminates `!important` cascading issues
- Predictable override hierarchy
- Future-proof CSS approach
- Clear separation of concerns
- Better than specificity hacks

**Implementation**:
```css
@layer base, layout, components, utilities, themes, custom;
```

## Single Underscore BEM
**Decision**: Use `.block_element--modifier` instead of `.block__element--modifier`  
**Date**: Framework inception  
**Reasoning**:
- Cleaner visual appearance in code
- Easier and faster to type
- Still maintains clear semantic separation
- Personal preference for readability
- Consistent with project aesthetic

**Examples**:
```css
/* Our approach */
.nav_logo
.btn--primary
.sidenav_header

/* Standard BEM (rejected) */
.nav__logo
.btn--primary
.sidenav__header
```

## Combined Reset + Base Layer
**Decision**: Merge reset and base layers into single "base" layer  
**Date**: Recent refactor  
**Reasoning**:
- Reduces complexity from 7 to 6 layers
- Reset and base styles are closely related
- Fewer files to manage and import
- Logical grouping of foundational styles
- Maintains clear separation from other concerns

**Before**: `@layer reset, base, layout...`  
**After**: `@layer base, layout, components...`

## Custom Layer Naming
**Decision**: Use "custom" instead of "user" or "site" for final layer  
**Date**: Recent refactor  
**Reasoning**:
- More intuitive than "user" 
- More generic than "site"
- Works for both personal and potential shared use
- Clear intent: "project-specific customizations go here"
- Follows principle of least surprise

**Evolution**: `site` → `custom` (for better framework naming)

## Semantic Classes Over Utilities
**Decision**: Component-focused classes rather than utility-first approach  
**Date**: Framework design phase  
**Reasoning**:
- Better semantic meaning in HTML
- Easier to maintain and update
- More aligned with BEM methodology
- Personal preference for component thinking
- Utilities used sparingly for spacing/display helpers

**Approach**:
```html
<!-- Our way -->
<button class="btn btn--primary btn--sm">Click</button>

<!-- Utility-first (rejected) -->
<button class="bg-blue-500 text-white px-4 py-2 rounded">Click</button>
```

## CSS Custom Properties Strategy
**Decision**: Use CSS variables for all themeable values  
**Date**: Framework inception  
**Reasoning**:
- Enables dynamic theming (dark mode)
- Central control of design tokens
- Runtime customization capability
- Better than Sass variables for this use case
- Future-proof approach

**Naming Convention**:
```css
/* Semantic naming */
--text-shade-black
--btn-primary
--size

/* Not generic naming */
--color-1
--blue-500
--medium
```

## Mobile-First Responsive Design
**Decision**: Design mobile-first with progressive enhancement  
**Date**: Framework inception  
**Reasoning**:
- Better performance on mobile devices
- Forces focus on essential content
- Easier to enhance than to reduce
- Industry best practice
- Aligns with web standards

## GeistVF Font Choice
**Decision**: Use GeistVF as primary sans-serif font  
**Date**: Framework setup  
**Reasoning**:
- Modern variable font technology
- Excellent readability across sizes
- Good performance characteristics
- Clean, professional appearance
- Matches framework aesthetic goals

## Component State Management
**Decision**: Handle states through modifiers and pseudo-classes  
**Date**: Component development  
**Reasoning**:
- Consistent with BEM methodology
- Clear state representation
- No JavaScript required for basic states
- Accessible by default
- Easy to customize

**Pattern**:
```css
.btn { /* base */ }
.btn:hover { /* automatic state */ }
.btn:disabled { /* automatic state */ }
.btn--loading { /* manual state via class */ }
```

---

## Future Considerations

### Potential Changes Being Considered
- [ ] Adding more utility classes for common patterns
- [ ] Expanding component state variations
- [ ] Additional theme variations beyond dark/light
- [ ] Performance optimizations for larger projects

### Rejected Ideas
- **Double underscore BEM**: Too visually heavy
- **Utility-first approach**: Doesn't match personal workflow
- **Sass preprocessing**: CSS custom properties sufficient
- **Complex grid system**: CSS Grid is powerful enough
- **Multiple theme files**: Single theme file with variables works better