import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(<App />);

async function lockLandscapeOrientation() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  if (!isStandalone || !screen.orientation?.lock) return;

  try {
    await screen.orientation.lock("landscape");
  } catch {
    // Some mobile browsers only honor orientation locking in installed/fullscreen contexts.
  }
}

window.addEventListener("load", () => {
  lockLandscapeOrientation();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Ignore registration failures in local or restricted environments.
    });
  });
}
