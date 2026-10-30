// Checkout variant B — "Stepper": one question at a time (Кошик → Контакти → Доставка → Оплата), collapsible summary on top.
import { useState } from "react";
import { formatUAH } from "../../data";
import { CITIES, DELIVERY, PAYMENT, branchesFor, Choice, Field, inputCls, OrderLines, PromoInput, Success, Totals, type Checkout } from "./shared";

export const name = "Покроковий";

const STEPS = ["Кошик", "Контакти", "Доставка", "Оплата"];

export function CheckoutB({ c }: { c: Checkout }) {
  const [step, setStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  if (c.placed) return <Success c={c} />;
  const { f, set } = c;
  const city = CITIES.find((x) => x.name === f.city);

  const canNext = [c.cart.lines.length > 0, f.name.trim() && f.phone.trim(), f.delivery === "courier" ? f.address.trim() : f.branch, true][step];

  return (
    <main className="mx-auto max-w-xl px-6 py-8">
      {/* progress */}
      <ol className="mb-8 grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button type="button" disabled={i > step} onClick={() => setStep(i)} className="w-full text-left">
              <span className={`block h-1.5 rounded-full ${i <= step ? "bg-pine" : "bg-slate/10"}`} />
              <span className={`mt-2 block text-xs font-semibold ${i === step ? "text-slate" : "text-slate/40"}`}>
                {i + 1}. {s}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setShowSummary((v) => !v)}
          className="mb-6 flex w-full items-center justify-between rounded-2xl bg-frost px-5 py-3 text-sm font-semibold"
        >
          <span>
            {showSummary ? "Сховати" : "Показати"} замовлення ({c.cart.count})
          </span>
          <span className="font-extrabold">{formatUAH(c.total)}</span>
        </button>
      )}
      {step > 0 && showSummary && (
        <div className="mb-6 space-y-4 rounded-2xl bg-white p-5 ring-1 ring-slate/5">
          <OrderLines c={c} editable={false} />
          <Totals c={c} />
        </div>
      )}

      <div className="min-h-[340px] space-y-5">
        {step === 0 && (
          <>
            <h1 className="font-slab text-3xl font-extrabold">Ваше замовлення</h1>
            <div className="rounded-3xl bg-white p-5 ring-1 ring-slate/5">
              <OrderLines c={c} />
            </div>
            <PromoInput c={c} />
            <Totals c={c} />
          </>
        )}
        {step === 1 && (
          <>
            <h1 className="font-slab text-3xl font-extrabold">Хто отримує?</h1>
            <Field label="ПІБ повністю" hint="Як у паспорті — для отримання на Новій Пошті">
              <input autoFocus value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Іван Іванович Іваненко" className={inputCls} />
            </Field>
            <Field label="Телефон">
              <div className="flex">
                <span className="flex items-center rounded-l-xl bg-frost px-3 text-sm font-semibold ring-1 ring-slate/15">🇺🇦 +380</span>
                <input value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(00) 000-00-00" className={`${inputCls} rounded-l-none`} />
              </div>
            </Field>
            <Field label="Email (необов'язково)">
              <input value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="для чеку" className={inputCls} />
            </Field>
          </>
        )}
        {step === 2 && (
          <>
            <h1 className="font-slab text-3xl font-extrabold">Куди доставити?</h1>
            <Field label="Місто" hint={city ? `Україна, ${city.region}, місто ${city.name}` : undefined}>
              <input list="cities-b" value={f.city} onChange={(e) => set("city", e.target.value)} className={inputCls} />
              <datalist id="cities-b">
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
              <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                {branchesFor(f.city || "Львів").map((b) => (
                  <Choice key={b} checked={f.branch === b} onSelect={() => set("branch", b)} title={b.split(":")[0]} sub={b.split(": ")[1]} />
                ))}
              </div>
            )}
          </>
        )}
        {step === 3 && (
          <>
            <h1 className="font-slab text-3xl font-extrabold">Як зручно оплатити?</h1>
            <div className="space-y-2">
              {PAYMENT.map((p) => (
                <Choice key={p.id} checked={f.payment === p.id} onSelect={() => set("payment", p.id)} title={p.label} sub={p.sub} />
              ))}
            </div>
            <Field label="Коментар">
              <textarea value={f.comment} onChange={(e) => set("comment", e.target.value)} rows={2} placeholder="Коментар до замовлення" className={inputCls} />
            </Field>
            <div className="rounded-2xl bg-white p-5 text-sm ring-1 ring-slate/5">
              <p className="font-semibold">{f.name || "—"}, +380 {f.phone}</p>
              <p className="text-slate/60">{DELIVERY.find((d) => d.id === f.delivery)!.label}</p>
              <p className="text-slate/60">{f.delivery === "courier" ? f.address : f.branch}</p>
            </div>
            <Totals c={c} />
          </>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="rounded-full px-6 py-4 font-bold ring-1 ring-slate/20 hover:ring-slate">
            ← Назад
          </button>
        )}
        <button
          type="button"
          disabled={!canNext}
          onClick={() => (step === 3 ? c.place() : setStep(step + 1))}
          className="flex-1 rounded-full bg-pine py-4 text-lg font-bold text-white hover:bg-pine-600 disabled:opacity-40"
        >
          {step === 3 ? `Оплатити ${formatUAH(c.total)}` : "Далі →"}
        </button>
      </div>
    </main>
  );
}
