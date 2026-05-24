"use client";

import { AboutContact } from "@/components/AboutContact";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MachiningStory } from "@/components/MachiningStory";
import { ProductGrid } from "@/components/ProductGrid";
import { SiemensShowcase } from "@/components/SiemensShowcase";
import { TechDivider } from "@/components/TechDivider";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useLenis } from "@/hooks/useLenis";
import { useRef } from "react";

export default function Home() {
  const scope = useRef<HTMLElement | null>(null);
  useLenis();
  useGsapReveal(scope);

  return (
    <main ref={scope} className="site-shell min-h-screen">
      <Header />
      <Hero />
      <ProductGrid />
      <SiemensShowcase />
      <MachiningStory />
      <TechDivider />
      <AboutContact />
      <div className="noise-overlay" />
    </main>
  );
}
