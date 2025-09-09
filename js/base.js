async function includeHTML(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return; // Skip if element doesn't exist
    
    try {
        let response = await fetch(filePath);
        let html = await response.text();
        element.innerHTML = html;
    } catch (error) {
        console.warn(`Could not load ${filePath}:`, error);
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

// Only trigger animation if the image exists and DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.card_img')) {
        animateImage();
    }
});

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
            const buttons = container.querySelectorAll('.tab');
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
            if (!container.querySelector('.tab--active')) {
                this.switchTab(container, 0);
            }
        });
    }

    switchTab(container, activeIndex) {
        const buttons = container.querySelectorAll('.tab');
        const panels = container.querySelectorAll('.tabs_panel');
        
        // Remove active classes
        buttons.forEach(button => button.classList.remove('tab--active'));
        panels.forEach(panel => panel.classList.remove('tabs_panel--active'));
        
        // Add active classes
        if (buttons[activeIndex]) {
            buttons[activeIndex].classList.add('tab--active');
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

// Styles Navigation Toggle Functionality
class StylesNavManager {
    constructor() {
        this.isOpen = false;
        this.timeline = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeStylesNav();
        });
    }

    initializeStylesNav() {
        const toggleButton = document.querySelector('.btn-triangle.btn--style');
        const stylesNav = document.querySelector('.sg-styles-nav_links');
        const navLinks = document.querySelectorAll('.sg-styles-nav_link');
        
        if (!toggleButton || !stylesNav || !navLinks.length) return;

        // Set initial state for links on desktop (visible)
        if (window.innerWidth > 900) {
            gsap.set(navLinks, { opacity: 1, transform: 'translateY(0)' });
        }

        toggleButton.addEventListener('click', () => {
            this.toggleStylesNav(stylesNav, toggleButton, navLinks);
        });

        // Handle nav link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle anchor links (starting with #) for smooth scrolling
                // External links should navigate normally
                if (href.startsWith('#')) {
                    // Only prevent default behavior if navigation is collapsible and open
                    // On desktop (>900px), navigation should always be clickable
                    if (this.isOpen && window.innerWidth <= 900) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.closeStylesNav(stylesNav, toggleButton, navLinks, () => {
                            // Wait a moment after menu closes, then scroll to section
                            setTimeout(() => {
                                const targetElement = document.querySelector(href);
                                if (targetElement) {
                                    // Calculate offset (10rem = 160px assuming 16px base font)
                                    const offset = -160;
                                    
                                    // Use Lenis scroll if available, otherwise fallback to manual scroll
                                    if (window.lenis) {
                                        window.lenis.scrollTo(targetElement, {
                                            offset: offset,
                                            duration: 1.2,
                                            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
                                        });
                                    } else {
                                        // Manual scroll with offset
                                        const elementPosition = targetElement.offsetTop;
                                        const offsetPosition = elementPosition + offset;
                                        
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                        });
                                    }
                                }
                            }, 300);
                        });
                    }
                }
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!toggleButton.contains(e.target) && !stylesNav.contains(e.target) && this.isOpen) {
                this.closeStylesNav(stylesNav, toggleButton, navLinks);
            }
        });

        // Close nav when pressing escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeStylesNav(stylesNav, toggleButton, navLinks);
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                gsap.set(navLinks, { opacity: 1, transform: 'translateY(0)' });
                this.isOpen = false;
                toggleButton.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    toggleStylesNav(stylesNav, toggleButton, navLinks) {
        if (this.isOpen) {
            this.closeStylesNav(stylesNav, toggleButton, navLinks);
        } else {
            this.openStylesNav(stylesNav, toggleButton, navLinks);
        }
    }

    openStylesNav(stylesNav, toggleButton, navLinks) {
        this.isOpen = true;
        toggleButton.classList.add('active');
        toggleButton.setAttribute('aria-expanded', 'true');
        stylesNav.classList.add('open');

        // Kill any existing timeline
        if (this.timeline) this.timeline.kill();

        // Create new timeline
        this.timeline = gsap.timeline();

        // Animate container
        this.timeline.to(stylesNav, {
            maxHeight: '500px',
            paddingTop: '5rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1rem',
            duration: 0.4,
            ease: 'power2.out'
        });

        // Animate links with stagger
        this.timeline.to(navLinks, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out'
        }, '-=0.2');
    }

    closeStylesNav(stylesNav, toggleButton, navLinks, callback = null) {
        this.isOpen = false;
        toggleButton.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');

        // Kill any existing timeline
        if (this.timeline) this.timeline.kill();

        // Create new timeline
        this.timeline = gsap.timeline({
            onComplete: () => {
                stylesNav.classList.remove('open');
                if (callback) callback();
            }
        });

        // Animate links out with stagger (reverse order)
        this.timeline.to(navLinks, {
            opacity: 0,
            y: -20,
            duration: 0.2,
            stagger: -0.03,
            ease: 'power2.in'
        });

        // Animate container
        this.timeline.to(stylesNav, {
            maxHeight: '0px',
            paddingTop: '0rem',
            paddingLeft: '1rem',
            paddingRight: '0rem',
            paddingBottom: '0rem',
            duration: 0.3,
            ease: 'power2.in'
        }, '-=0.1');
    }
}

// Initialize sg nav manager
const stylesNavManager = new StylesNavManager();

// Mobile Navigation Manager
class MobileNavManager {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeMobileNav();
        });
    }

    initializeMobileNav() {
        const mobileToggle = document.getElementById('mobileTrigger');
        const stylesNav = document.querySelector('.sg-styles-nav');
        
        // Create backdrop element if it doesn't exist
        let backdrop = document.querySelector('.nav-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'nav-backdrop';
            document.body.appendChild(backdrop);
        }
        
        if (!mobileToggle || !stylesNav) return;

        mobileToggle.addEventListener('click', () => {
            this.toggleMobileNav(mobileToggle, stylesNav);
        });

        // Note: Link click handling is managed by StylesNavManager

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 900 && this.isOpen && 
                !mobileToggle.contains(e.target) && 
                !stylesNav.contains(e.target)) {
                this.closeMobileNav(mobileToggle, stylesNav);
            }
        });

        // Close nav when pressing escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMobileNav(mobileToggle, stylesNav);
            }
        });
    }

    toggleMobileNav(mobileToggle, stylesNav) {
        if (this.isOpen) {
            this.closeMobileNav(mobileToggle, stylesNav);
        } else {
            this.openMobileNav(mobileToggle, stylesNav);
        }
    }

    openMobileNav(mobileToggle, stylesNav) {
        this.isOpen = true;
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        stylesNav.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when nav is open
        
        // Show backdrop
        const backdrop = document.querySelector('.nav-backdrop');
        if (backdrop) {
            backdrop.classList.add('active');
            
            // Add click event to backdrop to close nav
            backdrop.addEventListener('click', () => {
                this.closeMobileNav(mobileToggle, stylesNav);
            }, { once: true });
        }
    }

    closeMobileNav(mobileToggle, stylesNav) {
        this.isOpen = false;
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        stylesNav.classList.remove('open');
        document.body.style.overflow = ''; // Re-enable scrolling
        
        // Hide backdrop
        const backdrop = document.querySelector('.nav-backdrop');
        if (backdrop) {
            backdrop.classList.remove('active');
        }
    }
}

// Initialize mobile nav manager
const mobileNavManager = new MobileNavManager();
