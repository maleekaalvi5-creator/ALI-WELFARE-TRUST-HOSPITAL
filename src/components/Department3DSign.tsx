import React from 'react';
import dialysis3D from '../assets/images/dept_dialysis_3d_1789128299990.jpg';
import eyecare3D from '../assets/images/dept_eyecare_3d_1789128322024.jpg';
import emergency3D from '../assets/images/dept_emergency_3d_1789128332921.jpg';
import radiology3D from '../assets/images/dept_radiology_3d_1789128344306.jpg';
import pharmacy3D from '../assets/images/dept_pharmacy_3d_1789128354887.jpg';

// High-end 3D Volumetric Vector Signs for all clinical departments
// Crafted with realistic depth, metallic rims, specular highlights, and 3D shadows
const svgToDataUrl = (svgString: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

const create3DGynecologySvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="sphere" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fff" />
      <stop offset="25%" stop-color="#fbcfe8" />
      <stop offset="70%" stop-color="#db2777" />
      <stop offset="100%" stop-color="#831843" />
    </radialGradient>
    <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#f472b6" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow3d" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#831843" flood-opacity="0.45" />
    </filter>
  </defs>
  <!-- Background Glow -->
  <circle cx="100" cy="100" r="85" fill="url(#glow)" />
  <!-- 3D Beveled Outer Ring -->
  <circle cx="100" cy="100" r="78" fill="url(#goldRim)" filter="url(#shadow3d)" />
  <circle cx="100" cy="100" r="70" fill="#fff" />
  <!-- Inner 3D Sphere -->
  <circle cx="100" cy="100" r="62" fill="url(#sphere)" />
  <!-- Specular Light Reflection -->
  <ellipse cx="78" cy="68" rx="24" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 78 68)" />
  <!-- 3D Sculpted Mother & Baby Silhouette in Pure White Glass -->
  <g fill="#ffffff" filter="drop-shadow(0px 3px 4px rgba(0,0,0,0.3))">
    <!-- Mother Head -->
    <circle cx="90" cy="65" r="14" />
    <!-- Mother Body arc cradling infant -->
    <path d="M72 135 C68 95 85 82 110 85 C125 87 132 105 125 122 C120 135 105 142 90 142 Z" />
    <!-- Baby Head & Body inside cradle -->
    <circle cx="112" cy="98" r="8.5" fill="#fef08a" />
    <path d="M106 108 C115 108 122 116 118 125 C114 132 102 132 102 125 Z" fill="#fef08a" />
    <!-- Protective Heart Sign -->
    <path d="M100 146 C92 136 78 144 86 154 L100 166 L114 154 C122 144 108 136 100 146 Z" fill="#fb7185" />
  </g>
</svg>`;

const create3DMedicineSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="medSphere" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ccfbf1" />
      <stop offset="35%" stop-color="#0d9488" />
      <stop offset="80%" stop-color="#0f766e" />
      <stop offset="100%" stop-color="#115e59" />
    </radialGradient>
    <linearGradient id="goldMed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef9c3" />
      <stop offset="40%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#854d0e" />
    </linearGradient>
    <linearGradient id="chrome" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#475569" />
    </linearGradient>
    <filter id="medShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="2" dy="8" stdDeviation="6" flood-color="#042f2e" flood-opacity="0.4" />
    </filter>
  </defs>
  <!-- 3D Beveled Outer Shield -->
  <circle cx="100" cy="100" r="78" fill="url(#goldMed)" filter="url(#medShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#medSphere)" />
  <!-- Specular Reflection -->
  <ellipse cx="76" cy="65" rx="26" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Caduceus & Stethoscope -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.35))">
    <!-- Stethoscope tube -->
    <path d="M68 62 C68 115 88 135 100 135 C112 135 132 115 132 62" fill="none" stroke="url(#chrome)" stroke-width="8" stroke-linecap="round" />
    <path d="M100 135 L100 152" fill="none" stroke="url(#chrome)" stroke-width="8" stroke-linecap="round" />
    <!-- Chest piece / bell -->
    <circle cx="100" cy="158" r="14" fill="url(#goldMed)" stroke="#fff" stroke-width="2" />
    <!-- Golden Winged Staff / Caduceus Central Rod -->
    <rect x="97" y="48" width="6" height="74" rx="3" fill="url(#goldMed)" />
    <circle cx="100" cy="46" r="8" fill="url(#goldMed)" />
    <!-- 3D Red Cross Emblem -->
    <rect x="91" y="80" width="18" height="6" rx="2" fill="#ef4444" />
    <rect x="97" y="74" width="6" height="18" rx="2" fill="#ef4444" />
  </g>
</svg>`;

