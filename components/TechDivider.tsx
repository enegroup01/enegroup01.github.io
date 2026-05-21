import { RadiantKineticGrid } from "@/components/RadiantKineticGrid";

export function TechDivider() {
  return (
    <section className="relative h-[56vh] min-h-[360px] overflow-hidden border-y border-slate-900/10 bg-white">
      <RadiantKineticGrid variant="siemens" density="divider" className="opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),rgba(255,255,255,0.32)_82%)]" />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="section-kicker text-siemens">Radiant Kinetic Grid / Siemens Palette</p>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-mist md:text-6xl">
            光學掃描、流場軌跡與精準排列，在同一個低干擾底圖中運作
          </h2>
        </div>
      </div>
    </section>
  );
}
