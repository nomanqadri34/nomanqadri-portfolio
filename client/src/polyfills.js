// Polyfills for Node.js core modules
if (typeof global === 'undefined') {
  window.global = window;
}

if (typeof process === 'undefined') {
  window.process = { env: {} };
}

if (typeof Buffer === 'undefined') {
  window.Buffer = require('buffer').Buffer;
}

// Add other polyfills as needed
window.process = window.process || {};
window.process.env = window.process.env || {}; 