const create3DPathologySvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="labBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#c7d2fe" />
      <stop offset="40%" stop-color="#4f46e5" />
      <stop offset="85%" stop-color="#312e81" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </radialGradient>
    <linearGradient id="dnaGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047" />
      <stop offset="60%" stop-color="#ca8a04" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="labShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#1e1b4b" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#dnaGold)" filter="url(#labShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#labBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.55" transform="rotate(-30 76 65)" />
  <!-- 3D Precision Microscope & DNA strand -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))">
    <!-- Microscope base -->
    <rect x="68" y="145" width="64" height="10" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
    <path d="M85 145 C85 110 115 105 118 78 L128 78 C125 115 95 120 95 145 Z" fill="#cbd5e1" />
    <!-- Optical Tube -->
    <rect x="110" y="55" width="16" height="38" rx="4" fill="url(#dnaGold)" transform="rotate(-25 118 74)" />
    <!-- Eyepiece -->
    <rect x="122" y="44" width="22" height="10" rx="3" fill="#ffffff" transform="rotate(-25 133 49)" />
    <!-- Specimen Stage with Glowing Slide -->
    <rect x="75" y="112" width="48" height="6" rx="2" fill="#38bdf8" />
    <circle cx="99" cy="115" r="4" fill="#facc15" />
    <!-- Floating 3D DNA Helix on Left -->
    <path d="M62 60 Q72 75 62 90 T62 120" fill="none" stroke="#a7f3d0" stroke-width="4" stroke-linecap="round" />
    <path d="M72 60 Q62 75 72 90 T72 120" fill="none" stroke="#6ee7b7" stroke-width="4" stroke-linecap="round" />
    <line x1="62" y1="75" x2="72" y2="75" stroke="#fde047" stroke-width="2.5" />
    <line x1="62" y1="105" x2="72" y2="105" stroke="#fde047" stroke-width="2.5" />
  </g>
</svg>`;

const create3DUrologySvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="uroBg" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fed7aa" />
      <stop offset="35%" stop-color="#ea580c" />
      <stop offset="85%" stop-color="#9a3412" />
      <stop offset="100%" stop-color="#431407" />
    </radialGradient>
    <linearGradient id="goldUro" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="uroShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#431407" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldUro)" filter="url(#uroShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#uroBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Anatomical Kidney & Laser Lithotripsy Star -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))">
    <!-- Right Kidney 3D Form -->
    <path d="M96 60 C125 55 142 75 140 102 C138 128 120 145 98 142 C82 140 76 122 84 105 C90 92 84 75 96 60 Z" fill="#fed7aa" stroke="#c2410c" stroke-width="3" />
    <!-- Inner Medullary pyramids -->
    <circle cx="112" cy="85" r="7" fill="#ea580c" opacity="0.7" />
    <circle cx="118" cy="104" r="8" fill="#ea580c" opacity="0.7" />
    <circle cx="110" cy="122" r="7" fill="#ea580c" opacity="0.7" />
    <!-- Laser Beam Pulse Dissolving Kidney Stone -->
    <line x1="60" y1="88" x2="108" y2="102" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
    <!-- Dissolving Crystal Sparkle -->
    <polygon points="108,94 112,102 120,104 112,108 108,116 104,108 96,104 104,102" fill="#facc15" />
    <circle cx="108" cy="103" r="12" fill="#38bdf8" opacity="0.4" />
  </g>
</svg>`;

const create3DENTSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="entBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="35%" stop-color="#0284c7" />
      <stop offset="85%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#082f49" />
    </radialGradient>
    <linearGradient id="goldEnt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="entShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#082f49" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldEnt)" filter="url(#entShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#entBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.55" transform="rotate(-30 76 65)" />
  <!-- 3D Ear / Cochlea & Acoustic Wave Rings -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.35))">
    <!-- Stylized Human Ear Silhouette -->
    <path d="M78 88 C76 62 108 55 118 72 C126 84 122 102 110 112 C98 120 102 134 94 138 C86 142 80 134 82 122 C84 112 94 108 94 98 C94 84 84 84 82 88 Z" fill="#ffffff" />
    <!-- Inner Cochlear Spiral in Gold -->
    <circle cx="98" cy="98" r="8" fill="none" stroke="url(#goldEnt)" stroke-width="3" />
    <!-- Sound Waves Radiating -->
    <path d="M128 75 C138 88 138 108 128 122" fill="none" stroke="#facc15" stroke-width="4" stroke-linecap="round" />
    <path d="M138 65 C152 85 152 115 138 135" fill="none" stroke="#facc15" stroke-width="3" stroke-linecap="round" opacity="0.75" />
  </g>
