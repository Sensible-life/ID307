import React from "react";

export default function TopBar({ label = "Last update 19:41" }) {
  return (
    <header className="topbar">
      <div className="live-label"><span className="live-dot" />{label}</div>
      <time>19:42</time>
    </header>
  );
}
