/**
 * Syrup Styleguide — UI JS
 * StylesNavManager + MobileNavManager
 * Not distributed with the framework — styleguide only.
 * Requires GSAP.
 * ------------------------------------------------- */


/* -------------------------------------------------
   Styles Nav Manager
   Handles: animated section nav in styleguide,
   desktop toggle, keyboard/escape dismissal,
   Lenis-aware smooth scrolling
------------------------------------------------- */

class StylesNavManager {
    constructor() {
        this.isOpen   = false;
        this.timeline = null;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const toggleButton = document.querySelector('.btn-triangle.btn--style');
        const stylesNav    = document.querySelector('.sg-groups-nav_links');
        const navLinks     = document.querySelectorAll('.sg-groups-nav_link');

        if (!toggleButton || !stylesNav || !navLinks.length) return;

        // Desktop: links visible by default
        if (window.innerWidth > 900) {
            gsap.set(navLinks, { opacity: 1, y: 0 });
        }

        toggleButton.addEventListener('click', () => {
            this.toggle(stylesNav, toggleButton, navLinks);
        });

        // Anchor link clicks — close nav then scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href?.startsWith('#')) return;

                if (this.isOpen && window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.close(stylesNav, toggleButton, navLinks, () => {
                        setTimeout(() => this.scrollToTarget(href), 300);
                    });
                }
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !toggleButton.contains(e.target) && !stylesNav.contains(e.target)) {
                this.close(stylesNav, toggleButton, navLinks);
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close(stylesNav, toggleButton, navLinks);
            }
        });

        // Reset on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                gsap.set(navLinks, { opacity: 1, y: 0 });
                this.isOpen = false;
                toggleButton.classList.remove('active');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    scrollToTarget(href) {
        const target = document.querySelector(href);
        if (!target) return;
        const offset = -160;

        if (window.lenis) {
            window.lenis.scrollTo(target, {
                offset,
                duration: 1.2,
                easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
            });
        } else {
            window.scrollTo({ top: target.offsetTop + offset, behavior: 'smooth' });
        }
    }

    toggle(nav, btn, links) {
        this.isOpen ? this.close(nav, btn, links) : this.open(nav, btn, links);
    }

    open(nav, btn, links) {
        this.isOpen = true;
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');

        this.timeline = gsap.timeline();
        this.timeline
            .to(nav, { maxHeight: '500px', paddingTop: '1rem', paddingBottom: '1rem', duration: 0.3, ease: 'power2.out' })
            .to(links, { opacity: 1, y: 0, duration: 0.2, stagger: 0.03, ease: 'power2.out' }, '-=0.1');
    }

    close(nav, btn, links, onComplete) {
        this.isOpen = false;
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');

        this.timeline = gsap.timeline({ onComplete });
        this.timeline
            .to(links, { opacity: 0, y: -20, duration: 0.2, stagger: -0.03, ease: 'power2.in' })
            .to(nav, { maxHeight: '0px', paddingTop: '0', paddingBottom: '0', duration: 0.3, ease: 'power2.in' }, '-=0.1');
    }
}


/* -------------------------------------------------
   Mobile Nav Manager
   Handles: styleguide mobile nav, backdrop,
   scroll lock, Escape dismissal
------------------------------------------------- */

class MobileNavManager {
    constructor() {
        this.isOpen = false;
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        const toggle    = document.getElementById('mobileTrigger');
        const stylesNav = document.querySelector('.sg-groups-nav');
        if (!toggle || !stylesNav) return;

        // Create backdrop if it doesn't exist
        let backdrop = document.querySelector('.nav-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.className = 'nav-backdrop';
            document.body.appendChild(backdrop);
        }

        toggle.addEventListener('click', () => this.toggleNav(toggle, stylesNav));

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && window.innerWidth <= 900 &&
                !toggle.contains(e.target) && !stylesNav.contains(e.target)) {
                this.close(toggle, stylesNav);
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close(toggle, stylesNav);
        });
    }

    toggleNav(toggle, nav) {
        this.isOpen ? this.close(toggle, nav) : this.open(toggle, nav);
    }

    open(toggle, nav) {
        this.isOpen = true;
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        nav.classList.add('open');
        document.body.style.overflow = 'hidden';

        const backdrop = document.querySelector('.nav-backdrop');
        if (backdrop) {
            backdrop.classList.add('active');
            backdrop.addEventListener('click', () => this.close(toggle, nav), { once: true });
        }
    }

    close(toggle, nav) {
        this.isOpen = false;
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.body.style.overflow = '';

        const backdrop = document.querySelector('.nav-backdrop');
        if (backdrop) backdrop.classList.remove('active');
    }
}


// Init
const stylesNavManager = new StylesNavManager();
const mobileNavManager = new MobileNavManager();
