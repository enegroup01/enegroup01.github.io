"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { siemensProducts } from "@/lib/data";
import { motion } from "framer-motion";
import { useState } from "react";

export function SiemensShowcase() {
  const [active, setActive] = useState(0);
  const product = siemensProducts[active];

  return (
    <section id="siemens" className="section-pad relative overflow-hidden bg-[#f4fbfa]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,251,250,0.98),rgba(244,251,250,0.9),rgba(244,251,250,0.7))]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Siemens / Engineering Software"
          title="Siemens 工程軟體方案"
          text="此區明確採用 Siemens 綠作為產品識別色；四組產品以 segmented control 管理，支援後續替換真實產品名稱、截圖與案例照片。"
        />
        <div className="mt-12 flex flex-wrap gap-2" role="tablist" data-reveal>
          {siemensProducts.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              className="border px-5 py-3 font-mono text-xs uppercase tracking-[0.2em] transition"
              style={{
                borderColor: index === active ? "#008f7e" : "rgba(15, 23, 42, 0.14)",
                color: index === active ? "#ffffff" : "#5f6b7a",
                background: index === active ? "#008f7e" : "rgba(255,255,255,0.78)"
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="metal-panel p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-siemens">
              Active Module
            </p>
            <h3 className="mt-5 text-4xl font-semibold text-mist">{product.title}</h3>
            <p className="mt-5 leading-8 text-steel">{product.text}</p>
            <div className="mt-8 grid gap-3">
              {product.modules.map((module) => (
                <div key={module} className="flex items-center justify-between border-b border-slate-900/10 py-3 font-mono text-xs uppercase tracking-[0.18em] text-steel">
                  <span>{module}</span>
                  <span className="h-2 w-2 rounded-full bg-siemens" />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div key={`${product.id}-gallery`} initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }} className="grid min-h-[500px] grid-cols-2 gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={`relative overflow-hidden border border-siemens/20 bg-white/80 shadow-[0_18px_60px_rgba(0,143,126,0.08)] ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
                <div className="absolute inset-0 bg-precision-grid bg-[size:34px_34px] opacity-40" />
                <div className="absolute inset-6 border border-siemens/15" />
                <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-steel">Gallery 0{index + 1}</div>
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-siemens to-transparent" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
