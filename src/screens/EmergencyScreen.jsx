import React, { useState } from "react";
import { AlertIcon } from "../components/Icons";
import "./EmergencyScreen.css";

const options = ["Injured", "Heavy Smoke", "Door Blocked", "Child / elderly"];
const timeline = [
  ["Reported", "02:56"],
  ["Dispatched", "02:58"],
  ["En Route", "02:58"],
  ["On Site", "03:00"],
];
const guideChecklist = [
  { label: "Close all doors to the hallway", done: false },
  { label: "Seal door gaps with wet towels", done: true },
];

function RouteMap() {
  return (
    <div className="emergency-map">
      <img className="emergency-map-image" src="/Map2.png" alt="소방서 출동 경로 지도" />
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
      <span className="emergency-station-marker"><img src="/119.png" alt="" /></span>
    </div>
  );
}

export default function EmergencyScreen({ onBack }) {
  const [selected, setSelected] = useState("Child / elderly");

  return (
    <main className="screen emergency-screen">
      <header className="emergency-header">
        <span className="emergency-live-dot" />
        <h1>Emergency <strong>Response Status</strong></h1>
        <time>19:42</time>
      </header>

      <button className="emergency-back-link" onClick={onBack}>← Back to evacuation guide</button>

      <section className="emergency-left">
        <h2>FIRE DEPT · <strong>DOGOK 119</strong></h2>
        <RouteMap />
        <div className="emergency-timeline">
          {timeline.map(([label, time], index) => (
            <div className={index < 2 ? "complete" : ""} key={label}>
              <i>{index < 2 ? "✓" : ""}</i>
              <span>{label}</span>
              <small>{time}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="emergency-select-card">
        <button className="emergency-call-button">
          <span className="emergency-call-logo"><img src="/119.png" alt="119" /></span>
          <b>CALL</b>
        </button>
        <h2>TAP WHAT APPLIES</h2>
        <div className="emergency-options">
          {options.map((option) => (
            <button className={selected === option ? "selected" : ""} onClick={() => setSelected(option)} key={option}>
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="emergency-guide-card">
        <h2>DO THIS NOW</h2>
        <div className="emergency-urgent-guide">
          <span className="emergency-alert-icon"><AlertIcon /></span>
          <p>
            <b>Cover mouth &amp; nose with a wet cloth</b>
            <small>Soak a thick towel. Hold it over your mouth and nose. Breathe slowly<br />through it - this filters most smoke.</small>
          </p>
        </div>
        <div className="emergency-guide-checklist">
          {guideChecklist.map((item) => (
            <p className={`emergency-guide-item ${item.done ? "is-done" : "is-pending"}`} key={item.label}>
              <span className="emergency-guide-mark" aria-hidden="true">{item.done ? "✓" : ""}</span>
              <span className="emergency-guide-text">{item.label}</span>
              <small>{item.done ? "Done" : "To do"}</small>
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
