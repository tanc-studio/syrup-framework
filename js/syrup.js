/**
 * Syrup Framework — Core JS
 * ThemeManager + TabsManager
 * ------------------------------------------------- */


/* -------------------------------------------------
   Theme Manager
   Handles: dark/light mode, system preference,
   localStorage persistence, flash prevention
------------------------------------------------- */

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        // Apply immediately to prevent flash of wrong theme
        this.applyTheme(this.currentTheme, false);

        document.addEventListener('DOMContentLoaded', () => {
            document.documentElement.classList.remove('theme-loading');
            this.bindToggle();
        });
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('syrup-theme');
    }

    storeTheme(theme) {
        localStorage.setItem('syrup-theme', theme);
    }

    applyTheme(theme, animate = true) {
        const root = document.documentElement;

        if (!animate) {
            root.style.transition = 'none';
        }

        // Light is the default — only set attribute for non-light themes
        if (theme === 'light') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', theme);
        }

        if (!animate) {
            root.offsetHeight; // Force reflow
            root.style.transition = '';
        }

        this.currentTheme = theme;
        this.storeTheme(theme);

        window.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme }
        }));
    }

    toggle() {
        this.applyTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
    }

    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.applyTheme(theme);
        }
    }

    watchSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only follow system if user hasn't made a manual choice
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Bind any element with id="darkmodeToggle"
    bindToggle() {
        const toggle = document.getElementById('darkmodeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }
    }
}

/* -------------------------------------------------
   Include HTML
   Loads external HTML partials into elements by ID.
   Usage: includeHTML('element-id', '/includes/file.html')
------------------------------------------------- */

async function includeHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(filePath);
        const html     = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.warn(`Could not load ${filePath}:`, error);
    }
}


// Init
const themeManager = new ThemeManager();
themeManager.watchSystemTheme();

// Public API
window.toggleTheme = () => themeManager.toggle();
window.setTheme    = (theme) => themeManager.setTheme(theme);


/* -------------------------------------------------
   Tabs Manager
   Handles: tab switching, keyboard navigation,
   ARIA state, custom events
------------------------------------------------- */

class TabsManager {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        document.querySelectorAll('.tabs').forEach(container => {
            this.setupContainer(container);
        });
    }

    setupContainer(container) {
        const buttons = container.querySelectorAll('.tab');
        const panels  = container.querySelectorAll('.tabs_panel');

        if (!buttons.length) return;

        buttons.forEach((button, index) => {
            button.addEventListener('click', () => this.switchTab(container, index));
            button.addEventListener('keydown', (e) => this.handleKeydown(e, container, index));
        });

        // Activate first tab if none are already active
        if (!container.querySelector('.tab--active')) {
            this.switchTab(container, 0);
        }
    }

    switchTab(container, activeIndex) {
        const buttons = container.querySelectorAll('.tab');
        const panels  = container.querySelectorAll('.tabs_panel');

        buttons.forEach((btn, i) => {
            btn.classList.toggle('tab--active', i === activeIndex);
            btn.setAttribute('aria-selected', i === activeIndex);
        });

        panels.forEach((panel, i) => {
            panel.classList.toggle('tabs_panel--active', i === activeIndex);
        });

        container.dispatchEvent(new CustomEvent('tabchange', {
            detail: {
                activeIndex,
                activeButton: buttons[activeIndex],
                activePanel:  panels[activeIndex]
            }
        }));
    }

    handleKeydown(e, container, currentIndex) {
        const buttons = container.querySelectorAll('.tab');
        const total   = buttons.length;
        let newIndex  = currentIndex;

        switch (e.key) {
            case 'ArrowLeft':  e.preventDefault(); newIndex = (currentIndex - 1 + total) % total; break;
            case 'ArrowRight': e.preventDefault(); newIndex = (currentIndex + 1) % total;         break;
            case 'Home':       e.preventDefault(); newIndex = 0;                                  break;
            case 'End':        e.preventDefault(); newIndex = total - 1;                          break;
            default: return;
        }

        buttons[newIndex].focus();
        this.switchTab(container, newIndex);
    }
}

// Init
const tabsManager = new TabsManager();
