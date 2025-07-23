async function includeHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return; // Skip if element doesn't exist
    
    try {
        let response = await fetch(filePath);
        let html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.warn(y `Could not load ${filePath}:`, error);
    }
}

function animateImage() {
    const image = document.querySelector('.card_img');
    if (!image) return; // Skip if image doesn't exist

    // First, enlarge the image
    image.classList.add('enlarge');

    // After a short delay, apply the fade-and-grow effect
    setTimeout(() => {
        image.classList.add('fade-and-grow');
    }, 2000); // Adjust time as needed

    // Finally, reset the image after a couple of seconds
    setTimeout(() => {
        image.classList.remove('enlarge', 'fade-and-grow');
    }, 4000); // Adjust time as needed
}

// Only trigger animation if the image exists
if (document.querySelector('.card_img')) {
    animateImage();
}

// Theme Switching Functionality
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        // Apply theme immediately to prevent flash
        this.applyTheme(this.currentTheme, false);
        
        // Remove loading class after DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
            document.documentElement.classList.remove('theme-loading');
        });
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    storeTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    applyTheme(theme, animate = true) {
        const root = document.documentElement;
        
        if (!animate) {
            // Temporarily disable transitions for instant application
            root.style.transition = 'none';
        }
        
        // Remove existing theme classes
        root.removeAttribute('data-theme');
        
        // Apply new theme
        if (theme !== 'light') {
            root.setAttribute('data-theme', theme);
        }
        
        if (!animate) {
            // Force reflow and re-enable transitions
            root.offsetHeight;
            root.style.transition = '';
        }
        
        this.currentTheme = theme;
        this.storeTheme(theme);
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme: theme } 
        }));
    }

    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.applyTheme(theme);
        }
    }

    // Listen for system theme changes
    watchSystemTheme() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();
themeManager.watchSystemTheme();

// Global functions for easy access
window.toggleTheme = () => themeManager.toggle();
window.setTheme = (theme) => themeManager.setTheme(theme);

// Tabs Functionality
class TabsManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeTabs();
        });
    }

    initializeTabs() {
        const tabContainers = document.querySelectorAll('.tabs');
        
        tabContainers.forEach(container => {
            const buttons = container.querySelectorAll('.tabs_button');
            const panels = container.querySelectorAll('.tabs_panel');
            
            // Set up click handlers
            buttons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    this.switchTab(container, index);
                });
                
                // Handle keyboard navigation
                button.addEventListener('keydown', (e) => {
                    this.handleKeyboardNavigation(e, buttons, index);
                });
            });
            
            // Initialize first tab as active if none are active
            if (!container.querySelector('.tabs_button--active')) {
                this.switchTab(container, 0);
            }
        });
    }

    switchTab(container, activeIndex) {
        const buttons = container.querySelectorAll('.tabs_button');
        const panels = container.querySelectorAll('.tabs_panel');
        
        // Remove active classes
        buttons.forEach(button => button.classList.remove('tabs_button--active'));
        panels.forEach(panel => panel.classList.remove('tabs_panel--active'));
        
        // Add active classes
        if (buttons[activeIndex]) {
            buttons[activeIndex].classList.add('tabs_button--active');
        }
        if (panels[activeIndex]) {
            panels[activeIndex].classList.add('tabs_panel--active');
        }
        
        // Dispatch custom event
        container.dispatchEvent(new CustomEvent('tabchange', {
            detail: { activeIndex, activeButton: buttons[activeIndex], activePanel: panels[activeIndex] }
        }));
    }

    handleKeyboardNavigation(e, buttons, currentIndex) {
        let newIndex = currentIndex;
        
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
                break;
            case 'ArrowRight':
                e.preventDefault();
                newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = buttons.length - 1;
                break;
            default:
                return;
        }
        
        buttons[newIndex].focus();
        this.switchTab(buttons[currentIndex].closest('.tabs'), newIndex);
    }
}

// Initialize tabs manager
const tabsManager = new TabsManager();
