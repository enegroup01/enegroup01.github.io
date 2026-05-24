import { RadiantKineticGrid } from "@/components/RadiantKineticGrid";
import { Crosshair, Factory, FileClock, FileCode2 } from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

const softwareFeatures: Array<{ index: string; title: string; text: string; icon: LucideIcon }> = [
  {
    index: "01",
    title: "設備資料同步",
    text: "支援多品牌量測與加工設備，自動擷取參數與狀態，確保資料即時、準確一致。",
    icon: Factory
  },
  {
    index: "02",
    title: "公差判定邏輯",
    text: "依產品特性與檢驗標準，客製公差判定規則與警示機制，降低人為判斷誤差。",
    icon: Crosshair
  },
  {
    index: "03",
    title: "品質履歷追蹤",
    text: "完整記錄量測、加工與檢驗歷程，建立可追溯的品質履歷，提升管理透明度。",
    icon: FileClock
  },
  {
    index: "04",
    title: "報表與 API 輸出",
    text: "彈性產出客製化報表，並提供標準 API 介接 ERP/MES，打通資料孤島。",
    icon: FileCode2
  }
];

export function TechDivider() {
  return (
    <section className="relative overflow-hidden border-y border-slate-900/10 bg-white">
      <div className="relative h-[56vh] min-h-[360px] overflow-hidden">
        <RadiantKineticGrid variant="siemens" density="divider" className="opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),rgba(255,255,255,0.32)_82%)]" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
          <div className="max-w-3xl">
            <p className="section-kicker text-chingBlue">Industrial Software Customization</p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
              精密工業軟體客製化服務，讓量測、加工與工程資料真正串接
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-steel md:text-lg">
              依照現場流程客製化工程介面、資料串接、量測紀錄與製程追蹤模組，協助精密工業把軟體導入到可落地的工作流。
            </p>
          </div>
        </div>
      </div>

      <div className="relative bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] px-4 py-12 md:px-8 md:py-16">
        <div className="absolute inset-0 bg-precision-grid bg-[size:72px_72px] opacity-60" />
        <div className="software-showcase-card relative z-20 mx-auto max-w-7xl overflow-hidden border border-slate-900/10 bg-white/96 shadow-[0_34px_120px_rgba(42,55,78,0.14)] backdrop-blur">
          <div className="absolute right-0 top-0 hidden h-[460px] w-[58%] animate-[softwareFloat_7s_ease-in-out_infinite] lg:block">
            <Image
              src="/images/custom-software-visual.png"
              alt="Industrial software dashboard connected with precision machining equipment"
              fill
              className="object-cover object-right-top"
              sizes="760px"
            />
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white via-white/86 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/78 to-transparent" />
            <div className="absolute inset-x-10 top-24 h-px animate-[softwareScanLine_4.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
          </div>

          <div className="relative grid gap-8 p-7 md:p-10 lg:min-h-[600px] lg:grid-cols-[0.48fr_0.52fr] lg:p-14">
            <div className="relative z-10">
              <h3 className="font-display text-5xl font-semibold leading-[0.96] text-[#071a3e] md:text-7xl">
                Industrial Software
                <br />
                Customization
              </h3>
              <div className="relative mt-7 h-1 w-28 overflow-hidden bg-siemens/20">
                <span className="absolute inset-y-0 left-0 w-2/3 animate-[softwareUnderline_2.8s_ease-in-out_infinite] bg-gradient-to-r from-siemens via-chingBlue to-cyan-300" />
              </div>
              <h4 className="mt-8 max-w-xl text-3xl font-semibold leading-snug tracking-[0.06em] text-[#071a3e] md:text-4xl">
                精密工業軟體客製化服務，讓量測、加工與工程資料真正串接
              </h4>
              <p className="mt-6 max-w-xl text-base leading-8 text-steel md:text-lg">
                依照實際產線流程，客製工程介面、資料整合、量測紀錄與製程追蹤；打造可落地、可擴充的智慧製造解決方案。
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {["CMM DATA SYNC", "MES / ERP API", "QC REPORT FLOW"].map((tag) => (
                  <span key={tag} className="software-chip border border-chingBlue/20 bg-white/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-chingBlue">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden shadow-[0_18px_60px_rgba(42,55,78,0.12)] lg:hidden">
              <Image
                src="/images/custom-software-visual.png"
                alt="Industrial software dashboard connected with precision machining equipment"
                fill
                className="object-cover object-center"
                sizes="calc(100vw - 56px)"
              />
            </div>

            <div className="relative z-10 self-end lg:col-span-2">
              <div className="grid border border-slate-900/10 bg-white/92 shadow-[0_22px_70px_rgba(42,55,78,0.08)] backdrop-blur md:grid-cols-4">
                {softwareFeatures.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className="software-feature-card group relative p-6 transition duration-500 hover:-translate-y-1 hover:bg-white md:min-h-[210px] md:p-7"
                      style={{ animationDelay: `${index * 120}ms` }}
                    >
                      {index > 0 ? <div className="absolute inset-y-7 left-0 hidden w-px bg-slate-900/12 md:block" /> : null}
                      <div className="flex items-start gap-5">
                        <p className="font-display text-5xl font-semibold leading-none text-siemens transition duration-500 group-hover:text-chingBlue">{item.index}</p>
                        <div>
                          <h5 className="text-lg font-semibold tracking-[0.08em] text-[#071a3e]">{item.title}</h5>
                          <div className="mt-3 h-px w-8 bg-siemens transition-all duration-500 group-hover:w-16 group-hover:bg-chingBlue" />
                        </div>
                      </div>
                      <div className="mt-7 flex gap-5">
                        <span className="software-icon-wrap mt-1 grid h-12 w-12 shrink-0 place-items-center text-[#071a3e] transition duration-500 group-hover:text-chingBlue">
                          <Icon size={42} strokeWidth={1.35} />
                        </span>
                        <p className="text-sm leading-7 text-steel">{item.text}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
