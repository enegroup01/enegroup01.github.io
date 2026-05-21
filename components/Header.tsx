"use client";

import { navItems } from "@/lib/data";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-slate-900/10 bg-white/78 px-4 py-3 shadow-sm backdrop-blur-xl md:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center border border-chingBlue/25 bg-gradient-to-br from-chingBlue to-chingViolet font-mono text-xs text-white shadow-cold-glow">
            CH
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-[0.22em] text-mist">慶鴻精密</span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.28em] text-steel">Precision Systems</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em] text-steel lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-mist">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="scan-button hidden px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-mist md:inline-flex">
          Contact
        </a>
        <button className="grid h-10 w-10 place-items-center border border-slate-900/15 text-steel lg:hidden" aria-label="Open navigation">
          <Menu size={18} />
        </button>
      </div>
    </motion.header>
  );
}
