# Хвоя — storefront redesign PROTOTYPE

Throwaway UI exploration. **Not production code** — no tests, no backend, cart lives in memory, checkout submits nowhere.

Question it answers: *what should the modernised hvoya.in.ua look like, keeping the old structure
(long landing → tree-type sections → product page → checkout) but using the new Instagram brand (frost-mint + slate "ХВОЯ" logo)?*

```bash
pnpm install
pnpm dev   # http://localhost:5180
```

| Page | Route | Variants (`?variant=`) |
| --- | --- | --- |
| Landing | `/` | **A** Редакційний · **B** Вітрина (filters + list) · **C** Зимова історія (dark, full-bleed chapters) |
| Product | `/product/laplandska` | **A** Класичний (gallery + buy box) · **B** Конфігуратор висоти (tree to scale vs. person & ceiling) |
| Checkout | `/checkout` | **A** Одна сторінка · **B** Покроковий |

Flip variants with the floating black bar at the bottom or the ← / → keys. The `?variant=` param carries over when you
click through from landing → product → checkout (falls back to A where a page has fewer variants).

## Deploy (Cloudflare Workers, static assets)

```bash
pnpm deploy   # vite build && wrangler deploy → worker "hvoya-prototype"
```

`wrangler.jsonc` serves `dist/` with SPA fallback so deep links work. `.env.production` keeps the variant
switcher visible in this review deploy; drop it for any real build.

Tree "photos" are SVG placeholders in the logo's zig-zag style — swap for real photography when folding the winner in.
Promo code `HVOYA10` gives −10% in checkout.
