import type { TreeKind } from "../data";

/** Recreation of the Instagram logo: three outlined zig-zag firs over a slab "ХВОЯ" wordmark. */
export function LogoMark({ className = "", stroke = "currentColor", fill = "var(--color-frost)" }: { className?: string; stroke?: string; fill?: string }) {
  const tree = (dx: number, s: number) => {
    // zig-zag outline of a three-tier fir, apex at (0,0), scaled by s
    const pts = [
      [0, 0], [13, 15], [7, 15], [20, 31], [12, 31], [27, 47],
      [-27, 47], [-12, 31], [-20, 31], [-7, 15], [-13, 15],
    ].map(([x, y]) => `${dx + x * s},${4 + y * s}`);
    return pts.join(" ");
  };
  return (
    <svg viewBox="0 0 100 64" className={className} aria-hidden>
      <g fill={fill} stroke={stroke} strokeWidth={4.2} strokeLinejoin="round">
        <polygon points={tree(28, 0.92)} />
        <polygon points={tree(72, 0.92)} />
        <polygon points={tree(50, 1.08)} transform="translate(0 2)" />
        <rect x={46} y={57} width={8} height={7} />
      </g>
    </svg>
  );
}

export function Logo({ className = "", inverted = false, compact = false }: { className?: string; inverted?: boolean; compact?: boolean }) {
  const stroke = inverted ? "var(--color-frost)" : "var(--color-slate)";
  const fill = inverted ? "var(--color-slate)" : "var(--color-frost)";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="grid place-items-center rounded-full"
        style={{ background: fill, width: compact ? 40 : 48, height: compact ? 40 : 48 }}
      >
        <LogoMark className={compact ? "w-7" : "w-8"} stroke={stroke} fill={fill} />
      </span>
      <span className="font-slab font-extrabold tracking-wide text-xl" style={{ color: inverted ? "var(--color-frost)" : "var(--color-slate)" }}>
        ХВОЯ
      </span>
    </span>
  );
}

const PALETTES: Record<TreeKind, { tiers: string[]; trunk: string }> = {
  green: { tiers: ["#2c5a43", "#356a50", "#3f7a5d", "#4a8a69"], trunk: "#3a2e26" },
  blue: { tiers: ["#55808d", "#6491a0", "#73a1ae", "#86b1bc"], trunk: "#3a2e26" },
  snow: { tiers: ["#47685a", "#507464", "#5a806f", "#668b7a"], trunk: "#3a2e26" },
};

function rand(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Stylised product "photo": a fir built from zig-zag tiers, echoing the logo's geometry.
 * Placeholder until real product photography is dropped in.
 */
export function TreeArt({ kind, seed = 1, className = "", stand = true }: { kind: TreeKind; seed?: number; className?: string; stand?: boolean }) {
  const r = rand(seed);
  const pal = PALETTES[kind];
  const tiers = 5;
  const paths: { d: string; color: string; snow?: string }[] = [];
  for (let i = 0; i < tiers; i++) {
    const top = 14 + i * 34;
    const bottom = top + 62 + i * 4;
    const w = 26 + i * 15 + r() * 6;
    const teeth = 5 + i * 2;
    const pts: string[] = [`100,${top}`, `${100 + w},${bottom}`];
    for (let k = 1; k < teeth; k++) {
      const x = 100 + w - (k * 2 * w) / teeth;
      const y = bottom - (k % 2 ? 9 + r() * 5 : 0);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    pts.push(`${100 - w},${bottom}`);
    const d = `M${pts.join(" L")} Z`;
    // snow cap: same tier shrunk toward the apex
    const capPts = pts.map((p) => {
      const [x, y] = p.split(",").map(Number);
      return `${(100 + (x - 100) * 0.86).toFixed(1)},${(top + (y - top) * 0.62).toFixed(1)}`;
    });
    paths.push({
      d,
      color: pal.tiers[Math.min(i, pal.tiers.length - 1)],
      snow: kind === "snow" ? `M${capPts.join(" L")} Z` : undefined,
    });
  }
  const flakes =
    kind === "snow"
      ? Array.from({ length: 70 }, () => {
          const y = 30 + r() * 190;
          const spread = ((y - 14) / 200) * 95;
          return { x: 100 + (r() * 2 - 1) * spread, y, rr: 1.6 + r() * 2.8 };
        })
      : kind === "blue"
        ? Array.from({ length: 26 }, () => {
            const y = 40 + r() * 170;
            const spread = ((y - 14) / 200) * 85;
            return { x: 100 + (r() * 2 - 1) * spread, y, rr: 1 + r() * 1.4 };
          })
        : [];
  return (
    <svg viewBox="0 0 200 270" className={className} aria-hidden>
      {stand && (
        <g stroke="#26313a" strokeWidth={3} strokeLinecap="round">
          <line x1={100} y1={225} x2={100} y2={252} />
          <line x1={100} y1={250} x2={68} y2={262} />
          <line x1={100} y1={250} x2={132} y2={262} />
          <line x1={100} y1={250} x2={100} y2={266} />
        </g>
      )}
      {paths.map((p, i) => (
        <g key={i}>
          <path d={p.d} fill={p.color} />
          {p.snow && <path d={p.snow} fill="#f4f8f6" opacity={0.82} />}
        </g>
      ))}
      {flakes.map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r={f.rr} fill={kind === "snow" ? "#ffffff" : "#d6e6ea"} opacity={kind === "snow" ? 0.95 : 0.55} />
      ))}
      <polygon points="100,2 103.5,10 112,10 105,15 108,23 100,18 92,23 95,15 88,10 96.5,10" fill="var(--color-gold)" />
    </svg>
  );
}

export const KIND_BG: Record<TreeKind, string> = {
  green: "linear-gradient(160deg,#eef4f0 0%,#dce9e1 100%)",
  blue: "linear-gradient(160deg,#eef4f6 0%,#d6e5ea 100%)",
  snow: "linear-gradient(160deg,#f6f9f8 0%,#e4ecea 100%)",
};
