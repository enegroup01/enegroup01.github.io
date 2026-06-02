"use client";

import { navItems } from "@/lib/data";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-slate-900/10 bg-white/82 px-4 py-3 shadow-sm backdrop-blur-xl md:px-8"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/images/ching-hong-logo.png" alt="慶鴻精密" width={260} height={86} priority className="h-12 w-auto md:h-14" />
        </a>

        <nav className="hidden items-center gap-7 font-mono text-sm uppercase tracking-[0.14em] text-steel lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-mist">
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="scan-button hidden px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-mist md:inline-flex">
          Contact
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-slate-900/15 text-steel lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mx-auto mt-3 grid max-w-7xl gap-2 border-t border-slate-900/10 pt-3 lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border border-slate-900/10 bg-white/86 px-4 py-3 font-mono text-sm uppercase tracking-[0.16em] text-steel shadow-[0_10px_30px_rgba(42,55,78,0.06)]"
            >
              {item.label}
              <span className="h-px w-8 bg-chingBlue/55" />
            </a>
          ))}
        </motion.nav>
      ) : null}
    </motion.header>
  );
}
