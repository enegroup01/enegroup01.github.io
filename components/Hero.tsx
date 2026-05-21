"use client";

import { RadiantTesseractShadow } from "@/components/RadiantTesseractShadow";
import { heroSlides } from "@/lib/data";
import gsap from "gsap";
import { ChevronRight, ScanLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function splitText(text: string) {
  return text.split("").map((char, index) => (
    <span key={`${char}-${index}`} className="hero-char">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export function Hero() {
  const [active, setActive] = useState(0);
  const scope = useRef<HTMLElement | null>(null);
  const slide = heroSlides[active];

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 6200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-char", { y: 82, opacity: 0, rotateX: -55 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.018, duration: 0.9, ease: "power4.out" });
      gsap.fromTo(".hero-sub", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.18, ease: "power3.out" });
      gsap.fromTo(".hero-visual-line", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.2, stagger: 0.07, ease: "power3.out" });
    }, scope);
    return () => ctx.revert();
  }, [active]);

  return (
    <section id="top" ref={scope} className="relative min-h-svh overflow-hidden bg-white pt-24">
      <div className="absolute inset-0">
        <RadiantTesseractShadow tone={slide.id === "mitutoyo" ? "mitutoyo" : slide.id === "siemens" ? "siemens" : "ching"} className="opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(79,143,216,0.16),transparent_22rem),linear-gradient(90deg,rgba(255,255,255,0.88),rgba(255,255,255,0.58)_44%,rgba(247,249,252,0.18))]" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,rgba(79,143,216,0.14),rgba(75,72,165,0.08),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl items-center px-4 pb-24 md:px-8 lg:grid-cols-[1.06fr_0.94fr]">
        <div className="max-w-4xl">
          <p className="hero-sub font-mono text-xs uppercase tracking-[0.3em]" style={{ color: slide.accent }}>
            {slide.eyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl overflow-hidden pb-3 font-display text-[clamp(3rem,6.7vw,7rem)] font-semibold leading-[1.08] tracking-normal text-ink split-chars md:pb-4">
            {splitText(slide.title)}
          </h1>
          <p className="hero-sub mt-7 max-w-2xl text-lg font-medium leading-8 text-steel md:text-xl">{slide.subtitle}</p>
          <div className="hero-sub mt-8 flex flex-col gap-2 sm:mt-10 sm:flex-row sm:gap-4">
            <a href={slide.href} className="scan-button inline-flex items-center justify-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] sm:px-7 sm:py-4">
              <ScanLine size={16} />
              {slide.cta}
            </a>
            <a href="#about" className="inline-flex items-center justify-center gap-2 px-2 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-steel transition hover:text-ink sm:py-4">
              企業能力
              <ChevronRight size={16} />
            </a>
          </div>
        </div>

        <div aria-hidden="true" />
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 bg-white/70 px-5 py-4 shadow-[0_16px_50px_rgba(42,55,78,0.1)] backdrop-blur">
        <div className="flex gap-2">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              className="h-1.5 flex-1 bg-slate-900/15 transition hover:bg-slate-900/30"
              style={{ backgroundColor: index === active ? item.accent : undefined }}
              aria-label={`切換至 ${item.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
