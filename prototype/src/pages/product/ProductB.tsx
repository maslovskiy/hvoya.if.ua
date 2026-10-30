// PDP variant B — "Height configurator": the tree is drawn to scale next to a person and a ceiling line,
// so picking a size is visual rather than a row of numbers. Sticky bottom buy bar.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, PRODUCTS, formatSize, formatUAH, oldPriceFor, priceFor, type Product } from "../../data";
import { KIND_BG, TreeArt } from "../../components/brand";
import { Badge, Qty, useVariantLink } from "../../components/ui";
import { useCart } from "../../cart";

export const name = "Конфігуратор висоти";

const CEILING = 2.7; // m, typical flat
const SCALE_MAX = 3.2; // m mapped to full stage height

function Person() {
  return (
    <svg viewBox="0 0 40 170" className="h-full" aria-hidden>
      <g fill="#2f3b42" opacity={0.18}>
        <circle cx={20} cy={12} r={11} />
        <rect x={9} y={26} width={22} height={62} rx={9} />
        <rect x={10} y={84} width={9} height={86} rx={4} />
        <rect x={21} y={84} width={9} height={86} rx={4} />
      </g>
    </svg>
  );
}

export function ProductB({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[Math.min(1, product.sizes.length - 1)]);
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();
  const navigate = useNavigate();
  const to = useVariantLink();
  const cat = CATEGORIES.find((c) => c.kind === product.kind)!;
  const idx = product.sizes.indexOf(size);
  const pct = (m: number) => `${(m / SCALE_MAX) * 100}%`;
  const siblings = PRODUCTS.filter((p) => p.kind === product.kind);

  return (
    <main className="pb-40">
      <section className="mx-auto grid max-w-7xl gap-8 px-6 pt-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Stage */}
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden rounded-[2rem]" style={{ background: KIND_BG[product.kind] }}>
          {/* ruler */}
          <div className="absolute inset-y-8 left-6 w-10">
            {[0.5, 1, 1.5, 2, 2.5, 3].map((m) => (
              <div key={m} className="absolute left-0 flex w-full items-center gap-1 text-[10px] font-semibold text-slate/40" style={{ bottom: pct(m) }}>
                <span className="h-px w-3 bg-slate/30" />
                {String(m).replace(".", ",")}
              </div>
            ))}
          </div>
          <div className="absolute inset-y-8 left-14 right-6 md:left-16 md:right-16">
            {/* ceiling */}
            <div className="absolute inset-x-0 border-t-2 border-dashed border-slate/25" style={{ bottom: pct(CEILING) }}>
              <span className="absolute -top-6 right-0 text-xs font-semibold text-slate/40">стеля {String(CEILING).replace(".", ",")} м</span>
            </div>
            {/* floor */}
            <div className="absolute inset-x-0 bottom-0 border-t-2 border-slate/30" />
            <div className="absolute bottom-0 left-0 md:left-[10%]" style={{ height: pct(1.7) }}>
              <Person />
              <span className="absolute -top-5 left-0 whitespace-nowrap text-[10px] font-semibold text-slate/40">170 см</span>
            </div>
            <div className="absolute bottom-0 left-[58%] -translate-x-1/2 transition-all duration-500 ease-out" style={{ height: pct(size) }}>
              <TreeArt kind={product.kind} seed={product.seed} className="h-full" />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate px-3 py-1 text-xs font-bold text-frost">
                {formatSize(size)}
              </span>
            </div>
          </div>
          {product.badge && (
            <span className="absolute right-6 top-6">
              <Badge>{product.badge}</Badge>
            </span>
          )}
        </div>

        {/* Config panel */}
        <div className="flex flex-col gap-8 py-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-pine">{cat.title}</p>
            <h1 className="mt-2 font-slab text-4xl font-extrabold leading-tight">{product.name}</h1>
            <p className="mt-3 text-slate/60">{product.blurb}</p>
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <p className="font-bold">1. Оберіть висоту</p>
              <p className="text-sm text-slate/50">{size >= CEILING - 0.3 ? "⚠️ Перевірте висоту стелі" : "Поміститься у звичайну квартиру"}</p>
            </div>
            <input
              type="range"
              min={0}
              max={product.sizes.length - 1}
              value={idx}
              onChange={(e) => setSize(product.sizes[+e.target.value])}
              className="w-full accent-[var(--color-slate)]"
            />
            <div className="mt-1 flex justify-between text-xs font-semibold text-slate/50">
              {product.sizes.map((s) => (
                <button key={s} type="button" onClick={() => setSize(s)} className={s === size ? "text-slate" : ""}>
                  {formatSize(s)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-bold">2. Інші моделі цього типу</p>
            <div className="flex gap-3">
              {siblings.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => navigate(to(`/product/${p.slug}`))}
                  className={`grid h-24 w-20 place-items-end rounded-2xl ring-2 ${p.slug === product.slug ? "ring-slate" : "ring-transparent hover:ring-slate/20"}`}
                  style={{ background: KIND_BG[p.kind] }}
                  title={p.name}
                >
                  <TreeArt kind={p.kind} seed={p.seed} className="mx-auto h-20" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ["Матеріал", product.material],
              ["Колір", product.color],
              ["Діаметр", `${Math.round(size * 62)} см`],
              ["Гілок", `${Math.round(size * 340)}`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-white p-4 ring-1 ring-slate/5">
                <p className="text-xs text-slate/50">{k}</p>
                <p className="font-bold">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-6">
        <h2 className="mb-6 font-slab text-2xl font-bold">Що в коробці</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["🌲", "3 секції ялинки", "Збирається за 5 хвилин без інструментів"],
            ["🔩", "Металева підставка", "Стійка, не перевертається"],
            ["🧳", "Чохол для зберігання", "Щоб ялинка служила роками"],
            ["📜", "Сертифікат якості", "Безпечний, негорючий матеріал"],
          ].map(([i, a, b]) => (
            <div key={a} className="rounded-3xl bg-white p-6 ring-1 ring-slate/5">
              <span className="text-3xl">{i}</span>
              <p className="mt-3 font-bold">{a}</p>
              <p className="mt-1 text-sm text-slate/60">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate/10 bg-white/95 pb-16 backdrop-blur md:pb-0">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
          <div className="mr-auto min-w-0">
            <p className="truncate text-xs text-slate/50">
              {product.name} · {formatSize(size)}
            </p>
            <p className="text-2xl font-extrabold">
              {formatUAH(priceFor(product, size) * qty)}{" "}
              <span className="text-sm font-medium text-slate/40 line-through">{formatUAH(oldPriceFor(product, size) * qty)}</span>
            </p>
          </div>
          <span className="hidden sm:block">
            <Qty value={qty} onChange={(q) => setQty(Math.max(1, q))} />
          </span>
          <button
            type="button"
            onClick={() => {
              add(product.slug, size, qty);
              setOpen(true);
            }}
            className="hidden rounded-full px-6 py-3.5 font-bold ring-1 ring-slate/20 hover:ring-slate sm:block"
          >
            У кошик
          </button>
          <button
            type="button"
            onClick={() => {
              add(product.slug, size, qty);
              navigate(to("/checkout"));
            }}
            className="rounded-full bg-berry px-8 py-3.5 font-bold text-white hover:brightness-95"
          >
            Придбати
          </button>
        </div>
      </div>
    </main>
  );
}
