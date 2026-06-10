import React from "react";
import TopBarKo from "../components/TopBarKo";
import logo119 from "../../119.png";
import floorMap from "../../Map.png";
import "./MainScreenKo.css";

function RescueButtonKo({ rescueState, onCall, onViewEmergency }) {
  const isComplete = rescueState === "complete";
  const isLoading = rescueState === "loading";
  const title = isComplete ? "연결 완료" : isLoading ? "연결 중" : "구조 요청";
  const subtitle = isComplete ? "소방 출동 현황 보기" : isLoading ? "잠시 기다려주세요..." : "스스로 대피할 수 없어요";
  const handleClick = isComplete ? onViewEmergency : isLoading ? undefined : onCall;

  return (
    <button
      className={`call-button ${isComplete ? "is-complete" : ""} ${isLoading ? "is-loading" : ""}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      <span className="main-call-logo"><img src={logo119} alt="119" /></span>
      <span className="call-copy">
        <b>{title}</b>
        <small>{subtitle}</small>
      </span>
    </button>
  );
}

export default function MainScreenKo({ rescueState = "idle", onCall, onViewEmergency }) {
  return (
    <main className="screen main-screen">
      <TopBarKo />
      <section className="main-copy">
        <h1><span>5층 <em>화재 발생</em></span><span>승강기 <em>사용 불가</em></span></h1>
        <p><span><strong>계단</strong>을 통해</span><span>옥상으로</span><span>대피하세요.</span></p>
        <RescueButtonKo rescueState={rescueState} onCall={onCall} onViewEmergency={onViewEmergency} />
      </section>
      <section className="map-panel">
        <img src={floorMap} alt="5층 대피 경로 지도" />
      </section>
      <svg className="route-overlay" viewBox="0 0 150 180" aria-hidden="true">
        <defs>
          <filter id="route-glow-ko">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker
            id="route-arrowhead-ko"
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
        <path className="route-solid" d="M96 166 L29 101 L77 53 L29 6" filter="url(#route-glow-ko)" />
        <path className="route-dashed" d="M96 166 L29 101 L77 53 L29 6" markerEnd="url(#route-arrowhead-ko)" />
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
