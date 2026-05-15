import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  BarChart2,
  Workflow,
  BrainCircuit,
  LineChart,
  Code2,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { CTABanner } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies - RAPTRON Digital Solutions" },
      {
        name: "description",
        content:
          "Real results from real businesses. See how RAPTRON has helped companies automate operations, manage finances, and scale with AI.",
      },
    ],
  }),
  component: CaseStudiesPage,
});

const CASE_STUDIES = [
  {
    id: "trading-co-automation",
    tag: "Operational Automation",
    tagIcon: Workflow,
    industry: "Trading",
    company: "Al Falak Trading Co.",
    headline: "Eliminated 40+ hours of manual data entry per week",
    description:
      "A mid-size trading company operating across 3 warehouses was drowning in manual purchase orders, stock reconciliations, and invoice approvals. We redesigned their entire operations workflow - automating data flows between systems, eliminating double-entry, and giving management real-time visibility.",
    metrics: [
      { label: "Hours saved / week", value: "40+" },
      { label: "Error rate reduction", value: "94%" },
      { label: "Time to close POs", value: "−3 days" },
    ],
    accent: "bg-ink",
    featured: true,
  },
  {
    id: "real-estate-compliance",
    tag: "Finance & Compliance",
    tagIcon: LineChart,
    industry: "Real Estate",
    company: "Meridian Properties LLC",
    headline: "VAT compliance achieved in 3 weeks, zero penalties",
    description:
      "A growing real estate developer faced an FTA audit with incomplete VAT records spanning 18 months. We stepped in, reconstructed their compliance trail, filed accurate returns, and built a structured accounting workflow to prevent future gaps.",
    metrics: [
      { label: "Months reconstructed", value: "18" },
      { label: "Compliance penalties", value: "0" },
      { label: "Weeks to resolution", value: "3" },
    ],
    accent: "bg-gradient-brand",
    featured: false,
  },
  {
    id: "manufacturing-ai-agents",
    tag: "AI Agents",
    tagIcon: BrainCircuit,
    industry: "Manufacturing",
    company: "GulfTech Industries",
    headline: "AI agent handles 80% of supplier queries autonomously",
    description:
      "A manufacturing firm receiving 300+ daily supplier and logistics inquiries wanted to reduce response time without hiring. We built a custom AI agent trained on their SOPs, product catalogue, and contract terms - integrated directly into their email and WhatsApp.",
    metrics: [
      { label: "Queries automated", value: "80%" },
      { label: "Avg. response time", value: "<2 min" },
      { label: "Support hours saved", value: "60/mo" },
    ],
    accent: "bg-white",
    featured: false,
  },
  {
    id: "retail-growth-strategy",
    tag: "Growth Strategy",
    tagIcon: TrendingUp,
    industry: "Retail",
    company: "Nomad Retail Group",
    headline: "Repositioned 3 brands, 38% revenue growth in 6 months",
    description:
      "A multi-brand retail group operating in UAE and KSA was stagnating despite good products. We audited their positioning, restructured their pricing strategy, optimised their store operations, and built a market expansion plan for 2 new territories.",
    metrics: [
      { label: "Revenue growth", value: "+38%" },
      { label: "Markets entered", value: "2" },
      { label: "Brands repositioned", value: "3" },
    ],
    accent: "bg-ink",
    featured: false,
  },
  {
    id: "logistics-custom-software",
    tag: "Custom Software",
    tagIcon: Code2,
    industry: "Logistics",
    company: "SwiftRoute Logistics",
    headline: "Custom dispatch platform replaced 3 legacy tools",
    description:
      "A last-mile delivery company was managing routes, driver assignments, and client communications across three separate tools - with no single source of truth. We built a unified dispatch and tracking platform that consolidated everything into one owned system.",
    metrics: [
      { label: "Tools replaced", value: "3" },
      { label: "Dispatch time", value: "−65%" },
      { label: "On-time delivery", value: "+22%" },
    ],
    accent: "bg-surface-tinted",
    featured: false,
  },
];

