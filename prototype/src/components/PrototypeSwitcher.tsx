// PROTOTYPE — floating variant switcher. Shown in dev and in the review deploy; never in a real build.
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../cart";

export type VariantDef = { key: string; name: string };

// Shown in dev, and in the review deploy (VITE_PROTOTYPE_SWITCHER=true in .env.production).
const ENABLED = import.meta.env.DEV || import.meta.env.VITE_PROTOTYPE_SWITCHER === "true";

/** Height the bar occupies (44px pill + 20px offset + breathing room). Pages read it via var(--switcher-space). */
const SPACE = "76px";

export function useVariant(variants: VariantDef[]) {
  const [params] = useSearchParams();
  const key = params.get("variant") ?? variants[0].key;
  return variants.some((v) => v.key === key) ? key : variants[0].key;
}

export function PrototypeSwitcher({ variants, page }: { variants: VariantDef[]; page: string }) {
  const [params, setParams] = useSearchParams();
  const { open: cartOpen } = useCart();
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

  // Reserve room at the bottom so page-end buttons and sticky bars are never hidden behind the bar.
  useEffect(() => {
    if (!ENABLED) return;
    document.documentElement.style.setProperty("--switcher-space", SPACE);
    return () => {
      document.documentElement.style.removeProperty("--switcher-space");
    };
  }, []);

  if (!ENABLED || cartOpen) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex max-w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-1 rounded-full bg-black px-1.5 py-1.5 font-mono text-xs text-white shadow-[0_8px_30px_rgba(0,0,0,.45)] ring-2 ring-yellow-300">
      <button type="button" onClick={() => go(-1)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-white/15" aria-label="Попередній варіант">
        ←
      </button>
      <span className="truncate whitespace-nowrap px-1 text-center sm:px-2">
        <span className="hidden text-yellow-300 sm:inline">{page} · </span>
        <span className="text-yellow-300 sm:text-white">{current}</span> — {variants[idx].name} · {idx + 1}/{variants.length}
      </span>
      <button type="button" onClick={() => go(1)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-white/15" aria-label="Наступний варіант">
        →
      </button>
    </div>
  );
}
