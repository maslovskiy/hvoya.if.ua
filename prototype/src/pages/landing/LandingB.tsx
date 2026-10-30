// Variant B — "Storefront": catalogue-first. Filter sidebar + list rows grouped by tree type, comparison table, rating wall.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, CONTACTS, FEATURES, HAPPY_CLIENTS, PRODUCTS, REVIEWS, formatSize, priceFor, type Product, type TreeKind } from "../../data";
import { KIND_BG, Logo, TreeArt } from "../../components/brand";
import { Badge, CartButton, Price, SizePicker, Stars, useCountdown, useVariantLink } from "../../components/ui";
import { Footer } from "../../components/Footer";
import { useCart } from "../../cart";

export const name = "Вітрина";

const ALL_SIZES = [1.5, 1.8, 2.1, 2.3, 2.5, 3];

function Row({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { add, setOpen } = useCart();
  const to = useVariantLink();
  return (
    <article className="grid min-w-0 grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-2xl bg-white p-4 ring-1 ring-slate/5 transition hover:ring-slate/20 sm:grid-cols-[150px_1fr_auto]">
      <Link to={to(`/product/${product.slug}`)} className="relative grid aspect-[3/4] place-items-end rounded-xl" style={{ background: KIND_BG[product.kind] }}>
        <TreeArt kind={product.kind} seed={product.seed} className="mx-auto h-[90%]" />
      </Link>
      <div className="flex flex-col gap-2 py-1">
        <div className="flex flex-wrap items-center gap-2">
          {product.badge && <Badge>{product.badge}</Badge>}
          <span className="text-xs text-slate/40">Арт. HV-{product.seed.toString().padStart(3, "0")}</span>
        </div>
        <Link to={to(`/product/${product.slug}`)} className="text-lg font-bold hover:underline">
          {product.name}
        </Link>
        <p className="text-sm text-slate/60">{product.blurb}</p>
        <dl className="mt-1 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate/60">
          <div>
            <dt className="text-slate/40">Матеріал</dt>
            <dd className="font-semibold text-slate">{product.material}</dd>
          </div>
          <div>
            <dt className="text-slate/40">Колір</dt>
            <dd className="font-semibold text-slate">{product.color}</dd>
          </div>
          <div>
            <dt className="text-slate/40">Висота</dt>
            <dd className="font-semibold text-slate">
              {formatSize(product.sizes[0])} – {formatSize(product.sizes.at(-1)!)}
            </dd>
          </div>
        </dl>
      </div>
      <div className="col-span-2 flex flex-col gap-3 border-t border-slate/5 pt-4 sm:col-span-1 sm:w-64 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-1">
        <Price product={product} size={size} />
        <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
        <button
          type="button"
          onClick={() => {
            add(product.slug, size);
            setOpen(true);
          }}
          className="mt-auto rounded-xl bg-pine py-3 text-sm font-bold text-white hover:bg-pine-600"
        >
          Купити
        </button>
      </div>
    </article>
  );
}

export function LandingB() {
  const t = useCountdown();
  const [kinds, setKinds] = useState<TreeKind[]>([]);
  const [height, setHeight] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState(9000);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (kinds.length === 0 || kinds.includes(p.kind)) &&
          (height === null || p.sizes.includes(height)) &&
          priceFor(p, height ?? p.sizes[0]) <= maxPrice,
      ),
    [kinds, height, maxPrice],
  );

  return (
    <div className="bg-frost-50">
      <div className="bg-berry px-4 py-2 text-center text-sm font-semibold text-white">
        🔥 Мега розпродаж продовжено! Ціни зростуть через{" "}
        <span className="font-mono tabular-nums">
          {t.d}д {String(t.h).padStart(2, "0")}:{String(t.m).padStart(2, "0")}:{String(t.s).padStart(2, "0")}
        </span>
      </div>
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
          <Logo compact />
          <div className="hidden flex-1 items-center gap-2 rounded-xl bg-frost-50 px-4 py-2.5 text-sm text-slate/40 ring-1 ring-slate/10 md:flex">
            🔎 Пошук: «засніжена 2,1 м»…
          </div>
          <div className="ml-auto hidden text-right text-xs leading-tight lg:block">
            <p className="font-bold">{CONTACTS.phone}</p>
            <p className="text-slate/50">{CONTACTS.hours}</p>
          </div>
          <div className="ml-auto lg:ml-0">
            <CartButton />
          </div>
        </div>
        <nav className="border-t border-slate/5">
          <div className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 text-sm font-semibold">
            {CATEGORIES.map((c) => (
              <a key={c.kind} href={`#b-${c.kind}`} className="whitespace-nowrap rounded-lg px-3 py-2.5 hover:bg-frost">
                {c.title}
              </a>
            ))}
            <a href="#b-why" className="whitespace-nowrap rounded-lg px-3 py-2.5 hover:bg-frost">Чому ми?</a>
            <a href="#b-reviews" className="whitespace-nowrap rounded-lg px-3 py-2.5 hover:bg-frost">Відгуки</a>
            <a href="#contacts" className="whitespace-nowrap rounded-lg px-3 py-2.5 hover:bg-frost">Контакти</a>
          </div>
        </nav>
      </header>

      {/* Compact hero banner */}
      <section className="mx-auto max-w-7xl px-6 pt-6">
        <div className="relative grid overflow-hidden rounded-3xl bg-pine text-white md:grid-cols-[1.4fr_1fr]">
          <div className="relative z-10 p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-frost/70">Фабрика штучних ялинок №1</p>
            <h1 className="mt-3 font-slab text-4xl font-extrabold leading-tight md:text-5xl">Нашу ялинку в кожну хатинку</h1>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="rounded-full bg-white/15 px-4 py-2">₴ Від 2 100 грн</span>
              <span className="rounded-full bg-white/15 px-4 py-2">📏 Від 150 см до 3 м</span>
              <span className="rounded-full bg-white/15 px-4 py-2">🚚 Відправки щодня</span>
            </div>
          </div>
          <div className="relative hidden h-full min-h-56 md:block">
            <TreeArt kind="green" seed={3} className="absolute bottom-0 left-4 h-[85%]" stand={false} />
            <TreeArt kind="snow" seed={6} className="absolute -bottom-2 right-24 h-full" stand={false} />
            <TreeArt kind="blue" seed={5} className="absolute bottom-0 right-0 h-[75%]" stand={false} />
          </div>
        </div>
      </section>

      {/* Catalogue with sidebar */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[250px_1fr]">
        <aside className="h-max space-y-7 rounded-2xl bg-white p-5 ring-1 ring-slate/5 lg:sticky lg:top-32">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate/50">Тип ялинки</h3>
            {CATEGORIES.map((c) => {
              const on = kinds.includes(c.kind);
              return (
                <label key={c.kind} className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-frost-50">
                  <span className="flex items-center gap-3 text-sm font-medium">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setKinds((k) => (on ? k.filter((x) => x !== c.kind) : [...k, c.kind]))}
                      className="h-4 w-4 accent-[var(--color-pine)]"
                    />
                    {c.short}
                  </span>
                  <span className="text-xs text-slate/40">{PRODUCTS.filter((p) => p.kind === c.kind).length}</span>
                </label>
              );
            })}
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate/50">Висота</h3>
            <div className="grid grid-cols-3 gap-1.5">
              {ALL_SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setHeight(height === s ? null : s)}
                  className={`rounded-lg py-2 text-xs font-bold ${height === s ? "bg-slate text-frost" : "bg-frost-50 hover:bg-frost"}`}
                >
                  {formatSize(s)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 flex justify-between text-xs font-bold uppercase tracking-wider text-slate/50">
              Ціна до <span className="text-slate">{maxPrice.toLocaleString("uk-UA")} ₴</span>
            </h3>
            <input type="range" min={2100} max={9000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-[var(--color-pine)]" />
          </div>
          <button type="button" onClick={() => (setKinds([]), setHeight(null), setMaxPrice(9000))} className="text-sm font-semibold text-pine hover:underline">
            Скинути фільтри
          </button>
        </aside>

        <div className="min-w-0 space-y-12">
          {CATEGORIES.map((c) => {
            const items = filtered.filter((p) => p.kind === c.kind);
            if (!items.length) return null;
            return (
              <div key={c.kind} id={`b-${c.kind}`} className="scroll-mt-32">
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="font-slab text-2xl font-bold">{c.title}</h2>
                  <span className="text-sm text-slate/40">{items.length} шт.</span>
                </div>
                <div className="space-y-3">
                  {items.map((p) => (
                    <Row key={p.slug} product={p} />
                  ))}
                </div>
              </div>
            );
          })}
          {!filtered.length && <p className="rounded-2xl bg-white p-16 text-center text-slate/50">Нічого не знайдено — спробуйте змінити фільтри.</p>}
        </div>
      </section>

      {/* Why us — comparison table */}
      <section id="b-why" className="scroll-mt-32 bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <h2 className="font-slab text-3xl font-extrabold md:text-4xl">Чому клієнти обирають нас?</h2>
            <p className="mt-3 text-lg">
              Понад <span className="font-extrabold text-berry">{HAPPY_CLIENTS.toLocaleString("uk-UA")}</span> задоволених клієнтів
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl ring-1 ring-slate/10">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-slate text-sm font-bold text-frost">
              <div className="p-4" />
              <div className="p-4 text-center">Ялинка Хвоя</div>
              <div className="p-4 text-center text-frost/60">Звичайна ПВХ</div>
            </div>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`grid grid-cols-[1.4fr_1fr_1fr] items-center text-sm ${i % 2 ? "bg-frost-50" : "bg-white"}`}>
                <div className="p-4">
                  <p className="font-semibold">
                    {f.icon} {f.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate/50">{f.text}</p>
                </div>
                <div className="p-4 text-center text-xl text-pine">✓</div>
                <div className="p-4 text-center text-xl text-slate/25">✕</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews wall */}
      <section id="b-reviews" className="mx-auto max-w-7xl scroll-mt-32 px-6 py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-slab text-3xl font-extrabold">Тільки реальні відгуки клієнтів</h2>
          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 ring-1 ring-slate/5">
            <span className="text-3xl font-extrabold">4,9</span>
            <div className="text-xs">
              <Stars />
              <p className="text-slate/50">на основі 1 240 відгуків</p>
            </div>
          </div>
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="mb-4 break-inside-avoid rounded-2xl bg-white p-5 ring-1 ring-slate/5">
              <Stars />
              <blockquote className="mt-2 text-sm leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-3 text-xs text-slate/50">
                <span className="font-semibold text-slate">{r.name}</span> · купив(ла) {r.tree}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Footer tone="light" />
    </div>
  );
}