function CaseStudiesPage() {
  return (
    <main className="w-full bg-white overflow-x-hidden">
      <Hero />
      <FeaturedCaseStudy />
      <CaseStudyGrid />
      <CTABanner />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative pt-36 pb-24 bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 mb-8">
            <BarChart2 size={13} className="text-brand-2" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/60 font-semibold">
              Real Results
            </span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white max-w-4xl">
            What happens when{" "}
            <span className="text-transparent bg-clip-text bg-gradient-brand">
              the work is done right.
            </span>
          </h1>

          <p className="mt-8 text-xl text-white/50 max-w-2xl leading-relaxed font-light">
            Every case study here is a real engagement - real constraints, real
            teams, real outcomes. No demos. No hypotheticals.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            {["All", "Automation", "Finance", "AI Agents", "Strategy", "Software"].map(
              (cat, i) => (
                <button
                  key={cat}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    i === 0
                      ? "bg-brand text-white border-brand"
                      : "bg-white/5 text-white/55 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedCaseStudy() {
  const cs = CASE_STUDIES[0];
  const Icon = cs.tagIcon;
  return (
    <section className="py-20 bg-mist relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.04)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.25em] text-brand mb-8">
            Featured Case Study
          </div>
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">

            {/* Left - Story */}
            <div className="lg:col-span-7 bg-white rounded-[2rem] p-12 border border-hairline shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="size-10 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Icon size={18} className="text-brand" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-brand">{cs.tag}</div>
                  <div className="text-sm text-ink/50 font-medium">{cs.industry}</div>
                </div>
              </div>

              <div className="font-mono text-[11px] uppercase tracking-widest text-ink/35 mb-3">{cs.company}</div>
              <h2 className="font-display text-4xl font-extrabold text-ink leading-tight mb-6">
                {cs.headline}
              </h2>
              <div className="w-10 h-[3px] bg-brand rounded-full mb-6" />
              <p className="text-ink/60 leading-relaxed flex-1 text-lg">{cs.description}</p>

              <div className="mt-10">
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-ink text-white font-semibold text-sm hover:bg-brand transition-colors duration-300 group"
                >
                  Read Full Case Study
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right - Metrics */}
            <div className="lg:col-span-5 bg-ink rounded-[2rem] p-10 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand/30 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

              <div className="relative z-10">
                <div className="font-mono text-[11px] tracking-widest text-white/35 mb-8">Outcomes</div>
                <div className="space-y-6">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="border-b border-white/8 pb-6 last:border-0 last:pb-0">
                      <div className="font-display text-5xl font-extrabold text-white mb-1 tracking-tight">
                        {m.value}
                      </div>
                      <div className="text-white/45 text-sm font-medium">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-10 flex items-center gap-2 text-brand-2/70 text-xs font-mono uppercase tracking-wider">
                <CheckCircle2 size={13} className="text-brand-2" />
                Verified client outcome
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudyGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="mb-14">
            <div className="font-mono text-[11px] tracking-[0.25em] text-brand mb-3">More Cases</div>
            <h2 className="font-display font-extrabold text-5xl tracking-tight text-ink">
              More client stories.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CASE_STUDIES.slice(1).map((cs) => {
              const Icon = cs.tagIcon;
              const isDark = cs.accent === "bg-ink" || cs.accent === "bg-gradient-brand";
              return (
                <div
                  key={cs.id}
                  className={`${cs.accent} rounded-[2rem] p-10 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 border ${isDark ? "border-transparent hover:shadow-[0_0_60px_rgba(85,9,217,0.3)]" : "border-hairline hover:shadow-card"}`}
                >
                  {isDark && (
                    <div className="absolute -top-16 -right-16 w-56 h-56 bg-brand/25 blur-[70px] rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-xl flex items-center justify-center ${isDark ? "bg-white/10 border border-white/15" : "bg-brand/10"}`}>
                          <Icon size={17} className={isDark ? "text-brand-2" : "text-brand"} />
                        </div>
                        <div>
                          <div className={`font-mono text-[10px] uppercase tracking-widest ${isDark ? "text-brand-2" : "text-brand"}`}>{cs.tag}</div>
                          <div className={`text-xs font-medium ${isDark ? "text-white/40" : "text-ink/40"}`}>{cs.industry}</div>
                        </div>
                      </div>
                      <ChevronRight size={18} className={`${isDark ? "text-white/20" : "text-ink/20"} group-hover:translate-x-1 transition-transform`} />
                    </div>

                    <div className={`font-mono text-[10px] uppercase tracking-widest mb-2 ${isDark ? "text-white/30" : "text-ink/35"}`}>{cs.company}</div>
                    <h3 className={`font-display text-xl font-bold mb-4 leading-snug ${isDark ? "text-white" : "text-ink"}`}>
                      {cs.headline}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-8 line-clamp-3 ${isDark ? "text-white/50" : "text-ink/55"}`}>
                      {cs.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {cs.metrics.map((m) => (
                        <div key={m.label} className={`rounded-xl p-3 ${isDark ? "bg-white/6 border border-white/8" : "bg-mist border border-hairline"}`}>
                          <div className={`font-display text-2xl font-extrabold ${isDark ? "text-white" : "text-ink"}`}>{m.value}</div>
                          <div className={`text-[10px] mt-0.5 leading-tight ${isDark ? "text-white/40" : "text-ink/45"}`}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
