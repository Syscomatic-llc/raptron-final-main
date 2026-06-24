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
  TrendingUp,
  Award,
  BadgeCheck,
  Code2,
  LineChart,
  ShieldCheck,
  Users2,
  Clock,
  BarChart3,
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
      <IndustriesTicker />
      <HeroCards />
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
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-mist pt-32 pb-20">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand/12 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-brand-2/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-violet-400/8 blur-[100px] rounded-full pointer-events-none" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.04)_1px,transparent_1px)] bg-[size:26px_26px] pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="relative z-20 w-full max-w-7xl px-6 lg:px-10 text-center flex flex-col items-center my-auto">
        <Reveal>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 border border-hairline backdrop-blur-md shadow-sm mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-ink/70 font-semibold">
              The future of enterprise tech
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold leading-[1.06] tracking-tight text-ink mx-auto text-center text-[34px] min-[430px]:text-[35px] sm:text-5xl lg:text-[4.5rem]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-brand-2 to-violet-500">
              We automate
            </span>{" "}
            what
            <br className="min-[430px]:hidden" />
            <span className="max-[429px]:hidden"> </span>
            slows
            <br className="hidden min-[430px]:block" />
            <span className="min-[430px]:hidden"> </span>
            you down,
            <br className="min-[430px]:hidden" />
            <span className="max-[429px]:hidden"> </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-brand-2 to-brand">
              in 4 weeks
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="mt-7 text-lg sm:text-xl text-ink/55 max-w-2xl mx-auto leading-relaxed font-light">
            We help business owners reduce manual work, improve visibility, and
            bring their daily activities into one connected, intelligent
            operating structure.
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book-consultation"
              className="btn-lucrative inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full text-white font-semibold text-base"
            >
              <Calendar size={18} /> Book a free consultation
            </Link>
            <Link
              to="/request-demo"
              className="group inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full border border-ink/15 bg-ink/5 text-ink font-semibold text-base hover:bg-ink/8 hover:border-ink/25 transition-all duration-300 hover:scale-105"
            >
              Request ERP demo
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Metric chips */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {[
              {
                icon: Users2,
                label: "50+ businesses automated",
                color: "text-violet-500",
              },
              { icon: Clock, label: "Live in 4 weeks", color: "text-brand" },
              {
                icon: BarChart3,
                label: "40% avg. efficiency gain",
                color: "text-emerald-600",
              },
              {
                icon: ShieldCheck,
                label: "98% client retention",
                color: "text-amber-600",
              },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-hairline shadow-sm backdrop-blur-sm"
              >
                <Icon size={13} className={color} />
                <span className="text-xs font-medium text-ink/65">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeroCards() {
  const CARDS = [
    {
      num: "01",
      title: "Operational Automation",
      desc: "We map your workflows and deploy automation that eliminates manual steps, reduces errors, and returns hours to your team.",
      icon: Workflow,
      stat: "10×",
      statLabel: "workflow speed",
      pill: "Process Re-engineering",
      dark: true,
      accent: "rgba(85,9,217,0.35)",
      accentClass: "bg-brand/25 border-brand/40",
      iconBg: "bg-brand/20 border border-brand/30",
      iconColor: "text-brand-2",
      numColor: "text-white/25",
      slug: "/services/operational-automation",
    },
    {
      num: "02",
      title: "Finance & Compliance",
      desc: "Structured accounting, VAT readiness, and audit-proof financial records - built around UAE regulations and your business model.",
      icon: LineChart,
      stat: "100%",
      statLabel: "compliance coverage",
      pill: "Accounting & Tax",
      dark: false,
      accent: "rgba(85,9,217,0.18)",
      accentClass: "bg-brand/10 border-brand/20",
      iconBg: "bg-brand/10 border border-brand/15",
      iconColor: "text-brand",
      numColor: "text-ink/15",
      slug: "/services/finance-compliance",
    },
    {
      num: "03",
      title: "AI Agents",
      desc: "Task-focused AI agents that handle sales follow-ups, customer service, and operations - around the clock without oversight.",
      icon: BrainCircuit,
      stat: "24/7",
      statLabel: "autonomous ops",
      pill: "Intelligent Automation",
      dark: true,
      gradient: true,
      accent: "rgba(163,54,255,0.4)",
      accentClass: "bg-white/20 border-white/20",
      iconBg: "bg-white/15 border border-white/25",
      iconColor: "text-white",
      numColor: "text-white/25",
      slug: "/services/ai-agents",
    },
    {
      num: "04",
      title: "Growth Strategy",
      desc: "Market positioning, revenue structure, and 90-day execution roadmaps designed for operators ready to scale deliberately.",
      icon: TrendingUp,
      stat: "3.1×",
      statLabel: "avg. revenue lift",
      pill: "Strategic Advisory",
      dark: true,
      accent: "rgba(85,9,217,0.25)",
      accentClass: "bg-brand-2/15 border-brand-2/25",
      iconBg: "bg-brand-2/20 border border-brand-2/30",
      iconColor: "text-brand-2",
      numColor: "text-white/25",
      slug: "/services/growth-strategy",
    },
    {
      num: "05",
      title: "Custom Software",
      desc: "Web, mobile, and cloud-native systems engineered for your exact logic - owned by you, built to scale.",
      icon: Code2,
      stat: "99.99%",
      statLabel: "SLA uptime",
      pill: "Software Engineering",
      dark: false,
      accent: "rgba(85,9,217,0.12)",
      accentClass: "bg-brand/8 border-brand/15",
      iconBg: "bg-brand/10 border border-brand/15",
      iconColor: "text-brand",
      numColor: "text-ink/15",
      slug: "/services/custom-software-development",
    },
  ];

  return (
    <section className="relative bg-mist pb-24 pt-4 overflow-hidden">
      {/* subtle radial bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(85,9,217,0.05),transparent)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-10 mx-auto">
        <Reveal>
          {/* Section label */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-1">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="size-6 rounded-lg bg-brand/10 flex items-center justify-center">
                  <Award className="text-brand" size={13} />
                </div>
                <span className="font-mono text-[11px] tracking-[0.22em] text-brand font-semibold uppercase">
                  Core capabilities
                </span>
              </div>
              <h2 className="font-display font-extrabold text-4xl lg:text-5xl tracking-tight text-ink leading-tight">
                Our Capabilities
              </h2>
            </div>
            <p className="text-base lg:text-lg text-ink/60 max-w-md font-light leading-relaxed">
              Specialized practices engineered to automate workflows,
              audit-proof finance, and accelerate revenue.
            </p>
          </div>

          {/* ── Linear Stack of Capabilities ── */}
          <div className="flex flex-col gap-4">
            {CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.num}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={c.slug as any}
                  className="group relative rounded-3xl p-6 lg:p-8 bg-white border border-hairline hover:border-brand/30 hover:shadow-card transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden"
                  style={{ boxShadow: `0 0 0 0 ${c.accent}` }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = `0 8px 40px ${c.accent}`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = `0 0 0 0 ${c.accent}`)
                  }
                >
                  {/* Subtle background glow */}
                  <div
                    className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: c.dark
                        ? "rgba(85,9,217,0.4)"
                        : "rgba(85,9,217,0.12)",
                    }}
                  />
                  {/* dot grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Left Side: Num, Icon, Title, Pill, Description */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5 lg:flex-1 relative z-10">
                    {/* Number and Icon */}
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-mono text-4xl lg:text-5xl font-black text-ink/15 group-hover:text-brand/80 transition-colors duration-300 leading-none select-none">
                        {c.num}
                      </span>
                      <div
                        className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${c.iconBg} transition-transform duration-500 group-hover:scale-110`}
                      >
                        <Icon size={22} className={c.iconColor} />
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="font-display font-extrabold text-xl lg:text-2xl text-ink leading-tight">
                          {c.title}
                        </h3>
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider border ${c.accentClass} ${c.dark ? "text-brand-2" : "text-brand"}`}
                        >
                          {c.pill}
                        </div>
                      </div>
                      <p className="text-sm lg:text-base text-ink/55 leading-relaxed max-w-3xl">
                        {c.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Stat and CTA */}
                  <div className="flex items-center justify-between md:justify-end gap-8 border-t border-hairline pt-5 md:border-t-0 md:pt-0 shrink-0 relative z-10">
                    {/* Stat */}
                    <div className="text-left md:text-right min-w-[120px]">
                      <div className="font-display font-black text-3xl lg:text-4xl text-brand leading-none">
                        {c.stat}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-widest mt-1 text-ink/40">
                        {c.statLabel}
                      </div>
                    </div>

                    {/* Explore button */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-brand group-hover:gap-2.5 transition-all duration-300">
                      Explore <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function IndustriesTicker() {
  return (
    <div className="w-full border-b border-hairline bg-white py-8 overflow-hidden flex items-center relative z-20">
      {/* Left side overlay - Desktop */}
      <div className="absolute left-0 top-0 bottom-0 z-20 hidden md:flex items-center bg-white pl-6 lg:pl-10 pr-6">
        <div className="font-mono text-[10px] tracking-[0.2em] text-ink/40">
          Trusted Across Sectors
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-32 translate-x-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
      </div>

      {/* Left side fade - Mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />

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
              We don't just deliver projects. We engineer unfair competitive
              advantages that scale with your business.
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
                    We don't just migrate data; we structure it to feed
                    predictive AI models, automate reporting, and power
                    real-time executive dashboards.
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
                    accountable team, zero handoffs, absolute transparency, and
                    guaranteed outcomes.
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [numServices]);

  const scrollToIdx = (idx: number) => {
    if (!containerRef.current) return;
    const viewportHeight = window.innerHeight;
    const rect = containerRef.current.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const maxScroll = rect.height - viewportHeight;
    const targetScroll = (idx / (numServices - 1)) * maxScroll;
    window.scrollTo({ top: absoluteTop + targetScroll, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-mist"
      style={{ height: `${numServices * 80}vh` }}
    >
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
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                      activeIdx === i
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
                  transform: `translateX(-${scrollProgress * (100 - 100 / numServices)}%)`,
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
                      <div className="bg-white rounded-3xl border border-hairline shadow-sm flex flex-col lg:grid lg:grid-cols-2 overflow-hidden h-full min-h-0 md:min-h-[420px] max-h-[85vh] overflow-y-auto">
                        {/* Left - Info Section */}
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
                          <p className="text-ink/60 leading-relaxed mb-4 flex-1 text-xs lg:text-sm">
                            {s.description}
                          </p>

                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {s.bullets.map((b) => (
                              <div
                                key={b}
                                className="flex items-center gap-2 bg-mist border border-hairline rounded-lg px-2.5 py-1.5"
                              >
                                <span className="size-1.5 rounded-full bg-brand shrink-0" />
                                <span className="text-[11px] lg:text-xs text-ink/75 font-medium leading-snug">
                                  {b}
                                </span>
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

                        {/* Right - Visual Section */}
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
                                <span className="font-display text-sm lg:text-base font-bold text-white">
                                  {s.title}
                                </span>
                              </div>
                            </div>

                            {s.whatsIncluded.slice(0, 5).map((item, i) => (
                              <div
                                key={item}
                                className="bg-white/5 border border-white/8 rounded-lg px-3 py-2 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`size-5 rounded-md flex items-center justify-center ${
                                      i === 0
                                        ? "bg-brand/30"
                                        : i === 1
                                          ? "bg-brand-2/20"
                                          : i === 2
                                            ? "bg-emerald-500/20"
                                            : i === 3
                                              ? "bg-amber-500/20"
                                              : "bg-sky-500/20"
                                    }`}
                                  >
                                    <Icon
                                      size={10}
                                      className={
                                        i === 0
                                          ? "text-brand-2"
                                          : i === 1
                                            ? "text-brand-2"
                                            : i === 2
                                              ? "text-emerald-400"
                                              : i === 3
                                                ? "text-amber-400"
                                                : "text-sky-400"
                                      }
                                    />
                                  </div>
                                  <span className="text-[11px] lg:text-xs text-white/70">
                                    {item}
                                  </span>
                                </div>
                                <CheckCircle2
                                  size={12}
                                  className="text-brand-2/50 shrink-0"
                                />
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
    <section className="py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-hairline to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center mb-10 md:mb-12">
        <Reveal>
          <div className="font-mono text-xs md:text-sm tracking-widest text-brand mb-2.5">
            Client Voices
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-ink">
            Trusted by Visionaries
          </h2>
        </Reveal>
      </div>

      {/* CSS Marquee animation */}
      <div className="relative w-full flex overflow-x-hidden">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-6 px-3 whitespace-nowrap py-3">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="w-[300px] md:w-[380px] shrink-0 whitespace-normal rounded-[1.5rem] bg-surface-tinted p-6 md:p-7 border border-hairline hover:border-brand/40 transition-colors hover:shadow-card group flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-brand mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-ink/85 font-medium mb-6 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <div className="size-10 rounded-full bg-gradient-brand text-white flex items-center justify-center font-display font-bold text-lg shadow-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-base text-ink truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-ink/65 mt-0.5 truncate">
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
