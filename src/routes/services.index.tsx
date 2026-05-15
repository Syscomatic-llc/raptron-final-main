import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Database,
  Workflow,
  LayoutGrid,
} from "lucide-react";
import { SERVICES, PROCESS_STEPS, INDUSTRIES } from "@/lib/constants";
import { CTABanner } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services - RAPTRON Digital Solutions" },
      {
        name: "description",
        content: "ERP consulting, AI, and custom software.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main className="w-full bg-mist overflow-x-hidden">
      <Hero />
      <StackedServices />
      <VerticalProcess />
      <AsymmetricIndustries />
      <CTABanner />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-mist">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.04)_1px,transparent_1px)] bg-[size:20px_20px] opacity-80 mix-blend-overlay" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/10 bg-white/50 backdrop-blur-md mb-8 shadow-sm">
              <LayoutGrid size={16} className="text-brand" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-ink font-bold">
                Capabilities Matrix
              </span>
            </div>

            <h1 className="font-display font-extrabold text-6xl sm:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tighter text-ink mb-8">
              Systematic <br />
              <span className="italic font-light text-brand-deep">
                dominance.
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-ink/60 max-w-xl font-light leading-relaxed mb-12">
              We don't sell hours. We deploy engineering teams to re-architect
              how your business operates, scales, and dominates its sector.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  window.scrollTo({ top: 800, behavior: "smooth" })
                }
                className="h-16 px-8 rounded-full bg-ink text-white font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-3 shadow-lg hover:shadow-glow"
              >
                Explore services <ArrowRight size={20} />
              </button>
            </div>
          </Reveal>

          <Reveal delay={200} className="relative hidden lg:block">
            <div className="relative w-full aspect-square">
              <div className="absolute top-10 right-10 w-64 h-64 bg-brand rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
              <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-2 rounded-full mix-blend-multiply filter blur-2xl opacity-70" />

              {/* Floating elements to break grid */}
              <div className="absolute top-20 left-0 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white/40 shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-500 z-20">
                <Database size={32} className="text-brand mb-4" />
                <div className="font-bold text-xl text-ink">
                  Zero-Loss Migration
                </div>
              </div>

              <div className="absolute bottom-32 right-0 bg-ink/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 shadow-2xl rotate-[5deg] hover:rotate-0 transition-transform duration-500 text-white z-20">
                <Workflow size={32} className="text-brand-2 mb-4" />
                <div className="font-bold text-xl">10x Workflow Speed</div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-brand p-10 rounded-[3rem] text-white shadow-glow z-10 hover:scale-110 transition-transform duration-500">
                <Zap size={72} className="mb-2" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StackedServices() {
  const CARD_COLORS = [
    "bg-ink text-white border-white/10",
    "bg-white text-ink border-hairline",
    "bg-brand-deep text-white border-white/10",
    "bg-surface-tinted text-ink border-hairline",
    "bg-gradient-brand text-white border-white/20",
    "bg-mist text-ink border-hairline border-b-4 border-b-ink",
  ];

  return (
    <section className="py-24 relative z-20 bg-mist">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-32 md:text-center max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-display font-extrabold text-5xl lg:text-[5rem] tracking-tight text-ink leading-none">
              The Engine Room.
            </h2>
            <p className="mt-8 text-2xl text-ink/60 font-light">
              Six core capabilities. One unified outcome.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10 lg:gap-0 pb-32">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const colorClass = CARD_COLORS[i % CARD_COLORS.length];
            const isDark = colorClass.includes("text-white");

            return (
              <div
                key={s.slug}
                className="lg:sticky lg:h-screen flex items-center justify-center pt-10"
                style={{ top: `calc(${i * 2.5}rem)`, zIndex: i }}
              >
                <div
                  className={`w-full rounded-[3rem] p-10 lg:p-16 border shadow-2xl relative overflow-hidden group transition-all duration-700 ${colorClass}`}
                >
                  {isDark && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                  )}
                  <div className="absolute -right-20 -bottom-20 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    <Icon size={400} />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 items-center">
                    <div>
                      <div
                        className={`size-20 rounded-3xl flex items-center justify-center mb-10 shadow-lg ${isDark ? "bg-white/10 text-brand-2 border border-white/10" : "bg-brand/10 text-brand border border-brand/10"}`}
                      >
                        <Icon size={40} />
                      </div>

                      <h3 className="font-display font-bold text-4xl lg:text-6xl tracking-tight mb-8 leading-[1.1]">
                        {s.title}
                      </h3>
                      <p
                        className={`text-xl lg:text-2xl font-light leading-relaxed mb-12 ${isDark ? "text-white/70" : "text-ink/60"}`}
                      >
                        {s.description}
                      </p>

                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className={`inline-flex items-center gap-3 text-lg font-bold group/link uppercase tracking-wider ${isDark ? "text-white hover:text-brand-2" : "text-brand hover:text-brand-deep"}`}
                      >
                        Deploy this{" "}
                        <ArrowUpRight
                          size={24}
                          className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                        />
                      </Link>
                    </div>

                    <div
                      className={`rounded-[2.5rem] p-8 lg:p-12 border ${isDark ? "bg-white/5 border-white/10" : "bg-white/50 border-hairline backdrop-blur-md shadow-sm"}`}
                    >
                      <h4 className="font-mono text-sm uppercase tracking-widest mb-8 opacity-60">
                        Architecture Specs
                      </h4>
                      <ul className="space-y-6">
                        {s.whatsIncluded.slice(0, 4).map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-4 text-lg"
                          >
                            <CheckCircle2
                              size={24}
                              className={`shrink-0 mt-0.5 ${isDark ? "text-brand-2" : "text-brand"}`}
                            />
                            <span className="opacity-90 leading-tight">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VerticalProcess() {
  return (
    <section className="py-32 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-deep/20 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="mb-32 text-center">
            <h2 className="font-display font-extrabold text-6xl lg:text-[5.5rem] tracking-tight">
              The Blueprint.
            </h2>
          </div>
        </Reveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand/80 via-brand-2/80 to-ink md:-translate-x-1/2" />

          {PROCESS_STEPS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <Reveal key={step.title} delay={100}>
                <div
                  className={`relative flex items-center justify-between md:justify-normal w-full mb-24 last:mb-0 ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Center Node */}
                  <div className="absolute left-0 md:left-1/2 size-20 rounded-full bg-ink border-4 border-brand-2 md:-translate-x-1/2 flex items-center justify-center font-display font-bold text-3xl z-10 shadow-[0_0_40px_rgba(163,54,255,0.4)] group">
                    <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                    {i + 1}
                  </div>

                  {/* Empty Space for alignment */}
                  <div className="hidden md:block w-5/12" />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-5/12 pl-28 md:pl-0 ${isEven ? "md:pr-24 text-left md:text-right" : "md:pl-24 text-left"}`}
                  >
                    <h3 className="font-display text-4xl lg:text-5xl font-bold mb-6 text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-xl font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AsymmetricIndustries() {
  const spanClasses = [
    "md:col-span-2 md:row-span-2", // Large square
    "md:col-span-1 md:row-span-1", // Small square
    "md:col-span-1 md:row-span-1", // Small square
    "md:col-span-1 md:row-span-2", // Tall rectangle
    "md:col-span-2 md:row-span-1", // Wide rectangle
    "md:col-span-1 md:row-span-1", // Small square
  ];

  return (
    <section className="py-32 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-hairline pb-16">
            <div>
              <h2 className="font-display font-extrabold text-6xl lg:text-[5.5rem] tracking-tight text-ink leading-none">
                Domains of <br />
                <span className="text-transparent bg-clip-text bg-gradient-brand">
                  Expertise.
                </span>
              </h2>
            </div>
            <p className="text-2xl text-ink/60 max-w-lg font-light leading-relaxed">
              We don't do generic tech. We build for the specific operational
              realities of these sectors.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[250px]">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            const spanClass = spanClasses[i % spanClasses.length];
            return (
              <Reveal
                key={ind.name}
                delay={i * 50}
                className={`${spanClass} h-full`}
              >
                <div className="w-full h-full rounded-[2.5rem] bg-surface-tinted border border-hairline p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-700 hover:border-brand/40 flex flex-col justify-end min-h-[250px] hover:-translate-y-1">
                  <div className="absolute -top-10 -right-10 text-ink/5 group-hover:text-brand/10 transition-colors duration-700 group-hover:scale-110 transform origin-top-right pointer-events-none">
                    <Icon size={200} />
                  </div>
                  <div className="relative z-10">
                    <div className="size-16 rounded-2xl bg-white text-brand flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-hairline group-hover:bg-brand group-hover:text-white">
                      <Icon size={32} />
                    </div>
                    <h3 className="font-display font-bold text-3xl text-ink">
                      {ind.name}
                    </h3>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
