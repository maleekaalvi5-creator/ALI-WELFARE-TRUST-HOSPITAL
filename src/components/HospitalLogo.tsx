import React, { useState } from 'react';

interface HospitalLogoProps {
  variant?: 'full' | 'horizontal' | 'emblem';
  className?: string;
  theme?: 'light' | 'dark';
}

export const HospitalLogo: React.FC<HospitalLogoProps> = ({
  variant = 'horizontal',
  className = 'h-12',
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#392444';
  const subColor = isDark ? '#f472b6' : '#a61c52';
  const [imgError, setImgError] = useState(false);

  if (variant === 'emblem') {
    if (!imgError) {
      return (
        <img
          src="/images/hospital-emblem-clean.png"
          alt="Ali Welfare Trust Hospital Emblem"
          className={`${className} object-contain`}
          onError={() => setImgError(true)}
        />
      );
    }

    return (
      <svg
        viewBox="0 0 240 240"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ali Welfare Trust Hospital Emblem"
      >
        {/* Protective Maroon Crescent */}
        <path
          d="M 175 32
             C 105 32, 28 68, 28 122
             C 28 178, 105 220, 214 218
             C 128 206, 62 170, 62 122
             C 62 76, 126 44, 175 32 Z"
          fill="#a61c52"
        />

        {/* Left Caregiver Head */}
        <circle cx="138" cy="70" r="14" fill="#3b7b9e" />

        {/* Left Caregiver Body (forms left lobe of heart) */}
        <path
          d="M 160 198
             C 130 178, 98 140, 98 106
             C 98 84, 122 78, 138 88
             C 124 96, 114 114, 114 134
             C 114 156, 138 176, 160 198 Z"
          fill="#472b4d"
        />

        {/* Right Child/Patient Head */}
        <circle cx="186" cy="90" r="10.5" fill="#3b7b9e" />

        {/* Right Child/Patient Body (forms right lobe of heart) */}
        <path
          d="M 160 198
             C 174 176, 206 150, 206 124
             C 206 106, 186 104, 176 112
             C 184 120, 190 134, 186 148
             C 182 162, 172 180, 160 198 Z"
          fill="#472b4d"
        />
      </svg>
    );
  }

  if (variant === 'full') {
    if (!imgError) {
      return (
        <div className={`inline-flex items-center ${className}`}>
          <img
            src="/images/hospital-logo-clean.png"
            alt="Ali Welfare Trust Hospital Logo"
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        </div>
      );
    }

    return (
      <svg
        viewBox="0 0 850 240"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ali Welfare Trust Hospital Logo"
      >
        <g transform="translate(10, 0)">
          {/* Protective Maroon Crescent */}
          <path
            d="M 175 32
               C 105 32, 28 68, 28 122
               C 28 178, 105 220, 214 218
               C 128 206, 62 170, 62 122
               C 62 76, 126 44, 175 32 Z"
            fill="#a61c52"
          />

          {/* Left Caregiver Head */}
          <circle cx="138" cy="70" r="14" fill="#3b7b9e" />

          {/* Left Caregiver Body */}
          <path
            d="M 160 198
               C 130 178, 98 140, 98 106
               C 98 84, 122 78, 138 88
               C 124 96, 114 114, 114 134
               C 114 156, 138 176, 160 198 Z"
            fill="#472b4d"
          />

          {/* Right Child/Patient Head */}
          <circle cx="186" cy="90" r="10.5" fill="#3b7b9e" />

          {/* Right Child/Patient Body */}
          <path
            d="M 160 198
               C 174 176, 206 150, 206 124
               C 206 106, 186 104, 176 112
               C 184 120, 190 134, 186 148
               C 182 162, 172 180, 160 198 Z"
            fill="#472b4d"
          />
        </g>

        {/* Official Hospital Typography */}
        <text
          x="250"
          y="105"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="800"
          fontSize="46"
          fill={textColor}
          letterSpacing="-0.5"
        >
          Ali Welfare Trust Hospital
        </text>

        <text
          x="250"
          y="156"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize="24"
          fill={subColor}
        >
          ( A Non-profitable ,Regd,Orginaztion Devoted
        </text>

        <text
          x="250"
          y="196"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize="24"
          fill={subColor}
        >
          to provide health facilities)
        </text>
      </svg>
    );
  }

  // Default 'horizontal' layout: clean, responsive representation with emblem + brand title
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
        <HospitalLogo variant="emblem" className="w-full h-full object-contain" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className={`font-extrabold text-lg sm:text-xl tracking-tight leading-none ${isDark ? 'text-white' : 'text-[#392444]'}`}>
            Ali Welfare Trust Hospital
          </span>
        </div>
        <p className={`text-[11px] sm:text-xs font-semibold mt-0.5 leading-tight ${isDark ? 'text-pink-300' : 'text-[#a61c52]'}`}>
          ( A Non-profitable ,Regd,Orginaztion Devoted to provide health facilities)
        </p>
      </div>
    </div>
  );
};
