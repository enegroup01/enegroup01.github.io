import { RadiantIndustrialShader } from "@/components/RadiantIndustrialShader";
import { SectionHeader } from "@/components/SectionHeader";
import { capabilities, contactItems, navItems } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function AboutContact() {
  return (
    <>
      <section id="about" className="section-pad bg-carbon">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeader
              eyebrow="About Ching Hong Precision"
              title="慶鴻精密是工業客戶的量測、加工與軟體整合夥伴"
              text="我們以 Mitutoyo 精密量測與授權代理產品為核心，延伸至精密加工、工業應用服務與 Siemens 工程軟體銷售整合，協助客戶把尺寸品質、製程資料與數位設計流程連成可追溯的系統。"
            />
            <div className="mt-8 grid gap-4" data-reveal>
              <div className="group relative overflow-hidden border border-slate-900/10 bg-white/72 p-5 shadow-[0_18px_52px_rgba(42,55,78,0.07)]">
                <div className="absolute inset-y-4 left-0 w-1 bg-mitutoyo" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mitutoyo">Mitutoyo / Measurement Standard</p>
                <p className="mt-3 leading-8 text-steel">
                  從量測儀器選型、規格確認到現場使用情境，慶鴻精密以原廠產品知識與代理服務經驗，協助客戶建立穩定、可重複驗證的尺寸品質基準。
                </p>
              </div>
              <div className="group relative overflow-hidden border border-slate-900/10 bg-white/72 p-5 shadow-[0_18px_52px_rgba(42,55,78,0.07)]">
                <div className="absolute inset-y-4 left-0 w-1 bg-gradient-to-b from-chingBlue to-chingViolet" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-chingBlue">Process / Data / Software Integration</p>
                <p className="mt-3 leading-8 text-steel">
                  透過精密加工、檢驗流程與 Siemens 工程軟體整合，我們把單一量測儀器延伸成跨部門工程資料流，讓導入、操作、檢驗與製程優化都能被清楚追蹤。
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden border border-slate-900/10 bg-[#2f3439] shadow-[0_24px_90px_rgba(42,55,78,0.16)]" data-reveal>
            <div className="relative min-h-[430px] md:min-h-[520px]">
              <RadiantIndustrialShader variant="laser-precision" tone="ching" className="opacity-100" />
              <div className="absolute inset-5 border border-white/10 md:inset-8" />
              <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent md:inset-x-12" />
            </div>
            <div className="grid gap-3 border-t border-white/10 bg-[#2f3439] p-4 backdrop-blur md:absolute md:bottom-10 md:left-10 md:right-10 md:grid-cols-2 md:border-t-0 md:bg-transparent md:p-0 md:backdrop-blur-0">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden border border-white/14 bg-slate-950/34 p-4 shadow-[0_18px_54px_rgba(0,0,0,0.2)] backdrop-blur-xl transition duration-500 hover:border-chingBlue/55 hover:bg-slate-950/44"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chingBlue/70 to-transparent" />
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.08),transparent)] opacity-0 transition duration-700 group-hover:translate-x-12 group-hover:opacity-100" />
                    <div className="relative flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/18 bg-white/8 text-white shadow-[0_0_26px_rgba(79,143,216,0.18)]">
                        <Icon size={18} strokeWidth={1.5} />
                      </span>
                      <span className="text-sm font-medium text-white/90">{item.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-pad relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(79,143,216,0.08),rgba(75,72,165,0.06),rgba(255,255,255,0.92))]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="metal-panel grid gap-10 p-7 md:p-10 lg:grid-cols-[1fr_0.8fr]">
            <div data-reveal>
              <p className="section-kicker text-chingBlue">Contact</p>
              <h2 className="mt-5 font-display text-4xl font-semibold text-ink md:text-6xl">讓下一個精密專案從規格對齊開始</h2>
              <p className="mt-6 max-w-2xl leading-8 text-steel">留下需求，我們可協助確認量測產品、加工可行性、Siemens 軟體導入或授權合作方式。</p>
              <a href="mailto:jimmypan@chptw.com" className="scan-button mt-9 inline-flex items-center gap-3 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em]">
                聯絡技術顧問
                <ArrowRight size={16} />
              </a>
            </div>
            <div className="space-y-4" data-stagger>
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-4 border border-slate-900/10 bg-white/80 p-5 transition hover:border-chingBlue/45">
                    <Icon size={20} className="text-chingBlue" />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel">{item.label}</p>
                      <p className="mt-1 text-ink">{item.value}</p>
                    </div>
                  </div>
                );
                return item.href ? <a key={item.label} href={item.href}>{content}</a> : <div key={item.label}>{content}</div>;
              })}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-900/10 bg-white px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold tracking-[0.22em] text-ink">慶鴻精密有限公司</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-steel">Precision Instruments / Machining / Engineering Software</p>
          </div>
          <nav className="flex flex-wrap gap-5 font-mono text-xs uppercase tracking-[0.18em] text-steel">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <p className="font-mono text-xs text-steel">Copyright © 2026 Ching Hong Precision Co., Ltd.</p>
        </div>
      </footer>
    </>
  );
}
