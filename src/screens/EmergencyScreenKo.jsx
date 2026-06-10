import React, { useEffect, useState } from "react";
import logo119 from "../../119.png";
import routeMapImage from "../../Map2.png";
import warningIcon from "../../Warning.png";
import "./EmergencyScreenKo.css";

const options = ["부상자", "연기 많음", "문 막힘", "아이 / 노약자"];
const quickActions = [
  "방과 복도로 통하는 문을 닫으세요",
  "가스 밸브를 잠그세요",
];

function RouteMapKo() {
  return (
    <div className="emergency-map-shell">
      <div className="emergency-map-title">지도</div>
      <div className="emergency-map">
        <img className="emergency-map-image" src={routeMapImage} alt="소방서 출동 경로 지도" />
        <svg className="emergency-map-route" viewBox="0 0 607 416" aria-hidden="true">
          <defs>
            <filter id="emergency-route-glow-ko">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path d="M105 338 L205 274 L188 80 L430 80" className="emergency-route-solid" filter="url(#emergency-route-glow-ko)" />
          <path d="M105 338 L205 274 L188 80 L430 80" className="emergency-route-dashed" />
          <path d="M430 80 L438 198 L520 198" className="emergency-route-tail" />
          <circle cx="430" cy="80" r="11" className="emergency-route-dot" />
        </svg>
        <span className="emergency-eta">도착 예정 03:00</span>
        <span className="emergency-station-label">도곡 119</span>
        <span className="emergency-building-label">서초 한신 아파트</span>
        <span className="emergency-station-marker"><img src={logo119} alt="" /></span>
      </div>
    </div>
  );
}

export default function EmergencyScreenKo({ onBack }) {
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
          <h1>119 <strong>대응 현황</strong></h1>
        </div>
        <div className="emergency-header-actions">
          <time>19:42</time>
          <button className="emergency-home-button" onClick={onBack} aria-label="메인 화면으로 돌아가기">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M6.5 10.5V20h11V10.5" />
            </svg>
          </button>
        </div>
      </header>

      <p className="emergency-subcopy"><strong>도곡 소방서</strong>에서 구조팀이 출동했습니다. 실내에서 안전하게 대기하세요.</p>

      <section className="emergency-top-guide">
        <div className="emergency-top-guide__label">안전 수칙</div>
        <div className="emergency-top-guide__main">
          <span className="emergency-top-guide__icon"><img src={warningIcon} alt="" /></span>
          <span>젖은 천으로 입과 코를 막으세요</span>
        </div>
        <div className="emergency-top-guide__checks">
          {quickActions.map((item) => (
            <p key={item}><span>✓</span>{item}</p>
          ))}
        </div>
      </section>

      <section className="emergency-response-card">
        <h2>상황 공유</h2>
        <p>입력한 내용은 구조팀에 바로 전달됩니다.</p>
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
              <span>상황 전송 중...</span>
            </span>
          ) : responseState === "sent" ? (
            "구조팀이 현재 상황을 확인했습니다."
          ) : null}
        </div>
        <button className="emergency-call-button" onClick={() => setIsCallOpen(true)}>
          <span className="emergency-call-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.79.63 2.64a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.44-1.29a2 2 0 0 1 2.11-.45c.85.3 1.74.51 2.64.63A2 2 0 0 1 22 16.92Z" />
            </svg>
          </span>
          <span>구조팀에<br />직접 전화</span>
        </button>
      </section>

      <RouteMapKo />

      {isCallOpen && (
        <div className="emergency-call-modal" role="dialog" aria-modal="true" aria-label="구조팀 전화 연결">
          <div className="emergency-call-modal__scrim" onClick={() => setIsCallOpen(false)} />
          <div className="emergency-call-modal__card">
            <div className="emergency-call-modal__badge">전화 연결 중</div>
            <div className="emergency-call-modal__icon">
              <img src={logo119} alt="119" />
            </div>
            <h2>도곡 119 구조팀</h2>
            <p>구조팀과 직접 통화를 연결하고 있습니다...</p>
            <div className="emergency-call-modal__meta">
              <span>현재 세대 1402호</span>
              <span>우선 연결 회선 사용 중</span>
            </div>
            <div className="emergency-call-modal__status">
              <span />
              <span />
              <span />
            </div>
            <div className="emergency-call-modal__actions">
              <button className="emergency-call-modal__cancel" onClick={() => setIsCallOpen(false)}>뒤로</button>
              <button className="emergency-call-modal__confirm" onClick={() => setIsCallOpen(false)}>통화 종료</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
