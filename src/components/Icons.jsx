import React from "react";

export const AlertIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3 2.8 20h18.4L12 3Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.2" fill="currentColor" />
  </svg>
);

export const PhoneIcon = () => (
  <svg viewBox="0 0 90 58" aria-hidden="true">
    <rect x="2" y="2" width="86" height="54" rx="11" fill="#fff" />
    <path d="M20 39h12l8-19H28l-8 19Zm16 0h12l8-19H44l-8 19Z" fill="#ef1024" />
    <path d="M61 16c8-8 19-2 15 7-3 7-12 14-23 19l-6-8c7-3 10-6 14-10-3-1-5-5 0-8Z" fill="#ef1024" />
  </svg>
);
