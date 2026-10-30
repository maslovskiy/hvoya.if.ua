// PROTOTYPE — stub catalogue. Names/prices for "Віденська" and "Лапландська" come from the old site;
// the rest are plausible fillers so every category section has something to render.

export type TreeKind = "green" | "blue" | "snow";

export type Product = {
  slug: string;
  name: string;
  kind: TreeKind;
  material: string;
  color: string;
  basePrice: number; // price for the smallest size
  oldPrice: number;
  sizes: number[]; // metres
  badge?: "Під замовлення" | "Хіт" | "Новинка";
  blurb: string;
  seed: number; // varies the tree illustration
};

export const SIZE_SURCHARGE: Record<string, number> = {
  "1.5": 0,
  "1.8": 600,
  "2.1": 1300,
  "2.3": 1900,
  "2.5": 2600,
  "3": 4000,
};

export const priceFor = (p: Product, size: number) => p.basePrice + (SIZE_SURCHARGE[String(size)] ?? 0);
export const oldPriceFor = (p: Product, size: number) => p.oldPrice + (SIZE_SURCHARGE[String(size)] ?? 0);

export const formatSize = (s: number) => s.toFixed(1).replace(".", ",").replace(",0", "") + " м";
export const formatUAH = (n: number) => n.toLocaleString("uk-UA").replace(/,/g, " ") + " ₴";

export const CATEGORIES: { kind: TreeKind; title: string; short: string; tagline: string }[] = [
  {
    kind: "green",
    title: "Зелені ялинки",
    short: "Зелені",
    tagline: "Класика, яка виглядає як щойно з карпатського лісу.",
  },
  {
    kind: "blue",
    title: "Блакитні ялинки",
    short: "Блакитні",
    tagline: "Благородний сизий відтінок канадської ялини.",
  },
  {
    kind: "snow",
    title: "Засніжені ялинки",
    short: "Засніжені",
    tagline: "Пухнастий «сніг» на кожній гілочці — зима вдома.",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "karpatska",
    name: "Ялинка лита «Карпатська»",
    kind: "green",
    material: "Лита хвоя",
    color: "Зелений",
    basePrice: 2100,
    oldPrice: 2900,
    sizes: [1.5, 1.8, 2.1, 2.3, 2.5],
    badge: "Хіт",
    blurb: "Густа, рівна, з насиченим зеленим кольором. Найпопулярніша модель сезону.",
    seed: 1,
  },
  {
    slug: "bukovelska",
    name: "Ялинка лита «Буковельська»",
    kind: "green",
    material: "Лита хвоя",
    color: "Зелений",
    basePrice: 3400,
    oldPrice: 4200,
    sizes: [1.5, 1.8, 2.1, 2.3, 2.5, 3],
    blurb: "Широкий силует і м'які кінчики гілок — для просторих вітален.",
    seed: 2,
  },
  {
    slug: "korolivska",
    name: "Ялинка лита «Королівська»",
    kind: "green",
    material: "Лита хвоя",
    color: "Темно-зелений",
    basePrice: 4600,
    oldPrice: 5600,
    sizes: [1.8, 2.1, 2.3, 2.5, 3],
    badge: "Новинка",
    blurb: "Преміальна щільність гілок і глибокий хвойний відтінок.",
    seed: 3,
  },
  {
    slug: "norvezka",
    name: "Ялинка лита «Норвезька» блакитна",
    kind: "blue",
    material: "Лита хвоя",
    color: "Блакитний",
    basePrice: 3900,
    oldPrice: 4700,
    sizes: [1.5, 1.8, 2.1, 2.3],
    badge: "Хіт",
    blurb: "Сизо-блакитна хвоя з легким срібним відблиском.",
    seed: 4,
  },
  {
    slug: "kanadska",
    name: "Ялинка лита «Канадська» блакитна",
    kind: "blue",
    material: "Лита хвоя",
    color: "Блакитний",
    basePrice: 4400,
    oldPrice: 5200,
    sizes: [1.5, 1.8, 2.1, 2.3, 2.5],
    blurb: "Стрункий силует — ідеально для кутів і невеликих кімнат.",
    seed: 5,
  },
  {
    slug: "videnska",
    name: "Ялинка лита «Віденська» засніжена",
    kind: "snow",
    material: "Лита хвоя",
    color: "Засніжений",
    basePrice: 5100,
    oldPrice: 5900,
    sizes: [1.5, 1.8, 2.1, 2.3],
    badge: "Під замовлення",
    blurb: "Рясне напилення «снігу», яке не обсипається.",
    seed: 6,
  },
  {
    slug: "laplandska",
    name: "Ялинка лита «Лапландська» засніжена",
    kind: "snow",
    material: "Лита хвоя",
    color: "Засніжений",
    basePrice: 4900,
    oldPrice: 5800,
    sizes: [1.5, 1.8, 2.1, 2.3, 2.5],
    badge: "Під замовлення",
    blurb: "Пухнаста, як після снігопаду. Виглядає казково з теплими гірляндами.",
    seed: 7,
  },
  {
    slug: "rizdvyana",
    name: "Ялинка лита «Різдвяна» засніжена",
    kind: "snow",
    material: "Лита хвоя",
    color: "Засніжений",
    basePrice: 3600,
    oldPrice: 4300,
    sizes: [1.5, 1.8, 2.1],
    blurb: "Легке засніження — для тих, хто любить і зелень, і зиму.",
    seed: 8,
  },
];

