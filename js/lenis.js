// Create a new script element
const script = document.createElement('script');

// Set the script attributes
script.setAttribute('data-id-scroll', '');
script.setAttribute('data-autoinit', 'true');
script.setAttribute('data-duration', '1');
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
script.defer = true;
script.src = 'https://assets-global.website-files.com/645e0e1ff7fdb6dc8c85f3a2/64a5544a813c7253b90f2f50_lenis-offbrand.txt';

// Append the script to the document's head or body
document.head.appendChild(script);
// Or if you prefer to append it to the body:
// document.body.appendChild(script);