</svg>`;

const create3DOrthoSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="orthoBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fed7aa" />
      <stop offset="35%" stop-color="#b45309" />
      <stop offset="85%" stop-color="#78350f" />
      <stop offset="100%" stop-color="#451a03" />
    </radialGradient>
    <linearGradient id="steelBone" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="40%" stop-color="#e2e8f0" />
      <stop offset="80%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#64748b" />
    </linearGradient>
    <linearGradient id="goldOrtho" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="orthoShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#451a03" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldOrtho)" filter="url(#orthoShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#orthoBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Anatomical Bone Joint & Spine Plates -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))">
    <!-- Upper Femur Bone Head -->
    <path d="M85 55 C75 55 70 65 78 72 C84 76 92 78 95 92 L105 92 C108 78 116 76 122 72 C130 65 125 55 115 55 C108 55 105 60 100 60 C95 60 92 55 85 55 Z" fill="url(#steelBone)" />
    <!-- Knee Joint Articulation Gap -->
    <ellipse cx="100" cy="98" rx="20" ry="4" fill="#38bdf8" />
    <!-- Lower Tibia Bone Shaft -->
    <path d="M93 105 L93 145 C86 145 80 152 86 158 C92 162 108 162 114 158 C120 152 114 145 107 145 L107 105 Z" fill="url(#steelBone)" />
    <!-- Golden Fixation Joint Plate -->
    <rect x="94" y="85" width="12" height="28" rx="4" fill="url(#goldOrtho)" stroke="#ffffff" stroke-width="1.5" />
    <circle cx="100" cy="90" r="2" fill="#451a03" />
    <circle cx="100" cy="108" r="2" fill="#451a03" />
  </g>
</svg>`;

