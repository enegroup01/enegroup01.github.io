"use client";

import { trustStats } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function TrustStats() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.8,
            snap: { innerText: 1 },
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 84%" }
          }
        );
      });
      gsap.fromTo(".stat-icon path, .stat-icon line, .stat-icon circle, .stat-icon rect", { strokeDasharray: 80, strokeDashoffset: 80 }, { strokeDashoffset: 0, duration: 1.4, stagger: 0.05, scrollTrigger: { trigger: ref.current, start: "top 78%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="border-y border-slate-900/10 bg-white px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-slate-900/10 bg-slate-900/10 shadow-[0_24px_80px_rgba(42,55,78,0.08)] md:grid-cols-4">
        {trustStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-7">
              <Icon className="stat-icon mb-8 text-chingBlue" size={34} strokeWidth={1.25} />
              <p className="font-display text-5xl text-mist">
                <span data-count={stat.value}>0</span>
                {stat.suffix}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-steel">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
