import { SectionHeader } from "@/components/SectionHeader";
import { mitutoyoProducts } from "@/lib/data";

export function ProductGrid() {
  return (
    <section id="mitutoyo" className="section-pad bg-carbon">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Mitutoyo Product Matrix"
            title="Mitutoyo 量測產品"
            text="此區明確採用 Mitutoyo 橘作為產品識別色；正式上線時替換產品照片、型號與規格表即可。"
          />
          <div className="inline-flex w-fit items-center gap-3 border border-mitutoyo/35 bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-mitutoyo shadow-orange-glow" data-reveal>
            Authorized Product
            <span className="h-2 w-12 bg-mitutoyo" />
          </div>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-stagger>
          {mitutoyoProducts.map((product, index) => (
            <article key={product.name} className="group relative min-h-[360px] overflow-hidden border border-mitutoyo/20 bg-white shadow-[0_20px_70px_rgba(42,55,78,0.08)]">
              <div className="absolute inset-x-0 top-0 h-56 transition duration-700 group-hover:scale-105" style={{ background: product.image }}>
                <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.42)_46%,transparent_52%)] opacity-0 transition duration-500 group-hover:translate-x-24 group-hover:opacity-80" />
                <div className="absolute left-8 top-8 h-24 w-[72%] border border-white/45">
                  <div className="absolute left-4 right-4 top-1/2 h-px bg-white/55" />
                  <div className="absolute bottom-4 left-1/2 top-4 w-px bg-white/50" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent p-7 pt-24">
                <p className="font-mono text-xs tracking-[0.24em] text-mitutoyo">0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold text-ink">{product.name}</h3>
                <p className="mt-4 leading-7 text-steel">{product.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
