import React, { useEffect, useState } from "react";
import { HomeScreenContentKo } from "./HomeScreenKo";
import "./PopupScreenKo.css";

const checks = [
  ["감지기 신호 확인", "정상"],
  ["발생 위치 확인", "5층 승강기 앞"],
  ["발생 층 상황 확인", "3세대 응답"],
  ["관리실에서 상황 확인", "실화 확인"],
];

export default function PopupScreenKo({ onComplete }) {
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
      aria-label={step < checks.length ? "화면을 터치하여 다음 확인 단계로 이동" : "확인 완료"}
      onKeyDown={(event) => {
        if (step < checks.length && (event.key === "Enter" || event.key === " ")) handleNext();
      }}
    >
      <div className="popup-screen__home" aria-hidden="true">
        <div className="screen home-screen popup-screen__home-surface">
          <HomeScreenContentKo showHint={false} />
        </div>
      </div>
      <div className="popup-screen__scrim" aria-hidden="true" />
      <section className="alert-card alert-card--v5" aria-label="화재 경보 상황 확인">
        <div className="alert-card__head alert-card__head--v5">
          <div className="danger-pill danger-pill--v5"><span />화재 경보</div>
          <div className="floor-mark floor-mark--v5">
            <strong>5</strong><span>층</span>
            <small>101동</small>
          </div>
          <h1 className="popup-headline"><em>5층 화재 발생</em> 상황을 확인하고 있습니다</h1>
          <p className="popup-subheadline">지금 상황을 확인하고 있어요.</p>
        </div>
        <div className="alert-card__body alert-card__body--v5">
          <p className="popup-action">잠시만 기다려 주세요.<br />확인이 끝나면 대피 안내로 전환됩니다.</p>
          <ul className="check-list">
            {checks.map(([title, meta], index) => (
              <li className={index < step ? "done" : index === step ? "checking" : ""} key={title}>
                <span className="check-icon">
                  <span className="check-icon-wait" />
                  <span className="check-icon-ring" />
                  <span className="check-icon-tick">✓</span>
                </span>
                <span className="check-title">{title}</span>
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
