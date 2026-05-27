"use client";

import { RadiantIndustrialShader } from "@/components/RadiantIndustrialShader";
import { machiningSteps } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const processImages = [
  "/images/process-01-design.png",
  "/images/process-02-machining.png",
  "/images/process-03-measurement.png",
  "/images/process-04-delivery.png"
];

export function MachiningStory() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".machining-copy",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 72%" } }
      );
      gsap.utils.toArray<HTMLElement>(".machining-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: ".process-wrap", start: "top 72%" }
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="machining" ref={ref} className="section-pad relative scroll-mt-24 overflow-hidden bg-[#f5f8fc] text-mist">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_100%,rgba(79,143,216,0.18),transparent_32rem),linear-gradient(180deg,#ffffff_0%,#eef4fa_100%)]" />
      <div className="absolute inset-0 bg-precision-grid bg-[size:86px_86px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_0%,black_44%,transparent_84%)]" />
      <div className="absolute right-0 top-0 h-[400px] w-full opacity-35 md:h-[500px] lg:w-[58%]">
        <Image src="/images/precision-machining-hero.png" alt="CNC precision machining inspection" fill className="object-cover object-right-top" sizes="(min-width: 1024px) 64vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f8fc] via-[#f5f8fc]/62 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f5f8fc] via-[#f5f8fc]/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="machining-copy relative max-w-4xl pt-10 md:pt-14">
          <div className="pointer-events-none absolute left-10 top-[-17rem] hidden h-[24rem] w-[24rem] overflow-hidden opacity-[0.26] lg:block xl:left-14 xl:top-[-19rem] xl:h-[28rem] xl:w-[28rem]">
            <RadiantIndustrialShader variant="clockwork-mind" tone="ching-soft" className="opacity-100" />
          </div>
          <p className="relative z-10 font-mono text-xs uppercase tracking-[0.28em] text-coolant">Industrial Design Precision Machining</p>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            專注精密加工
            <br />
            從圖面、公差到交付，每一步都能被檢驗
          </h2>
          <div className="mt-7 h-1 w-20 bg-chingBlue" />
          <p className="mt-7 max-w-3xl text-lg leading-9 text-steel">
            整合工業設計、精密零件加工、CNC 金屬切削、客製化製造與品質檢驗，讓設計圖面、加工公差與交付結果形成可驗證的工程流程。
          </p>
        </div>

        <div className="process-wrap mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {machiningSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="machining-card group relative overflow-hidden border border-slate-900/10 bg-white shadow-[0_24px_80px_rgba(42,55,78,0.11)] transition duration-500 hover:-translate-y-1 hover:border-chingBlue/45 hover:shadow-[0_30px_92px_rgba(79,143,216,0.16)]">
                <span className="pointer-events-none absolute left-3 top-3 z-20 h-6 w-6 border-l border-t border-chingBlue/35 transition duration-500 group-hover:border-chingBlue" />
                <span className="pointer-events-none absolute right-3 top-3 z-20 h-6 w-6 border-r border-t border-chingBlue/35 transition duration-500 group-hover:border-chingBlue" />
                <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-6 w-6 border-b border-l border-chingBlue/25 transition duration-500 group-hover:border-chingBlue/75" />
                <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-6 w-6 border-b border-r border-chingBlue/25 transition duration-500 group-hover:border-chingBlue/75" />
                <div className="relative h-44 overflow-hidden bg-[#101820]">
                  <Image src={processImages[index]} alt={`${step.title} process`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/48 via-transparent to-transparent" />
                  <div className="machining-image-scan absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" />
                  <p className="absolute left-5 top-5 font-mono text-xs uppercase tracking-[0.24em] text-coolant">
                    PROCESS <span className="text-white">0{index + 1}</span>
                  </p>
                </div>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chingBlue to-transparent" />
                <div className="relative">
                  <div className="-mt-9 grid place-items-center">
                    <span className="grid h-[72px] w-[72px] place-items-center rounded-full border border-chingBlue/45 bg-white text-mist shadow-[0_0_0_6px_rgba(79,143,216,0.08),0_18px_42px_rgba(42,55,78,0.14)] transition duration-500 group-hover:text-chingBlue">
                      <Icon size={34} strokeWidth={1.2} />
                    </span>
                  </div>
                  <h3 className="mt-6 text-center font-display text-4xl font-semibold text-mist">{step.title}</h3>
                  <div className="mx-auto mt-5 h-px w-12 bg-chingBlue transition-all duration-500 group-hover:w-24" />
                  <p className="mx-auto mt-6 max-w-[16rem] px-6 pb-8 text-center leading-8 text-steel">{step.text}</p>
                </div>
                <div className="machining-progress absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-chingBlue via-coolant to-chingViolet" />
                {index < machiningSteps.length - 1 ? (
                  <span className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 font-display text-5xl text-chingBlue/75 lg:block">›</span>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
