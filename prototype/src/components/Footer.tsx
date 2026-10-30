import { siFacebook, siInstagram, siTelegram, siTiktok, siViber, type SimpleIcon } from "simple-icons";
import { CONTACTS } from "../data";
import { Logo } from "./brand";

const SOCIALS: SimpleIcon[] = [siInstagram, siFacebook, siTiktok, siTelegram, siViber];

function BrandIcon({ icon, className = "h-[18px] w-[18px]" }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}

export function Footer({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <footer id="contacts" className={dark ? "bg-slate-900 text-frost" : "bg-frost text-slate"}>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo inverted={dark} />
          <p className={`max-w-xs text-sm ${dark ? "text-frost/60" : "text-slate/60"}`}>
            Фабрика штучних ялинок з литою хвоєю. Робимо самі, відправляємо щодня по всій Україні.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.slug}
                href="#"
                aria-label={s.title}
                title={s.title}
                style={{ ["--brand" as string]: `#${s.hex}` }}
                className={`grid h-10 w-10 place-items-center rounded-full transition hover:bg-[var(--brand)] hover:text-white ${dark ? "bg-white/10" : "bg-white"}`}
              >
                <BrandIcon icon={s} />
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <h3 className="mb-3 font-slab text-base font-bold">Контакти</h3>
          <p>{CONTACTS.hours}</p>
          <p>{CONTACTS.shipping}</p>
          <p>{CONTACTS.email}</p>
          <p>{CONTACTS.instagram}</p>
          <div className="space-y-1 pt-3">
            <a href="#" className="block text-gold hover:underline">
              Договір публічної оферти
            </a>
            <a href="#" className="block text-gold hover:underline">
              Гарантія та повернення
            </a>
          </div>
        </div>
        <div className={`space-y-1.5 text-xs leading-relaxed ${dark ? "text-frost/50" : "text-slate/50"}`}>
          <h3 className={`mb-3 font-slab text-base font-bold ${dark ? "text-frost" : "text-slate"}`}>Реквізити</h3>
          {CONTACTS.legal.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
      <div className={`border-t py-5 text-center text-xs ${dark ? "border-white/10 text-frost/40" : "border-slate/10 text-slate/40"}`}>
        © 2026 Хвоя · Штучні ялинки
      </div>
    </footer>
  );
}
