import type { ArtKind } from "../data/menu";

/**
 * Original vector illustrations drawn for this demo. They are placeholders,
 * not photographs of the restaurant's food. Replace with the owner's photos in production.
 */

type Props = { kind: ArtKind; className?: string; title?: string };

const BG: Record<string, string> = {
  pho: "#F3D9B1", soup: "#F2C9A8", bun: "#DCEBD2", rice: "#F6E3B4", banhmi: "#F1D3A1",
  roll: "#E2EEDC", drink: "#EADCF0", mango: "#FCE3B0", che: "#F7D8DE", red: "#F5CDBE",
};

function Herbs({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <path d="M0 0c6-10 18-12 24-6-6 8-16 10-24 6z" fill="#3E8E4E" />
      <path d="M2 4c-4-10 0-20 8-22 2 8-2 18-8 22z" fill="#57A862" />
      <path d="M-4 -2c-10-4-14-14-10-20 8 2 12 12 10 20z" fill="#2F7A40" />
    </g>
  );
}
function Lime({ cx, cy, r = 12 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#8CC152" />
      <circle cx={cx} cy={cy} r={r - 3} fill="#D8EFA8" />
      {[0, 60, 120].map((a) => (
        <line key={a} x1={cx} y1={cy} x2={cx + (r - 3) * Math.cos((a * Math.PI) / 180)} y2={cy + (r - 3) * Math.sin((a * Math.PI) / 180)} stroke="#8CC152" strokeWidth="1.2" />
      ))}
      {[180, 240, 300].map((a) => (
        <line key={a} x1={cx} y1={cy} x2={cx + (r - 3) * Math.cos((a * Math.PI) / 180)} y2={cy + (r - 3) * Math.sin((a * Math.PI) / 180)} stroke="#8CC152" strokeWidth="1.2" />
      ))}
    </g>
  );
}
function Chili({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse rx="6" ry="4" fill="#D63A2F" />
      <circle r="1.4" cx="-1.5" fill="#F6C24A" />
      <circle r="1.2" cx="2" cy="1" fill="#F6C24A" />
    </g>
  );
}
function Noodles({ color = "#FFF6E3", y0 = 120, rows = 5 }: { color?: string; y0?: number; rows?: number }) {
  return (
    <g stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" opacity=".95">
      {Array.from({ length: rows }).map((_, i) => (
        <path key={i} d={`M${70 + i * 3} ${y0 + i * 9}c15-8 25 8 40 0s25-8 40 0 25 8 40 0`} />
      ))}
    </g>
  );
}

function Bowl({ broth, children }: { broth: string; children?: React.ReactNode }) {
  return (
    <g>
      <ellipse cx="160" cy="178" rx="112" ry="20" fill="#000" opacity=".08" />
      <circle cx="160" cy="125" r="104" fill="#FFFFFF" />
      <circle cx="160" cy="125" r="104" fill="none" stroke="#23843D" strokeWidth="5" />
      <circle cx="160" cy="125" r="92" fill="none" stroke="#23843D" strokeWidth="1.5" strokeDasharray="2 6" />
      <circle cx="160" cy="125" r="84" fill={broth} />
      <ellipse cx="128" cy="92" rx="26" ry="8" fill="#fff" opacity=".22" transform="rotate(-25 128 92)" />
      {children}
    </g>
  );
}

function BeefSlices({ color = "#B9675A", n = 4, cx = 175, cy = 112 }: { color?: string; n?: number; cx?: number; cy?: number }) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <path key={i} transform={`translate(${cx + (i % 2) * 14 - 10} ${cy + i * 11 - 18}) rotate(${-20 + i * 12})`} d="M-22 0c8-10 36-10 44 0-8 8-36 8-44 0z" fill={color} stroke="#8D4A3F" strokeWidth="1" />
      ))}
    </g>
  );
}