export const FEATURES = [
  {
    title: "Повністю литі гілки",
    text: "Без дешевих ПВХ-вставок: кожна гілка відлита з форми справжньої ялини.",
    icon: "🌲",
  },
  {
    title: "Міцна конструкція",
    text: "Металева підставка — витримає і подарунки, і декількох котиків.",
    icon: "🔩",
  },
  {
    title: "Швидка доставка",
    text: "Відправляємо щодня Новою Поштою. Отримаєте за 1–2 дні по всій Україні.",
    icon: "🚚",
  },
  {
    title: "Сертифікат якості",
    text: "Безпечний, негорючий матеріал без запаху. Документи — за запитом.",
    icon: "📜",
  },
  {
    title: "Власне виробництво",
    text: "Робимо самі в Коломийському районі — тому й ціни від фабрики.",
    icon: "🏭",
  },
  {
    title: "Гарантія та повернення",
    text: "Не сподобалась — повернемо гроші протягом 14 днів.",
    icon: "🛡️",
  },
];

export const REVIEWS = [
  {
    name: "Олена, Київ",
    text: "Дякую гарно!! Забрали ялиночку, я трохи переживала як буде виглядати, але розклали, а вона дуже красива 😍 Дякую за швидку відправку 🤍",
    tree: "Карпатська, 2,1 м",
  },
  {
    name: "Ірина, Львів",
    text: "Нарешті дійшли руки, щоб відзняти відео з ялиночкою ❤️ Неймовірна красуня і дуже якісна 👍",
    tree: "Лапландська, 1,8 м",
  },
  {
    name: "Андрій, Одеса",
    text: "Дякую за ялинку! Чудова якість, максимально натурально виглядає і дуже вишукано 🥰",
    tree: "Норвезька, 2,3 м",
  },
  {
    name: "Марта, Івано-Франківськ",
    text: "Добрий вечір, величезне дякуємо за неймовірну Красуню-ялиночку 🤗 Діти в захваті!",
    tree: "Віденська, 1,5 м",
  },
  {
    name: "Сергій, Дніпро",
    text: "Друга ялинка від вас — перша стоїть вже третій рік як нова. Рекомендую всім.",
    tree: "Королівська, 2,5 м",
  },
];

export const CONTACTS = {
  hours: "Пн–Сб, 08:00–22:00",
  shipping: "Відправки кожного дня",
  email: "hvoyainua@gmail.com",
  instagram: "@hvoya.in.ua",
  phone: "+380 (00) 000-00-00",
  legal: [
    "ФОП Кравчук Марія Петрівна",
    "ЄДРПОУ: 1805005188",
    "Офіс: с. Ковалівка, вул. Зелена 6",
    "Виробництво: с. Ковалівка, Коломийський район, Івано-Франківська область",
  ],
};

export const HAPPY_CLIENTS = 13452;

// Countdown target for the "prices will go up" promo.
export const PRICE_RISE_AT = new Date("2026-11-20T00:00:00+02:00");
