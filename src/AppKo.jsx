import React, { useEffect, useState } from "react";
import HomeScreenKo from "./screens/HomeScreenKo";
import PopupScreenKo from "./screens/PopupScreenKo";
import MainScreenKo from "./screens/MainScreenKo";
import EmergencyScreenKo from "./screens/EmergencyScreenKo";

export default function AppKo() {
  const [screen, setScreen] = useState("home");
  const [mainState, setMainState] = useState("idle");

  useEffect(() => {
    if (screen !== "main" || mainState !== "loading") return undefined;
    const timer = window.setTimeout(() => setMainState("complete"), 6000);
    return () => window.clearTimeout(timer);
  }, [screen, mainState]);

  if (screen === "home") {
    return <HomeScreenKo onAlert={() => setScreen("popup")} />;
  }

  if (screen === "popup") {
    return <PopupScreenKo onComplete={() => {
      setMainState("idle");
      setScreen("main");
    }} />;
  }

  if (screen === "emergency") {
    return <EmergencyScreenKo onBack={() => setScreen("main")} />;
  }

  return (
    <MainScreenKo
      rescueState={mainState}
      onCall={() => setMainState("loading")}
      onViewEmergency={() => setScreen("emergency")}
    />
  );
}