function Plate({ children }: { children?: React.ReactNode }) {
  return (
    <g>
      <ellipse cx="160" cy="182" rx="120" ry="18" fill="#000" opacity=".08" />
      <ellipse cx="160" cy="125" rx="128" ry="92" fill="#FFFFFF" />
      <ellipse cx="160" cy="125" rx="128" ry="92" fill="none" stroke="#CF2229" strokeWidth="4" />
      <ellipse cx="160" cy="125" rx="114" ry="80" fill="none" stroke="#CF2229" strokeWidth="1.2" strokeDasharray="3 6" />
      {children}
    </g>
  );
}

function RiceMound({ cx = 120, cy = 125, broken = false }: { cx?: number; cy?: number; broken?: boolean }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="52" ry="40" fill="#FBF7EE" stroke="#E9DFC8" strokeWidth="2" />
      {Array.from({ length: 26 }).map((_, i) => (
        <ellipse key={i} cx={cx - 38 + ((i * 37) % 76)} cy={cy - 26 + ((i * 23) % 52)} rx={broken ? 2.2 : 3.4} ry="1.6" fill="#EFE6D2" transform={`rotate(${(i * 47) % 180} ${cx - 38 + ((i * 37) % 76)} ${cy - 26 + ((i * 23) % 52)})`} />
      ))}
    </g>
  );
}

function GrilledPork({ x, y, rot = 0 }: { x: number; y: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x="-30" y="-12" width="60" height="24" rx="10" fill="#B4642E" />
      {[-18, -6, 6, 18].map((t) => (
        <line key={t} x1={t} y1="-10" x2={t - 6} y2="10" stroke="#6E3415" strokeWidth="3" strokeLinecap="round" />
      ))}
    </g>
  );
}

