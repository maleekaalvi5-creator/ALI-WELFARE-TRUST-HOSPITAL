import React from 'react';

interface Doctor3DAvatarProps {
  avatarType?: 'female' | 'ent' | 'kidney' | 'ortho' | 'physio' | 'neuro' | 'general' | 'chest' | 'child' | 'eye' | 'gastro' | 'surgeon' | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Doctor3DAvatar: React.FC<Doctor3DAvatarProps> = ({
  avatarType = 'general',
  className = '',
  size = 'md'
}) => {
  // Theme palette based on specialty category
  const config = React.useMemo(() => {
    switch (avatarType) {
      case 'female':
        return {
          bgGradStart: '#fdf2f8',
          bgGradEnd: '#fce7f3',
          coatShadow: '#db2777',
          accentColor: '#ec4899',
          tieOrScarf: '#f43f5e',
          badgeText: 'GYN / OBS',
          badgeBg: '#be185d',
          coatColor: '#ffffff',
          stethoscopeColor: '#db2777',
          iconType: 'female-gyn'
        };
      case 'ent':
        return {
          bgGradStart: '#eff6ff',
          bgGradEnd: '#dbeafe',
          coatShadow: '#2563eb',
          accentColor: '#3b82f6',
          tieOrScarf: '#1d4ed8',
          badgeText: 'ENT SURGEON',
          badgeBg: '#1e40af',
          coatColor: '#ffffff',
          stethoscopeColor: '#0284c7',
          iconType: 'ent'
        };
      case 'kidney':
        return {
          bgGradStart: '#ecfeff',
          bgGradEnd: '#cffafe',
          coatShadow: '#0891b2',
          accentColor: '#06b6d4',
          tieOrScarf: '#0e7490',
          badgeText: 'KIDNEY TRANSPLANT',
          badgeBg: '#155e75',
          coatColor: '#ffffff',
          stethoscopeColor: '#0891b2',
          iconType: 'kidney'
        };
      case 'ortho':
        return {
          bgGradStart: '#f0fdf4',
          bgGradEnd: '#dcfce7',
          coatShadow: '#059669',
          accentColor: '#10b981',
          tieOrScarf: '#047857',
          badgeText: 'ORTHO & FAMILY',
          badgeBg: '#065f46',
          coatColor: '#ffffff',
          stethoscopeColor: '#059669',
          iconType: 'ortho'
        };
      case 'physio':
        return {
          bgGradStart: '#f5f3ff',
          bgGradEnd: '#ede9fe',
          coatShadow: '#7c3aed',
          accentColor: '#8b5cf6',
          tieOrScarf: '#6d28d9',
          badgeText: 'PHYSIOTHERAPY',
          badgeBg: '#5b21b6',
          coatColor: '#ffffff',
          stethoscopeColor: '#7c3aed',
          iconType: 'physio'
        };
      case 'neuro':
        return {
          bgGradStart: '#faf5ff',
          bgGradEnd: '#f3e8ff',
          coatShadow: '#9333ea',
          accentColor: '#a855f7',
          tieOrScarf: '#7e22ce',
          badgeText: 'NEURO SURGEON',
          badgeBg: '#6b21a8',
          coatColor: '#ffffff',
          stethoscopeColor: '#9333ea',
          iconType: 'neuro'
        };
      case 'chest':
        return {
          bgGradStart: '#f0fdfa',
          bgGradEnd: '#ccfbf1',
          coatShadow: '#0d9488',
          accentColor: '#14b8a6',
          tieOrScarf: '#0f766e',
          badgeText: 'CHEST & PULMONARY',
          badgeBg: '#115e59',
          coatColor: '#ffffff',
          stethoscopeColor: '#0d9488',
          iconType: 'chest'
        };
      case 'child':
        return {
          bgGradStart: '#fffbeb',
          bgGradEnd: '#fef3c7',
          coatShadow: '#d97706',
          accentColor: '#f59e0b',
          tieOrScarf: '#b45309',
          badgeText: 'PEDIATRICIAN',
          badgeBg: '#92400e',
          coatColor: '#ffffff',
          stethoscopeColor: '#d97706',
          iconType: 'child'
        };
      case 'eye':
        return {
          bgGradStart: '#f0f9ff',
          bgGradEnd: '#e0f2fe',
          coatShadow: '#0284c7',
          accentColor: '#0ea5e9',
          tieOrScarf: '#0369a1',
          badgeText: 'EYE PHYSICIAN',
          badgeBg: '#075985',
          coatColor: '#ffffff',
          stethoscopeColor: '#0284c7',
          iconType: 'eye'
        };
      case 'gastro':
        return {
          bgGradStart: '#fff7ed',
          bgGradEnd: '#ffedd5',
          coatShadow: '#ea580c',
          accentColor: '#f97316',
          tieOrScarf: '#c2410c',
          badgeText: 'GASTROENTEROLOGY',
          badgeBg: '#9a3412',
          coatColor: '#ffffff',
          stethoscopeColor: '#ea580c',
          iconType: 'gastro'
        };
      case 'surgeon':
        return {
          bgGradStart: '#eef2ff',
          bgGradEnd: '#e0e7ff',
          coatShadow: '#4f46e5',
          accentColor: '#6366f1',
          tieOrScarf: '#4338ca',
          badgeText: 'GENERAL SURGEON',
          badgeBg: '#3730a3',
          coatColor: '#ffffff',
          stethoscopeColor: '#4f46e5',
          iconType: 'surgeon'
        };
      case 'general':
      default:
        return {
          bgGradStart: '#f0fdfa',
          bgGradEnd: '#e6fffa',
          coatShadow: '#087f8c',
          accentColor: '#087f8c',
          tieOrScarf: '#066570',
          badgeText: 'CONSULTANT M.D.',
          badgeBg: '#04444b',
          coatColor: '#ffffff',
          stethoscopeColor: '#087f8c',
          iconType: 'general'
        };
    }
  }, [avatarType]);

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 320"
        className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 3D Circular Podium Background */}
          <radialGradient id={`bg3d-${uniqueId}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="45%" stopColor={config.bgGradStart} />
            <stop offset="100%" stopColor={config.bgGradEnd} />
          </radialGradient>

          {/* Spherical Specular Light */}
          <linearGradient id={`specular-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* 3D Doctor Coat Shader */}
          <linearGradient id={`coatGrad-${uniqueId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          {/* 3D Doctor Inner Scrubs/Shirt Shader */}
          <linearGradient id={`shirtGrad-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={config.accentColor} />
            <stop offset="100%" stopColor={config.tieOrScarf} />
          </linearGradient>

          {/* Metallic Stethoscope Shader */}
          <linearGradient id={`metalSteth-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* 3D Head / Face Tone */}
          <radialGradient id={`skinTone-${uniqueId}`} cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffeedd" />
            <stop offset="60%" stopColor="#fcd3b6" />
            <stop offset="100%" stopColor="#f6b88f" />
          </radialGradient>

          {/* Drop Shadows */}
          <filter id={`shadow3d-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor={config.coatShadow} floodOpacity="0.18" />
          </filter>
        </defs>

        {/* 1. Backdrop Studio Sphere with 3D Ring */}
        <circle cx="160" cy="160" r="148" fill={`url(#bg3d-${uniqueId})`} />
        <circle cx="160" cy="160" r="147" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
        <circle cx="160" cy="160" r="144" stroke={config.accentColor} strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="4 2" />

        {/* Subtle Ambient Studio Spotlight */}
        <ellipse cx="160" cy="70" rx="90" ry="40" fill={`url(#specular-${uniqueId})`} opacity="0.6" />

        {/* 2. Doctor Shoulders & White Coat (3D Volumetric Curve) */}
        <g filter={`url(#shadow3d-${uniqueId})`}>
          {/* Base Torso / Shoulders */}
          <path
            d="M50 292 C50 220 90 200 160 200 C230 200 270 220 270 292 Z"
            fill={`url(#coatGrad-${uniqueId})`}
          />

          {/* Inner Shirt / Surgical Scrubs V-Neck */}
          <path
            d="M125 200 L160 255 L195 200 Z"
            fill={`url(#shirtGrad-${uniqueId})`}
          />

          {/* Tie or Scarf or Medical V Line */}
          <path
            d="M154 210 L166 210 L163 248 L157 248 Z"
            fill="rgba(0,0,0,0.15)"
          />

          {/* Lapels of Doctor White Coat */}
          {/* Left Lapel */}
          <path
            d="M100 200 L125 260 L145 235 L125 200 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          {/* Right Lapel */}
          <path
            d="M220 200 L195 260 L175 235 L195 200 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="1"
          />

          {/* Doctor Coat Center Fold & Buttons */}
          <line x1="160" y1="255" x2="160" y2="295" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 8" />
          <circle cx="160" cy="270" r="3" fill="#94a3b8" />
          <circle cx="160" cy="285" r="3" fill="#94a3b8" />

          {/* Doctor Left Pocket with Pens */}
          <rect x="76" y="246" width="34" height="28" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
          {/* Medical Pen 1 */}
          <line x1="84" y1="240" x2="84" y2="252" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          {/* Medical Pen 2 */}
          <line x1="90" y1="238" x2="90" y2="252" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* 3. Volumetric Stethoscope (Curving around Neck) */}
        <g>
          {/* Stethoscope Rubber Tubing */}
          <path
            d="M116 170 C110 205 110 240 146 250 C150 252 154 260 156 266"
            stroke={config.stethoscopeColor}
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M204 170 C210 205 210 240 174 250 C170 252 166 260 164 266"
            stroke={config.stethoscopeColor}
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Metallic Chestpiece / Bell Diaphragm with Specular Ring */}
          <g filter={`url(#shadow3d-${uniqueId})`}>
            <circle cx="160" cy="272" r="14" fill={`url(#metalSteth-${uniqueId})`} stroke="#475569" strokeWidth="1.5" />
            <circle cx="160" cy="272" r="10" fill={config.accentColor} opacity="0.9" />
            <circle cx="157" cy="269" r="3" fill="#ffffff" opacity="0.8" />
          </g>
        </g>

