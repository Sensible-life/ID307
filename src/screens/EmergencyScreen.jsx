import React, { useEffect, useState } from "react";
import logo119 from "../../119.png";
import routeMapImage from "../../Map2.png";
import warningIcon from "../../Warning.png";
import "./EmergencyScreen.css";

const options = ["Injured", "Heavy Smoke", "Door Blocked", "Child / elderly"];
const quickActions = [
  "Close all doors of room",
  "Close the gas valve",
];

function RouteMap() {
  return (
      <div className="emergency-map-shell">
      <div className="emergency-map-title">MAP</div>
      <div className="emergency-map">
        <img className="emergency-map-image" src={routeMapImage} alt="Rescue team route map" />
        <svg className="emergency-map-route" viewBox="0 0 607 416" aria-hidden="true">
          <defs>
            <filter id="emergency-route-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d="M105 338 L205 274 L188 80 L430 80" className="emergency-route-solid" />
          <path d="M105 338 L205 274 L188 80 L430 80" className="emergency-route-dashed" />
          <path d="M430 80 L438 198 L520 198" className="emergency-route-tail" />
          <circle cx="430" cy="80" r="11" className="emergency-route-dot" />
        </svg>
        <span className="emergency-eta">ETA 03:00</span>
        <span className="emergency-station-label">DOGOK 119</span>
        <span className="emergency-building-label">Seocho<br />Hanshin</span>
        <span className="emergency-station-marker"><img src={logo119} alt="" /></span>
      </div>
    </div>
  );
}

export default function EmergencyScreen({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [responseState, setResponseState] = useState("idle");
  const [isCallOpen, setIsCallOpen] = useState(false);

  useEffect(() => {
    if (responseState !== "sending") return undefined;
    const timer = window.setTimeout(() => setResponseState("sent"), 1500);
    return () => window.clearTimeout(timer);
  }, [responseState]);

  const handleRespond = (option) => {
    setSelected(option);
    setResponseState("sending");
  };

  return (
    <main className="screen emergency-screen">
      <header className="emergency-header">
        <div className="emergency-header-title">
          <span className="emergency-live-dot" />
          <h1>Emergency <strong>Response Status</strong></h1>
        </div>
        <div className="emergency-header-actions">
          <time>19:42</time>
          <button className="emergency-home-button" onClick={onBack} aria-label="Return to main screen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M6.5 10.5V20h11V10.5" />
            </svg>
          </button>
        </div>
      </header>

      <p className="emergency-subcopy">Rescue team dispatched from <strong>Dogok Fire Station</strong>. Please wait inside safely.</p>

      <section className="emergency-top-guide">
        <div className="emergency-top-guide__label">DO THIS NOW</div>
        <div className="emergency-top-guide__main">
          <span className="emergency-top-guide__icon"><img src={warningIcon} alt="" /></span>
          <span>Cover mouth &amp; nose with a wet cloth</span>
        </div>
        <div className="emergency-top-guide__checks">
          {quickActions.map((item) => (
            <p key={item}><span>✓</span>{item}</p>
          ))}
        </div>
      </section>

      <section className="emergency-response-card">
        <h2>DESCRIBE THE SITUATION</h2>
        <p>Your message will be forwarded directly to the rescue team.</p>
        <div className="emergency-options">
          {options.map((option) => (
            <button className={selected === option ? "selected" : ""} onClick={() => handleRespond(option)} key={option}>
              {option}
            </button>
          ))}
        </div>
        <div className={`emergency-response-status ${responseState !== "idle" ? "is-visible" : ""} ${responseState === "sending" ? "is-sending" : ""} ${responseState === "sent" ? "is-sent" : ""}`}>
          {responseState === "sending" ? (
            <span className="emergency-response-status__sending">
              <span className="emergency-response-status__dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span>Sending situation...</span>
            </span>
          ) : responseState === "sent" ? (
            "Rescue Team has known your situation."
          ) : null}
        </div>
        <button className="emergency-call-button" onClick={() => setIsCallOpen(true)}>
          <span className="emergency-call-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.63 2.64a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.44-1.29a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.64.63A2 2 0 0 1 22 16.92Z" />
            </svg>
          </span>
          <span>Direct Call to<br />Rescue Team</span>
        </button>
      </section>

      <RouteMap />

      {isCallOpen && (
        <div className="emergency-call-modal" role="dialog" aria-modal="true" aria-label="Rescue team call connection">
          <div className="emergency-call-modal__scrim" onClick={() => setIsCallOpen(false)} />
          <div className="emergency-call-modal__card">
            <div className="emergency-call-modal__badge">CALL CONNECTING</div>
            <div className="emergency-call-modal__icon">
              <img src={logo119} alt="119" />
            </div>
            <h2>Dogok 119 Rescue Team</h2>
            <p>Direct call is connecting now...</p>
            <div className="emergency-call-modal__meta">
              <span>Current unit 1402</span>
              <span>Priority line enabled</span>
            </div>
            <div className="emergency-call-modal__status">
              <span />
              <span />
              <span />
            </div>
            <div className="emergency-call-modal__actions">
              <button className="emergency-call-modal__cancel" onClick={() => setIsCallOpen(false)}>Back</button>
              <button className="emergency-call-modal__confirm" onClick={() => setIsCallOpen(false)}>End Call</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
