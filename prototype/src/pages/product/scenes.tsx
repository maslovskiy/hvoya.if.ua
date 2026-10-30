// Placeholder "photos" for the product gallery, styled after the old site's shots (white panelled wall, oak floor).
import type { ReactNode } from "react";
import type { Product } from "../../data";
import { TreeArt } from "../../components/brand";

export function RoomScene({ product, zoom = 1, origin = "50% 100%" }: { product: Product; zoom?: number; origin?: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f4f4f2]">
      <div className="absolute inset-x-0 top-0 h-[78%]">
        <div className="grid h-full grid-cols-3 gap-[4%] p-[5%]">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="rounded-sm border-2 border-white shadow-[inset_0_0_0_1px_rgba(0,0,0,.05)]" />
          ))}
        </div>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-[22%]"
        style={{ background: "repeating-linear-gradient(90deg,#c9a57f 0 70px,#bf9a73 70px 72px,#cfac86 72px 150px,#c39f78 150px 152px)" }}
      />
      <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transformOrigin: origin }}>
        <TreeArt kind={product.kind} seed={product.seed} className="absolute bottom-[8%] left-1/2 h-[72%] -translate-x-1/2" />
      </div>
    </div>
  );
}

export function BoxScene() {
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-frost">
      <div className="relative h-1/3 w-2/3 rounded-lg bg-[#b98f62] shadow-xl">
        <div className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-[#a07a52]" />
        <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-frost font-slab text-xs font-extrabold text-slate">
          ХВОЯ
        </div>
      </div>
    </div>
  );
}

export const GALLERY: { label: string; render: (p: Product) => ReactNode }[] = [
  { label: "Загальний вигляд", render: (p) => <RoomScene product={p} /> },
  { label: "Гілки зблизька", render: (p) => <RoomScene product={p} zoom={3.2} origin="50% 45%" /> },
  { label: "Верхівка", render: (p) => <RoomScene product={p} zoom={2.6} origin="50% 18%" /> },
  { label: "Підставка", render: (p) => <RoomScene product={p} zoom={3} origin="50% 92%" /> },
  { label: "Упаковка", render: () => <BoxScene /> },
];
