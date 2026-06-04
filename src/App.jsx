import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import PopupScreen from "./screens/PopupScreen";
import MainScreen from "./screens/MainScreen";
import EmergencyScreen from "./screens/EmergencyScreen";

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "home") {
    return <HomeScreen onAlert={() => setScreen("popup")} />;
  }

  if (screen === "popup") {
    return <PopupScreen onComplete={() => setScreen("main")} />;
  }

  if (screen === "emergency") {
    return <EmergencyScreen onBack={() => setScreen("main")} />;
  }

  return (
    <MainScreen
      onCall={() => setScreen("emergency")}
      onBack={() => setScreen("popup")}
    />
  );
}
