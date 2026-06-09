/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  hasText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-10 h-10', hasText = false }) => {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="landscape-rf-logo-svg"
      >
        {/* Outer dark-green rim */}
        <circle cx="50" cy="50" r="48" stroke="#1b4d22" strokeWidth="2.5" fill="#f5e169" />
        
        {/* Background garden trees silhouettes in soft warm olive green */}
        <path
          d="M 10 72 
             C 14 53, 28 53, 33 62
             C 36 50, 52 50, 55 67
             C 57 54, 71 54, 76 72 Z"
          fill="#cbb94c"
          opacity="0.8"
        />
        <circle cx="28" cy="52" r="13" fill="#cbb94c" opacity="0.65" />
        <circle cx="70" cy="50" r="15" fill="#cbb94c" opacity="0.65" />

        {/* Tall Spruce/Pine tree in the center-right */}
        <g fill="#1b4d22">
          {/* Trunk */}
          <rect x="54" y="60" width="4.5" height="21" rx="1.5" fill="#133d18" />
          
          {/* Detailed pine branch shapes */}
          {/* Level 1 (top) */}
          <path d="M 56.2 11 L 51 24 C 54 24, 58 24, 61.4 24 Z" />
          {/* Level 2 */}
          <path d="M 56.2 19.5 L 46.5 34 Q 56.2 32, 66 34 Z" />
          {/* Level 3 */}
          <path d="M 56.2 29 L 41.5 45.5 Q 56.2 43, 71 45.5 Z" />
          {/* Level 4 */}
          <path d="M 56.2 40 L 37.5 58 Q 56.2 55.5, 75 58 Z" />
          {/* Level 5 */}
          <path d="M 56.2 52.5 L 34 71.5 Q 56.2 68.5, 78.5 71.5 Z" />
          {/* Level 6 (bottom) */}
          <path d="M 56.2 65.5 L 30 83.5 Q 56.2 80, 82.5 83.5 Z" />
        </g>

        {/* Gardener silhouette on the left */}
        <g fill="#1b4d22">
          {/* Hat */}
          <ellipse cx="23" cy="38" rx="5.5" ry="1.6" />
          <path d="M 20 38 C 20 34.5, 26 34.5, 26 38 Z" />
          
          {/* Head */}
          <circle cx="23" cy="41.2" r="2.4" />
          
          {/* Body & limbs */}
          <path d="M 21.5 44 L 20 54 L 18 66 L 20 66 L 21.5 58 L 22.5 66 L 24.5 66 L 23.5 54 Z" />
          
          {/* Right arm holding a watering can */}
          <path d="M 23.5 45 Q 26.5 47, 28.5 53.5 L 27.5 54.5 Q 25.5 48.5, 22.5 46.5 Z" />
          
          {/* Watering can */}
          <path d="M 28 52.5 L 32.5 52.5 L 30.5 50.5 Z" />
          <path d="M 32.5 52.5 L 35 54.5" stroke="#1b4d22" strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Sprout being watered */}
          <path d="M 34.5 65.5 Q 36 62.5, 37 65.5" fill="none" stroke="#1b4d22" strokeWidth="1" />
          <circle cx="37" cy="61.5" r="0.75" />
          <circle cx="35.5" cy="62.5" r="0.75" />
        </g>

        {/* Rich dark green ground and grass layer */}
        <path d="M 2 76.5 C 30 74.5, 70 74.5, 98 76.5 L 98 98 L 2 98 Z" fill="#1b4d22" />
        
        {/* Grass blades detailed overlay */}
        <path
          d="M 2 77.5 L 5 71.5 L 7 77 L 11 70.5 L 14 78 C 25 76, 35 76, 45 77 L 48 70 L 51 77.5 L 56 69.5 L 60 77 L 66 70.5 L 70 77 L 76 71 L 81 77.5 L 86 69 L 89 77.5 L 94 71 L 98 77"
          fill="none"
          stroke="#1b4d22"
          strokeWidth="1.5"
        />

        {/* Cursive yellow plate overlay for 'Ландшафт рф' */}
        <path
          d="M 6 72 Q 50 67, 94 72 L 91 93 Q 50 91.5, 9 93 Z"
          fill="#1b4d22"
          stroke="#fad337"
          strokeWidth="1.5"
        />

        {/* Logo label text mimics the handwritten brand mark in original image */}
        <text
          x="50"
          y="83"
          fill="#fad337"
          fontWeight="900"
          fontSize="11.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="-0.3"
        >
          Ландшафт
        </text>
        <text
          x="50"
          y="92"
          fill="#fad337"
          fontWeight="950"
          fontSize="7.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          РФ
        </text>
      </svg>
      {hasText && (
        <div className="flex flex-col">
          <span className="text-[17px] font-display font-black tracking-wider text-brand-dark leading-none uppercase">
            Ландшафт<span className="text-brand-gold font-black">.</span>рф
          </span>
          <span className="text-[9px] font-extrabold text-brand-emerald uppercase tracking-widest leading-none mt-1.5 opacity-95">
            Студия Газонов • Питомник
          </span>
        </div>
      )}
    </div>
  );
};
