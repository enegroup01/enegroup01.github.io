"use client";

import { RadiantTesseractShadow } from "@/components/RadiantTesseractShadow";
import { heroSlides } from "@/lib/data";
import gsap from "gsap";
import { ChevronRight, Maximize2, ScanLine, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function splitText(text: string) {
  return text.split("").map((char, index) => (
    <span key={`${char}-${index}`} className="hero-char">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

function getHeroLogo(slideId: string) {
  if (slideId === "mitutoyo") return { url: "/images/mitutoyo-logo.png", label: "Mitutoyo", className: "h-8 w-44 md:h-10 md:w-64", fit: "cover" };
  if (slideId === "siemens") return { url: "/images/siemens-logo.png", label: "Siemens", className: "h-8 w-44 md:h-10 md:w-64", fit: "cover" };
  return null;
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const scope = useRef<HTMLElement | null>(null);
  const slide = heroSlides[active];
  const logo = getHeroLogo(slide.id);

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

  useEffect(() => {
    if (!certificateOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCertificateOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [certificateOpen]);

  return (
    <>
      <section id="top" ref={scope} className="relative min-h-svh overflow-hidden bg-white pt-24">
        <div className="absolute inset-0">
          <RadiantTesseractShadow tone={slide.id === "mitutoyo" ? "mitutoyo" : slide.id === "siemens" ? "siemens" : "ching"} className="opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(79,143,216,0.16),transparent_22rem),linear-gradient(90deg,rgba(255,255,255,0.88),rgba(255,255,255,0.58)_44%,rgba(247,249,252,0.18))]" />
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,rgba(79,143,216,0.14),rgba(75,72,165,0.08),transparent)]" />
        </div>

        <button
          type="button"
          onClick={() => setCertificateOpen(true)}
          className="group absolute left-4 right-4 top-[6.35rem] z-20 flex items-center gap-3 border-y border-chingBlue/25 bg-white/82 px-3 py-2 text-left shadow-[0_14px_38px_rgba(42,55,78,0.1)] backdrop-blur-xl lg:hidden"
          aria-label="查看建大貿易授權經銷商授權書"
        >
          <span className="relative h-12 w-[4.5rem] shrink-0 overflow-hidden bg-white">
            <Image src="/images/jain-dah-authorization-certificate.png" alt="" fill priority className="scale-[1.14] object-contain" sizes="72px" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-mitutoyo">Authorized Distributor</span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-ink">建大貿易授權經銷商</span>
          </span>
          <Maximize2 size={17} className="shrink-0 text-chingBlue transition-transform group-hover:scale-110" />
        </button>

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl items-center gap-10 px-4 pb-24 md:px-8 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="max-w-4xl">
            {logo && (
              <div
                className={`hero-sub mb-4 max-w-full bg-no-repeat md:mb-5 ${logo.className}`}
                style={{ backgroundImage: `url(${logo.url})`, backgroundPosition: "left center", backgroundSize: logo.fit }}
                role="img"
                aria-label={`${logo.label} logo`}
              />
            )}
            <p className="hero-sub font-mono text-sm uppercase tracking-[0.3em] md:text-[0.95rem]" style={{ color: slide.accent }}>
              {slide.eyebrow}
            </p>
            <h1 className="mt-6 max-w-5xl overflow-hidden pb-3 font-display text-[clamp(3rem,6.7vw,7rem)] font-semibold leading-[1.08] tracking-normal text-ink split-chars md:pb-4">
              {splitText(slide.title)}
            </h1>
            <p className="hero-sub mt-7 max-w-2xl text-lg font-medium leading-8 text-steel md:text-xl">{slide.subtitle}</p>
            <div className="hero-sub absolute bottom-24 left-4 right-4 mt-0 flex flex-col gap-2 sm:static sm:mt-10 sm:flex-row sm:gap-4">
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

          <button
            type="button"
            onClick={() => setCertificateOpen(true)}
            className="group relative hidden w-full max-w-[31rem] justify-self-end text-left lg:block"
            aria-label="查看建大貿易授權經銷商授權書"
          >
            <div className="relative aspect-[3/2] transition duration-500 group-hover:-translate-y-1">
              <Image
                src="/images/jain-dah-authorization-certificate.png"
                alt="建大貿易授權書"
                fill
                priority
                className="scale-[1.08] object-contain drop-shadow-[0_26px_34px_rgba(42,55,78,0.24)] transition-transform duration-700 group-hover:scale-[1.11]"
                sizes="(min-width: 1280px) 496px, 39vw"
              />
              <span className="absolute -top-3 right-1 flex items-center gap-2 border-b border-chingBlue/35 pb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-chingBlue opacity-75 transition group-hover:opacity-100">
                View Certificate
                <Maximize2 size={14} />
              </span>
            </div>

            <div className="mt-2 flex items-end gap-6">
              <span className="mb-1 h-px flex-1 bg-gradient-to-r from-transparent to-chingBlue/55" />
              <div className="text-right">
                <p className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-mitutoyo">Authorized Distributor Certificate</p>
                <p className="mt-2 whitespace-nowrap text-2xl font-semibold text-ink">建大貿易授權經銷商</p>
              </div>
            </div>
          </button>
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

      {certificateOpen ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/72 p-4 backdrop-blur-md md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="建大貿易授權書"
          onClick={() => setCertificateOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl border border-white/16 bg-[#eef3f8] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.42)] md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCertificateOpen(false)}
              className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center border border-slate-900/15 bg-white/92 text-ink shadow-lg transition hover:bg-white md:right-5 md:top-5"
              aria-label="關閉授權書"
            >
              <X size={19} />
            </button>
            <div className="relative aspect-[3/2] max-h-[78vh]">
              <Image src="/images/jain-dah-authorization-certificate.png" alt="建大貿易授權書" fill className="object-contain" sizes="94vw" />
            </div>
            <div className="flex flex-col gap-2 border-t border-slate-900/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mitutoyo">Authorized Distributor Certificate</p>
              <p className="text-lg font-semibold text-ink">建大貿易授權經銷商</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
