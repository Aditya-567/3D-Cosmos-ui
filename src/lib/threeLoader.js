// Global Three.js loader to prevent multiple CDN script loading conflicts
let threeLoadPromise = null;
let isThreeLoaded = false;

export const loadThree = () => {
  // If already loaded, resolve immediately
  if (isThreeLoaded && window.THREE) {
    return Promise.resolve(window.THREE);
  }

  // If currently loading, return the existing promise
  if (threeLoadPromise) {
    return threeLoadPromise;
  }

  // Start loading Three.js
  threeLoadPromise = new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="three.min.js"]');

    if (existingScript) {
      // Script exists, wait for it to load
      if (window.THREE) {
        isThreeLoaded = true;
        resolve(window.THREE);
      } else {
        existingScript.addEventListener('load', () => {
          isThreeLoaded = true;
          resolve(window.THREE);
        });
        existingScript.addEventListener('error', reject);
      }
      return;
    }

    // Create new script tag
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;

    script.onload = () => {
      isThreeLoaded = true;
      resolve(window.THREE);
    };

    script.onerror = () => {
      threeLoadPromise = null;
      reject(new Error('Failed to load Three.js'));
    };

    document.body.appendChild(script);
  });

  return threeLoadPromise;
};

// Reset function for development/testing
export const resetThreeLoader = () => {
  threeLoadPromise = null;
  isThreeLoaded = false;
};
