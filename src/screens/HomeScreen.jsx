import React from "react";
import "./HomeScreen.css";

const services = [
  { icon: "⌂", title: "Lobby Door", detail: "No recent entry log", state: "Normal" },
  { icon: "□", title: "Delivery", detail: "1 parcel stored", state: "Arrived" },
  { icon: "P", title: "Parking", detail: "B2 · Spot 38", state: "Checked" },
  { icon: "↯", title: "Energy", detail: "8.4 kWh today", state: "Saving" },
];

export function HomeScreenContent({ showHint = true }) {
  return (
    <>
      <header className="home-header">
        <div className="home-brand"><span />SEOCHO HANSHIN <small>1402</small></div>
        <div className="home-header-state"><i />All systems normal</div>
      </header>

      <section className="home-hero">
        <p className="home-date">Thursday, June 4</p>
        <h1>19:41</h1>
        <p className="home-greeting">Have a calm evening.</p>
        <div className="home-weather">
          <span className="weather-icon">☾</span>
          <div><strong>21°</strong><small>Clear · Air quality good</small></div>
        </div>
      </section>

      <section className="home-services">
        {services.map((service) => (
          <article key={service.title}>
            <div className="service-icon">{service.icon}</div>
            <div className="service-copy"><h2>{service.title}</h2><p>{service.detail}</p></div>
            <span>{service.state}</span>
          </article>
        ))}
      </section>

      <section className="home-bottom">
        <div><span>Indoor</span><strong>24.2°</strong><small>Humidity 48%</small></div>
        <div><span>Front Door</span><strong className="home-safe">Locked</strong><small>Last entry 18:32</small></div>
        <div><span>Elevator</span><strong>1F</strong><small>Operating normally</small></div>
      </section>

      {showHint && <p className="home-prototype-hint">Tap the screen to start the emergency prototype.</p>}
    </>
  );
}

export default function HomeScreen({ onAlert }) {
  return (
    <main
      className="screen home-screen"
      onClick={onAlert}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onAlert();
      }}
      role="button"
      tabIndex={0}
      aria-label="Tap the screen to start the emergency prototype"
    >
      <HomeScreenContent />
    </main>
  );
}
