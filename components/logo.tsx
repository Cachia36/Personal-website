"use client"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Outer ring with gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circle */}
          <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" className="opacity-10" />

          {/* Main logo shape - Abstract K */}
          <path
            d="M12 10 L12 30 M12 20 L28 10 M12 20 L28 30"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className="animate-pulse"
          />

          {/* Code brackets */}
          <path
            d="M8 15 L6 20 L8 25"
            stroke="url(#logoGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
          <path
            d="M32 15 L34 20 L32 25"
            stroke="url(#logoGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />

          {/* Small dots for tech feel */}
          <circle cx="15" cy="12" r="1" fill="#DC2626" opacity="0.6" />
          <circle cx="25" cy="28" r="1" fill="#EF4444" opacity="0.6" />
          <circle cx="30" cy="18" r="1" fill="#F87171" opacity="0.6" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="font-bold text-lg leading-none text-white">Kyle</span>
        <span className="text-xs text-red-400 leading-none">Developer</span>
      </div>
    </div>
  )
}
