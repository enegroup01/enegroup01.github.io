import { RadiantKineticGrid } from "@/components/RadiantKineticGrid";
import { Activity, Braces, Database, FileChartColumn, Gauge, GitBranch, Layers3, ScanLine } from "lucide-react";

const softwareModules = [
  {
    icon: Database,
    label: "Data Integration",
    title: "量測資料串接",
    text: "整合量測設備、檢驗紀錄與工單資料，建立一致的工程資料來源。",
    accent: "from-chingBlue to-coolant"
  },
  {
    icon: Gauge,
    label: "Inspection UI",
    title: "檢測介面客製",
    text: "依照現場作業節奏設計檢測畫面、判定邏輯、警示狀態與操作權限。",
    accent: "from-siemens to-chingBlue"
  },
  {
    icon: GitBranch,
    label: "Workflow Logic",
    title: "製程流程追蹤",
    text: "將設計、加工、量測、交付節點轉成可追蹤、可稽核的數位流程。",
    accent: "from-chingViolet to-chingBlue"
  },
  {
    icon: FileChartColumn,
    label: "Reports / API",
    title: "報表與系統介接",
    text: "輸出品質報表、批次紀錄與 API 介接，讓工程資料能回到管理系統。",
    accent: "from-mitutoyo to-chingBlue"
  }
];