        {/* 4. Doctor Neck */}
        <path
          d="M136 145 C136 170 142 195 160 195 C178 195 184 170 184 145 Z"
          fill={`url(#skinTone-${uniqueId})`}
        />

        {/* 5. 3D Doctor Head / Face */}
        <g filter={`url(#shadow3d-${uniqueId})`}>
          {/* Head base */}
          <ellipse cx="160" cy="120" rx="46" ry="52" fill={`url(#skinTone-${uniqueId})`} />

          {/* Hair & Headwear based on type */}
          {config.iconType === 'female-gyn' || config.iconType === 'physio' ? (
            /* Elegant Professional Medical Hair / Hijab/Headcover */
            <g>
              {/* Back Hair */}
              <path
                d="M108 120 C108 65 212 65 212 120 C212 155 204 168 200 172 C190 145 190 100 160 100 C130 100 130 145 120 172 C116 168 108 155 108 120 Z"
                fill="#312e81"
              />
              {/* Soft Highlight */}
              <path
                d="M125 86 C140 76 180 76 195 86"
                stroke="#6366f1"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : (
            /* Professional Trimmed Hair / Specialist Styling */
            <g>
              <path
                d="M112 110 C112 66 140 58 160 58 C185 58 208 68 208 110 C204 96 196 82 178 82 C158 82 145 92 126 92 C118 92 114 102 112 110 Z"
                fill="#1e293b"
              />
              {/* Subtle Hair Sheen */}
              <path
                d="M135 68 C148 63 172 63 185 68"
                stroke="#64748b"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* Ears */}
          <ellipse cx="114" cy="122" rx="6" ry="10" fill={`url(#skinTone-${uniqueId})`} />
          <ellipse cx="206" cy="122" rx="6" ry="10" fill={`url(#skinTone-${uniqueId})`} />

          {/* Professional Glasses / Optical Frame for sharp medical look */}
          <g>
            {/* Left Frame */}
            <rect x="130" y="112" width="22" height="15" rx="5" fill="none" stroke="#334155" strokeWidth="2.5" />
            <circle cx="134" cy="116" r="1.5" fill="#ffffff" opacity="0.8" />
            {/* Right Frame */}
            <rect x="168" y="112" width="22" height="15" rx="5" fill="none" stroke="#334155" strokeWidth="2.5" />
            <circle cx="172" cy="116" r="1.5" fill="#ffffff" opacity="0.8" />
            {/* Bridge */}
            <line x1="152" y1="117" x2="168" y2="117" stroke="#334155" strokeWidth="2.5" />
            {/* Temples */}
            <line x1="118" y1="116" x2="130" y2="116" stroke="#334155" strokeWidth="2" />
            <line x1="190" y1="116" x2="202" y2="116" stroke="#334155" strokeWidth="2" />
          </g>

          {/* Gentle, confident medical smile */}
          <path
            d="M148 145 Q160 154 172 145"
            stroke="#9a3412"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Nose */}
          <path
            d="M158 126 Q161 133 164 133"
            stroke="#ea580c"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* 6. Professional Doctor Caduceus / Floating Medical Crest */}
        <g filter={`url(#shadow3d-${uniqueId})`}>
          <circle cx="250" cy="80" r="26" fill="#ffffff" stroke={config.accentColor} strokeWidth="2.5" />
          <circle cx="250" cy="80" r="21" fill={config.bgGradEnd} />
          
          {/* Medical Cross in 3D Emblem */}
          <rect x="246" y="69" width="8" height="22" rx="2" fill={config.accentColor} />
          <rect x="239" y="76" width="22" height="8" rx="2" fill={config.accentColor} />
          {/* Center Specular Spark */}
          <circle cx="250" cy="80" r="3" fill="#ffffff" />
        </g>

        {/* 7. Bottom Professional 3D Specialty Badge */}
        <g filter={`url(#shadow3d-${uniqueId})`}>
          <rect
            x="40"
            y="278"
            width="240"
            height="32"
            rx="16"
            fill="#ffffff"
            stroke={config.accentColor}
            strokeWidth="1.5"
          />
          <rect
            x="44"
            y="282"
            width="232"
            height="24"
            rx="12"
            fill={config.badgeBg}
          />
          <text
            x="160"
            y="298"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10.5"
            fontWeight="900"
            letterSpacing="1.2"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {config.badgeText}
          </text>
        </g>

        {/* 8. Specular Outer Glass Highlight Ring */}
        <path
          d="M36 120 C42 60 90 24 160 24 C200 24 240 40 268 70"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.65"
          fill="none"
        />
      </svg>
    </div>
  );
};
