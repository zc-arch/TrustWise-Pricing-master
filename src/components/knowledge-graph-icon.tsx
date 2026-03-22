"use client"

interface KnowledgeGraphIconProps {
  className?: string
  size?: number
}

export function KnowledgeGraphIcon({ className = "", size = 24 }: KnowledgeGraphIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="kgGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="kgGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="kgGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#kgGlow)">
        <line x1="12" y1="4" x2="4" y2="8" stroke="url(#kgGradient1)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="4" x2="20" y2="8" stroke="url(#kgGradient2)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4" y1="8" x2="4" y2="16" stroke="url(#kgGradient1)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="8" x2="20" y2="16" stroke="url(#kgGradient2)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4" y1="16" x2="12" y2="20" stroke="url(#kgGradient1)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="16" x2="12" y2="20" stroke="url(#kgGradient2)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="4" x2="12" y2="12" stroke="url(#kgGradient1)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5" />
        <line x1="4" y1="8" x2="20" y2="16" stroke="url(#kgGradient2)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5" />
        <line x1="20" y1="8" x2="4" y2="16" stroke="url(#kgGradient1)" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5" />
      </g>

      <circle cx="12" cy="4" r="2.5" fill="url(#kgGradient1)" />
      <circle cx="12" cy="4" r="1.2" fill="white" opacity="0.9" />

      <circle cx="4" cy="8" r="2" fill="url(#kgGradient2)" />
      <circle cx="4" cy="8" r="0.9" fill="white" opacity="0.9" />

      <circle cx="20" cy="8" r="2" fill="url(#kgGradient1)" />
      <circle cx="20" cy="8" r="0.9" fill="white" opacity="0.9" />

      <circle cx="4" cy="16" r="2" fill="url(#kgGradient2)" />
      <circle cx="4" cy="16" r="0.9" fill="white" opacity="0.9" />

      <circle cx="20" cy="16" r="2" fill="url(#kgGradient1)" />
      <circle cx="20" cy="16" r="0.9" fill="white" opacity="0.9" />

      <circle cx="12" cy="20" r="2.5" fill="url(#kgGradient2)" />
      <circle cx="12" cy="20" r="1.2" fill="white" opacity="0.9" />

      <circle cx="12" cy="12" r="1.5" fill="url(#kgGradient1)" opacity="0.6" />
      <circle cx="12" cy="12" r="0.7" fill="white" opacity="0.8" />
    </svg>
  )
}
