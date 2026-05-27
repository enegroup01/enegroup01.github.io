"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { siemensProducts } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Layers3, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SiemensShowcase() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedProduct = selectedIndex === null ? null : siemensProducts[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowLeft") setSelectedIndex((current) => (current === null ? current : (current - 1 + siemensProducts.length) % siemensProducts.length));
      if (event.key === "ArrowRight") setSelectedIndex((current) => (current === null ? current : (current + 1) % siemensProducts.length));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  const moveDetail = (direction: -1 | 1) => {
    setSelectedIndex((current) => (current === null ? current : (current + direction + siemensProducts.length) % siemensProducts.length));
  };

  return (
    <section id="siemens" className="section-pad-siemens relative overflow-hidden bg-[#f4fbfa]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,251,250,0.98),rgba(244,251,250,0.9),rgba(244,251,250,0.7))]" />
      <div className="absolute inset-0 bg-precision-grid bg-[size:80px_80px] opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Siemens / Engineering Software"
          title="Siemens 工程軟體方案"
          text="整合 CAD 設計、電子散熱模擬、有限元素分析與 CAM 製造流程，讓工程資料從設計驗證一路銜接到加工現場。"
        />

        <div className="mt-10 flex items-center justify-between md:hidden" aria-hidden="true">
          <div className="flex items-center gap-2 text-siemens">
            <ChevronLeft size={18} strokeWidth={1.6} />
            <div className="product-swipe-cue relative h-1.5 w-24 overflow-hidden bg-siemens/15">
              <span className="absolute inset-y-0 left-0 w-9 bg-siemens" />
            </div>
            <ChevronRight size={18} strokeWidth={1.6} />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">01 / 04</p>
        </div>

        <div className="siemens-scroll mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 md:mt-12 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-4" data-stagger>
          {siemensProducts.map((product, index) => (
            <motion.button
              key={product.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="group relative w-[82vw] shrink-0 snap-center overflow-hidden border border-siemens/20 bg-white text-left shadow-[0_18px_58px_rgba(0,143,126,0.08)] transition duration-500 hover:border-siemens/45 hover:shadow-[0_28px_90px_rgba(0,143,126,0.16)] md:w-auto"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#eff8f7]">
                <Image
                  src={product.image}
                  alt={product.chineseName}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/58 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center border border-white/60 bg-white/88 text-siemens shadow-[0_14px_38px_rgba(42,55,78,0.16)] transition duration-300 group-hover:bg-siemens group-hover:text-white">
                  <Maximize2 size={17} strokeWidth={1.5} />
                </span>
              </div>

              <div className="p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-siemens">{product.category}</p>
                <h3 className="mt-3 text-xl font-semibold leading-tight text-mist">{product.title}</h3>
                <p className="mt-2 min-h-10 font-mono text-[10px] uppercase tracking-[0.12em] text-steel">{product.englishName}</p>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-steel">{product.text}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-900/10 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">View Detail</span>
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-siemens transition-all duration-500 group-hover:w-20" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct ? (
          <motion.div
            className="fixed inset-0 z-[90] bg-slate-950/70 p-4 backdrop-blur-md md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProduct.title} 詳細資訊`}
          >
            <button type="button" aria-label="關閉 Siemens 詳細資訊" onClick={() => setSelectedIndex(null)} className="absolute inset-0 cursor-default" />
            <motion.div
              className="relative mx-auto grid h-full max-w-7xl overflow-hidden border border-white/20 bg-white shadow-[0_44px_150px_rgba(0,0,0,0.36)] lg:grid-cols-[1.22fr_0.78fr]"
              initial={{ y: 28, scale: 0.98, clipPath: "inset(8% 8% 8% 8%)" }}
              animate={{ y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ y: 20, scale: 0.98, clipPath: "inset(8% 8% 8% 8%)" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <button type="button" onClick={() => setSelectedIndex(null)} className="fixed right-5 top-5 z-[95] grid h-11 w-11 place-items-center border border-slate-900/10 bg-white/92 text-ink shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition hover:border-siemens/40 hover:text-siemens md:right-8 md:top-8" aria-label="關閉 Siemens 詳細資訊">
                <X size={20} strokeWidth={1.5} />
              </button>
              <div className="relative min-h-[42vh] bg-[#eef8f7] lg:min-h-0">
                <Image src={selectedProduct.image} alt={selectedProduct.chineseName} fill className="object-contain p-4 md:p-7" sizes="(min-width: 1024px) 64vw, 100vw" priority />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-siemens to-transparent" />
                <div className="absolute left-4 top-4 bg-white/92 px-4 py-3 shadow-[0_14px_40px_rgba(42,55,78,0.14)] backdrop-blur">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">Siemens Product 0{selectedIndex! + 1}</p>
                  <p className="mt-1 text-lg font-semibold text-mist">{selectedProduct.title}</p>
                </div>
                <button type="button" onClick={() => moveDetail(-1)} className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-slate-900/10 bg-white/90 text-ink shadow-[0_12px_30px_rgba(42,55,78,0.14)] transition hover:border-siemens/40 hover:text-siemens" aria-label="上一個 Siemens 產品">
                  <ChevronLeft size={22} strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => moveDetail(1)} className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-slate-900/10 bg-white/90 text-ink shadow-[0_12px_30px_rgba(42,55,78,0.14)] transition hover:border-siemens/40 hover:text-siemens" aria-label="下一個 Siemens 產品">
                  <ChevronRight size={22} strokeWidth={1.5} />
                </button>
              </div>

              <aside className="min-h-0 overflow-y-auto border-t border-slate-900/10 p-6 lg:border-l lg:border-t-0 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-siemens">{selectedProduct.category}</p>
                    <h3 className="mt-4 text-3xl font-semibold leading-tight text-mist">{selectedProduct.chineseName}</h3>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-steel">{selectedProduct.englishName}</p>
                  </div>
                </div>

                <p className="mt-6 leading-8 text-steel">{selectedProduct.text}</p>

                <div className="mt-7 grid gap-2">
                  {selectedProduct.modules.map((module) => (
                    <div key={module} className="flex items-center justify-between border-b border-slate-900/10 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-steel">
                      <span>{module}</span>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: selectedProduct.accent }} />
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="flex items-center gap-2">
                    <Layers3 size={18} strokeWidth={1.4} className="text-siemens" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">Core Functions</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {selectedProduct.coreFunctions.map((item) => (
                      <p key={item} className="relative pl-5 text-sm leading-7 text-steel before:absolute before:left-0 before:top-3 before:h-1.5 before:w-1.5 before:bg-siemens">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">Key Advantages</p>
                  {selectedProduct.features.map((feature) => (
                    <div key={feature} className="flex gap-3 border border-siemens/15 bg-[#f4fbfa] p-4">
                      <CheckCircle2 className="mt-0.5 shrink-0 text-siemens" size={18} strokeWidth={1.6} />
                      <p className="text-sm leading-6 text-mist">{feature}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