function Cup({ fill, topping = "#3B2418", boba = true }: { fill: string; topping?: string; boba?: boolean }) {
  return (
    <g>
      <ellipse cx="160" cy="214" rx="52" ry="8" fill="#000" opacity=".08" />
      <rect x="150" y="10" width="12" height="80" rx="4" fill="#23843D" transform="rotate(10 156 50)" />
      <path d="M104 64h112l-12 146a10 10 0 0 1-10 9h-68a10 10 0 0 1-10-9z" fill="#ffffff" opacity=".65" />
      <path d="M108 84h104l-10 124a8 8 0 0 1-8 7h-68a8 8 0 0 1-8-7z" fill={fill} />
      {boba && Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={124 + (i % 6) * 14 + (i > 5 ? 7 : 0)} cy={196 - (i > 5 ? 12 : 0)} r="6" fill={topping} />
      ))}
      <rect x="98" y="56" width="124" height="12" rx="6" fill="#ffffff" stroke="#E6D8C3" />
      <path d="M124 96c20 6 52 6 72 0" stroke="#fff" strokeWidth="3" opacity=".5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function scene(kind: ArtKind): { bg: string; body: React.ReactNode } {
  switch (kind) {
    case "pho":
    case "pho-special":
    case "pho-ga":
    case "pho-chay": {
      const broth = kind === "pho-chay" ? "#E8C98A" : kind === "pho-ga" ? "#E9C27A" : "#D9A35F";
      return {
        bg: BG.pho,
        body: (
          <Bowl broth={broth}>
            <Noodles />
            {kind === "pho" && <BeefSlices />}
            {kind === "pho-special" && (<><BeefSlices n={3} /><circle cx="120" cy="150" r="10" fill="#7A4A33" /><circle cx="138" cy="160" r="9" fill="#7A4A33" /><path d="M188 150c10-4 20 0 24 8-8 4-18 2-24-8z" fill="#E5D6BE" /></>)}
            {kind === "pho-ga" && (<g stroke="#F7E7C9" strokeWidth="6" strokeLinecap="round">{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={150 + i * 9} y1={95 + i * 4} x2={185 + i * 6} y2={110 + i * 6} />)}</g>)}
            {kind === "pho-chay" && (<g>{[0, 1, 2].map((i) => <rect key={i} x={160 + i * 18} y={98 + (i % 2) * 18} width="20" height="20" rx="3" fill="#F3E2B5" stroke="#D9C089" />)}<circle cx="130" cy="150" r="11" fill="#6BA74A" /><circle cx="118" cy="140" r="8" fill="#7DBA57" /><rect x="145" y="150" width="22" height="6" rx="3" fill="#F08A3C" transform="rotate(30 156 153)" /></g>)}
            <Herbs cx={112} cy={92} />
            <circle cx="205" cy="148" r="3" fill="#fff" opacity=".7" />
            <g stroke="#7BB661" strokeWidth="3" strokeLinecap="round"><line x1="130" y1="172" x2="136" y2="168" /><line x1="142" y1="178" x2="148" y2="174" /><line x1="190" y1="90" x2="196" y2="86" /></g>
            <Lime cx={222} cy={96} />
          </Bowl>
        ),
      };
    }
    case "bun-bo-hue":
    case "bun-rieu": {
      const broth = kind === "bun-bo-hue" ? "#C9502E" : "#D9623E";
      return {
        bg: BG.red,
        body: (
          <Bowl broth={broth}>
            <Noodles color="#FFF3E6" rows={4} y0={128} />
            {kind === "bun-bo-hue" ? (<><BeefSlices n={3} color="#9C5143" cx={185} /><circle cx="122" cy="110" r="12" fill="#5E2B24" /><rect x="128" y="146" width="26" height="14" rx="6" fill="#F0D7C2" /><Chili x={200} y={160} /><Chili x={214} y={150} rot={40} /></>) : (<>{[0, 1, 2, 3].map((i) => <ellipse key={i} cx={130 + i * 22} cy={100 + (i % 2) * 14} rx="12" ry="9" fill="#E88A3A" opacity=".9" />)}<rect x="170" y="140" width="22" height="18" rx="3" fill="#F3D39A" /><path d="M120 150c6-10 22-10 28 0-6 6-22 6-28 0z" fill="#F29A8A" /></>)}
            <Herbs cx={108} cy={150} s={0.8} />
            <Lime cx={220} cy={100} />
          </Bowl>
        ),
      };
    }
    case "bo-kho":
      return {
        bg: BG.soup,
        body: (
          <Bowl broth="#B6502B">
            {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={118 + (i % 3) * 30} y={96 + Math.floor(i / 3) * 34} width="24" height="22" rx="6" fill="#6B2E1E" transform={`rotate(${i * 14} ${130 + (i % 3) * 30} ${106 + Math.floor(i / 3) * 34})`} />)}
            {[0, 1, 2].map((i) => <ellipse key={i} cx={130 + i * 30} cy={150 - (i % 2) * 40} rx="10" ry="6" fill="#F08A3C" />)}
            <path d="M190 104l14-14 4 4-14 14z" fill="#A8622D" />
            <Herbs cx={210} cy={150} s={0.8} />
          </Bowl>
        ),
      };
    case "bun":
    case "bun-chay":
      return {
        bg: BG.bun,
        body: (
          <Bowl broth="#F7F1E3">
            <Noodles color="#FFFFFF" rows={5} y0={112} />
            <g stroke="#E8DFCB" strokeWidth="1" fill="none">{[0, 1, 2].map((i) => <path key={i} d={`M76 ${120 + i * 14}c40 6 120 6 168 0`} />)}</g>
            {kind === "bun" ? (<><GrilledPork x={176} y={100} rot={-15} /><GrilledPork x={186} y={130} rot={10} /></>) : (<>{[0, 1, 2].map((i) => <rect key={i} x={160 + i * 22} y={96 + (i % 2) * 16} width="20" height="20" rx="3" fill="#E7B66A" stroke="#C98F3E" />)}</>)}
            <rect x="96" y="144" width="54" height="18" rx="9" fill="#D9932F" transform="rotate(-20 123 153)" />
            <g stroke="#B5701F" strokeWidth="2"><line x1="106" y1="156" x2="112" y2="146" /><line x1="118" y1="152" x2="124" y2="142" /><line x1="130" y1="148" x2="136" y2="138" /></g>
            <Herbs cx={110} cy={98} />
            <g fill="#F2A65A">{[0, 1, 2, 3].map((i) => <rect key={i} x={196 + i * 4} y={150 + i * 3} width="18" height="3" rx="1.5" transform={`rotate(${20 + i * 8} 205 155)`} />)}</g>
            <g fill="#C7905B">{[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={150 + i * 9} cy={168 - (i % 2) * 4} r="2.6" />)}</g>
          </Bowl>
        ),
      };
    case "com-tam":
    case "com-suon":
    case "luc-lac":
      return {
        bg: BG.rice,
        body: (
          <Plate>
            <RiceMound broken={kind === "com-tam"} />
            {kind === "com-tam" && (<><GrilledPork x={200} y={104} rot={-10} /><rect x="176" y="132" width="48" height="26" rx="5" fill="#F2C14E" stroke="#D99F2B" /><g stroke="#F4E6CF" strokeWidth="2.4" strokeLinecap="round">{[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={226 + (i % 3) * 3} y1={128 + i * 4} x2={246 + (i % 2) * 4} y2={124 + i * 5} />)}</g></>)}
            {kind === "com-suon" && (<>{[0, 1, 2].map((i) => <g key={i} transform={`translate(${200 + i * 10} ${100 + i * 22}) rotate(${-20 + i * 10})`}><rect x="-34" y="-9" width="68" height="18" rx="8" fill="#8E3B22" /><circle cx="-26" cy="0" r="5" fill="#F5E7D3" /><circle cx="-10" cy="0" r="5" fill="#F5E7D3" /><circle cx="6" cy="0" r="5" fill="#F5E7D3" /></g>)}</>)}
            {kind === "luc-lac" && (<>{Array.from({ length: 9 }).map((_, i) => <rect key={i} x={178 + (i % 3) * 20} y={92 + Math.floor(i / 3) * 22} width="18" height="18" rx="4" fill="#6E2D1B" transform={`rotate(${i * 11} ${187 + (i % 3) * 20} ${101 + Math.floor(i / 3) * 22})`} />)}<g stroke="#F3E3F0" strokeWidth="4" fill="none" strokeLinecap="round"><path d="M180 160c10-8 30-8 40 0" /><path d="M196 86c8-6 22-6 30 2" /></g><circle cx="236" cy="150" r="9" fill="#E2463A" /></>)}
            <g transform="translate(110 186)"><ellipse rx="20" ry="7" fill="#7FB65A" /><ellipse cx="22" rx="14" ry="6" fill="#E4573E" /></g>
            <ellipse cx="88" cy="88" rx="12" ry="6" fill="#F2D6A0" />
          </Plate>
        ),
      };
    case "banh-xeo":
      return {
        bg: BG.rice,
        body: (
          <Plate>
            <path d="M44 132c0-50 50-82 116-82s116 32 116 82z" fill="#F0B43A" stroke="#D28F1F" strokeWidth="3" />
            {Array.from({ length: 18 }).map((_, i) => <circle key={i} cx={70 + ((i * 41) % 180)} cy={70 + ((i * 29) % 56)} r={2 + (i % 3)} fill="#C77E16" opacity=".7" />)}
            <path d="M60 132h200" stroke="#D28F1F" strokeWidth="3" />
            {[0, 1, 2].map((i) => <path key={i} transform={`translate(${110 + i * 46} 140)`} d="M0 0c4-12 22-14 26-2-6 8-20 8-26 2z" fill="#F59B7A" stroke="#D86B48" />)}
            <g stroke="#FFF7E6" strokeWidth="3">{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={90 + i * 30} y1="136" x2={100 + i * 30} y2="158" />)}</g>
            <Herbs cx={234} cy={176} s={0.9} />
          </Plate>
        ),
      };
    case "pad-thai":
      return {
        bg: BG.rice,
        body: (
          <Plate>
            <g stroke="#E6A85A" strokeWidth="6" fill="none" strokeLinecap="round">{Array.from({ length: 7 }).map((_, i) => <path key={i} d={`M${70 + i * 4} ${96 + i * 10}c30-14 60 14 90 0s50-14 80 0`} />)}</g>
            {[0, 1, 2].map((i) => <path key={i} transform={`translate(${120 + i * 40} ${100 + (i % 2) * 34})`} d="M0 0c4-12 22-14 26-2-6 8-20 8-26 2z" fill="#F59B7A" stroke="#D86B48" />)}
            {[0, 1].map((i) => <rect key={i} x={180 + i * 26} y={140 - i * 30} width="18" height="16" rx="3" fill="#F3D9A5" />)}
            <g fill="#C7905B">{Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={100 + i * 13} cy={170 - (i % 3) * 4} r="2.6" />)}</g>
            <Lime cx={244} cy={116} r={14} />
            <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round">{[0, 1, 2, 3].map((i) => <line key={i} x1={86 + i * 10} y1={122} x2={96 + i * 10} y2={108} />)}</g>
          </Plate>
        ),
      };
    case "banh-mi":
    case "banh-mi-chay":
      return {
        bg: BG.banhmi,
        body: (
          <g>
            <ellipse cx="160" cy="190" rx="130" ry="14" fill="#000" opacity=".08" />
            <path d="M30 150c0-40 60-70 130-70s130 30 130 70c0 22-60 32-130 32S30 172 30 150z" fill="#D9963F" />
            <path d="M40 140c10-30 60-50 120-50s110 20 120 50" fill="none" stroke="#EDB866" strokeWidth="6" strokeLinecap="round" />
            {[0, 1, 2, 3].map((i) => <path key={i} d={`M${80 + i * 46} 98l20 16`} stroke="#B9772A" strokeWidth="5" strokeLinecap="round" />)}
            <path d="M44 148c30 14 200 14 232 0" stroke="#F8EBD3" strokeWidth="10" fill="none" />
            {kind === "banh-mi" ? (<path d="M52 150c30 12 186 12 216 0" stroke="#B8564A" strokeWidth="8" fill="none" />) : (<g>{[0, 1, 2, 3, 4].map((i) => <rect key={i} x={66 + i * 40} y={144} width="30" height="12" rx="3" fill="#E7B66A" />)}</g>)}
            <path d="M48 140c20 10 40 4 60 10s40-6 60 2 40-6 60 0 34-4 48-8" stroke="#3E8E4E" strokeWidth="6" fill="none" strokeLinecap="round" />
            <g stroke="#F08A3C" strokeWidth="4" strokeLinecap="round">{[0, 1, 2, 3, 4, 5].map((i) => <line key={i} x1={70 + i * 34} y1={152} x2={86 + i * 34} y2={146} />)}</g>
            <g stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round">{[0, 1, 2, 3, 4].map((i) => <line key={i} x1={86 + i * 36} y1={155} x2={100 + i * 36} y2={150} />)}</g>
            <Chili x={250} y={142} rot={-20} />
          </g>
        ),
      };
    case "egg-roll":
      return {
        bg: BG.roll,
        body: (
          <Plate>
            {[0, 1].map((i) => (
              <g key={i} transform={`translate(${130 + i * 50} ${110 + i * 16}) rotate(-24)`}>
                <rect x="-56" y="-16" width="112" height="32" rx="16" fill="#D98B2A" />
                {Array.from({ length: 8 }).map((_, j) => <circle key={j} cx={-44 + j * 13} cy={(j % 2) * 6 - 3} r="3" fill="#B86A17" />)}
              </g>
            ))}
            <ellipse cx="236" cy="158" rx="22" ry="12" fill="#F0B24A" opacity=".85" />
            <Herbs cx={84} cy={150} s={0.9} />
          </Plate>
        ),
      };
    case "spring-roll":
    case "spring-roll-chay":
      return {
        bg: BG.roll,
        body: (
          <Plate>
            {[0, 1].map((i) => (
              <g key={i} transform={`translate(${128 + i * 58} ${112 + i * 14}) rotate(-18)`}>
                <rect x="-56" y="-22" width="112" height="44" rx="22" fill="#F7F1E6" stroke="#E6DCC8" />
                <rect x="-50" y="-18" width="100" height="36" rx="18" fill="#7DBA57" opacity=".55" />
                {kind === "spring-roll" ? [0, 1, 2].map((j) => <path key={j} transform={`translate(${-30 + j * 28} -2)`} d="M-10 0c4-10 18-10 22 0-4 6-18 6-22 0z" fill="#F59B7A" opacity=".9" />) : [0, 1, 2].map((j) => <rect key={j} x={-38 + j * 28} y="-8" width="18" height="14" rx="2" fill="#E7B66A" opacity=".9" />)}
                <rect x="-56" y="-22" width="112" height="44" rx="22" fill="#FFFFFF" opacity=".25" />
              </g>
            ))}
            <ellipse cx="236" cy="168" rx="24" ry="13" fill="#6B3E1F" />
            <g fill="#C7905B">{[0, 1, 2, 3].map((i) => <circle key={i} cx={226 + i * 6} cy={166 - (i % 2) * 3} r="2.2" />)}</g>
          </Plate>
        ),
      };
    case "thai-tea":
      return { bg: BG.mango, body: <Cup fill="#E58A3C" /> };
    case "taro-tea":
      return { bg: BG.drink, body: <Cup fill="#B79AD6" /> };
    case "mango-smoothie":
      return { bg: BG.mango, body: <Cup fill="#F6B93B" boba={false} /> };
    case "che-ba-mau":
    case "che-thai":
      return {
        bg: BG.che,
        body: (
          <g>
            <ellipse cx="160" cy="214" rx="46" ry="8" fill="#000" opacity=".08" />
            <path d="M112 40h96l-10 170a8 8 0 0 1-8 7h-60a8 8 0 0 1-8-7z" fill="#ffffff" opacity=".7" />
            <path d="M115 150h90l-4 58a6 6 0 0 1-6 5h-70a6 6 0 0 1-6-5z" fill="#8A2E3B" />
            <path d="M118 110h84l-3 40h-78z" fill="#F2D16B" />
            <path d="M120 72h80l-2 38h-76z" fill="#6DBE6E" />
            <path d="M114 46h92l-2 26h-88z" fill="#FFF7EC" />
            {Array.from({ length: 10 }).map((_, i) => <circle key={i} cx={126 + ((i * 17) % 70)} cy={56 + ((i * 7) % 12)} r="3" fill="#D5E9F7" opacity=".9" />)}
            <rect x="170" y="8" width="10" height="70" rx="4" fill="#CF2229" transform="rotate(12 175 40)" />
          </g>
        ),
      };
  }
}

export function DishArt({ kind, className, title }: Props) {
  const { bg, body } = scene(kind);
  return (
    <svg viewBox="0 0 320 240" className={className} role="img" aria-label={title ? `Illustration of ${title}` : "Dish illustration"} preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="240" fill={bg} />
      <g opacity=".22" fill="none" stroke="#fff" strokeWidth="2">
        <circle cx="20" cy="20" r="40" /><circle cx="300" cy="220" r="56" /><circle cx="300" cy="220" r="36" />
      </g>
      {body}
    </svg>
  );
}
