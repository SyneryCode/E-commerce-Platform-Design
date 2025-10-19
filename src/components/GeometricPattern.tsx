export function GeometricPattern() {
  return (
    <div className="absolute inset-x-0 h-px bg-gradient-to-l from-transparent via-[#007A3D]/10 to-transparent">
      <svg
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="120"
        height="20"
        viewBox="0 0 120 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Islamic geometric pattern */}
        <path
          d="M 10 10 L 15 5 L 20 10 L 15 15 Z M 20 10 L 25 5 L 30 10 L 25 15 Z M 30 10 L 35 5 L 40 10 L 35 15 Z"
          stroke="#007A3D"
          strokeWidth="0.5"
          fill="none"
          opacity="0.15"
        />
        <path
          d="M 50 10 L 55 5 L 60 10 L 55 15 Z M 60 10 L 65 5 L 70 10 L 65 15 Z"
          stroke="#D4AF37"
          strokeWidth="0.5"
          fill="none"
          opacity="0.15"
        />
        <path
          d="M 80 10 L 85 5 L 90 10 L 85 15 Z M 90 10 L 95 5 L 100 10 L 95 15 Z M 100 10 L 105 5 L 110 10 L 105 15 Z"
          stroke="#007A3D"
          strokeWidth="0.5"
          fill="none"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}