const pipelineNodes = ["CAD", "CAM", "CMM", "MES", "ERP"];

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

      <div className="relative bg-[linear-gradient(180deg,#ffffff_0%,#f4f8fc_100%)] px-4 py-20 md:px-8 md:py-28">
        <div className="absolute inset-0 bg-precision-grid bg-[size:72px_72px] opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-kicker text-siemens">Custom Engineering Interface</p>
            <h3 className="mt-5 max-w-xl font-display text-3xl font-semibold leading-tight text-mist md:text-5xl">
              把現場 Know-how 做成真正好用的工程軟體
            </h3>
            <p className="mt-6 max-w-lg leading-8 text-steel">
              不是套版系統，而是依照量測方法、加工流程、報表格式與管理需求，設計可長期維護的客製化操作介面。
            </p>
            <div className="mt-8 grid gap-2">
              {["設備資料同步", "公差判定邏輯", "品質履歷追蹤", "報表與 API 輸出"].map((item, index) => (
                <div key={item} className="group flex items-center gap-4 border-b border-slate-900/10 py-3">
                  <span className="font-mono text-xs tracking-[0.24em] text-chingBlue">0{index + 1}</span>
                  <span className="text-sm font-medium text-mist md:text-base">{item}</span>
                  <span className="ml-auto h-px w-10 bg-gradient-to-r from-transparent to-chingBlue transition-all duration-500 group-hover:w-20" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-[radial-gradient(circle_at_70%_20%,rgba(0,143,126,0.18),transparent_34rem),radial-gradient(circle_at_10%_80%,rgba(79,143,216,0.2),transparent_26rem)]" />
            <div className="relative overflow-hidden border border-slate-900/10 bg-white/90 shadow-[0_34px_120px_rgba(42,55,78,0.14)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-900/10 bg-slate-50/70 px-4 py-3 md:px-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-mitutoyo" />
                  <span className="h-2.5 w-2.5 rounded-full bg-chingBlue" />
                  <span className="h-2.5 w-2.5 rounded-full bg-siemens" />
                </div>
                <div className="hidden font-mono text-[10px] uppercase tracking-[0.26em] text-steel sm:block">Factory Software Console</div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-siemens">
                  <Activity size={14} />
                  Live
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
                <aside className="border-b border-slate-900/10 bg-[#f8fbff] p-4 lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center border border-chingBlue/25 bg-white text-chingBlue">
                      <Layers3 size={19} strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">Project</p>
                      <p className="mt-1 text-sm font-semibold text-mist">Precision Workflow OS</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-1">
                    {softwareModules.map((module) => {
                      const Icon = module.icon;
                      return (
                        <div key={module.title} className="group relative overflow-hidden border border-slate-900/10 bg-white p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-chingBlue/30 hover:shadow-[0_18px_50px_rgba(79,143,216,0.12)]">
                          <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${module.accent}`} />
                          <div className="flex items-start gap-3">
                            <span className="mt-1 text-chingBlue">
                              <Icon size={18} strokeWidth={1.5} />
                            </span>
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">{module.label}</p>
                              <h4 className="mt-1.5 text-base font-semibold text-mist">{module.title}</h4>
                              <p className="mt-1.5 text-sm leading-6 text-steel lg:line-clamp-2">{module.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </aside>

                <div className="relative overflow-hidden bg-white p-5 md:p-6">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(79,143,216,0.055)_1px,transparent_1px),linear-gradient(rgba(28,38,54,0.045)_1px,transparent_1px)] bg-[size:42px_42px]" />
                  <div className="absolute left-0 right-0 top-32 h-px bg-gradient-to-r from-transparent via-siemens/70 to-transparent" />
                  <div className="absolute inset-x-10 top-0 h-32 bg-gradient-to-b from-chingBlue/10 to-transparent" />

                  <div className="relative grid gap-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-siemens">Measurement Batch</p>
                        <h4 className="mt-2 text-2xl font-semibold text-mist">CHP-AXIS-204 / QC Runtime</h4>
                      </div>
                      <div className="flex items-center gap-2 border border-siemens/20 bg-siemens/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-siemens">
                        <ScanLine size={14} />
                        Sync 98.7%
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      {[
                        ["Tolerance", "±0.003 mm", "text-chingBlue"],
                        ["Pass Rate", "99.2%", "text-siemens"],
                        ["Cycle Time", "18.4 s", "text-mitutoyo"]
                      ].map(([label, value, color]) => (
                        <div key={label} className="border border-slate-900/10 bg-white/82 p-3.5 shadow-[0_14px_40px_rgba(42,55,78,0.06)]">
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">{label}</p>
                          <p className={`mt-3 font-mono text-2xl font-semibold ${color}`}>{value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="relative overflow-hidden border border-slate-900/10 bg-[#f8fbff]/90 p-4">
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-chingBlue via-siemens to-mitutoyo" />
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">Data Pipeline</p>
                          <h5 className="mt-2 text-lg font-semibold text-mist">設備、工程軟體與管理系統的資料流</h5>
                        </div>
                        <Braces className="hidden text-chingBlue md:block" size={28} strokeWidth={1.2} />
                      </div>
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {pipelineNodes.map((node, index) => (
                          <div key={node} className="flex items-center gap-3">
                            <span className="grid h-12 w-12 place-items-center border border-chingBlue/20 bg-white font-mono text-[11px] font-semibold tracking-[0.14em] text-mist shadow-[0_12px_34px_rgba(79,143,216,0.08)]">
                              {node}
                            </span>
                            {index < pipelineNodes.length - 1 ? <span className="h-px w-5 bg-gradient-to-r from-chingBlue to-siemens md:w-7" /> : null}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative overflow-hidden border border-slate-900/10 bg-white/84 p-4">
                      <div className="absolute inset-x-0 top-0 h-px animate-[softwareScan_3.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-chingBlue to-transparent" />
                      <div className="grid gap-5 md:grid-cols-[1fr_0.8fr]">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">Inspection Rules</p>
                          <div className="mt-5 space-y-4">
                            {["圓孔位置度自動判定", "量測結果綁定工單批號", "異常值通知與權限覆核"].map((rule, index) => (
                              <div key={rule} className="flex items-center gap-3">
                                <span className="grid h-7 w-7 place-items-center bg-chingBlue/10 font-mono text-[10px] text-chingBlue">{index + 1}</span>
                                <span className="text-sm font-medium text-mist">{rule}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border border-siemens/20 bg-siemens/10 p-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-siemens">API Payload</p>
                          <pre className="mt-4 overflow-hidden text-[11px] leading-6 text-steel">
{`{
  status: "PASS",
  station: "CMM-02",
  offset: "+0.001",
  report: "ready"
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
