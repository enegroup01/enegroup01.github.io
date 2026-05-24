"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { RadiantIndustrialShader } from "@/components/RadiantIndustrialShader";
import { machiningSteps } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function MachiningStory() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".process-wrap", start: "top 65%", end: "bottom 35%", scrub: true }
        }
      );
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
        gsap.fromTo(step, { autoAlpha: 0.2, x: -34 }, { autoAlpha: 1, x: 0, scrollTrigger: { trigger: step, start: "top 70%", end: "bottom 55%", scrub: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="machining" ref={ref} className="section-pad relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-precision-grid bg-[size:72px_72px] opacity-70" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Industrial Design Precision Machining"
          title="從圖面、公差到交付，每一步都能被檢驗"
          text="整合工業設計、精密零件加工、CNC 金屬切削、客製化製造與品質檢驗，讓設計圖面、加工公差與交付結果形成可驗證的工程流程。"
        />
        <div className="process-wrap mt-12 grid gap-8 lg:grid-cols-[0.78fr_1fr]">
          <div className="sticky top-28 hidden h-[500px] overflow-hidden border border-slate-900/10 bg-white/70 shadow-[0_24px_90px_rgba(42,55,78,0.1)] backdrop-blur lg:block">
            <RadiantIndustrialShader variant="clockwork-mind" tone="ching" className="opacity-100" />
            <div className="absolute inset-10 border border-dashed border-coolant/25" />
            <div className="absolute left-16 top-16 h-56 w-56 rounded-full border border-chingBlue/25" />
            <div className="absolute bottom-20 right-16 h-44 w-72 border border-mitutoyo/35" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-coolant/80 to-transparent" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-mitutoyo/60 to-transparent" />
          </div>
          <div className="relative space-y-6 pl-8">
            <div className="process-line absolute left-3 top-0 h-full w-px origin-top bg-gradient-to-b from-chingViolet via-coolant to-mitutoyo" />
            {machiningSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="process-step border border-slate-900/10 bg-white/82 p-5 shadow-[0_18px_60px_rgba(42,55,78,0.08)] backdrop-blur md:p-6">
                  <div className="flex items-start gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-chingBlue/25 bg-chingBlue/5 text-coolant">
                      <Icon size={24} strokeWidth={1.25} />
                    </span>
                    <div>
                      <p className="font-mono text-xs tracking-[0.24em] text-steel">PROCESS 0{index + 1}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-mist">{step.title}</h3>
                      <p className="mt-3 max-w-xl leading-7 text-steel">{step.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
