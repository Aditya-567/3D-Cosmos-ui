// Fix: Three.js OrbitControls in the compiled package bundle uses addEventListener
// without { passive: false } for wheel/touch events, causing a Chrome intervention
// warning. This patch ensures those listeners are always registered as non-passive.
; (function () {
  const orig = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, options) {
    if (type === 'wheel' || type === 'touchstart' || type === 'touchmove') {
      if (options === undefined || options === true || options === false) {
        options = { passive: false, capture: options === true };
      } else if (typeof options === 'object' && options.passive !== false) {
        options = Object.assign({}, options, { passive: false });
      }
    }
    return orig.call(this, type, fn, options);
  };
})();

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
