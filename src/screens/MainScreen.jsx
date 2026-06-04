import React from "react";
import TopBar from "../components/TopBar";
import "./MainScreen.css";

export default function MainScreen({ onCall, onBack }) {
  return (
    <main className="screen main-screen">
      <TopBar />
      <section className="main-copy">
        <h1><span>5층 <em>화재 발생</em></span><span>승강기 <em>사용 불가</em></span></h1>
        <p><span><strong>계단</strong>을 통해</span><span>상층으로</span><span>대피하세요.</span></p>
        <button className="call-button" onClick={onCall}>
          <span className="main-call-logo"><img src="/119.png" alt="119" /></span>
          <span><b>구조 요청</b><small>스스로 대피할 수 없어요</small></span>
        </button>
      </section>
      <button className="main-back-link" onClick={onBack}>상황 확인 팝업 다시 보기</button>
      <section className="map-panel">
        <img src="/Map.png" alt="5층 대피 경로 지도" />
      </section>
      <svg className="route-overlay" viewBox="0 0 150 180" aria-hidden="true">
        <defs>
          <filter id="route-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path className="route-solid" d="M96 166 L29 101 L77 53 L29 6" />
        <path className="route-dashed" d="M96 166 L29 101 L77 53 L29 6" />
        <polygon className="route-arrowhead" points="29,0 12,29 46,29" />
      </svg>
      <span className="map-room room-1402-left">1402</span>
      <span className="map-room room-1402-current">1402</span>
      <span className="map-room room-1402-right">1402</span>
      <span className="map-room room-1404">1404</span>
      <span className="current-label">현재 위치</span>
      <span className="current-dot" />
      <div className="map-legend">
        <span className="legend-safe">안전 경로</span>
        <span className="legend-danger">화재 위치 · 사용 불가</span>
        <span className="legend-smoke">연기 구역</span>
      </div>
    </main>
  );
}
