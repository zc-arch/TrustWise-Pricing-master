"use client"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeMap = {
    sm: { logo: 32, text: "text-sm" },
    md: { logo: 44, text: "text-base" },
    lg: { logo: 56, text: "text-lg" },
  }

  const { logo: logoSize, text: textSize } = sizeMap[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={logoSize}
        height={logoSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="logoGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowSoft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="hexClip">
            <polygon points="60,10 100,30 100,70 60,90 20,70 20,30" />
          </clipPath>
        </defs>

        <circle cx="60" cy="60" r="55" fill="none" stroke="url(#logoGradient1)" strokeWidth="0.5" opacity="0.15" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="url(#logoGradient2)" strokeWidth="0.5" opacity="0.2" />
        <circle cx="60" cy="60" r="45" fill="none" stroke="url(#logoGradient1)" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3">
          <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="30s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="60" r="40" fill="none" stroke="url(#logoGradient2)" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 4">
          <animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="25s" repeatCount="indefinite" />
        </circle>

        <polygon points="60,15 97,35 97,75 60,95 23,75 23,35" fill="none" stroke="url(#logoGradient1)" strokeWidth="1" opacity="0.3" />
        <polygon points="60,22 90,38 90,72 60,88 30,72 30,38" fill="none" stroke="url(#logoGradient2)" strokeWidth="0.8" opacity="0.25" />

        <g filter="url(#glowSoft)">
          <line x1="60" y1="15" x2="60" y2="95" stroke="url(#logoGradient1)" strokeWidth="0.3" opacity="0.3" strokeDasharray="1 3" />
          <line x1="23" y1="35" x2="97" y2="75" stroke="url(#logoGradient2)" strokeWidth="0.3" opacity="0.3" strokeDasharray="1 3" />
          <line x1="23" y1="75" x2="97" y2="35" stroke="url(#logoGradient1)" strokeWidth="0.3" opacity="0.3" strokeDasharray="1 3" />
        </g>

        <g filter="url(#glow)">
          <line x1="60" y1="60" x2="60" y2="22" stroke="url(#logoGradient1)" strokeWidth="1.2" opacity="0.9" />
          <line x1="60" y1="60" x2="93" y2="41" stroke="url(#logoGradient2)" strokeWidth="1.2" opacity="0.9" />
          <line x1="60" y1="60" x2="93" y2="79" stroke="url(#logoGradient1)" strokeWidth="1.2" opacity="0.9" />
          <line x1="60" y1="60" x2="60" y2="98" stroke="url(#logoGradient2)" strokeWidth="1.2" opacity="0.9" />
          <line x1="60" y1="60" x2="27" y2="79" stroke="url(#logoGradient1)" strokeWidth="1.2" opacity="0.9" />
          <line x1="60" y1="60" x2="27" y2="41" stroke="url(#logoGradient2)" strokeWidth="1.2" opacity="0.9" />
        </g>

        <g filter="url(#glowSoft)" opacity="0.5">
          <line x1="60" y1="22" x2="93" y2="41" stroke="url(#logoGradient1)" strokeWidth="0.8" />
          <line x1="93" y1="41" x2="93" y2="79" stroke="url(#logoGradient2)" strokeWidth="0.8" />
          <line x1="93" y1="79" x2="60" y2="98" stroke="url(#logoGradient1)" strokeWidth="0.8" />
          <line x1="60" y1="98" x2="27" y2="79" stroke="url(#logoGradient2)" strokeWidth="0.8" />
          <line x1="27" y1="79" x2="27" y2="41" stroke="url(#logoGradient1)" strokeWidth="0.8" />
          <line x1="27" y1="41" x2="60" y2="22" stroke="url(#logoGradient2)" strokeWidth="0.8" />
        </g>

        <g filter="url(#glowSoft)" opacity="0.4">
          <line x1="60" y1="22" x2="93" y2="79" stroke="url(#logoGradient3)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="93" y1="41" x2="27" y2="79" stroke="url(#logoGradient3)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="27" y1="41" x2="93" y2="79" stroke="url(#logoGradient3)" strokeWidth="0.5" strokeDasharray="2 2" />
        </g>

        <g filter="url(#glowStrong)">
          <circle cx="60" cy="60" r="12" fill="url(#centerGlow)" />
          <circle cx="60" cy="60" r="10" fill="url(#logoGradient1)" />
          <circle cx="60" cy="60" r="6" fill="white" opacity="0.95" />
          <circle cx="60" cy="60" r="3" fill="url(#logoGradient3)" opacity="0.8" />
        </g>

        <g filter="url(#glow)">
          <circle cx="60" cy="22" r="5" fill="url(#logoGradient1)" />
          <circle cx="60" cy="22" r="2.5" fill="white" opacity="0.9" />
        </g>
        <g filter="url(#glow)">
          <circle cx="93" cy="41" r="5" fill="url(#logoGradient2)" />
          <circle cx="93" cy="41" r="2.5" fill="white" opacity="0.9" />
        </g>
        <g filter="url(#glow)">
          <circle cx="93" cy="79" r="5" fill="url(#logoGradient1)" />
          <circle cx="93" cy="79" r="2.5" fill="white" opacity="0.9" />
        </g>
        <g filter="url(#glow)">
          <circle cx="60" cy="98" r="5" fill="url(#logoGradient2)" />
          <circle cx="60" cy="98" r="2.5" fill="white" opacity="0.9" />
        </g>
        <g filter="url(#glow)">
          <circle cx="27" cy="79" r="5" fill="url(#logoGradient1)" />
          <circle cx="27" cy="79" r="2.5" fill="white" opacity="0.9" />
        </g>
        <g filter="url(#glow)">
          <circle cx="27" cy="41" r="5" fill="url(#logoGradient2)" />
          <circle cx="27" cy="41" r="2.5" fill="white" opacity="0.9" />
        </g>

        <g opacity="0.5">
          <circle cx="60" cy="5" r="2" fill="url(#logoGradient1)">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="105" cy="30" r="2" fill="url(#logoGradient2)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="105" cy="90" r="2" fill="url(#logoGradient1)">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="115" r="2" fill="url(#logoGradient2)">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="15" cy="90" r="2" fill="url(#logoGradient1)">
            <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="15" cy="30" r="2" fill="url(#logoGradient2)">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.3s" repeatCount="indefinite" />
          </circle>
        </g>

        <g opacity="0.3" filter="url(#glowSoft)">
          <line x1="60" y1="60" x2="60" y2="5" stroke="url(#logoGradient1)" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="60" y1="60" x2="105" y2="30" stroke="url(#logoGradient2)" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="60" y1="60" x2="105" y2="90" stroke="url(#logoGradient1)" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="60" y1="60" x2="60" y2="115" stroke="url(#logoGradient2)" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="60" y1="60" x2="15" y2="90" stroke="url(#logoGradient1)" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="60" y1="60" x2="15" y2="30" stroke="url(#logoGradient2)" strokeWidth="0.5" strokeDasharray="2 3" />
        </g>

        <g opacity="0.6" filter="url(#glow)">
          <path d="M 30 65 Q 40 55, 50 60 T 70 55 T 90 62" fill="none" stroke="url(#logoGradient1)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 30 70 Q 45 62, 55 68 T 75 62 T 90 68" fill="none" stroke="url(#logoGradient2)" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        </g>

        <g opacity="0.4">
          <circle cx="60" cy="60" r="18" fill="none" stroke="url(#logoGradient1)" strokeWidth="0.5" strokeDasharray="1 2">
            <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="15s" repeatCount="indefinite" />
          </circle>
        </g>

        <g filter="url(#glowSoft)" opacity="0.6">
          <circle cx="60" cy="60" r="25" fill="none" stroke="url(#logoGradient2)" strokeWidth="0.3" strokeDasharray="0.5 3">
            <animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="20s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      {showText && (
        <div className="grid flex-1 text-left leading-tight">
          <span className={`truncate font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent ${textSize}`}>
            TrustWise
          </span>
          <span className="truncate text-[10px] text-muted-foreground">
            智能定价决策系统
          </span>
        </div>
      )}
    </div>
  )
}
