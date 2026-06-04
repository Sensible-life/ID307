import React, { useState } from "react";
import { HomeScreenContent } from "./HomeScreen";
import "./PopupScreen.css";

const checks = [
  ["감지기 신호 확인", "정상"],
  ["발생 위치 특정", "5층 승강기 앞"],
  ["주변 세대 응답 수집", "3세대"],
  ["실제 화재 여부 교차 확인", "확인"],
];

export default function PopupScreen({ onComplete }) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < checks.length) {
      setStep((value) => value + 1);
    }
  };

  return (
    <main
      className="popup-screen"
      onClick={handleNext}
      role="button"
      tabIndex={0}
      aria-label={step < checks.length ? "화면을 터치하여 다음 확인 단계로 이동" : "확인 완료"}
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
      <section className="alert-card" aria-label="화재 경보 상황 확인">
        <div className="alert-card__head">
          <div className="danger-pill"><span />화재 경보 감지</div>
          <div className="floor-mark"><strong>5</strong><span>층</span></div>
          <h1>승강기 앞에서<br /><em>화재 신호</em>가 감지됐어요.</h1>
        </div>
        <div className="alert-card__body">
          <div className="checking-title"><span className="spinner" />상황 정보를 확인하고 있어요</div>
          <p>잠시만 기다려 주세요. 확인이 끝나면 대피 안내 화면으로 전환됩니다.</p>
          <ul className="check-list">
            {checks.map(([title, meta], index) => (
              <li className={index < step ? "done" : index === step ? "checking" : ""} key={title}>
                <span className="check-icon">{index < step ? "✓" : ""}</span>
                <span>{title}</span>
                <small>{index < step ? meta : index === step ? "확인 중" : "대기"}</small>
              </li>
            ))}
          </ul>
          <div className="progress"><i style={{ width: `${Math.min(step / checks.length, 1) * 100}%` }} /></div>
          {step < checks.length ? (
            <p className="touch-hint">화면을 터치해 계속하세요</p>
          ) : (
            <button className="complete-button" onClick={(event) => {
              event.stopPropagation();
              onComplete();
            }}>
              대피 안내 화면 보기
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