const create3DPhysioSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="physioBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#bbf7d0" />
      <stop offset="35%" stop-color="#16a34a" />
      <stop offset="85%" stop-color="#15803d" />
      <stop offset="100%" stop-color="#052e16" />
    </radialGradient>
    <linearGradient id="goldPhysio" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="physioShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#052e16" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldPhysio)" filter="url(#physioShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#physioBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Biomechanical Athlete / Human Kinetic Movement -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.35))">
    <!-- Figure Head -->
    <circle cx="100" cy="62" r="11" fill="#ffffff" />
    <!-- Dynamic Torso & Spine Curve -->
    <path d="M100 76 Q112 95 96 112 Q115 130 125 152" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
    <!-- Kinetic Running Arm -->
    <path d="M82 82 Q100 88 122 84" fill="none" stroke="#facc15" stroke-width="5" stroke-linecap="round" />
    <!-- Kinetic Waves / Mobility Rings -->
    <ellipse cx="100" cy="115" rx="34" ry="14" fill="none" stroke="#facc15" stroke-width="3" stroke-dasharray="6,4" />
    <circle cx="100" cy="115" r="4" fill="#38bdf8" />
  </g>
</svg>`;

const create3DNeuroSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="neuroBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ddd6fe" />
      <stop offset="35%" stop-color="#7c3aed" />
      <stop offset="85%" stop-color="#5b21b6" />
      <stop offset="100%" stop-color="#2e1065" />
    </radialGradient>
    <linearGradient id="goldNeuro" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="neuroShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#2e1065" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldNeuro)" filter="url(#neuroShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#neuroBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Glowing Synaptic Brain & Spine -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))">
    <!-- Brain Cortex Curves -->
    <path d="M100 62 C85 60 70 70 70 85 C65 92 68 105 78 112 C75 120 82 130 92 130 C95 130 100 128 100 125 C100 128 105 130 108 130 C118 130 125 120 122 112 C132 105 135 92 130 85 C130 70 115 60 100 62 Z" fill="#ffffff" stroke="#c084fc" stroke-width="2.5" />
    <!-- Central Spinal Cord -->
    <line x1="100" y1="125" x2="100" y2="158" stroke="url(#goldNeuro)" stroke-width="6" stroke-linecap="round" />
    <!-- Glowing Synapse Pulses -->
    <circle cx="85" cy="88" r="4" fill="#38bdf8" />
    <circle cx="115" cy="88" r="4" fill="#38bdf8" />
    <circle cx="100" cy="102" r="5" fill="#facc15" />
    <line x1="85" y1="88" x2="100" y2="102" stroke="#38bdf8" stroke-width="2" />
    <line x1="115" y1="88" x2="100" y2="102" stroke="#38bdf8" stroke-width="2" />
  </g>
</svg>`;

const create3DPulmoSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="pulmoBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="35%" stop-color="#0284c7" />
      <stop offset="85%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#082f49" />
    </radialGradient>
    <linearGradient id="goldPulmo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="pulmoShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#082f49" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldPulmo)" filter="url(#pulmoShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#pulmoBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Dual Lungs & Trachea Arborization -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.35))">
    <!-- Trachea / Windpipe -->
    <rect x="96" y="55" width="8" height="24" rx="4" fill="url(#goldPulmo)" />
    <!-- Left Lung Lobe -->
    <path d="M94 80 C80 80 66 94 66 116 C66 138 82 146 94 140 C98 138 98 100 94 80 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="2" />
    <!-- Right Lung Lobe -->
    <path d="M106 80 C120 80 134 94 134 116 C134 138 118 146 106 140 C102 138 102 100 106 80 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="2" />
    <!-- Bronchial Tree branches in Cyan -->
    <path d="M96 86 Q84 96 82 112" fill="none" stroke="#0284c7" stroke-width="3" />
    <path d="M104 86 Q116 96 118 112" fill="none" stroke="#0284c7" stroke-width="3" />
    <!-- Alveoli Glowing Clusters -->
    <circle cx="82" cy="120" r="4" fill="#facc15" />
    <circle cx="118" cy="120" r="4" fill="#facc15" />
  </g>
</svg>`;

const create3DPedsSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="pedsBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="35%" stop-color="#f59e0b" />
      <stop offset="85%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#78350f" />
    </radialGradient>
    <linearGradient id="goldPeds" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="pedsShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#78350f" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldPeds)" filter="url(#pedsShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#pedsBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Child Health Teddy Bear & Pediatric Heart Stethoscope -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.35))">
    <!-- Bear Ears -->
    <circle cx="78" cy="74" r="11" fill="#ffffff" />
    <circle cx="122" cy="74" r="11" fill="#ffffff" />
    <!-- Bear Head -->
    <circle cx="100" cy="94" r="26" fill="#ffffff" />
    <!-- Bear Snout -->
    <ellipse cx="100" cy="102" rx="12" ry="8" fill="#fef08a" />
    <circle cx="100" cy="99" r="3.5" fill="#78350f" />
    <circle cx="91" cy="90" r="3" fill="#78350f" />
    <circle cx="109" cy="90" r="3" fill="#78350f" />
    <!-- Red Caring Heart Badge -->
    <path d="M100 128 C94 120 84 126 90 134 L100 144 L110 134 C116 126 106 120 100 128 Z" fill="#ef4444" />
  </g>
</svg>`;

const create3DGastroSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="gastroBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fed7aa" />
      <stop offset="35%" stop-color="#f97316" />
      <stop offset="85%" stop-color="#c2410c" />
      <stop offset="100%" stop-color="#7c2d12" />
    </radialGradient>
    <linearGradient id="goldGastro" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="gastroShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#7c2d12" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldGastro)" filter="url(#gastroShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#gastroBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Anatomical Stomach & Hepatic Liver Sign -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.35))">
    <!-- Liver Lobe on Right -->
    <path d="M102 68 C128 62 144 80 142 98 C138 108 118 112 108 108 Z" fill="url(#goldGastro)" />
    <!-- Stomach Curvature -->
    <path d="M96 68 C80 68 70 85 70 108 C70 134 88 145 110 142 C125 140 130 128 122 118 C112 108 110 95 106 82 C104 74 100 68 96 68 Z" fill="#ffffff" stroke="#ea580c" stroke-width="2.5" />
    <!-- Glowing Digestive Enzyme Sparkles -->
    <circle cx="94" cy="116" r="4" fill="#38bdf8" />
    <circle cx="104" cy="125" r="3" fill="#facc15" />
  </g>
</svg>`;

const create3DSurgerySvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="surgBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ccfbf1" />
      <stop offset="35%" stop-color="#0f766e" />
      <stop offset="85%" stop-color="#115e59" />
      <stop offset="100%" stop-color="#042f2e" />
    </radialGradient>
    <linearGradient id="steelBlade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="40%" stop-color="#cbd5e1" />
      <stop offset="80%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <linearGradient id="goldSurg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#713f12" />
    </linearGradient>
    <filter id="surgShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#042f2e" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#goldSurg)" filter="url(#surgShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#surgBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.6" transform="rotate(-30 76 65)" />
  <!-- 3D Crossed Surgical Scalpel & Laparoscopic Trocar Instrument -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.4))">
    <!-- Scalpel 1 -->
    <rect x="94" y="58" width="12" height="84" rx="3" fill="url(#steelBlade)" transform="rotate(-40 100 100)" />
    <path d="M125 58 C135 70 135 85 125 90 Z" fill="#ffffff" transform="rotate(-40 100 100)" />
    <!-- Laparoscope Port Instrument -->
    <rect x="95" y="52" width="10" height="96" rx="4" fill="url(#goldSurg)" transform="rotate(40 100 100)" />
    <circle cx="100" cy="100" r="9" fill="#ffffff" stroke="url(#goldSurg)" stroke-width="3" />
    <!-- Sterile Medical Cross in Center -->
    <rect x="94" y="98" width="12" height="4" rx="1" fill="#14b8a6" />
    <rect x="98" y="94" width="4" height="12" rx="1" fill="#14b8a6" />
  </g>
</svg>`;

const create3DUltrasoundLabSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="ultraLabBg" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ccfbf1" />
      <stop offset="35%" stop-color="#0f766e" />
      <stop offset="80%" stop-color="#115e59" />
      <stop offset="100%" stop-color="#042f2e" />
    </radialGradient>
    <linearGradient id="ultraGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="45%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#854d0e" />
    </linearGradient>
    <filter id="ultraShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="3" dy="8" stdDeviation="6" flood-color="#042f2e" flood-opacity="0.45" />
    </filter>
  </defs>
  <circle cx="100" cy="100" r="78" fill="url(#ultraGold)" filter="url(#ultraShadow)" />
  <circle cx="100" cy="100" r="69" fill="#ffffff" />
  <circle cx="100" cy="100" r="61" fill="url(#ultraLabBg)" />
  <ellipse cx="76" cy="65" rx="25" ry="12" fill="#ffffff" opacity="0.55" transform="rotate(-30 76 65)" />
  <!-- 3D Ultrasound Screen & Blood Laboratory Test Tube -->
  <g filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.45))">
    <!-- Ultrasound Curved Screen Display -->
    <rect x="52" y="66" width="54" height="42" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5" />
    <path d="M58 88 Q66 76 74 88 T90 88 T100 82" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" />
    <!-- Ultrasound Wave Concentric Arcs -->
    <path d="M56 120 Q78 138 100 120" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
    <path d="M62 128 Q78 142 94 128" fill="none" stroke="#67e8f9" stroke-width="2.5" stroke-linecap="round" />
    <!-- Laboratory Blood Test Tube -->
    <rect x="120" y="58" width="22" height="74" rx="11" fill="#f8fafc" stroke="#94a3b8" stroke-width="2" />
    <!-- Blood Level Inside Tube -->
    <path d="M121 90 C121 90 131 92 141 90 L141 121 C141 127 136 131 131 131 C126 131 121 127 121 121 Z" fill="#ef4444" />
    <!-- Test Tube Red Stopper Cap -->
    <rect x="117" y="52" width="28" height="12" rx="3" fill="#dc2626" stroke="#991b1b" stroke-width="1.5" />
    <!-- White Medical Cross Badge -->
    <rect x="127" y="98" width="8" height="3" rx="1" fill="#ffffff" />
    <rect x="129.5" y="95.5" width="3" height="8" rx="1" fill="#ffffff" />
  </g>
