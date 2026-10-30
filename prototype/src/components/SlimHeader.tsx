import { Link } from "react-router-dom";
import { Logo } from "./brand";
import { CartButton, useVariantLink } from "./ui";
import { CONTACTS } from "../data";

/** Header for inner pages (product, checkout). */
export function SlimHeader({ showCart = true }: { showCart?: boolean }) {
  const to = useVariantLink();
  return (
    <header className="sticky top-0 z-30 border-b border-slate/5 bg-frost-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
        <Link to={to("/")}>
          <Logo compact />
        </Link>
        <p className="hidden text-xs text-slate/50 md:block">
          🕗 {CONTACTS.hours} · 🚚 {CONTACTS.shipping}
        </p>
        {showCart ? <CartButton /> : <span className="text-xs font-semibold text-slate/50">🔒 Безпечне оформлення</span>}
      </div>
    </header>
  );
}
