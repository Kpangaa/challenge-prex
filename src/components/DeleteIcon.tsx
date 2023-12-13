import React from "react";

function DeleteIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='800'
      height='800'
      viewBox='0 -0.5 21 21'
    >
      <g fill='none' fillRule='evenodd' stroke='none' strokeWidth='1'>
        <g fill='#000' transform='translate(-179 -360)'>
          <g transform='translate(56 160)'>
            <path d='M130.35 216h2.1v-8h-2.1v8zm4.2 0h2.1v-8h-2.1v8zm-6.3 2h10.5v-12h-10.5v12zm2.1-14h6.3v-2h-6.3v2zm8.4 0v-4h-10.5v4H123v2h3.15v14h14.7v-14H144v-2h-5.25z'></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default React.memo(DeleteIcon);