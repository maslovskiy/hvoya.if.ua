// PROTOTYPE — in-memory cart. No persistence on purpose.
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { PRODUCTS, priceFor, type Product } from "./data";

export type CartLine = { slug: string; size: number; qty: number };

type CartCtx = {
  lines: (CartLine & { product: Product; unit: number })[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, size: number, qty?: number) => void;
  setQty: (slug: string, size: number, qty: number) => void;
  remove: (slug: string, size: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // seeded with the item from the old checkout screenshot so /checkout is never empty
  const [raw, setRaw] = useState<CartLine[]>([{ slug: "laplandska", size: 1.5, qty: 1 }]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CartCtx>(() => {
    const lines = raw.map((l) => {
      const product = PRODUCTS.find((p) => p.slug === l.slug)!;
      return { ...l, product, unit: priceFor(product, l.size) };
    });
    const same = (l: CartLine, slug: string, size: number) => l.slug === slug && l.size === size;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.unit, 0),
      open,
      setOpen,
      add: (slug, size, qty = 1) =>
        setRaw((r) =>
          r.some((l) => same(l, slug, size))
            ? r.map((l) => (same(l, slug, size) ? { ...l, qty: l.qty + qty } : l))
            : [...r, { slug, size, qty }],
        ),
      setQty: (slug, size, qty) =>
        setRaw((r) => (qty <= 0 ? r.filter((l) => !same(l, slug, size)) : r.map((l) => (same(l, slug, size) ? { ...l, qty } : l)))),
      remove: (slug, size) => setRaw((r) => r.filter((l) => !same(l, slug, size))),
      clear: () => setRaw([]),
    };
  }, [raw, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx)!;
