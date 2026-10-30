import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../cart";
import { formatSize, formatUAH, oldPriceFor, priceFor, PRICE_RISE_AT, type Product } from "../data";
import { TreeArt, KIND_BG } from "./brand";

/** Keeps ?variant= when linking between prototype pages, so the user stays inside one design direction. */
export function useVariantLink() {
  const [params] = useSearchParams();
  const v = params.get("variant");
  return (path: string) => (v ? `${path}?variant=${v}` : path);
}

export function SizePicker({ sizes, value, onChange, tone = "light" }: { sizes: number[]; value: number; onChange: (s: number) => void; tone?: "light" | "dark" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((s) => {
        const active = s === value;
        const base = "min-w-14 rounded-full px-3 py-1.5 text-sm font-semibold transition";
        const cls =
          tone === "dark"
            ? active
              ? "bg-frost text-slate"
              : "bg-white/10 text-frost hover:bg-white/20"
            : active
              ? "bg-slate text-frost"
              : "bg-white text-slate ring-1 ring-slate/15 hover:ring-slate/40";
        return (
          <button key={s} type="button" onClick={() => onChange(s)} className={`${base} ${cls}`}>
            {formatSize(s)}
          </button>
        );
      })}
    </div>
  );
}

export function Price({ product, size, className = "" }: { product: Product; size: number; className?: string }) {
  const now = priceFor(product, size);
  const was = oldPriceFor(product, size);
  const off = Math.round((1 - now / was) * 100);
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-xl font-bold">{formatUAH(now)}</span>
      <span className="text-sm line-through opacity-50">{formatUAH(was)}</span>
      <span className="rounded-full bg-berry/10 px-2 py-0.5 text-xs font-bold text-berry">−{off}%</span>
    </div>
  );
}

export function Badge({ children }: { children: string }) {
  const tone =
    children === "Під замовлення" ? "bg-slate text-frost" : children === "Хіт" ? "bg-berry text-white" : "bg-gold text-slate-900";
  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${tone}`}>{children}</span>;
}

/** Compact product card used by variants A & C; variant B renders its own row-style card. */
export function ProductCard({ product, tone = "light" }: { product: Product; tone?: "light" | "dark" }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { add, setOpen } = useCart();
  const to = useVariantLink();
  const dark = tone === "dark";
  return (
    <article className={`group flex flex-col overflow-hidden rounded-3xl ${dark ? "bg-slate-700 text-frost" : "bg-white text-slate shadow-sm ring-1 ring-slate/5"}`}>
      <Link to={to(`/product/${product.slug}`)} className="relative block aspect-[4/5]" style={{ background: dark ? "#33424a" : KIND_BG[product.kind] }}>
        {product.badge && (
          <span className="absolute left-4 top-4 z-10">
            <Badge>{product.badge}</Badge>
          </span>
        )}
        <TreeArt kind={product.kind} seed={product.seed} className="absolute inset-x-0 bottom-3 mx-auto h-[86%] transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link to={to(`/product/${product.slug}`)} className="text-[17px] font-bold leading-snug hover:underline">
          {product.name}
        </Link>
        <p className={`text-sm ${dark ? "text-frost/60" : "text-slate/60"}`}>
          {product.material} · {product.color}
        </p>
        <Price product={product} size={size} />
        <SizePicker sizes={product.sizes} value={size} onChange={setSize} tone={tone} />
        <button
          type="button"
          onClick={() => {
            add(product.slug, size);
            setOpen(true);
          }}
          className={`mt-auto rounded-full py-3 text-sm font-bold transition ${dark ? "bg-frost text-slate hover:bg-white" : "bg-slate text-frost hover:bg-slate-900"}`}
        >
          У кошик
        </button>
      </div>
    </article>
  );
}

export function useCountdown(target = PRICE_RISE_AT) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff / 3600000) % 24,
    m: Math.floor(diff / 60000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}

export function CartButton({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`relative grid h-11 w-11 place-items-center rounded-full transition ${tone === "dark" ? "bg-white/10 text-frost hover:bg-white/20" : "bg-slate text-frost hover:bg-slate-900"}`}
      aria-label="Кошик"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7h12l-1 13H7L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-berry px-1 text-[11px] font-bold text-white">{count}</span>
      )}
    </button>
  );
}

/** Shared slide-over cart; every variant uses it so "add to cart" always lands somewhere. */
export function CartDrawer() {
  const { lines, total, open, setOpen, setQty, remove } = useCart();
  const navigate = useNavigate();
  const to = useVariantLink();
  return (
    <div className={`fixed inset-0 z-40 overflow-hidden ${open ? "" : "pointer-events-none"}`}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition ${open ? "opacity-100" : "opacity-0"}`} />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-frost-50 shadow-2xl transition duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-slate/10 px-6 py-5">
          <h2 className="font-slab text-xl font-bold">Ваш кошик</h2>
          <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-slate/5" aria-label="Закрити">
            ✕
          </button>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {lines.length === 0 && <p className="py-16 text-center text-slate/50">Кошик порожній — оберіть свою ялинку 🎄</p>}
          {lines.map((l) => (
            <div key={l.slug + l.size} className="flex gap-4 rounded-2xl bg-white p-3 ring-1 ring-slate/5">
              <div className="grid h-20 w-16 shrink-0 place-items-center rounded-xl" style={{ background: KIND_BG[l.product.kind] }}>
                <TreeArt kind={l.product.kind} seed={l.product.seed} className="h-16" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <p className="text-sm font-semibold leading-tight">{l.product.name}</p>
                  <button type="button" onClick={() => remove(l.slug, l.size)} className="text-slate/40 hover:text-berry" aria-label="Видалити">
                    ✕
                  </button>
                </div>
                <p className="text-xs text-slate/50">Висота: {formatSize(l.size)}</p>
                <div className="mt-auto flex items-center justify-between">
                  <Qty value={l.qty} onChange={(q) => setQty(l.slug, l.size, q)} />
                  <span className="font-bold">{formatUAH(l.unit * l.qty)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <footer className="space-y-3 border-t border-slate/10 px-6 py-5">
          <div className="flex justify-between text-lg font-bold">
            <span>Разом</span>
            <span>{formatUAH(total)}</span>
          </div>
          <button
            type="button"
            disabled={!lines.length}
            onClick={() => {
              setOpen(false);
              navigate(to("/checkout"));
            }}
            className="w-full rounded-full bg-pine py-3.5 font-bold text-white transition hover:bg-pine-600 disabled:opacity-40"
          >
            Оформити замовлення
          </button>
        </footer>
      </aside>
    </div>
  );
}

export function Qty({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full ring-1 ring-slate/15">
      <button type="button" onClick={() => onChange(value - 1)} className="h-8 w-8 rounded-full hover:bg-slate/5">
        −
      </button>
      <span className="w-6 text-center text-sm font-semibold">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className="h-8 w-8 rounded-full hover:bg-slate/5">
        +
      </button>
    </div>
  );
}

export function Stars() {
  return <span className="tracking-widest text-gold">★★★★★</span>;
}
