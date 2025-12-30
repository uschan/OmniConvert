import React from 'react';
import { UnitCategory } from '../types';

interface CategoryVisualProps {
  category: UnitCategory;
}

const CategoryVisual: React.FC<CategoryVisualProps> = ({ category }) => {
  const getVisual = () => {
    switch (category) {
      case 'pressure':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#1f1f1f" strokeWidth="2" />
            <path d="M15 50 A 35 35 0 1 1 85 50" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
            <path d="M15 50 A 35 35 0 0 1 35 20" fill="none" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" className="opacity-50" />
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180].map((deg, i) => (
              <line key={i} x1="50" y1="10" x2="50" y2="15" transform={`rotate(${deg - 90} 50 50)`} stroke={i > 7 ? '#ef4444' : '#00f0ff'} strokeWidth="2" />
            ))}
            <g className="animate-needle origin-center">
              <line x1="50" y1="50" x2="50" y2="15" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <circle cx="50" cy="50" r="3" fill="#ef4444" />
            </g>
            <rect x="35" y="70" width="30" height="12" rx="2" fill="#0a0a0a" stroke="#333" />
            <line x1="38" y1="76" x2="62" y2="76" stroke="#00f0ff" strokeWidth="2" strokeDasharray="2 2" className="animate-pulse" />
          </svg>
        );

      case 'temperature':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon-red">
            <rect x="42" y="10" width="16" height="70" rx="8" fill="rgba(255,255,255,0.05)" stroke="#333" strokeWidth="1" />
            <circle cx="50" cy="80" r="12" fill="none" stroke="#333" strokeWidth="1" />
            <line x1="62" y1="20" x2="70" y2="20" stroke="#444" strokeWidth="1" />
            <line x1="62" y1="35" x2="70" y2="35" stroke="#444" strokeWidth="1" />
            <line x1="62" y1="50" x2="70" y2="50" stroke="#444" strokeWidth="1" />
            <line x1="62" y1="65" x2="70" y2="65" stroke="#444" strokeWidth="1" />
            <circle cx="50" cy="80" r="8" fill="#ef4444" className="animate-pulse-fast" />
            <rect x="46" y="65" width="8" height="20" rx="4" fill="#ef4444" className="animate-liquid" />
            <path d="M25 70 Q 30 65 25 60" stroke="#ef4444" fill="none" strokeWidth="1" className="animate-float opacity-50" />
            <path d="M25 50 Q 30 45 25 40" stroke="#ef4444" fill="none" strokeWidth="1" className="animate-float opacity-50" style={{ animationDelay: '1s' }} />
          </svg>
        );

      case 'speed':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
            <path d="M15 70 A 40 40 0 1 1 85 70" fill="none" stroke="#333" strokeWidth="6" strokeLinecap="round" />
            <path d="M15 70 A 40 40 0 0 1 35 25" fill="none" stroke="#fcee0a" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 2" />
            <circle cx="50" cy="70" r="5" fill="#333" />
            <line x1="50" y1="70" x2="20" y2="40" stroke="#00f0ff" strokeWidth="3" strokeLinecap="round" className="animate-needle origin-[50px_70px]" />
            <line x1="90" y1="50" x2="100" y2="50" stroke="#fff" strokeWidth="1" className="animate-pulse" />
            <line x1="85" y1="30" x2="95" y2="30" stroke="#fff" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
          </svg>
        );

      case 'time':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow opacity-50" />
            <circle cx="50" cy="50" r="2" fill="#fff" />
            <path d="M50 50 L50 10 A40 40 0 0 1 90 50 Z" fill="url(#radarGradient)" className="animate-spin origin-center opacity-30" />
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        );
        
      case 'data':
        return (
           <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
             <rect x="25" y="15" width="50" height="70" rx="2" fill="#0a0a0a" stroke="#333" strokeWidth="2" />
             {[25, 35, 45, 55, 65].map((y, i) => (
               <g key={i}>
                 <line x1="30" y1={y} x2="70" y2={y} stroke="#1f1f1f" strokeWidth="1" />
                 <circle cx="35" cy={y - 5} r="1.5" fill="#00f0ff" className="animate-pulse" style={{ animationDelay: `${i * 0.2}s`}} />
                 <circle cx="40" cy={y - 5} r="1.5" fill={i % 2 === 0 ? '#00ff9d' : '#333'} className="animate-pulse" style={{ animationDelay: `${i * 0.3}s`}} />
               </g>
             ))}
             <path d="M10 50 L25 50" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
             <path d="M75 50 L90 50" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 2" className="animate-pulse" />
           </svg>
        );

      case 'angle':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
            {/* Protractor / Radar */}
            <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#333" strokeWidth="1" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#333" strokeWidth="1" />
            
            {/* Scanning Arc */}
            <path d="M50 50 L90 50 A40 40 0 0 0 50 10 Z" fill="#00f0ff" opacity="0.2" className="animate-pulse" />
            
            {/* Rotating Arm */}
            <line x1="50" y1="50" x2="90" y2="50" stroke="#00f0ff" strokeWidth="2" className="animate-spin origin-center" style={{ animationDuration: '4s' }} />
            <circle cx="90" cy="50" r="2" fill="#00f0ff" className="animate-spin origin-[50px_50px]" style={{ animationDuration: '4s' }} />
          </svg>
        );

      case 'frequency':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
            {/* Oscilloscope Grid */}
            <path d="M10 50 L90 50" stroke="#333" strokeWidth="1" />
            <path d="M50 10 L50 90" stroke="#333" strokeWidth="1" />
            <rect x="10" y="20" width="80" height="60" fill="none" stroke="#1f1f1f" strokeWidth="1" />
            
            {/* Sine Wave */}
            <path 
              d="M10 50 Q 20 20, 30 50 T 50 50 T 70 50 T 90 50" 
              fill="none" 
              stroke="#00ff9d" 
              strokeWidth="2"
              className="animate-pulse-fast"
            />
            {/* Moving scanline */}
            <rect x="10" y="20" width="5" height="60" fill="#00ff9d" opacity="0.1" className="animate-wave" />
          </svg>
        );

      case 'force':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon-purple">
            {/* Top Plate */}
            <rect x="30" y="10" width="40" height="10" fill="#333" stroke="#7000ff" strokeWidth="1" />
            
            {/* Spring */}
            <path 
              d="M40 20 L60 25 L40 30 L60 35 L40 40 L60 45 L40 50 L60 55 L40 60" 
              fill="none" 
              stroke="#7000ff" 
              strokeWidth="2" 
              className="animate-compress"
            />
            
            {/* Bottom Weight */}
            <rect x="30" y="60" width="40" height="30" fill="#0a0a0a" stroke="#7000ff" strokeWidth="2" className="animate-compress" />
            <text x="50" y="80" textAnchor="middle" fill="#7000ff" fontSize="10" fontFamily="monospace">N</text>
            
            {/* Down Arrow */}
            <path d="M50 5 L50 15 M45 10 L50 15 L55 10" stroke="#fff" strokeWidth="2" className="animate-float" />
          </svg>
        );

      case 'transfer':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
            {/* Screen Borders */}
            <rect x="10" y="10" width="80" height="80" fill="#050505" stroke="#333" strokeWidth="2" />
            
            {/* Matrix Rain Columns */}
            <g clipPath="url(#screenClip)">
               <text x="20" y="0" fill="#00f0ff" fontSize="10" fontFamily="monospace" className="animate-matrix" style={{animationDuration: '1.5s'}}>10101</text>
               <text x="35" y="-20" fill="#00ff9d" fontSize="10" fontFamily="monospace" className="animate-matrix" style={{animationDuration: '2.2s'}}>01100</text>
               <text x="50" y="-10" fill="#00f0ff" fontSize="10" fontFamily="monospace" className="animate-matrix" style={{animationDuration: '1.8s'}}>11010</text>
               <text x="65" y="-30" fill="#00ff9d" fontSize="10" fontFamily="monospace" className="animate-matrix" style={{animationDuration: '1.2s'}}>00111</text>
            </g>
            
            <defs>
              <clipPath id="screenClip">
                <rect x="10" y="10" width="80" height="80" />
              </clipPath>
            </defs>
          </svg>
        );

      case 'fuel':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
             {/* Gauge Background */}
             <path d="M20 70 A 40 40 0 1 1 80 70" fill="none" stroke="#333" strokeWidth="4" />
             <text x="30" y="50" fill="#ef4444" fontSize="8" fontFamily="monospace">E</text>
             <text x="70" y="50" fill="#00ff9d" fontSize="8" fontFamily="monospace">F</text>
             
             {/* Fuel Icon */}
             <path d="M45 80 L55 80 L55 70 L45 70 Z" fill="#333" />
             
             {/* Needle */}
             <line x1="50" y1="70" x2="20" y2="40" stroke="#fcee0a" strokeWidth="2" strokeLinecap="round" className="animate-needle-fast origin-[50px_70px]" />
             
             {/* Center */}
             <circle cx="50" cy="70" r="3" fill="#fff" />
          </svg>
        );

      default: // Generic Laser Scan
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-neon">
            <rect x="30" y="30" width="40" height="40" fill="none" stroke="#333" strokeWidth="2" />
            <path d="M30 30 L40 30 L30 40 Z" fill="#00f0ff" opacity="0.5" />
            <path d="M70 70 L60 70 L70 60 Z" fill="#00f0ff" opacity="0.5" />
            <path d="M10 10 L90 10" stroke="#1f1f1f" strokeWidth="1" />
            <path d="M10 90 L90 90" stroke="#1f1f1f" strokeWidth="1" />
            <line x1="10" y1="10" x2="10" y2="90" stroke="#00f0ff" strokeWidth="2" className="animate-laser-x opacity-80">
               <animate attributeName="x1" from="10" to="90" dur="2s" repeatCount="indefinite" />
               <animate attributeName="x2" from="10" to="90" dur="2s" repeatCount="indefinite" />
            </line>
          </svg>
        );
    }
  };

  return (
    <div className="w-24 h-24 md:w-32 md:h-32 bg-black/40 rounded-full border border-cyber-border flex items-center justify-center p-4 relative overflow-hidden group">
      <div className="absolute inset-0 bg-cyber-primary/5 rounded-full blur-md"></div>
      {getVisual()}
    </div>
  );
};

export default CategoryVisual;
