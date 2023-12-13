import React from "react";

function DownloarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#080341"
        fillRule="evenodd"
        d="M5.25 11.25L6 10.5h3.75V12h-3v6h10.5v-6h-3v-1.5H18l.75.75v7.5l-.75.75H6l-.75-.75v-7.5zm7.5-4.19V15h-1.5V7.06L9.53 8.78 8.47 7.72 12 4.19l3.53 3.53-1.06 1.06-1.72-1.72z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default React.memo(DownloarIcon);