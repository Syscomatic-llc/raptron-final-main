import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Workflow,
  BrainCircuit,
  Star,
  Zap,
  Database,
  Terminal,
  BarChart2,
  TrendingUp,
  Award,
  BadgeCheck,
  Code2,
  LineChart,
} from "lucide-react";
import {
  SERVICES,
  INDUSTRIES,
  STATS,
  TESTIMONIALS,
  PROCESS_STEPS,
} from "@/lib/constants";
import { CTABanner } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAPTRON Digital Solutions - ERP, AI & Custom Software" },
      {
        name: "description",
        content:
          "Transform your business operations with precision technology - ERP consulting, AI, and custom software from RAPTRON Digital Solutions LLC.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main className="w-full bg-white overflow-x-hidden">
      <Hero />
      <IndustriesTicker />
      <ValueBento />
      <ServicesShowcase />
      <ProcessTimeline />
      <StatsSection />
      <TestimonialMarquee />
      <CTABanner />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-mist">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 mix-blend-multiply" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[400px] bg-brand/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="relative z-20 w-full max-w-7xl px-6 lg:px-10 text-center flex flex-col items-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-hairline shadow-sm mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand"></span>
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-ink font-semibold">
              The future of enterprise tech
            </span>
          </div>

          <h1 className="font-display font-bold leading-[1.1] text-ink mx-auto text-center">
            <span className="block text-4xl sm:text-5xl lg:text-[4rem] whitespace-nowrap">
              <span className="text-brand">We automate</span> what slows you
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-[4rem] whitespace-nowrap">
              down <span className="text-brand">- in 4 weeks</span>
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-lg text-black max-w-3xl mx-auto leading-relaxed">
            We help business owners reduce manual work, improve visibility, and
            bring their daily activities into one connected, intelligent
            operating structure.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-consultation"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-gradient-brand text-white font-semibold text-lg shadow-card hover:shadow-glow transition-all hover:scale-105"
            >
              <Calendar size={20} /> Book free consultation
            </Link>
            <Link
              to="/request-demo"
              className="group relative inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border-0 text-white font-semibold text-lg overflow-hidden shadow-glow transition-all duration-300 hover:shadow-[0_0_40px_rgba(85,9,217,0.6)] hover:scale-105"
            >
              {/* Always-on fill */}
              <span className="absolute inset-0 bg-ink rounded-full" />
              <span className="absolute inset-0 bg-gradient-brand opacity-30 rounded-full group-hover:opacity-50 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Request demo
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Hero Achievement Panel */}
        <Reveal>
          <div className="mt-20 w-full max-w-5xl mx-auto">

            {/* Header */}
            <div className="flex items-center gap-2.5 mb-5 px-1">
              <div className="size-6 rounded-lg bg-brand/10 flex items-center justify-center">
                <Award className="text-brand" size={13} />
              </div>
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">
                Serving You With
              </span>
            </div>

            {/* 4-across row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">

              {/* Card 01 â€” Operational Automation */}
              <div className="bg-ink rounded-2xl p-5 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(85,9,217,0.28)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/30 blur-[50px] rounded-full group-hover:scale-150 transition-all duration-700" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="size-10 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center group-hover:bg-brand/30 transition-colors duration-500">
                      <Workflow className="text-brand-2" size={18} />
                    </div>
                    <span className="font-mono text-lg font-bold text-white/40 select-none">01</span>
                  </div>
                  <h3 className="text-white font-display text-sm font-bold mb-1.5">Operational Automation</h3>
                  <p className="text-white/45 text-xs leading-relaxed">
                    Automated workflows that improve speed, accuracy, and control.
                  </p>
                </div>
              </div>

              {/* Card 02 â€” Accounting & Compliance */}
              <div className="bg-gradient-brand rounded-2xl p-5 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(163,54,255,0.45)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/10 blur-[30px] rounded-full group-hover:scale-125 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <BarChart2 className="text-white" size={18} />
                    </div>
                    <span className="font-mono text-lg font-bold text-white/40 select-none">02</span>
                  </div>
                  <h3 className="text-white font-display text-sm font-bold mb-1.5">Accounting &amp; Compliance</h3>
                  <p className="text-white/75 text-xs leading-relaxed">
                    VAT, corporate tax, audit readiness, and financial reporting.
                  </p>
                </div>
              </div>

              {/* Card 03 â€” AI Agents */}
              <div className="bg-white border border-hairline rounded-2xl p-5 relative overflow-hidden group hover:shadow-card hover:-translate-y-1 transition-all duration-500">
                <div className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500">
                  <BrainCircuit size={100} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="size-10 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/15 transition-colors duration-500">
                      <BrainCircuit className="text-brand" size={18} />
                    </div>
                    <span className="font-mono text-lg font-bold text-ink/25 select-none">03</span>
                  </div>
                  <h3 className="text-ink font-display text-sm font-bold mb-1.5">AI Agents</h3>
                  <p className="text-ink/50 text-xs leading-relaxed">
                    AI assistants for sales, operations, and internal workflows.
                  </p>
                </div>
              </div>

              {/* Card 04 â€” Growth Strategy */}
              <div className="bg-ink rounded-2xl p-5 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(85,9,217,0.28)] transition-all duration-500 hover:-translate-y-1">
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-2/20 blur-[50px] rounded-full group-hover:scale-150 transition-all duration-700" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="size-10 rounded-xl bg-brand-2/20 border border-brand-2/30 flex items-center justify-center group-hover:bg-brand-2/30 transition-colors duration-500">
                      <TrendingUp className="text-brand-2" size={18} />
                    </div>
                    <span className="font-mono text-lg font-bold text-white/40 select-none">04</span>
                  </div>
                  <h3 className="text-white font-display text-sm font-bold mb-1.5">Growth Strategy</h3>
                  <p className="text-white/45 text-xs leading-relaxed">
                    Market positioning, operations improvement, and growth plans.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>

  );
}

