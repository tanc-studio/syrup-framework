// lenis.js - Optimized Webflow-style Lenis Implementation
// Replace your entire lenis.js file with this code

(function() {
  console.log('Loading optimized Lenis...');
  
  // Create the script element
  const script = document.createElement('script');
  
  // Configure with data attributes
  script.setAttribute('data-id-scroll', '');
  script.setAttribute('data-autoinit', 'true');
  script.setAttribute('data-duration', '1.2');
  script.setAttribute('data-orientation', 'vertical');
  script.setAttribute('data-smoothWheel', 'true');
  script.setAttribute('data-smoothTouch', 'false');
  script.setAttribute('data-touchMultiplier', '1.5');
  script.setAttribute('data-easing', '(t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))');
  script.setAttribute('data-useOverscroll', 'true');
  script.setAttribute('data-useControls', 'true');
  script.setAttribute('data-useAnchor', 'true');
  script.setAttribute('data-useRaf', 'true');
  script.setAttribute('data-infinite', 'false');
  
  // Set script properties
  script.defer = true;
  script.src = 'https://assets-global.website-files.com/645e0e1ff7fdb6dc8c85f3a2/64a5544a813c7253b90f2f50_lenis-offbrand.txt';
  
  // Success handler
  script.onload = function() {
    console.log('✅ Lenis loaded successfully!');
    
    // Give it a moment to auto-initialize
    setTimeout(() => {
      // Test if smooth scrolling is working
      if (window.lenisInstance || window.lenis) {
        console.log('🎉 Smooth scrolling is active!');
      } else {
        console.log('ℹ️ Lenis loaded (auto-init enabled)');
      }
      
      // Dispatch ready event for other scripts
      window.dispatchEvent(new CustomEvent('lenisReady'));
    }, 100);
  };
  
  // Error handler
  script.onerror = function() {
    console.error('❌ Failed to load Lenis. Using CSS fallback.');
    document.documentElement.style.scrollBehavior = 'smooth';
  };
  
  // Add to page
  document.head.appendChild(script);
  
  console.log('Lenis script initialized');
})();