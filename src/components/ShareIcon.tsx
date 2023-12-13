import React from "react";

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      viewBox="0 0 32 32"
    >
      <path d="M0 25.472q0 2.368 1.664 4.032t4.032 1.664H24.64q2.336 0 4-1.664t1.664-4.032V17.28l-3.776 3.168v5.024q0 .8-.544 1.344t-1.344.576H5.696q-.8 0-1.344-.576t-.544-1.344V6.528q0-.768.544-1.344t1.344-.544h9.472V.864H5.696q-2.368 0-4.032 1.664T0 6.528v18.944zm5.696-5.664q0 2.752 1.088 5.28.512-2.944 2.24-5.344t4.288-3.872 5.632-1.664v5.6l11.36-9.472L18.944.864v5.664q-2.688 0-5.152 1.056t-4.224 2.848-2.848 4.224-1.024 5.152zM32 22.08z"></path>
    </svg>
  );
}

export default React.memo(ShareIcon);