import { Platform } from "../backend.d";

interface PlatformIconsProps {
  platforms: Platform[];
  size?: "sm" | "md" | "lg";
}

export function PlatformIcons({ platforms, size = "md" }: PlatformIconsProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const sizeClass = sizeClasses[size];

  return (
    <div className="flex gap-2 items-center">
      {platforms.includes(Platform.pc) && (
        <svg
          className={sizeClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )}
      {platforms.includes(Platform.xbox) && (
        <svg
          className={sizeClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2c-1.7 1.7-4.3 2.5-6 2.5v7.5c0 3.3 1.7 6 6 10 4.3-4 6-6.7 6-10V4.5c-1.7 0-4.3-.8-6-2.5z" />
        </svg>
      )}
      {platforms.includes(Platform.playstation) && (
        <svg
          className={sizeClass}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.193 4.546-.261 4.546-2.87 0-2.734-1.665-5.413-5.29-5.413-1.725 0-3.725.483-4.725.801z" />
          <path d="M14.768 17.579c-.525.146-1.042.23-1.542.23-1.027 0-1.717-.409-1.717-1.292 0-1.012.717-1.542 2.016-2.016l1.243-.405v3.483z" />
          <path d="M20.404 17.094l-4.546-1.456v1.724l2.87.917c.413.131.76.327.76.741 0 .524-.436.741-.957.741-.392 0-.827-.098-1.305-.295l-1.368-.524v1.768c.479.131 1.01.196 1.543.196 1.966 0 3.813-.785 3.813-2.54 0-1.012-.479-1.598-1.8-2.099z" />
        </svg>
      )}
    </div>
  );
}

interface HeaderPlatformLogosProps {
  className?: string;
}

export function HeaderPlatformLogos({ className = "" }: HeaderPlatformLogosProps) {
  return (
    <div className={`flex gap-6 items-center ${className}`}>
      {/* Xbox Logo */}
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2c-1.7 1.7-4.3 2.5-6 2.5v7.5c0 3.3 1.7 6 6 10 4.3-4 6-6.7 6-10V4.5c-1.7 0-4.3-.8-6-2.5z" />
      </svg>

      {/* Steam Logo */}
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2m0-2a12 12 0 0 0-12 12 12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0z" />
        <path d="M6.5 16.5a3.5 3.5 0 0 0 3.5-3.5 3.5 3.5 0 0 0-3.5-3.5A3.5 3.5 0 0 0 3 13a3.5 3.5 0 0 0 3.5 3.5m0-5.5a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2m11-3a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3m0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>

      {/* PlayStation Logo */}
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.193 4.546-.261 4.546-2.87 0-2.734-1.665-5.413-5.29-5.413-1.725 0-3.725.483-4.725.801z" />
        <path d="M14.768 17.579c-.525.146-1.042.23-1.542.23-1.027 0-1.717-.409-1.717-1.292 0-1.012.717-1.542 2.016-2.016l1.243-.405v3.483z" />
        <path d="M20.404 17.094l-4.546-1.456v1.724l2.87.917c.413.131.76.327.76.741 0 .524-.436.741-.957.741-.392 0-.827-.098-1.305-.295l-1.368-.524v1.768c.479.131 1.01.196 1.543.196 1.966 0 3.813-.785 3.813-2.54 0-1.012-.479-1.598-1.8-2.099z" />
      </svg>
    </div>
  );
}
