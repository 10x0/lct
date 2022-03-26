import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex justify-center">
      <svg
        className="animate-spin"
        width="40"
        height="40"
        viewBox="0 0 120 120"
      >
        <circle
          style={{
            strokeDasharray: "262,350",
          }}
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="orange"
          strokeWidth="12"
        />
      </svg>
    </div>
  );
};

export default Loading;
