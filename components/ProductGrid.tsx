"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { mitutoyoProducts } from "@/lib/data";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProductGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedProduct = selectedIndex === null ? null : mitutoyoProducts[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") setSelectedIndex((current) => (current === null ? current : (current - 1 + mitutoyoProducts.length) % mitutoyoProducts.length));
      if (event.key === "ArrowRight") setSelectedIndex((current) => (current === null ? current : (current + 1) % mitutoyoProducts.length));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const moveLightbox = (direction: -1 | 1) => {
    setSelectedIndex((current) => (current === null ? current : (current + direction + mitutoyoProducts.length) % mitutoyoProducts.length));
  };

  return (
    <section id="mitutoyo" className="section-pad bg-carbon">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Mitutoyo Product Matrix"
            title="Mitutoyo 量測產品"
            text="原廠授權量測產品矩陣，涵蓋測微器、卡尺、量錶、高度計與內徑量測等現場核心檢驗工具。"
          />
          <div className="inline-flex w-fit items-center gap-3 border border-mitutoyo/35 bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-mitutoyo shadow-orange-glow" data-reveal>
            Authorized Product
            <span className="h-2 w-12 bg-mitutoyo" />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between md:hidden" aria-hidden="true">
          <div className="flex items-center gap-2 text-mitutoyo">
            <ChevronLeft size={18} strokeWidth={1.6} />
            <div className="product-swipe-cue relative h-1.5 w-24 overflow-hidden bg-mitutoyo/15">
              <span className="absolute inset-y-0 left-0 w-9 bg-mitutoyo" />
            </div>
            <ChevronRight size={18} strokeWidth={1.6} />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">01 / 09</p>
        </div>

        <div className="product-scroll mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 md:mt-14 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3" data-stagger>
          {mitutoyoProducts.map((product, index) => (
            <article key={product.name} className="group relative w-[82vw] shrink-0 snap-center overflow-hidden border border-mitutoyo/20 bg-white shadow-[0_20px_70px_rgba(42,55,78,0.08)] transition duration-500 hover:-translate-y-1 hover:border-mitutoyo/45 hover:shadow-[0_28px_90px_rgba(243,107,33,0.14)] md:w-auto">
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="relative block h-72 w-full overflow-hidden bg-gradient-to-br from-[#fff8f3] via-white to-[#eef3f9] p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-mitutoyo focus-visible:ring-offset-2"
                aria-label={`檢視 ${product.name} 大圖`}
              >
                <div className="absolute inset-x-5 top-5 h-24 border border-mitutoyo/15">
                  <div className="absolute left-4 right-4 top-1/2 h-px bg-mitutoyo/20" />
                  <div className="absolute bottom-4 left-1/2 top-4 w-px bg-mitutoyo/20" />
                </div>
                <div className="product-image-stage absolute inset-5 bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.07),0_18px_55px_rgba(42,55,78,0.12)]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mitutoyo via-mitutoyo/30 to-transparent" />
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-5 transition duration-700 group-hover:scale-[1.035]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 82vw"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.72)_46%,transparent_52%)] opacity-0 transition duration-700 group-hover:translate-x-28 group-hover:opacity-80" />
                <div className="absolute left-5 top-5 bg-white/88 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mitutoyo shadow-[0_10px_28px_rgba(42,55,78,0.08)]">
                  0{index + 1}
                </div>
                <span className="absolute bottom-5 right-5 inline-flex h-11 w-11 items-center justify-center border border-mitutoyo/25 bg-white/90 text-mitutoyo shadow-[0_12px_30px_rgba(42,55,78,0.12)] transition duration-300 group-hover:bg-mitutoyo group-hover:text-white">
                  <Maximize2 size={18} strokeWidth={1.5} />
                </span>
              </button>
              <div className="relative p-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-mitutoyo via-mitutoyo/40 to-transparent" />
                <h3 className="text-2xl font-semibold text-ink">{product.name}</h3>
                <p className="mt-2 min-h-10 font-mono text-[11px] uppercase tracking-[0.13em] text-mitutoyo">{product.englishName}</p>
                <div className="mt-5 space-y-3">
                  {product.features.map((feature) => (
                    <p key={feature} className="relative pl-4 text-sm leading-6 text-steel before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:bg-mitutoyo">
                      {feature}
                    </p>
                  ))}
                </div>
                <div className="mt-6 border-t border-slate-900/10 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">Core Spec</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink">{product.spec}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedProduct ? (
        <div className="fixed inset-0 z-[90] bg-slate-950/72 p-4 backdrop-blur-md md:p-8" role="dialog" aria-modal="true" aria-label={`${selectedProduct.name} 大圖`}>
          <button type="button" aria-label="關閉大圖" onClick={() => setSelectedIndex(null)} className="absolute inset-0 cursor-default" />
          <div className="relative mx-auto flex h-full max-w-6xl flex-col overflow-hidden border border-white/20 bg-white shadow-[0_40px_140px_rgba(0,0,0,0.34)]">
            <div className="flex items-center justify-between border-b border-slate-900/10 px-4 py-3 md:px-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mitutoyo">Mitutoyo Product 0{selectedIndex! + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink md:text-2xl">{selectedProduct.name}</h3>
              </div>
              <button type="button" onClick={() => setSelectedIndex(null)} className="grid h-11 w-11 place-items-center border border-slate-900/10 text-ink transition hover:border-mitutoyo/40 hover:text-mitutoyo" aria-label="關閉大圖">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            <div className="grid min-h-0 flex-1 gap-0 lg:grid-cols-[1fr_0.42fr]">
              <div className="relative min-h-[48vh] bg-gradient-to-br from-white via-[#fff8f3] to-[#eef3f9]">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-contain p-6 md:p-12" sizes="(min-width: 1024px) 65vw, 100vw" priority />
                <button type="button" onClick={() => moveLightbox(-1)} className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-slate-900/10 bg-white/88 text-ink shadow-[0_12px_30px_rgba(42,55,78,0.14)] transition hover:border-mitutoyo/40 hover:text-mitutoyo" aria-label="上一個產品">
                  <ChevronLeft size={22} strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => moveLightbox(1)} className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-slate-900/10 bg-white/88 text-ink shadow-[0_12px_30px_rgba(42,55,78,0.14)] transition hover:border-mitutoyo/40 hover:text-mitutoyo" aria-label="下一個產品">
                  <ChevronRight size={22} strokeWidth={1.5} />
                </button>
              </div>
              <aside className="overflow-y-auto border-t border-slate-900/10 p-6 lg:border-l lg:border-t-0">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-mitutoyo">{selectedProduct.englishName}</p>
                <div className="mt-6 space-y-4">
                  {selectedProduct.features.map((feature) => (
                    <p key={feature} className="relative pl-5 leading-7 text-steel before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:bg-mitutoyo">
                      {feature}
                    </p>
                  ))}
                </div>
                <div className="mt-8 border-t border-slate-900/10 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">Core Spec</p>
                  <p className="mt-3 text-lg font-semibold leading-7 text-ink">{selectedProduct.spec}</p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
