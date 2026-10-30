// PROTOTYPE — Хвоя storefront redesign.
// Landing: 3 variants (A Editorial, B Storefront, C Winter story) on "/".
// Product: 2 variants (A Classic split, B Height configurator) on "/product/:slug".
// Checkout: 2 variants (A One page, B Stepper) on "/checkout".
// Switch with ?variant= or the floating bar / ← → keys.
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import "./index.css";
import { CartProvider } from "./cart";
import { PRODUCTS } from "./data";
import { CartDrawer } from "./components/ui";
import { SlimHeader } from "./components/SlimHeader";
import { Footer } from "./components/Footer";
import { PrototypeSwitcher, useVariant, type VariantDef } from "./components/PrototypeSwitcher";
import * as LA from "./pages/landing/LandingA";
import * as LB from "./pages/landing/LandingB";
import * as LC from "./pages/landing/LandingC";
import * as PA from "./pages/product/ProductA";
import * as PB from "./pages/product/ProductB";
import * as CA from "./pages/checkout/CheckoutA";
import * as CB from "./pages/checkout/CheckoutB";
import { useCheckout } from "./pages/checkout/shared";

const LANDING: VariantDef[] = [
  { key: "A", name: LA.name },
  { key: "B", name: LB.name },
  { key: "C", name: LC.name },
];
const PRODUCT: VariantDef[] = [
  { key: "A", name: PA.name },
  { key: "B", name: PB.name },
];
const CHECKOUT: VariantDef[] = [
  { key: "A", name: CA.name },
  { key: "B", name: CB.name },
];

function Landing() {
  const v = useVariant(LANDING);
  return (
    <>
      {v === "A" && <LA.LandingA />}
      {v === "B" && <LB.LandingB />}
      {v === "C" && <LC.LandingC />}
      <PrototypeSwitcher variants={LANDING} page="Головна" />
    </>
  );
}

function ProductPage() {
  const { slug } = useParams();
  const v = useVariant(PRODUCT);
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return <Navigate to="/" replace />;
  return (
    <>
      <SlimHeader />
      {/* key resets size/gallery state when moving between products */}
      {v === "A" && <PA.ProductA key={product.slug} product={product} />}
      {v === "B" && <PB.ProductB key={product.slug} product={product} />}
      {v === "A" && <Footer />}
      <PrototypeSwitcher variants={PRODUCT} page="Товар" />
    </>
  );
}

function CheckoutPage() {
  const v = useVariant(CHECKOUT);
  const c = useCheckout(); // shared form state, so switching variants keeps what you typed
  return (
    <>
      <SlimHeader showCart={false} />
      {v === "A" && <CA.CheckoutA c={c} />}
      {v === "B" && <CB.CheckoutB c={c} />}
      <PrototypeSwitcher variants={CHECKOUT} page="Оформлення" />
    </>
  );
}

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
);