function IndustriesTicker() {
  return (
    <div className="w-full border-b border-hairline bg-white py-8 overflow-hidden flex items-center relative z-20">
      {/* Left side overlay */}
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center bg-white pl-6 lg:pl-10 pr-6">
        <div className="font-mono text-[10px] tracking-[0.2em] text-ink/40">
          Trusted Across Sectors
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-32 translate-x-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
      </div>

      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex gap-16 px-6 whitespace-nowrap">
        {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map(
          ({ name, icon: Icon }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 text-ink/60 font-semibold text-lg hover:text-brand transition-colors cursor-default"
            >
              <Icon size={24} className="text-brand/50" />
              <span>{name}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}


function ValueBento() {
  return (
    <section className="py-28 lg:py-36 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight text-ink">
              Beyond Implementation.
            </h2>
            <p className="mt-6 text-xl text-ink/60">
              We engineer unfair competitive advantages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[320px]">
            {/* Box 1 */}
            <div className="md:col-span-2 rounded-[2rem] border border-hairline bg-surface-tinted p-12 relative overflow-hidden group hover:shadow-card transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <Database size={300} />
              </div>
              <div className="relative z-10">
                <h3 className="font-display text-4xl font-bold text-ink">
                  Data Supremacy
                </h3>
                <p className="mt-4 text-ink/65 max-w-md text-lg leading-relaxed">
                  We don't just migrate data; we structure it to feed predictive
                  AI models, automate reporting, and power real-time executive
                  dashboards.
                </p>
              </div>
            </div>
            {/* Box 2 */}
            <div className="md:col-span-1 rounded-[2rem] border border-hairline bg-ink p-12 relative overflow-hidden group hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
              <div className="relative z-10">
                <Zap className="text-brand-2 mb-8" size={40} />
                <h3 className="font-display text-3xl font-bold text-white">
                  Velocity
                </h3>
                <p className="mt-4 text-white/60 text-lg leading-relaxed">
                  Shipping custom modules 4x faster with our proprietary
                  enterprise frameworks.
                </p>
              </div>
            </div>
            {/* Box 3 */}
            <div className="md:col-span-1 rounded-[2rem] border border-hairline bg-gradient-brand p-12 text-white hover:scale-[1.02] transition-transform duration-500 group">
              <Terminal
                className="mb-8 opacity-80 group-hover:opacity-100 transition-opacity"
                size={40}
              />
              <h3 className="font-display text-3xl font-bold">Code Quality</h3>
              <p className="mt-4 text-white/90 text-lg leading-relaxed">
                Enterprise-grade architecture built to scale securely and
                continuously.
              </p>
            </div>
            {/* Box 4 */}
            <div className="md:col-span-2 rounded-[2rem] border border-hairline bg-white shadow-sm p-12 relative overflow-hidden group hover:shadow-card transition-all duration-500 hover:-translate-y-1">
              <div className="flex flex-col justify-center h-full max-w-xl relative z-10">
                <h3 className="font-display text-4xl font-bold text-ink">
                  Total Ownership
                </h3>
                <p className="mt-4 text-ink/65 text-lg leading-relaxed">
                  From initial process audit to post-go-live optimization. One
                  accountable team, zero handoffs, absolute transparency.
                </p>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-dot-grid opacity-30 [mask-image:linear-gradient(to_left,black,transparent)] group-hover:opacity-50 transition-opacity duration-700" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = SERVICES[activeIdx];
  const Icon = active.icon;

  return (
    <section className="py-32 bg-mist relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.04)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="font-mono text-[11px] tracking-[0.25em] text-brand mb-3">What We Deliver</div>
            <h2 className="font-display font-extrabold text-5xl lg:text-6xl tracking-tight text-ink">
              Built to move your business forward.
            </h2>
          </div>

          {/* Tab Bar */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {SERVICES.map((s, i) => {
              const TabIcon = s.icon;
              return (
                <button
                  key={s.slug}
                  onClick={() => setActiveIdx(i)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeIdx === i
                      ? "bg-brand text-white border-brand shadow-[0_4px_20px_rgba(85,9,217,0.35)]"
                      : "bg-white text-ink/55 border-hairline hover:border-brand/30 hover:text-ink hover:shadow-sm"
                    }`}
                >
                  <TabIcon size={14} />
                  {s.shortTitle}
                </button>
              );
            })}
          </div>

          {/* Two-Panel Content */}
          <div className="grid lg:grid-cols-2 gap-5 items-stretch">

            {/* Left â€” Info Card */}
            <div className="bg-white rounded-[2rem] p-10 border border-hairline shadow-sm flex flex-col">
              <div className="size-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-6">
                <Icon className="text-brand" size={26} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand mb-3">
                {active.shortTitle}
              </div>
              <h3 className="font-display text-3xl font-extrabold text-ink mb-4 leading-tight">
                {active.headline}
              </h3>
              <div className="w-10 h-[3px] bg-brand rounded-full mb-5" />
              <p className="text-ink/55 leading-relaxed mb-8 flex-1">{active.description}</p>

              {/* 2Ã-2 feature pills */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {active.bullets.map((b) => (
                  <div key={b} className="flex items-center gap-2.5 bg-mist border border-hairline rounded-xl px-4 py-3">
                    <span className="size-2 rounded-full bg-brand shrink-0" />
                    <span className="text-sm text-ink/70 font-medium leading-snug">{b}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/services/$slug"
                params={{ slug: active.slug }}
                className="inline-flex items-center gap-2 text-brand text-sm font-semibold hover:gap-3 transition-all w-fit"
              >
                Explore this service <ArrowRight size={15} />
              </Link>
            </div>

            {/* Right â€” Visual Card */}
            <div className="bg-ink rounded-[2rem] p-8 relative overflow-hidden flex flex-col min-h-[480px]">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand/25 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />

              {/* Traffic lights */}
              <div className="relative z-10 flex items-center gap-1.5 mb-8">
                <span className="size-3 rounded-full bg-red-400/60" />
                <span className="size-3 rounded-full bg-yellow-400/60" />
                <span className="size-3 rounded-full bg-green-400/60" />
              </div>

              <div className="relative z-10 flex flex-col flex-1 gap-4">
                {/* Active service highlight block */}
                <div className="bg-brand/20 border border-brand/30 rounded-2xl p-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-brand-2/60 mb-2">
                    {active.tagline}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-brand/30 border border-brand/40 flex items-center justify-center">
                      <Icon className="text-brand-2" size={17} />
                    </div>
                    <span className="font-display text-lg font-bold text-white">{active.title}</span>
                  </div>
                </div>

                {/* What's included items */}
                {active.whatsIncluded.slice(0, 5).map((item, i) => (
                  <div
                    key={item}
                    className="bg-white/5 border border-white/8 rounded-xl px-4 py-3.5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`size-7 rounded-lg flex items-center justify-center ${i === 0 ? "bg-brand/30" :
                          i === 1 ? "bg-brand-2/20" :
                            i === 2 ? "bg-emerald-500/20" :
                              i === 3 ? "bg-amber-500/20" : "bg-sky-500/20"
                        }`}>
                        <Icon size={13} className={
                          i === 0 ? "text-brand-2" :
                            i === 1 ? "text-brand-2" :
                              i === 2 ? "text-emerald-400" :
                                i === 3 ? "text-amber-400" : "text-sky-400"
                        } />
                      </div>
                      <span className="text-sm text-white/65">{item}</span>
                    </div>
                    <CheckCircle2 size={14} className="text-brand-2/50 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}


function ProcessTimeline() {
  return (
    <section className="py-32 bg-mist overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full bg-dot-grid opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="text-center mb-28">
            <h2 className="font-display font-extrabold text-5xl lg:text-6xl text-ink">
              Engineering Success
            </h2>
            <p className="mt-6 text-xl text-ink/60">
              A deterministic methodology for digital transformation.
            </p>
          </div>

          <div className="relative mt-20">
            {/* Horizontal Line */}
            <div className="absolute top-0 left-[5%] right-[5%] h-1 bg-gradient-to-r from-transparent via-brand/40 to-transparent hidden md:block" />

            <div className="grid md:grid-cols-5 gap-10 md:gap-4 relative z-10">
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.title}
                  className="relative group flex flex-col md:items-center"
                >
                  {/* Glowing Node */}
                  <div className="absolute -top-3 md:-top-4 left-0 md:left-1/2 md:-translate-x-1/2 size-8 rounded-full bg-white border-4 border-mist flex items-center justify-center group-hover:border-brand transition-colors duration-300 shadow-sm z-20">
                    <div className="size-2.5 rounded-full bg-brand group-hover:scale-150 transition-transform duration-300 group-hover:shadow-[0_0_10px_#5509D9]" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`mt-8 md:mt-0 md:pt-12 transition-all duration-500 md:group-hover:-translate-y-2 w-full ${i % 2 !== 0 ? "md:pt-32" : ""}`}
                  >
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-hairline group-hover:shadow-card transition-all relative overflow-hidden text-left md:text-center h-full">
                      <div className="font-mono text-5xl font-bold text-ink/5 absolute -top-2 -right-2 group-hover:text-brand/10 transition-colors pointer-events-none select-none">
                        0{i + 1}
                      </div>
                      <h4 className="font-display font-bold text-2xl mb-3 text-ink relative z-10">
                        {step.title}
                      </h4>
                      <p className="text-base text-ink/65 relative z-10 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-28 bg-brand-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-dot-grid opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 divide-x-0 md:divide-x divide-white/10 text-center md:text-left">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="md:pl-8 first:pl-0 flex flex-col items-center md:items-start"
              >
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delay={i * 100}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            io.disconnect();
            const start = performance.now();
            const duration = 2000;
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 4); // Quartic ease out
              setCount(Math.round(value * eased));
              if (t < 1) requestAnimationFrame(step);
            };
            setTimeout(() => requestAnimationFrame(step), delay);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref}>
      <div className="font-display font-extrabold text-6xl lg:text-7xl tracking-tighter text-white drop-shadow-md">
        {count}
        <span className="text-brand-2">{suffix}</span>
      </div>
      <div className="mt-4 text-base lg:text-lg font-medium text-white/70">
        {label}
      </div>
    </div>
  );
}

function TestimonialMarquee() {
  return (
    <section className="py-32 bg-white overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hairline to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center mb-20">
        <Reveal>
          <div className="font-mono text-sm tracking-widest text-brand mb-4">
            Client Voices
          </div>
          <h2 className="font-display font-extrabold text-5xl lg:text-6xl text-ink">
            Trusted by Visionaries
          </h2>
        </Reveal>
      </div>

      {/* CSS Marquee animation */}
      <div className="relative w-full flex overflow-x-hidden">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-8 px-4 whitespace-nowrap py-4">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-[450px] shrink-0 whitespace-normal rounded-[2rem] bg-surface-tinted p-10 border border-hairline hover:border-brand/40 transition-colors hover:shadow-card group"
            >
              <div className="flex gap-1.5 text-brand mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={20} fill="currentColor" />
                ))}
              </div>
              <p className="text-xl text-ink/80 font-medium mb-10 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-5">
                <div className="size-14 rounded-full bg-gradient-brand text-white flex items-center justify-center font-display font-bold text-2xl shadow-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-ink">
                    {t.name}
                  </div>
                  <div className="text-base text-ink/60 mt-1">
                    {t.title}, {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
