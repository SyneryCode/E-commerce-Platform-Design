export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12">
        {/* Syria map outline with jasmine at Damascus */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Syria map outline - simplified */}
          <path
            d="M 20 40 L 30 25 L 50 20 L 70 22 L 85 30 L 88 45 L 85 60 L 75 70 L 60 75 L 40 78 L 25 70 L 18 55 Z"
            stroke="#007A3D"
            strokeWidth="2.5"
            fill="none"
            strokeLinejoin="round"
          />
          
          {/* Jasmine flower at Damascus position */}
          <g transform="translate(45, 50)">
            {/* Petals */}
            <circle cx="0" cy="-6" r="4" fill="#ffffff" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="5.2" cy="-3" r="4" fill="#ffffff" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="5.2" cy="3" r="4" fill="#ffffff" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="0" cy="6" r="4" fill="#ffffff" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="-5.2" cy="3" r="4" fill="#ffffff" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="-5.2" cy="-3" r="4" fill="#ffffff" stroke="#D4AF37" strokeWidth="1" />
            {/* Center */}
            <circle cx="0" cy="0" r="3" fill="#D4AF37" />
          </g>
        </svg>
      </div>
      <span className="text-[28px] font-[900] text-[#007A3D] tracking-tight" style={{ fontFamily: "'Tajawal', sans-serif" }}>
        سوقنا
      </span>
    </div>
  );
}
