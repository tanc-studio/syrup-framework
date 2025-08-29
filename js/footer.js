document.addEventListener('DOMContentLoaded', function() {
    // Theme handling
    function initializeTheme() {
        const toggle = document.getElementById("darkmodeToggle");
        // If there's no toggle on this page, just apply the stored/system theme
        if (!toggle) {
            const storedTheme = localStorage.getItem('theme') || 
                (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
            document.documentElement.setAttribute('data-theme', storedTheme);
            document.body.classList.remove('theme-loading');
            return;
        }

        // Full theme functionality with toggle
        const storedTheme = localStorage.getItem('theme') || 
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        
        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            document.body.classList.remove('theme-loading');
            
            // Only try to update icons if they exist
            const lightIcon = document.querySelector('.theme-icon-light');
            const darkIcon = document.querySelector('.theme-icon-dark');
            if (lightIcon && darkIcon) {
                lightIcon.classList.toggle('display-none', theme !== 'light');
                darkIcon.classList.toggle('display-none', theme !== 'dark');
            }
        }
        
        // Apply the stored theme on page load
        applyTheme(storedTheme);
        
        // Set up toggle functionality
        toggle.onclick = function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(targetTheme);
            localStorage.setItem('theme', targetTheme);
        };
    }

    // Burger menu functionality
    function initializeBurgerMenu() {
        let isNavOpen = false;
        const navBurger = document.getElementById("navBurger");
        
        function toggleSidenav() {
            const sidenav = document.getElementById("navTray");
            if (!sidenav) return;
            
            isNavOpen = !isNavOpen;
            sidenav.classList.toggle("open", isNavOpen);
            navBurger.classList.toggle("open", isNavOpen);
        }

        if (navBurger) {
            navBurger.onclick = toggleSidenav;
        }
    }

    // Styleguide navigation
    function initializeStyleguideNav() {
        const menuLinks = document.querySelectorAll('#stylesNav a');
        const stopDistance = 152;

        menuLinks.forEach(link => {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetAnchor = document.getElementById(targetId);
                if (targetAnchor) {
                    const targetScrollPosition = targetAnchor.offsetTop - stopDistance;
                    window.scrollTo({
                        top: targetScrollPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    }

    // Initialize all features
    initializeTheme();
    initializeBurgerMenu();
    initializeStyleguideNav();
});

document.addEventListener('DOMContentLoaded', function() {
  // Footer functionality can be added here
  console.log('Footer JavaScript loaded');
  
  // Example: Handle footer links or interactions
  const footerLinks = document.querySelectorAll('.footer a');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add any footer link tracking or functionality here
    });
  });
});