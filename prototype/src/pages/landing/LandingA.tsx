// Variant A — "Editorial": calm split hero, horizontal shelves per tree type, bento "why us", review marquee.
import { CATEGORIES, CONTACTS, FEATURES, HAPPY_CLIENTS, PRODUCTS, REVIEWS } from "../../data";
import { Logo, TreeArt } from "../../components/brand";
import { CartButton, ProductCard, Stars, useCountdown } from "../../components/ui";
import { Footer } from "../../components/Footer";

export const name = "Редакційний";

export function LandingA() {
  const t = useCountdown();
  return (
    <div>
      <div className="bg-slate text-frost">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-xs">
          <span>🕗 {CONTACTS.hours}</span>
          <span className="hidden sm:inline">🚚 {CONTACTS.shipping}!</span>
          <span>{CONTACTS.instagram}</span>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-slate/5 bg-frost-50/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Logo />
          <nav className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#catalog" className="hover:text-pine">Каталог</a>
            <a href="#why" className="hover:text-pine">Чому ми?</a>
            <a href="#reviews" className="hover:text-pine">Відгуки</a>
            <a href="#contacts" className="hover:text-pine">Контакти</a>
          </nav>
          <CartButton />
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-12 lg:grid-cols-2 lg:pt-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-frost px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-pine">
            Фабрика штучних ялинок №1
          </p>
          <h1 className="font-slab text-5xl font-extrabold leading-[1.05] text-slate md:text-7xl">
            Нашу ялинку — в&nbsp;кожну хатинку
          </h1>
          <p className="mt-6 max-w-lg text-lg text-slate/70">
            Литі ялинки власного виробництва: виглядають як справжні, служать роками і приїжджають до вас уже за 1–2 дні.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalog" className="rounded-full bg-slate px-7 py-3.5 font-bold text-frost hover:bg-slate-900">
              Обрати ялинку
            </a>
            <a href="#why" className="rounded-full px-7 py-3.5 font-bold ring-1 ring-slate/20 hover:ring-slate/50">
              Чому ми?
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
            <li>🏆 Преміум якість</li>
            <li>♻️ Безпечний матеріал</li>
            <li>🔨 Міцна конструкція</li>
          </ul>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-xl">
          <div className="absolute inset-0 rounded-full bg-frost" />
          <div className="absolute inset-[8%] rounded-full border-2 border-dashed border-slate/10" />
          <TreeArt kind="green" seed={1} className="absolute bottom-[12%] left-[6%] h-[62%]" />
          <TreeArt kind="blue" seed={4} className="absolute bottom-[12%] right-[6%] h-[62%]" />
          <TreeArt kind="snow" seed={7} className="absolute bottom-[8%] left-1/2 h-[80%] -translate-x-1/2" />
          <span className="absolute left-0 top-[18%] rounded-2xl bg-white px-4 py-2 text-sm font-semibold shadow-lg">🏆 Преміум якість</span>
          <span className="absolute right-0 top-[30%] rounded-2xl bg-white px-4 py-2 text-sm font-semibold shadow-lg">♻️ Безпечно</span>
          <span className="absolute bottom-[4%] right-[12%] rounded-2xl bg-slate px-4 py-2 text-sm font-semibold text-frost shadow-lg">від 2 100 ₴</span>
        </div>
      </section>

      {/* Promo strip */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl bg-slate/10 md:grid-cols-4">
          {[
            ["₴", "Від 2 100 грн", "фабрична ціна"],
            ["📏", "150 см – 3 м", "6 розмірів"],
            ["🚚", "Швидка доставка", "Нова Пошта, 1–2 дні"],
          ].map(([i, a, b]) => (
            <div key={a} className="flex items-center gap-4 bg-white p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-frost text-xl font-bold">{i}</span>
              <div>
                <p className="font-bold">{a}</p>
                <p className="text-sm text-slate/50">{b}</p>
              </div>
            </div>
          ))}
          <div className="bg-berry p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Поспішайте! Ціни зростуть через</p>
            <p className="mt-1 font-mono text-2xl font-bold tabular-nums">
              {t.d}д {String(t.h).padStart(2, "0")}:{String(t.m).padStart(2, "0")}:{String(t.s).padStart(2, "0")}
            </p>
          </div>
        </div>
      </section>

      {/* Catalog shelves */}
      <section id="catalog" className="mx-auto max-w-7xl scroll-mt-20 px-6 pt-24">
        <h2 className="max-w-3xl font-slab text-3xl font-extrabold md:text-4xl">
          Мега розпродаж продовжено. <span className="text-berry">Кількість обмежена!</span>
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <a key={c.kind} href={`#cat-${c.kind}`} className="rounded-full bg-white px-5 py-2 text-sm font-semibold ring-1 ring-slate/10 hover:bg-slate hover:text-frost">
              {c.title}
            </a>
          ))}
        </div>
        {CATEGORIES.map((c) => (
          <div key={c.kind} id={`cat-${c.kind}`} className="scroll-mt-20 pt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-slab text-2xl font-bold md:text-3xl">{c.title}</h3>
                <p className="mt-1 text-slate/60">{c.tagline}</p>
              </div>
              <span className="text-sm text-slate/40">{PRODUCTS.filter((p) => p.kind === c.kind).length} моделі</span>
            </div>
            <div className="no-scrollbar -mx-6 flex snap-x gap-5 overflow-x-auto px-6 pb-2">
              {PRODUCTS.filter((p) => p.kind === c.kind).map((p) => (
                <div key={p.slug} className="w-[290px] shrink-0 snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Why us — bento */}
      <section id="why" className="mx-auto max-w-7xl scroll-mt-20 px-6 pt-28">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-3xl bg-slate p-8 text-frost md:row-span-3">
            <h2 className="font-slab text-3xl font-extrabold">Чому клієнти обирають нас?</h2>
            <div>
              <p className="font-slab text-6xl font-extrabold text-gold">{HAPPY_CLIENTS.toLocaleString("uk-UA")}</p>
              <p className="mt-2 text-frost/70">задоволених клієнтів по всій Україні</p>
            </div>
          </div>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`rounded-3xl p-7 ${i === 0 ? "bg-frost" : "bg-white ring-1 ring-slate/5"}`}>
              <span className="text-3xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate/60">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews marquee */}
      <section id="reviews" className="scroll-mt-20 overflow-hidden py-28">
        <div className="mx-auto mb-10 max-w-7xl px-6">
          <h2 className="font-slab text-3xl font-extrabold md:text-4xl">Тільки реальні відгуки клієнтів</h2>
          <p className="mt-2 text-slate/60">Зі скриньки {CONTACTS.instagram} — без редагування.</p>
        </div>
        <div className="flex w-max gap-5 hover:[animation-play-state:paused]" style={{ animation: "marquee 50s linear infinite" }}>
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <figure key={i} className="w-[340px] shrink-0 rounded-3xl bg-white p-6 ring-1 ring-slate/5">
              <Stars />
              <blockquote className="mt-3 text-[15px] leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-4 flex items-center justify-between text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-slate/40">{r.tree}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
