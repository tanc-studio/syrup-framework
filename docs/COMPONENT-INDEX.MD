# Component Quick Reference

## Layout Components

### Containers
```html
<!-- Standard container (max 1400px) -->
<div class="wrap">Content</div>

<!-- Smaller containers -->
<div class="wrap-sm">Content (max 1000px)</div>
<div class="wrap-xs">Content (max 800px)</div>

<!-- Full width container -->
<div class="wrap-flush">Full width with margins</div>
```

### Grid Systems
```html
<!-- Basic grids with gap -->
<div class="grid-sm">Small gap grid</div>
<div class="grid-md">Medium gap grid</div>
<div class="grid-lg">Large gap grid</div>
```

## Typography

### Headings
```html
<h1 class="headline-xl">Largest headline</h1>
<h1 class="headline-lg">Large headline</h1>
<h2 class="headline">3XL text</h2>
<h2 class="heading-xl">XL heading</h2>
<h3 class="heading-lg">Large heading</h3>
<h3 class="heading">Standard heading</h3>
<h4 class="heading-sm">Small heading</h4>
```

### Text Sizes
```html
<p class="text">Base text (1rem)</p>
<p class="text-sm">Small text</p>
<p class="text-xs">Extra small text</p>
<p class="text-lg">Large text</p>
<p class="text-xl">Extra large text</p>
```

### Text Utilities
```html
<p class="text-mono">Monospace text</p>
<a class="link">Standard link</a>
<a class="link-sm">Small link</a>
```

## Buttons

### Basic Buttons
```html
<!-- Primary button (default size) -->
<button class="btn btn--primary">Primary Action</button>

<!-- Secondary styles -->
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--tertiary">Tertiary</button>
<button class="btn btn--form">Form Button</button>
```

### Button Sizes
```html
<!-- Size variants -->
<button class="btn btn--primary">Default (3.5rem height)</button>
<button class="btn btn--primary btn--sm">Small (2.75rem)</button>
<button class="btn btn--primary btn--xs">Extra Small (2rem)</button>
```

### Icon Buttons
```html
<!-- Icon with text -->
<button class="btn btn--primary">
  Save
  <svg class="icon icon-svg--sm">...</svg>
</button>

<!-- Icon only buttons -->
<button class="btn-icon btn--primary">
  <svg class="icon">...</svg>
</button>

<!-- Icon only sizes -->
<button class="btn-icon btn--icon-sm">Small icon</button>
<button class="btn-icon btn--icon-xs">Tiny icon</button>
```

### Round Buttons
```html
<button class="btn-roundbtn--primary">Round</button>
<button class="btn-round--sm">Small round</button>
<button class="btn-round--xs">Tiny round</button>
```

### Special Buttons
```html
<!-- Dark mode toggle -->
<button class="btn-darkmode" id="darkmodeToggle">
  <span class="theme-icon-light">🌙</span>
  <span class="theme-icon-dark">☀️</span>
</button>

<!-- Custom triangle button -->
<button class="btn-triangle">
  <svg class="icon">...</svg>
</button>
```

## Navigation

### Main Navigation
```html
<nav class="nav">
  <a class="nav_logo" href="/">Brand Name</a>
  <div class="nav_section">
    <!-- Navigation items go here -->
    <button class="btn--icon">Menu</button>
  </div>
</nav>
```

### Side Navigation
```html
<nav class="sidenav" id="sidenav">
  <div class="sidenav_header">
    <h2 class="sidenav_title">Navigation</h2>
    <button class="sidenav_close">×</button>
  </div>
  <div class="sidenav_content">
    <ul class="sidenav_list">
      <li class="sidenav_item">
        <a class="sidenav_link" href="#link">Link</a>
      </li>
    </ul>
  </div>
</nav>

<!-- Overlay -->
<div class="sidenav_overlay" id="sidenavOverlay"></div>
```

### Styles Navigation (For Style Guide)
```html
<nav class="styles-nav">
  <div class="styles-nav_links">
    <a class="styles-nav_link link-sm" href="#section">Section</a>
  </div>
</nav>
```

## Icons

### Icon Types
```html
<!-- SVG icons -->
<svg class="icon">...</svg>
<svg class="icon icon--sm">Small icon</svg>
<svg class="icon icon--lg">Large icon</svg>

<!-- Font icons -->
<span class="icon-social">a</span>  <!-- Social font -->
<span class="icon-site">home</span> <!-- Material icons -->

<!-- Special icon classes -->
<svg class="icon--darkmode">Theme icon</svg>
```

## Tabs

### Basic Tabs
```html
<div class="tabs">
  <nav class="tabs_nav" role="tablist">
    <button class="tab tab--active" role="tab">Tab 1</button>
    <button class="tab" role="tab">Tab 2</button>
  </nav>
  <div class="tabs_content">
    <div class="tabs_panel tabs_panel--active" role="tabpanel">
      Panel 1 content
    </div>
    <div class="tabs_panel" role="tabpanel">
      Panel 2 content
    </div>
  </div>
</div>
```

### Tab Variants
```html
<!-- Pills style -->
<div class="tabs tabs--pills">...</div>

<!-- Vertical tabs -->
<div class="tabs tabs--vertical">...</div>
```

## Utilities

### Spacing
```html
<!-- Margins -->
<div class="mb-sm">Margin bottom small</div>
<div class="mt-lg">Margin top large</div>
<div class="mb-xl">Margin bottom extra large</div>

<!-- Padding -->
<div class="p-md">Padding medium</div>
```

### Display
```html
<div class="display-none">Hidden</div>
<div class="display-block">Block display</div>
<div class="flex">Flex container</div>
<div class="grid">Grid container</div>
```

### Theme Classes
```html
<div class="theme-icon-light">Light theme only</div>
<div class="theme-icon-dark">Dark theme only</div>
```

## Page Structure

### Basic Page Template
```html
<!DOCTYPE html>
<html data-theme="light" lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body>
  <header class="header">
    <nav class="nav wrap">
      <a class="nav_logo heading-lg" href="/">Brand</a>
      <div class="nav_section">
        <button class="btn-darkmode">Toggle</button>
      </div>
    </nav>
  </header>

  <main class="main wrap">
    <h1 class="headline-xl">Page Title</h1>
    <p class="text">Page content...</p>
  </main>
</body>
</html>
```

### Style Guide Page
```html
<main class="main main--styles wrap">
  <nav class="styles-nav">
    <div class="styles-nav_links">
      <a class="styles-nav_link link-sm" href="#section">Section</a>
    </div>
  </nav>
  
  <section class="styles-group">
    <div class="styles-group_header">
      <h2 class="styles-heading">Component Name</h2>
    </div>
    <div class="styles-group_content">
      <!-- Component examples -->
    </div>
  </section>
</main>
```

---

## Common Patterns

### Card Layout
```html
<div class="wrap">
  <div class="grid-lg">
    <div class="card">Card content</div>
    <div class="card">Card content</div>
  </div>
</div>
```

### Form Layout
```html
<form class="form">
  <div class="form_group">
    <label class="form_label">Label</label>
    <input class="form_input" type="text">
  </div>
  <button class="btn btn--form btn--primary">Submit</button>
</form>
```

### Hero Section
```html