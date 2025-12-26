import React from 'react';

// Simple OpenAI logo SVG icon (brand colors)
const OpenAISymbol = ({ className = '', style = {}, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx="16" cy="16" r="16" fill="#10A37F" />
    <path
      d="M16 7.5c-2.5 0-4.5 2-4.5 4.5v1.5h-1.5A2.5 2.5 0 007.5 16c0 2.5 2 4.5 4.5 4.5h1.5v1.5A2.5 2.5 0 0016 24.5c2.5 0 4.5-2 4.5-4.5v-1.5h1.5A2.5 2.5 0 0024.5 16c0-2.5-2-4.5-4.5-4.5h-1.5V10A2.5 2.5 0 0016 7.5z"
      fill="#fff"
      fillOpacity="0.9"
    />
  </svg>
);

export default OpenAISymbol;
