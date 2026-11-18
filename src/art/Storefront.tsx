// Original illustrations inspired by the storefront at 8104 W Waters Ave:
// stucco walls, a maroon sign panel with green and orange lettering, and
// green striped awnings. Drawn for this demo; not the restaurant's logo or photos.

export function AwningTrim({ className = "", id = "awn" }: { className?: string; id?: string }) {
  return (
    <svg className={`block w-full h-[18px] ${className}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={id} width="28" height="18" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="14" height="11" fill="#13897A" />
          <rect x="14" y="0" width="14" height="11" fill="#1A9B8A" />
          <path d="M0 11h14a7 7 0 0 1-14 0z" fill="#13897A" />
          <path d="M14 11h14a7 7 0 0 1-14 0z" fill="#1A9B8A" />
        </pattern>
      </defs>
      <rect width="100%" height="18" fill={`url(#${id})`} />
      <rect width="100%" height="2" fill="#0D6B5F" />
    </svg>
  );
}

function Palm({ x, s = 1, flip = false }: { x: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} 0) scale(${flip ? -s : s} ${s})`}>
      <path d="M0 360 C4 300 2 240 10 170" stroke="#7A5A3C" strokeWidth="9" fill="none" strokeLinecap="round" />
      <g fill="#3E8E4E">
        <path d="M10 170 C-20 150 -50 160 -70 185 C-40 168 -15 170 10 172z" />
        <path d="M10 170 C40 145 75 152 92 178 C62 164 35 166 10 172z" />
        <path d="M10 170 C0 135 -25 120 -48 122 C-20 132 -5 150 8 172z" />
        <path d="M10 170 C25 132 52 120 72 124 C46 134 30 150 12 172z" />
        <path d="M10 170 C8 140 14 118 26 104 C20 128 18 150 12 172z" fill="#2F7A40" />
      </g>
    </g>
  );
}

function SideAwning({ x, w }: { x: number; w: number }) {
  const n = Math.round(w / 18);
  const sw = w / n;
  return (
    <g>
      <path d={`M${x} 196 L${x + w} 196 L${x + w + 10} 238 L${x - 10} 238 Z`} fill="#13897A" />
      {Array.from({ length: n }).map((_, i) =>
        i % 2 ? null : (
          <path key={i} d={`M${x + i * sw} 196 L${x + (i + 1) * sw} 196 L${x - 10 + (i + 1) * ((w + 20) / n)} 238 L${x - 10 + i * ((w + 20) / n)} 238 Z`} fill="#1A9B8A" />
        ),
      )}
      {Array.from({ length: n }).map((_, i) => (
        <path key={`s${i}`} d={`M${x - 10 + i * ((w + 20) / n)} 238 a${(w + 20) / n / 2} 7 0 0 0 ${(w + 20) / n} 0z`} fill="#0D6B5F" />
      ))}
      {/* leaf-and-bowl motif, simplified */}
      <g transform={`translate(${x + w / 2} 217)`} fill="none" stroke="#FBF6EA" strokeWidth="2.4" strokeLinecap="round">
                <path d="M-2 6c-10-6-8-18 6-22c3 10 0 18-6 22z" fill="#8DC63F" stroke="none" /><path d="M-2 6c2-6 4-11 8-16" stroke="#0D6B5F" strokeWidth="1.4" />
      </g>
    </g>
  );
}

export function Storefront({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 400" className={className} role="img" aria-label="Illustration of the Thịnh An Kitchen & Tofu storefront">
      <defs>
        <linearGradient id="sf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE3EE" />
          <stop offset="1" stopColor="#F4EEDF" />
        </linearGradient>
        <linearGradient id="sf-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B4A52" />
          <stop offset=".55" stopColor="#56676F" />
          <stop offset="1" stopColor="#2E3A40" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#sf-sky)" />
      <g fill="#FFFFFF" opacity=".8">
        <ellipse cx="110" cy="62" rx="46" ry="14" />
        <ellipse cx="148" cy="54" rx="30" ry="12" />
        <ellipse cx="470" cy="44" rx="40" ry="12" />
      </g>
      <Palm x={34} s={0.95} />
      <Palm x={566} s={0.9} flip />

      {/* building */}
      <rect x="44" y="150" width="512" height="210" fill="#E6D3AE" />
      <rect x="40" y="140" width="520" height="14" fill="#D8C29A" />
      <rect x="44" y="154" width="512" height="6" fill="#CDB68C" opacity=".6" />
      {/* center tower */}
      <rect x="214" y="78" width="172" height="282" fill="#EAD9B6" />
      <rect x="208" y="70" width="184" height="14" fill="#D8C29A" />
      {/* channel-letter sign on the stucco, like the real one */}
      <g transform="translate(236 104)">
        <path d="M-9 0h18a9 8 0 0 1-18 0z" fill="#FFFFFF" stroke="#CF2229" strokeWidth="2" />
        <path d="M-1 -2c-4-6-1-11 5-12c1 5-1 10-5 12z" fill="#23843D" />
        <path d="M6 -14l-9 12M10 -12l-10 11" stroke="#26231F" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <text x="312" y="114" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="800" fontSize="25" fill="#23843D" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">Thịnh An</text>
      <text x="300" y="142" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="800" fontSize="20" fill="#CF2229" stroke="#FFFFFF" strokeWidth="2.5" paintOrder="stroke">Kitchen &amp; Tofu</text>
      <text x="300" y="164" textAnchor="middle" fontFamily="'Be Vietnam Pro', sans-serif" fontWeight="700" fontSize="11.5" letterSpacing="0.8" fill="#FFFFFF" stroke="#5A4E44" strokeWidth="2.2" strokeLinejoin="round" paintOrder="stroke">VIETNAMESE CUISINE</text>

      {/* pilasters */}
      {[44, 206, 386, 548].map((x) => <rect key={x} x={x} y="160" width="8" height="200" fill="#D8C29A" />)}
      {[236, 352].map((x) => <rect key={`st${x}`} x={x} y="300" width="12" height="58" fill="#A88A64" />)}

      {/* windows */}
      <rect x="64" y="238" width="132" height="110" fill="url(#sf-glass)" />
      <rect x="404" y="238" width="132" height="110" fill="url(#sf-glass)" />
      {[130, 470].map((x) => <rect key={x} x={x - 2} y="238" width="4" height="110" fill="#CDB68C" />)}
      <path d="M72 246l40 0-40 50z M412 246l40 0-40 50z" fill="#FFFFFF" opacity=".12" />
      <SideAwning x={66} w={128} />
      <SideAwning x={406} w={128} />

      {/* entrance */}
      <rect x="244" y="210" width="112" height="150" fill="#CDB68C" />
      <rect x="252" y="218" width="96" height="142" fill="url(#sf-glass)" />
      <rect x="298" y="218" width="4" height="142" fill="#CDB68C" />
      <rect x="287" y="282" width="3" height="22" rx="1.5" fill="#D9D9D9" />
      <rect x="310" y="282" width="3" height="22" rx="1.5" fill="#D9D9D9" />
      <rect x="258" y="226" width="34" height="18" rx="3" fill="#FBF6EA" opacity=".9" />
      <text x="275" y="238.5" textAnchor="middle" fontFamily="'Be Vietnam Pro', sans-serif" fontWeight="800" fontSize="8" fill="#CF2229">OPEN</text>

      {/* planters + ground */}
      <rect x="0" y="358" width="600" height="42" fill="#C9C2B4" />
      <rect x="0" y="358" width="600" height="6" fill="#E9E3D6" />
      {[214, 360].map((x) => (
        <g key={x}>
          <rect x={x} y="334" width="26" height="24" rx="3" fill="#8A5A34" />
          <circle cx={x + 13} cy="328" r="14" fill="#3E8E4E" />
          <circle cx={x + 6} cy="332" r="8" fill="#4FA35E" />
        </g>
      ))}
      <g stroke="#FFFFFF" strokeWidth="3" opacity=".7">
        {[60, 160, 440, 540].map((x) => <line key={x} x1={x} y1="372" x2={x - 18} y2="400" />)}
      </g>
    </svg>
  );
}
