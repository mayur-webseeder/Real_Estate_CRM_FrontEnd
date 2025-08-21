import React from "react";

function WrapperContainer({ className, children }) {
  return (
    <div
      className={`relative w-full border-inherit space-y-6 shadow-sm rounded-lg ${className}`}
    >
      <div className="  w-full overflow-auto border-inherit text-nowrap">
        {children}
      </div>
    </div>
  );
}

export default WrapperContainer;
