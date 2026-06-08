import React from "react";
import TopBar from "../components/TopBar";
import "./MainScreen.css";

function RescueButton({ rescueState, onCall, onViewEmergency }) {
  const isComplete = rescueState === "complete";
  const isLoading = rescueState === "loading";
  const title = isComplete ? "Connected" : isLoading ? "Connecting" : "Request Rescue";
  const subtitle = isComplete ? "View fire response status" : isLoading ? "Please wait..." : "Cannot evacuate on my own";
  const handleClick = isComplete ? onViewEmergency : isLoading ? undefined : onCall;

  return (
    <button
      className={`call-button ${isComplete ? "is-complete" : ""} ${isLoading ? "is-loading" : ""}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      <span className="main-call-logo"><img src="/119.png" alt="119" /></span>
      <span className="call-copy">
        <b>{title}</b>
        <small>{subtitle}</small>
      </span>
    </button>
  );
}

export default function MainScreen({ rescueState = "idle", onCall, onViewEmergency, onBack }) {
  return (
    <main className="screen main-screen">
      <TopBar />
      <section className="main-copy">
        <h1><span>Fire on <em>5F</em></span><span><em>Elevator unavailable</em></span></h1>
        <p><span>Use the <strong>stairs</strong></span><span>and evacuate</span><span>to the rooftop.</span></p>
        <RescueButton rescueState={rescueState} onCall={onCall} onViewEmergency={onViewEmergency} />
      </section>
      <section className="map-panel">
        <img src="/Map.png" alt="Evacuation route map for the 5th floor" />
      </section>
      <svg className="route-overlay" viewBox="0 0 150 180" aria-hidden="true">
        <defs>
          <filter id="route-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker
            id="route-arrowhead"
            markerWidth="24"
            markerHeight="24"
            refX="18"
            refY="12"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path className="route-arrowhead" d="M1 1 L23 12 L1 23 Z" />
          </marker>
        </defs>
        <path className="route-solid" d="M96 166 L29 101 L77 53 L29 6" />
        <path className="route-dashed" d="M96 166 L29 101 L77 53 L29 6" markerEnd="url(#route-arrowhead)" />
      </svg>
      <span className="map-room room-1402-left">1402</span>
      <span className="map-room room-1402-current">1402</span>
      <span className="map-room room-1402-right">1402</span>
      <span className="map-room room-1404">1404</span>
      <span className="current-label">You are here</span>
      <span className="current-dot" />
      <div className="map-legend">
        <span className="legend-safe">Safe route</span>
        <span className="legend-danger">Fire location · blocked</span>
        <span className="legend-smoke">Smoke zone</span>
      </div>
    </main>
  );
}
