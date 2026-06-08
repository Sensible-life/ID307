import React, { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import PopupScreen from "./screens/PopupScreen";
import MainScreen from "./screens/MainScreen";
import EmergencyScreen from "./screens/EmergencyScreen";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [mainState, setMainState] = useState("idle");

  useEffect(() => {
    if (screen !== "main" || mainState !== "loading") return undefined;
    const timer = window.setTimeout(() => setMainState("complete"), 6000);
    return () => window.clearTimeout(timer);
  }, [screen, mainState]);

  if (screen === "home") {
    return <HomeScreen onAlert={() => setScreen("popup")} />;
  }

  if (screen === "popup") {
    return <PopupScreen onComplete={() => {
      setMainState("idle");
      setScreen("main");
    }} />;
  }

  if (screen === "emergency") {
    return <EmergencyScreen onBack={() => setScreen("main")} />;
  }

  return (
    <MainScreen
      rescueState={mainState}
      onCall={() => setMainState("loading")}
      onViewEmergency={() => setScreen("emergency")}
      onBack={() => setScreen("popup")}
    />
  );
}