</svg>`;

export const DEPARTMENT_3D_SIGNS: Record<string, string> = {
  'dialysis': dialysis3D,
  'eye-care': eyecare3D,
  'emergency': emergency3D,
  'radiology': radiology3D,
  'pharmacy': pharmacy3D,
  'gynecology': svgToDataUrl(create3DGynecologySvg()),
  'medicine': svgToDataUrl(create3DMedicineSvg()),
  'pathology': svgToDataUrl(create3DPathologySvg()),
  'urology': svgToDataUrl(create3DUrologySvg()),
  'ent': svgToDataUrl(create3DENTSvg()),
  'orthopaedics': svgToDataUrl(create3DOrthoSvg()),
  'physiotherapy': svgToDataUrl(create3DPhysioSvg()),
  'neurosurgery': svgToDataUrl(create3DNeuroSvg()),
  'pulmonology': svgToDataUrl(create3DPulmoSvg()),
  'pediatrics': svgToDataUrl(create3DPedsSvg()),
  'gastroenterology': svgToDataUrl(create3DGastroSvg()),
  'surgery': svgToDataUrl(create3DSurgerySvg()),
  'ultrasound-lab': svgToDataUrl(create3DUltrasoundLabSvg()),
};

export const getDepartment3DSign = (departmentId: string, fallbackUrl?: string): string => {
  return DEPARTMENT_3D_SIGNS[departmentId] || fallbackUrl || dialysis3D;
};
