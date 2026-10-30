// PROTOTYPE — checkout form state + field primitives shared by both checkout variants. Nothing is submitted anywhere.
import { useState, type ReactNode } from "react";
import { useCart } from "../../cart";
import { formatSize, formatUAH } from "../../data";
import { KIND_BG, TreeArt } from "../../components/brand";
import { Qty } from "../../components/ui";

export const CITIES = [
  { name: "Київ", region: "Київська область" },
  { name: "Львів", region: "Львівська область" },
  { name: "Одеса", region: "Одеська область" },
  { name: "Харків", region: "Харківська область" },
  { name: "Дніпро", region: "Дніпропетровська область" },
  { name: "Івано-Франківськ", region: "Івано-Франківська область" },
  { name: "Коломия", region: "Івано-Франківська область" },
  { name: "Вінниця", region: "Вінницька область" },
];

export const DELIVERY = [
  { id: "branch", label: "Нова Пошта · відділення", eta: "1–2 дні", price: 0, note: "Безкоштовно" },
  { id: "locker", label: "Нова Пошта · поштомат", eta: "1–2 дні", price: 0, note: "Безкоштовно (до 1,8 м)" },
  { id: "courier", label: "Нова Пошта · кур'єр", eta: "від 1 дня", price: 232.5, note: "від 232,5 ₴" },
] as const;

export const PAYMENT = [
  { id: "card", label: "Карткою онлайн", sub: "Visa, Mastercard, Apple Pay, Google Pay через WayForPay" },
  { id: "cod", label: "Оплата при отриманні", sub: "Накладений платіж Нова Пошта (+2% комісія перевізника)" },
] as const;

export const branchesFor = (city: string) =>
  Array.from({ length: 6 }, (_, i) => `Відділення №${i * 7 + 1}: ${city}, вул. ${["Шевченка", "Франка", "Грушевського", "Лесі Українки", "Січових Стрільців", "Бандери"][i]}, ${10 + i * 3}`);

export function useCheckout() {
  const cart = useCart();
  const [f, setF] = useState({
    city: "Львів",
    delivery: "branch" as (typeof DELIVERY)[number]["id"],
    branch: "",
    address: "",
    name: "",
    phone: "",
    email: "",
    comment: "",
    promo: "",
    promoApplied: false,
    payment: "card" as (typeof PAYMENT)[number]["id"],
  });
  const set = <K extends keyof typeof f>(k: K, v: (typeof f)[K]) => setF((s) => ({ ...s, [k]: v }));
  const shipping = DELIVERY.find((d) => d.id === f.delivery)!.price;
  const discount = f.promoApplied ? Math.round(cart.total * 0.1) : 0;
  const total = cart.total - discount + shipping;
  const [placed, setPlaced] = useState<string | null>(null);
  const place = () => {
    setPlaced(`HV-${Math.floor(100000 + Math.random() * 899999)}`);
  };
  return { f, set, cart, shipping, discount, total, placed, place };
}

export type Checkout = ReturnType<typeof useCheckout>;

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate/50">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl bg-white px-4 py-3 text-[15px] ring-1 ring-slate/15 outline-none transition placeholder:text-slate/35 focus:ring-2 focus:ring-pine";

export function Choice({ checked, onSelect, title, sub, right }: { checked: boolean; onSelect: () => void; title: string; sub?: string; right?: string }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition ${checked ? "bg-white ring-2 ring-pine" : "bg-white/60 ring-1 ring-slate/10 hover:ring-slate/30"}`}
    >
      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ring-2 ${checked ? "ring-pine" : "ring-slate/25"}`}>
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-pine" />}
      </span>
      <span className="flex-1">
        <span className="block font-semibold">{title}</span>
        {sub && <span className="block text-xs text-slate/50">{sub}</span>}
      </span>
      {right && <span className="text-sm font-semibold text-slate/70">{right}</span>}
    </button>
  );
}

export function OrderLines({ c, editable = true }: { c: Checkout; editable?: boolean }) {
  return (
    <div className="space-y-3">
      {c.cart.lines.map((l) => (
        <div key={l.slug + l.size} className="flex items-center gap-3">
          <div className="relative grid h-16 w-14 shrink-0 place-items-end rounded-xl" style={{ background: KIND_BG[l.product.kind] }}>
            <TreeArt kind={l.product.kind} seed={l.product.seed} className="mx-auto h-14" />
            {!editable && <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-slate text-[10px] font-bold text-frost">{l.qty}</span>}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{l.product.name}</p>
            <p className="text-xs text-slate/50">Висота {formatSize(l.size)}</p>
            {editable && (
              <div className="mt-1">
                <Qty value={l.qty} onChange={(q) => c.cart.setQty(l.slug, l.size, q)} />
              </div>
            )}
          </div>
          <span className="text-sm font-bold">{formatUAH(l.unit * l.qty)}</span>
        </div>
      ))}
    </div>
  );
}

export function Totals({ c }: { c: Checkout }) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between">
        <dt className="text-slate/60">Товари</dt>
        <dd>{formatUAH(c.cart.total)}</dd>
      </div>
      {c.discount > 0 && (
        <div className="flex justify-between text-pine">
          <dt>Промокод HVOYA10</dt>
          <dd>−{formatUAH(c.discount)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="text-slate/60">Доставка</dt>
        <dd>{c.shipping ? formatUAH(c.shipping) : "Безкоштовно"}</dd>
      </div>
      <div className="flex justify-between border-t border-slate/10 pt-3 text-lg font-extrabold">
        <dt>Загальна сума</dt>
        <dd>{formatUAH(c.total)}</dd>
      </div>
    </dl>
  );
}

export function PromoInput({ c }: { c: Checkout }) {
  return (
    <div className="flex gap-2">
      <input value={c.f.promo} onChange={(e) => c.set("promo", e.target.value)} placeholder="Промокод (спробуйте HVOYA10)" className={inputCls} />
      <button
        type="button"
        onClick={() => c.set("promoApplied", c.f.promo.trim().toUpperCase() === "HVOYA10")}
        className="rounded-xl bg-slate px-5 text-sm font-bold text-frost hover:bg-slate-900"
      >
        OK
      </button>
    </div>
  );
}

export function Success({ c }: { c: Checkout }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-pine text-4xl text-white">✓</div>
      <h1 className="mt-6 font-slab text-3xl font-extrabold">Дякуємо за замовлення!</h1>
      <p className="mt-3 text-slate/60">
        Замовлення <b className="text-slate">{c.placed}</b> прийнято. Ми зателефонуємо протягом 15 хвилин для підтвердження, а ТТН надішлемо в
        Viber/SMS.
      </p>
      <p className="mt-6 text-xs text-slate/40">(Прототип — замовлення нікуди не надсилається.)</p>
    </div>
  );
}
