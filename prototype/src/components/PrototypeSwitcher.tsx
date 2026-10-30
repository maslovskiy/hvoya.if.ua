// PROTOTYPE — floating variant switcher. Dev-only; never ships.
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export type VariantDef = { key: string; name: string };

export function useVariant(variants: VariantDef[]) {
  const [params] = useSearchParams();
  const key = params.get("variant") ?? variants[0].key;
  return variants.some((v) => v.key === key) ? key : variants[0].key;
}

export function PrototypeSwitcher({ variants, page }: { variants: VariantDef[]; page: string }) {
  const [params, setParams] = useSearchParams();
  const current = useVariant(variants);
  const idx = variants.findIndex((v) => v.key === current);

  const go = (delta: number) => {
    const next = variants[(idx + delta + variants.length) % variants.length];
    const p = new URLSearchParams(params);
    p.set("variant", next.key);
    setParams(p, { replace: true });
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Shown in dev, and in the review deploy (VITE_PROTOTYPE_SWITCHER=true in .env.production). Never in a real build.
  if (!import.meta.env.DEV && import.meta.env.VITE_PROTOTYPE_SWITCHER !== "true") return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black px-2 py-1.5 font-mono text-xs text-white shadow-[0_8px_30px_rgba(0,0,0,.45)] ring-2 ring-yellow-300">
      <button type="button" onClick={() => go(-1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15" aria-label="Попередній варіант">
        ←
      </button>
      <span className="whitespace-nowrap px-2 text-center">
        <span className="text-yellow-300">{page}</span> · Варіант {current} — {variants[idx].name} · {idx + 1}/{variants.length}
      </span>
      <button type="button" onClick={() => go(1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15" aria-label="Наступний варіант">
        →
      </button>
    </div>
  );
}
