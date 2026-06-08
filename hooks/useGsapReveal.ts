"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(scope: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.62,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.fromTo(
          group.children,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.58,
            stagger: 0.06,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: { trigger: group, start: "top 86%", once: true }
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [scope]);
}
