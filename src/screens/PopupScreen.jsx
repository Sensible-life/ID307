import React, { useEffect, useState } from "react";
import { HomeScreenContent } from "./HomeScreen";
import "./PopupScreen.css";

const checks = [
  ["Detector signal check", "Normal"],
  ["Origin confirmation", "In front of the 5F elevator"],
  ["Floor response check", "3 households responded"],
  ["Control room verification", "Fire confirmed"],
];

export default function PopupScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= checks.length) return undefined;
    const timer = window.setTimeout(() => {
      setStep((value) => Math.min(value + 1, checks.length));
    }, 920);
    return () => window.clearTimeout(timer);
  }, [step]);

  const handleNext = () => {
    if (step < checks.length) setStep((value) => Math.min(value + 1, checks.length));
  };

  return (
    <main
      className="popup-screen"
      onClick={handleNext}
      role="button"
      tabIndex={0}
      aria-label={step < checks.length ? "Tap the screen to continue to the next verification step" : "Verification complete"}
      onKeyDown={(event) => {
        if (step < checks.length && (event.key === "Enter" || event.key === " ")) handleNext();
      }}
    >
      <div className="popup-screen__home" aria-hidden="true">
        <div className="screen home-screen popup-screen__home-surface">
          <HomeScreenContent showHint={false} />
        </div>
      </div>
      <div className="popup-screen__scrim" aria-hidden="true" />
      <section className="alert-card alert-card--v5" aria-label="Fire alarm status check">
        <div className="alert-card__head alert-card__head--v5">
          <div className="danger-pill danger-pill--v5"><span />Fire Alarm</div>
          <div className="floor-mark floor-mark--v5">
            <strong>5</strong><span>F</span>
            <small>Building 101</small>
          </div>
          <h1 className="popup-headline">We are verifying the <em>fire on the 5th floor</em></h1>
          <p className="popup-subheadline">The situation is being checked now.</p>
        </div>
        <div className="alert-card__body alert-card__body--v5">
          <p className="popup-action">Please wait a moment.<br></br> Once verification is complete, this will switch to evacuation guidance.</p>
          <ul className="check-list">
            {checks.map(([title, meta], index) => (
              <li className={index < step ? "done" : index === step ? "checking" : ""} key={title}>
                <span className="check-icon">
                  <span className="check-icon-wait" />
                  <span className="check-icon-ring" />
                  <span className="check-icon-tick">✓</span>
                </span>
                <span className="check-title">{title}</span>
                <small>{index < step ? meta : index === step ? "Checking" : "Pending"}</small>
              </li>
            ))}
          </ul>
          <div className="progress"><i style={{ width: `${Math.min(step / checks.length, 1) * 100}%` }} /></div>
          {step < checks.length ? (
            <p className="touch-hint">Tap the screen to continue</p>
          ) : (
            <button className="complete-button" onClick={(event) => {
              event.stopPropagation();
              onComplete();
            }}>
              Open evacuation guidance
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
