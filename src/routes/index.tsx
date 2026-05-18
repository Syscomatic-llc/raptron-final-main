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
  ShieldCheck,
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
    <main className="w-full bg-white">
      <Hero />
      <HeroCards />
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
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-mist">
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
              <span className="text-brand">We automate</span> what slows
            </span>
            <span className="block text-4xl sm:text-5xl lg:text-[4rem] whitespace-nowrap">
              you down <span className="text-brand">in 4 weeks</span>
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
              <Calendar size={20} /> Book a free consultation
            </Link>
            <Link
              to="/request-demo"
              className="group relative inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border-0 text-white font-semibold text-lg overflow-hidden shadow-glow transition-all duration-300 hover:shadow-[0_0_40px_rgba(85,9,217,0.6)] hover:scale-105"
            >
              {/* Always-on fill */}
              <span className="absolute inset-0 bg-ink rounded-full" />
              <span className="absolute inset-0 bg-gradient-brand opacity-30 rounded-full group-hover:opacity-50 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Request ERP demo
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeroCards() {
  return (
    <section className="relative bg-mist pb-20 pt-6 overflow-hidden">
      <div className="relative z-20 w-full max-w-7xl px-6 lg:px-10 mx-auto">
        <Reveal>
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-5 px-1">
            <div className="size-6 rounded-lg bg-brand/10 flex items-center justify-center">
              <Award className="text-brand" size={13} />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-ink/70">
              Serving you with
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
                    <span className="font-mono text-lg font-bold text-white/50 select-none">01</span>
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
                    <span className="font-mono text-lg font-bold text-white/50 select-none">02</span>
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
                    <span className="font-mono text-lg font-bold text-ink/30 select-none">03</span>
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
                    <span className="font-mono text-lg font-bold text-white/50 select-none">04</span>
                  </div>
                  <h3 className="text-white font-display text-sm font-bold mb-1.5">Growth Strategy</h3>
                  <p className="text-white/45 text-xs leading-relaxed">
                    Market positioning, operations improvement, and growth plans.
                  </p>
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
    <section className="py-24 lg:py-36 bg-mist relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/5 border border-brand/10 mb-6">
              <BadgeCheck className="text-brand" size={14} />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand font-semibold mt-0.5">
                The Raptron Advantage
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl lg:text-5xl xl:text-6xl tracking-tight text-ink mb-6">
              Beyond Implementation.
            </h2>
            <p className="text-lg lg:text-xl text-ink/60 max-w-2xl leading-relaxed">
              We don't just deliver projects. We engineer unfair competitive advantages that scale with your business.
            </p>
          </div>

          {/* Grid */}
          <div className="grid lg:grid-cols-3 gap-5 lg:gap-6 auto-rows-[280px] lg:auto-rows-[320px]">
            {/* Box 1 */}
            <div className="lg:col-span-2 rounded-3xl border border-hairline bg-white shadow-sm p-8 lg:p-12 relative overflow-hidden group hover:shadow-card transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(85,9,217,0.08),transparent_70%)] pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />
              <div className="absolute -right-12 -bottom-12 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                <Database size={250} />
              </div>
              <div className="flex flex-col h-full justify-between relative z-10 max-w-xl">
                <div className="size-14 rounded-2xl bg-brand/10 flex items-center justify-center">
                  <Database className="text-brand" size={26} />
                </div>
                <div>
                  <h3 className="font-display text-3xl lg:text-4xl font-extrabold text-ink mb-4">
                    Data Supremacy
                  </h3>
                  <p className="text-ink/65 text-base lg:text-lg leading-relaxed">
                    We don't just migrate data; we structure it to feed predictive
                    AI models, automate reporting, and power real-time executive
                    dashboards.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="lg:col-span-1 rounded-3xl border border-hairline bg-ink p-8 lg:p-12 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-2/20 blur-[50px] rounded-full pointer-events-none" />
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/5">
                  <Zap className="text-brand-2" size={26} />
                </div>
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-white mb-3">
                    Velocity
                  </h3>
                  <p className="text-white/60 text-sm lg:text-base leading-relaxed">
                    Shipping custom modules 4x faster with our proprietary
                    enterprise frameworks and AI-assisted workflows.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="lg:col-span-1 rounded-3xl border border-brand/20 bg-gradient-to-br from-brand to-[#7010e0] p-8 lg:p-12 text-white hover:shadow-lg hover:shadow-brand/25 transition-all duration-500 group relative overflow-hidden hover:-translate-y-1">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="flex flex-col h-full justify-between relative z-10">
                <div className="size-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-inner">
                  <Terminal className="text-white" size={26} />
                </div>
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-white mb-3">
                    Code Quality
                  </h3>
                  <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                    Enterprise-grade architecture built to scale securely and
                    evolve continuously without technical debt.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 4 */}
            <div className="lg:col-span-2 rounded-3xl border border-hairline bg-surface-tinted shadow-sm p-8 lg:p-12 relative overflow-hidden group hover:shadow-card transition-all duration-500 hover:-translate-y-1">
              <div className="absolute right-0 top-0 bottom-0 w-2/3 bg-[radial-gradient(rgba(85,9,217,0.1)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:linear-gradient(to_left,black,transparent)] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex flex-col h-full justify-between relative z-10 max-w-xl">
                <div className="size-14 rounded-2xl bg-white border border-hairline shadow-sm flex items-center justify-center">
                  <ShieldCheck className="text-brand" size={26} />
                </div>
                <div>
                  <h3 className="font-display text-3xl lg:text-4xl font-extrabold text-ink mb-4">
                    Total Ownership
                  </h3>
                  <p className="text-ink/65 text-base lg:text-lg leading-relaxed">
                    From initial process audit to post-go-live optimization. One
                    accountable team, zero handoffs, absolute transparency, and guaranteed outcomes.
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

function ServicesShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const numServices = SERVICES.length;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const maxScroll = height - viewportHeight;
      const currentScroll = -top;
      
      if (currentScroll <= 0) {
        setScrollProgress(0);
        setActiveIdx(0);
      } else if (currentScroll >= maxScroll) {
        setScrollProgress(1);
        setActiveIdx(numServices - 1);
      } else {
        const progress = currentScroll / maxScroll;
        setScrollProgress(progress);
        const newIdx = Math.round(progress * (numServices - 1));
        setActiveIdx(Math.min(numServices - 1, newIdx));
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [numServices]);

  const scrollToIdx = (idx: number) => {
    if (!containerRef.current) return;
    const viewportHeight = window.innerHeight;
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const maxScroll = rect.height - viewportHeight;
    const targetScroll = (idx / (numServices - 1)) * maxScroll;
    window.scrollTo({ top: absoluteTop + targetScroll, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative bg-mist" style={{ height: `${numServices * 80}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden w-full px-2">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.04)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 lg:px-10 relative z-10 w-full">
          <Reveal>
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/5 border border-brand/10 mb-3">
                <BadgeCheck className="text-brand" size={14} />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand font-semibold mt-0.5">
                  What We Deliver
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl lg:text-4xl xl:text-5xl tracking-tight text-ink">
                Built to move your business forward.
              </h2>
            </div>

            {/* Tab Bar */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {SERVICES.map((s, i) => {
                const TabIcon = s.icon;
                return (
                  <button
                    key={s.slug}
                    onClick={() => scrollToIdx(i)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${activeIdx === i
                      ? "bg-brand text-white border-brand shadow-[0_4px_20px_rgba(85,9,217,0.35)]"
                      : "bg-white text-ink/55 border-hairline hover:border-brand/30 hover:text-ink hover:shadow-sm"
                      }`}
                  >
                    <TabIcon size={12} />
                    {s.shortTitle}
                  </button>
                );
              })}
            </div>

            {/* Horizontal Track */}
            <div className="overflow-hidden w-full pb-2">
              <div 
                className="flex items-stretch transition-transform duration-[400ms] ease-out will-change-transform"
                style={{ 
                  width: `${numServices * 100}%`, 
                  transform: `translateX(-${scrollProgress * (100 - 100/numServices)}%)` 
                }}
              >
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div 
                      key={s.slug} 
                      className="w-full flex-shrink-0 px-2 lg:px-4" 
                      style={{ width: `${100 / numServices}%` }}
                    >
                      <div className="bg-white rounded-3xl border border-hairline shadow-sm grid lg:grid-cols-2 overflow-hidden h-full min-h-[420px]">
                        {/* Left — Info Section */}
                        <div className="p-5 lg:p-8 flex flex-col">
                          <div className="size-10 rounded-xl bg-brand/10 flex items-center justify-center mb-3">
                            <Icon className="text-brand" size={20} />
                          </div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand mb-2">
                            {s.shortTitle}
                          </div>
                          <h3 className="font-display text-xl lg:text-3xl font-extrabold text-ink mb-3 leading-tight">
                            {s.headline}
                          </h3>
                          <div className="w-8 h-0.5 bg-brand rounded-full mb-3" />
                          <p className="text-ink/60 leading-relaxed mb-4 flex-1 text-xs lg:text-sm">{s.description}</p>

                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {s.bullets.map((b) => (
                              <div key={b} className="flex items-center gap-2 bg-mist border border-hairline rounded-lg px-2.5 py-1.5">
                                <span className="size-1.5 rounded-full bg-brand shrink-0" />
                                <span className="text-[11px] lg:text-xs text-ink/75 font-medium leading-snug">{b}</span>
                              </div>
                            ))}
                          </div>

                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="inline-flex items-center gap-1.5 text-brand text-xs font-semibold hover:gap-2 transition-all w-fit mt-auto"
                          >
                            Explore this service <ArrowRight size={13} />
                          </Link>
                        </div>

                        {/* Right — Visual Section */}
                        <div className="bg-ink p-5 lg:p-8 relative overflow-hidden flex flex-col">
                          <div className="absolute -top-20 -right-20 w-56 h-56 bg-brand/25 blur-[60px] rounded-full pointer-events-none" />
                          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                          <div className="relative z-10 flex items-center gap-1.5 mb-4">
                            <span className="size-2.5 rounded-full bg-red-400/60" />
                            <span className="size-2.5 rounded-full bg-yellow-400/60" />
                            <span className="size-2.5 rounded-full bg-green-400/60" />
                          </div>

                          <div className="relative z-10 flex flex-col flex-1 gap-2">
                            <div className="bg-brand/20 border border-brand/30 rounded-xl p-3 mb-1">
                              <div className="font-mono text-[9px] uppercase tracking-widest text-brand-2/70 mb-1">
                                {s.tagline}
                              </div>
                              <div className="flex items-center gap-2.5">
                                <div className="size-7 rounded-lg bg-brand/30 border border-brand/40 flex items-center justify-center">
                                  <Icon className="text-brand-2" size={14} />
                                </div>
                                <span className="font-display text-sm lg:text-base font-bold text-white">{s.title}</span>
                              </div>
                            </div>

                            {s.whatsIncluded.slice(0, 5).map((item, i) => (
                              <div
                                key={item}
                                className="bg-white/5 border border-white/8 rounded-lg px-3 py-2 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className={`size-5 rounded-md flex items-center justify-center ${
                                    i === 0 ? "bg-brand/30" :
                                    i === 1 ? "bg-brand-2/20" :
                                    i === 2 ? "bg-emerald-500/20" :
                                    i === 3 ? "bg-amber-500/20" : "bg-sky-500/20"
                                  }`}>
                                    <Icon size={10} className={
                                      i === 0 ? "text-brand-2" :
                                      i === 1 ? "text-brand-2" :
                                      i === 2 ? "text-emerald-400" :
                                      i === 3 ? "text-amber-400" : "text-sky-400"
                                    } />
                                  </div>
                                  <span className="text-[11px] lg:text-xs text-white/70">{item}</span>
                                </div>
                                <CheckCircle2 size={12} className="text-brand-2/50 shrink-0" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
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

            <div className="grid md:grid-cols-5 gap-10 md:gap-6 relative z-10">
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
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-hairline group-hover:shadow-card transition-all relative text-left md:text-center h-full">
                      <div className="font-mono text-4xl font-bold text-ink/5 absolute top-3 right-4 group-hover:text-brand/10 transition-colors pointer-events-none select-none">
                        0{i + 1}
                      </div>
                      <h4 className="font-display font-bold text-xl mb-2 mt-7 text-ink relative z-10">
                        {step.title}
                      </h4>
                      <p className="text-sm text-ink/65 relative z-10 leading-relaxed">
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
