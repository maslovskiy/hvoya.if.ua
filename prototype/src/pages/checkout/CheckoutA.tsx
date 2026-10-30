// Checkout variant A — "One page": every field visible at once, sticky order summary on the right.
import { CITIES, DELIVERY, PAYMENT, branchesFor, Choice, Field, inputCls, OrderLines, PromoInput, Success, Totals, type Checkout } from "./shared";

export const name = "Одна сторінка";

export function CheckoutA({ c }: { c: Checkout }) {
  if (c.placed) return <Success c={c} />;
  const { f, set } = c;
  const city = CITIES.find((x) => x.name === f.city);
  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-6 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
      <form
        className="min-w-0 space-y-8 sm:space-y-10"
        onSubmit={(e) => {
          e.preventDefault();
          c.place();
        }}
      >
        <h1 className="font-slab text-3xl font-extrabold sm:text-4xl">Оформлення замовлення</h1>

        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-lg font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-slate text-sm text-frost">1</span>Отримувач
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="ПІБ повністю">
              <input required value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Іван Іванович Іваненко" className={inputCls} />
            </Field>
            <Field label="Телефон">
              <div className="flex">
                <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-l-xl bg-frost px-3 text-sm font-semibold ring-1 ring-slate/15">🇺🇦 +380</span>
                <input required value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(00) 000-00-00" className={`${inputCls} rounded-l-none`} />
              </div>
            </Field>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-lg font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-slate text-sm text-frost">2</span>Доставка
          </h2>
          <Field label="Місто" hint={city ? `Україна, ${city.region}, місто ${city.name}` : undefined}>
            <input list="cities" value={f.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
            <datalist id="cities">
              {CITIES.map((x) => (
                <option key={x.name} value={x.name} />
              ))}
            </datalist>
          </Field>
          <div className="space-y-2">
            {DELIVERY.map((d) => (
              <Choice key={d.id} checked={f.delivery === d.id} onSelect={() => set("delivery", d.id)} title={d.label} sub={d.eta} right={d.note} />
            ))}
          </div>
          {f.delivery === "courier" ? (
            <Field label="Адреса">
              <input value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="Вулиця, будинок, квартира" className={inputCls} />
            </Field>
          ) : (
            <Field label="Пункт отримання">
              <select value={f.branch} onChange={(e) => set("branch", e.target.value)} className={inputCls}>
                <option value="">Виберіть пункт отримання</option>
                {branchesFor(f.city || "Львів").map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </Field>
          )}
          <Field label="Коментар">
            <textarea value={f.comment} onChange={(e) => set("comment", e.target.value)} rows={2} placeholder="Коментар до замовлення" className={inputCls} />
          </Field>
        </section>

        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-lg font-bold">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-slate text-sm text-frost">3</span>Оплата
          </h2>
          <div className="space-y-2">
            {PAYMENT.map((p) => (
              <Choice key={p.id} checked={f.payment === p.id} onSelect={() => set("payment", p.id)} title={p.label} sub={p.sub} />
            ))}
          </div>
        </section>

        <button type="submit" disabled={!c.cart.lines.length} className="w-full rounded-full bg-pine py-4 text-lg font-bold text-white hover:bg-pine-600 disabled:opacity-40 lg:hidden">
          Підтвердити замовлення
        </button>
      </form>

      <aside className="order-first h-max min-w-0 space-y-5 lg:order-none rounded-3xl bg-white p-5 sm:p-6 ring-1 ring-slate/5 lg:sticky lg:top-24">
        <h2 className="font-slab text-xl font-bold">Ваше замовлення</h2>
        <OrderLines c={c} />
        <PromoInput c={c} />
        <Totals c={c} />
        <button
          type="button"
          onClick={() => (document.querySelector("form") as HTMLFormElement).requestSubmit()}
          disabled={!c.cart.lines.length}
          className="hidden w-full rounded-full bg-pine py-4 text-lg font-bold text-white hover:bg-pine-600 disabled:opacity-40 lg:block"
        >
          Підтвердити замовлення
        </button>
        <p className="text-center text-xs text-slate/40">Натискаючи кнопку, ви погоджуєтесь з договором публічної оферти</p>
      </aside>
    </main>
  );
}
