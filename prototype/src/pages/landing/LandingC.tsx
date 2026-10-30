// Variant C — "Winter story": full-bleed dark chapters, sticky tree per category, phone-frame reviews, giant countdown.
import { useState } from "react";
import { CATEGORIES, CONTACTS, FEATURES, HAPPY_CLIENTS, PRODUCTS, REVIEWS } from "../../data";
import { Logo, LogoMark, TreeArt } from "../../components/brand";
import { CartButton, ProductCard, useCountdown } from "../../components/ui";
import { Footer } from "../../components/Footer";

export const name = "Зимова історія";

const CHAPTER_BG = {
  green: "bg-[#1f3a2f] text-frost",
  blue: "bg-[#22343d] text-frost",
  snow: "bg-frost text-slate",
} as const;

function Snow({ count = 60 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="absolute -top-4 block rounded-full bg-white"
          style={{
            left: `${(i * 37) % 100}%`,
            width: 2 + (i % 4),
            height: 2 + (i % 4),
            opacity: 0.25 + (i % 5) * 0.12,
            animation: `snowfall ${9 + (i % 7) * 2}s linear ${-(i * 0.7)}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function LandingC() {
  const t = useCountdown();
  const [review, setReview] = useState(0);
  return (
    <div className="bg-slate-900">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-slate text-frost">
        <Snow />
        <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <Logo inverted />
          <nav className="hidden gap-8 text-sm text-frost/70 md:flex">
            <a href="#c-catalog" className="hover:text-white">Каталог</a>
            <a href="#c-why" className="hover:text-white">Чому ми?</a>
            <a href="#c-reviews" className="hover:text-white">Відгуки</a>
            <a href="#contacts" className="hover:text-white">Контакти</a>
          </nav>
          <CartButton tone="dark" />
        </header>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-6 pb-8 text-center">
          <LogoMark className="mb-6 w-24 opacity-90" stroke="var(--color-frost)" fill="var(--color-slate)" />
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-frost/60">Фабрика штучних ялинок №1</p>
          <h1 className="mt-5 font-slab text-5xl font-extrabold leading-[0.95] md:text-7xl lg:text-8xl">
            Нашу ялинку
            <br />
            <span className="text-spruce">в кожну хатинку</span>
          </h1>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#c-catalog" className="rounded-full bg-frost px-8 py-4 font-bold text-slate hover:bg-white">
              Знайти свою ялинку ↓
            </a>
          </div>
        </div>
        <div className="relative z-10 flex items-end justify-center gap-4 opacity-90">
          <TreeArt kind="green" seed={2} className="h-40 md:h-56" stand={false} />
          <TreeArt kind="snow" seed={7} className="h-56 md:h-80" stand={false} />
          <TreeArt kind="blue" seed={4} className="h-44 md:h-64" stand={false} />
          <TreeArt kind="green" seed={1} className="hidden h-36 md:block" stand={false} />
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden bg-pine py-4 text-frost">
        <div className="flex w-max gap-12 whitespace-nowrap font-slab text-lg font-bold" style={{ animation: "marquee 30s linear infinite" }}>
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Від 2 100 ₴", "Висота 150 см – 3 м", "Відправки щодня", "Мега розпродаж продовжено", "Кількість обмежена", "Литі гілки без ПВХ"].map((s) => (
              <span key={s + k}>✦ {s}</span>
            )),
          )}
        </div>
      </div>

      {/* Chapters */}
      <div id="c-catalog" className="scroll-mt-0">
        {CATEGORIES.map((c, i) => {
          const items = PRODUCTS.filter((p) => p.kind === c.kind);
          const dark = c.kind !== "snow";
          return (
            <section key={c.kind} className={`${CHAPTER_BG[c.kind]} relative`}>
              <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.15fr]">
                <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
                  <p className="font-mono text-sm opacity-50">0{i + 1} / 03</p>
                  <h2 className="mt-3 font-slab text-5xl font-extrabold md:text-6xl">{c.title}</h2>
                  <p className="mt-4 max-w-sm text-lg opacity-70">{c.tagline}</p>
                  <TreeArt kind={c.kind} seed={items[0].seed} className="mt-8 hidden h-[45vh] lg:block" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {items.map((p) => (
                    <ProductCard key={p.slug} product={p} tone={dark ? "dark" : "light"} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Why us */}
      <section id="c-why" className="bg-frost-50 text-slate">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pine">Чому клієнти обирають нас</p>
          <p className="mt-4 font-slab text-7xl font-extrabold leading-none md:text-[10rem]">{HAPPY_CLIENTS.toLocaleString("uk-UA")}</p>
          <p className="mt-2 text-xl text-slate/60">задоволених родин уже прикрасили свої оселі</p>
          <ol className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="border-t-2 border-slate pt-5">
                <span className="font-mono text-sm text-slate/40">0{i + 1}</span>
                <h3 className="mt-2 font-slab text-2xl font-bold">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-slate/60">{f.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews in a phone */}
      <section id="c-reviews" className="relative overflow-hidden bg-slate text-frost">
        <Snow count={30} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-28 lg:grid-cols-2">
          <div>
            <h2 className="font-slab text-5xl font-extrabold">Тільки реальні відгуки клієнтів</h2>
            <p className="mt-4 text-lg text-frost/60">Пишуть нам в Direct {CONTACTS.instagram} щодня. Ось кілька повідомлень.</p>
            <div className="mt-8 flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setReview(i)}
                  className={`h-2 rounded-full transition-all ${i === review ? "w-10 bg-frost" : "w-2 bg-frost/30"}`}
                  aria-label={`Відгук ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="mx-auto w-[300px] rounded-[44px] bg-black p-3 shadow-2xl ring-1 ring-white/10">
            <div className="flex h-[560px] flex-col rounded-[34px] bg-[#0f1417] p-4">
              <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-frost">
                  <LogoMark className="w-6" stroke="var(--color-slate)" />
                </span>
                <div className="text-sm">
                  <p className="font-semibold">{CONTACTS.instagram.slice(1)}</p>
                  <p className="text-xs text-frost/40">Direct</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-end gap-3 py-4 text-sm">
                <div className="mx-auto mb-2 grid h-40 w-32 place-items-end rounded-2xl bg-frost-100">
                  <TreeArt kind={["green", "snow", "blue", "snow", "green"][review] as "green"} seed={review + 1} className="mx-auto h-36" />
                </div>
                <p key={review} className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#262d33] px-4 py-2.5 leading-relaxed">
                  {REVIEWS[review].text}
                </p>
                <p className="max-w-[70%] self-end rounded-2xl rounded-br-md bg-gradient-to-br from-[#6f5bd8] to-[#3b82f6] px-4 py-2.5">Дякуємо! Гарних свят 🤍</p>
                <p className="text-center text-[11px] text-frost/30">{REVIEWS[review].name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown CTA */}
      <section className="bg-berry text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] opacity-80">Поспішайте! Ціни зростуть через</p>
          <div className="mt-6 flex justify-center gap-3 md:gap-6">
            {[
              [t.d, "днів"],
              [t.h, "годин"],
              [t.m, "хвилин"],
              [t.s, "секунд"],
            ].map(([v, l]) => (
              <div key={l} className="w-20 rounded-2xl bg-white/10 py-4 md:w-32">
                <p className="font-slab text-4xl font-extrabold tabular-nums md:text-6xl">{String(v).padStart(2, "0")}</p>
                <p className="text-xs opacity-70">{l}</p>
              </div>
            ))}
          </div>
          <a href="#c-catalog" className="mt-10 inline-block rounded-full bg-white px-8 py-4 font-bold text-berry hover:bg-frost">
            Встигнути за старою ціною
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
