import React from "react";
import "./HomeScreen.css";

const services = [
  { icon: "⌂", title: "공동현관", detail: "출입 기록 없음", state: "정상" },
  { icon: "□", title: "택배", detail: "보관함 1건", state: "도착" },
  { icon: "P", title: "주차", detail: "B2 · 38번", state: "확인" },
  { icon: "↯", title: "에너지", detail: "오늘 8.4 kWh", state: "절약 중" },
];

export function HomeScreenContent({ showHint = true }) {
  return (
    <>
      <header className="home-header">
        <div className="home-brand"><span />SEOCHO HANSHIN <small>1402</small></div>
        <div className="home-header-state"><i />모든 시스템 정상</div>
      </header>

      <section className="home-hero">
        <p className="home-date">6월 4일 목요일</p>
        <h1>19:41</h1>
        <p className="home-greeting">편안한 저녁 보내세요.</p>
        <div className="home-weather">
          <span className="weather-icon">☾</span>
          <div><strong>21°</strong><small>맑음 · 미세먼지 좋음</small></div>
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
        <div><span>실내</span><strong>24.2°</strong><small>습도 48%</small></div>
        <div><span>현관문</span><strong className="home-safe">잠김</strong><small>18:32 마지막 출입</small></div>
        <div><span>엘리베이터</span><strong>1층</strong><small>정상 운행</small></div>
      </section>

      {showHint && <p className="home-prototype-hint">화면을 터치하면 재난 상황 프로토타입이 시작됩니다</p>}
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
      aria-label="화면을 터치하여 재난 발생 프로토타입 시작"
    >
      <HomeScreenContent />
    </main>
  );
}
