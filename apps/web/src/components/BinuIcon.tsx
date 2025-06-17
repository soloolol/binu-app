import React from "react";

interface BinuIconProps {
  width?: number;
  height?: number;
  fill?: boolean;
  strokeWidth?: number;
}

export default function BinuIcon({
  width = 18,
  height = 18,
  fill = false,
  strokeWidth = 0.7,
}: BinuIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={`${fill ? "#4FD6B2" : "none"}`}
      fillOpacity="0.7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="6.44444"
        cy="9.55556"
        r="5.44444"
        stroke="#4FD6B2"
        strokeWidth={strokeWidth}
      />
      <ellipse
        cx="12.6666"
        cy="3.33333"
        rx="2.33333"
        ry="2.33333"
        stroke="#4FD6B2"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
