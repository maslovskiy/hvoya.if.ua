// PDP variant A — "Classic split": gallery with thumbnails on the left, sticky buy box + accordions on the right.
import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES, PRODUCTS, formatSize, type Product } from "../../data";
import { Badge, Price, ProductCard, Qty, SizePicker, Stars, useVariantLink } from "../../components/ui";
import { useCart } from "../../cart";
import { GALLERY } from "./scenes";

export const name = "Класичний";

const SPECS = (p: Product, size: number) => [
  ["Матеріал", p.material],
  ["Колір", p.color],
  ["Висота", formatSize(size)],
  ["Діаметр знизу", `${Math.round(size * 62)} см`],
  ["Кількість гілок", `${Math.round(size * 340)}`],
  ["Підставка", "Металева, з фіксатором"],
  ["Збирання", "3 секції, 5 хвилин"],
  ["Гарантія", "3 роки"],
];

function Accordion({ title, children, open = false }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-slate/10 py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
        {title}
        <span className="text-xl transition group-open:rotate-45">+</span>
      </summary>
      <div className="pt-3 text-sm leading-relaxed text-slate/70">{children}</div>
    </details>
  );
}

export function ProductA({ product }: { product: Product }) {
  const [img, setImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();
  const navigate = useNavigate();
  const to = useVariantLink();
  const cat = CATEGORIES.find((c) => c.kind === product.kind)!;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-4 sm:px-6 sm:pt-6">
      <nav className="mb-4 truncate text-sm text-slate/50 sm:mb-6">
        <Link to={to("/")} className="hover:text-slate">Головна</Link> / <span>{cat.title}</span> / <span className="text-slate">{product.name}</span>
      </nav>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        {/* Gallery */}
        <div className="flex min-w-0 flex-col-reverse gap-3 md:flex-row">
          <div className="no-scrollbar flex gap-3 overflow-x-auto md:flex-col">
            {GALLERY.map((g, i) => (
              <button
                key={g.label}
                type="button"
                onClick={() => setImg(i)}
                className={`h-20 w-16 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-20 ring-2 transition ${i === img ? "ring-slate" : "ring-transparent opacity-70 hover:opacity-100"}`}
                aria-label={g.label}
              >
                {g.render(product)}
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] min-w-0 flex-1 overflow-hidden rounded-3xl">
            {GALLERY[img].render(product)}
            {product.badge && (
              <span className="absolute left-5 top-5">
                <Badge>{product.badge}</Badge>
              </span>
            )}
            <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold backdrop-blur">{GALLERY[img].label}</span>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setImg((img + d + GALLERY.length) % GALLERY.length)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white shadow hover:bg-frost"
                >
                  {d < 0 ? "‹" : "›"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:h-max">
          <div className="flex items-center gap-2 text-sm">
            <Stars /> <span className="text-slate/50">4,9 · 128 відгуків</span>
          </div>
          <h1 className="mt-3 font-slab text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-slate/60">{product.blurb}</p>
          <Price product={product} size={size} className="mt-6 [&>span:first-child]:text-3xl" />
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">
              Висота: <span className="text-slate/50">{formatSize(size)}</span>
            </p>
            <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
          </div>
          <div className="mt-6 flex gap-3">
            <Qty value={qty} onChange={(q) => setQty(Math.max(1, q))} />
            <button
              type="button"
              onClick={() => {
                add(product.slug, size, qty);
                setOpen(true);
              }}
              className="flex-1 rounded-full bg-slate py-3.5 font-bold text-frost hover:bg-slate-900"
            >
              Додати в кошик
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              add(product.slug, size, qty);
              navigate(to("/checkout"));
            }}
            className="mt-3 w-full rounded-full bg-berry py-3.5 font-bold text-white hover:brightness-95"
          >
            Придбати зараз
          </button>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
            {["🚚 Відправка сьогодні", "↩️ 14 днів на повернення", "🛡️ Гарантія 3 роки"].map((s) => (
              <div key={s} className="rounded-2xl bg-frost px-2 py-3 font-semibold">
                {s}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Accordion title="Характеристики" open>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
                {SPECS(product, size).map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-slate/50">{k}</dt>
                    <dd className="font-semibold text-slate">{v}</dd>
                  </div>
                ))}
              </dl>
            </Accordion>
            <Accordion title="Доставка та оплата">
              Нова Пошта: відділення, поштомат або кур'єр. Відправляємо щодня, доставка 1–2 дні. Оплата картою через WayForPay або
              при отриманні.
            </Accordion>
            <Accordion title="Гарантія та повернення">
              Гарантія на конструкцію — 3 роки. Якщо ялинка не сподобалась, повернемо кошти протягом 14 днів.
            </Accordion>
          </div>
        </div>
      </div>

      <section className="mt-16 sm:mt-24">
        <h2 className="mb-6 font-slab text-2xl font-bold">Вам також сподобається</h2>
        <div className="no-scrollbar -mx-4 flex snap-x scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.slug !== product.slug)
            .slice(0, 4)
            .map((p) => (
              <div key={p.slug} className="w-[78vw] max-w-[290px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                <ProductCard product={p} />
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
