import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Calendar,
  TrendingUp,
  ChevronRight,
  Zap,
  Eye,
  BarChart3,
  Shield,
} from "lucide-react";
import { SERVICES, type ServiceSlug } from "@/lib/constants";
import { CTABanner, PageHero } from "@/components/layout/PageHero";
import { AutomationHero } from "@/components/AutomationHero";
import { FinanceComplianceHero } from "@/components/FinanceComplianceHero";
import { AIAgentsHero } from "@/components/AIAgentsHero";
import { GrowthStrategyHero } from "@/components/GrowthStrategyHero";
import { CustomSoftwareHero } from "@/components/CustomSoftwareHero";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} - RAPTRON` },
          { name: "description", content: loaderData.service.description },
          { property: "og:title", content: loaderData.service.title },
          {
            property: "og:description",
            content: loaderData.service.description,
          },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="pt-32 text-center text-ink/60">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="pt-32 pb-20 text-center">
      <h1 className="font-display text-4xl font-bold">Service not found</h1>
      <Link
        to="/services"
        className="mt-6 inline-block text-brand font-semibold"
      >
        View all services →
      </Link>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const isAutomation = service.slug === "operational-automation";
  const isFinance = service.slug === "finance-compliance";
  const isAI = service.slug === "ai-agents";
  const isGrowth = service.slug === "growth-strategy";
  const isCustomSoftware = service.slug === "custom-software-development";

  return (
    <>
      {isAutomation ? (
        <AutomationHero
          eyebrow={service.shortTitle}
          title={service.headline}
          description={service.description}
        />
      ) : isFinance ? (
        <FinanceComplianceHero
          eyebrow={service.shortTitle}
          title={service.headline}
          description={service.description}
        />
      ) : isAI ? (
        <AIAgentsHero
          eyebrow={service.shortTitle}
          title={service.headline}
          description={service.description}
        />
      ) : isGrowth ? (
        <GrowthStrategyHero
          eyebrow={service.shortTitle}
          title={service.headline}
          description={service.description}
        />
      ) : isCustomSoftware ? (
        <CustomSoftwareHero
          eyebrow={service.shortTitle}
          title={service.headline}
          description={service.description}
        />
      ) : (
        <PageHero
          eyebrow={service.shortTitle}
          title={service.headline}
          description={service.description}
        >
          <div className="flex flex-wrap gap-3">
            <Link
              to="/book-consultation"
              className="btn-lucrative inline-flex items-center gap-2 h-12 px-6 rounded-full text-white font-semibold"
            >
              <Calendar size={16} /> Book a free consultation
            </Link>
            <Link
              to="/request-demo"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-ink/15 text-ink font-semibold hover:bg-white transition"
            >
              Request ERP demo <ArrowRight size={16} />
            </Link>
          </div>
          <div className="absolute right-10 bottom-10 hidden lg:block">
            <div className="size-24 rounded-2xl bg-gradient-brand text-white flex items-center justify-center shadow-lift">
              <Icon size={42} />
            </div>
          </div>
        </PageHero>
      )}

      {/* What's included */}
      <WhatsIncludedSection items={service.whatsIncluded} />

      {/* How it works - Interactive Roadmap */}
      <DeliveryFlowSection process={service.process} />

      {/* Outcomes - Before/After Impact Section */}
      <OutcomesSection outcomes={service.outcomes} />

      {/* Related - Rich Service Explorer */}
      <RelatedSection related={related} />

      <CTABanner />
    </>
  );
}

/* ─────────────────────────────────────────────
   WHAT'S INCLUDED - Interactive scope grid
───────────────────────────────────────────── */
function WhatsIncludedSection({ items }: { items: string[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 90% 50%, rgba(85,9,217,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="reveal grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column - sticky header */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="font-mono text-[11px] tracking-[0.18em] text-brand mb-3">
                What's Included
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-4xl leading-tight">
                A scope built around outcomes.
              </h2>
              <p className="mt-4 text-ink/60 leading-relaxed">
                Every engagement is tailored - these are the building blocks we
                draw from.
              </p>

              {/* Count pill */}
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-hairline bg-surface-tinted px-5 py-3">
                <div
                  className="size-9 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {items.length}
                </div>
                <div>
                  <div className="font-semibold text-sm text-ink">
                    Deliverables
                  </div>
                  <div className="text-xs text-ink/50">in your engagement</div>
                </div>
              </div>

              {/* Active progress bar */}
              {activeIdx !== null && (
                <div className="mt-6">
                  <div className="font-mono text-[10px] tracking-widest text-brand uppercase mb-2">
                    Viewing item {activeIdx + 1} of {items.length}
                  </div>
                  <div className="h-1 rounded-full bg-hairline overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${((activeIdx + 1) / items.length) * 100}%`,
                        background: "var(--gradient-brand)",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right column - interactive items */}
            <div
              className="reveal lg:col-span-8"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="grid sm:grid-cols-2 gap-3">
                {items.map((item, i) => {
                  const isHov = hoveredIdx === i;
                  const isActive = activeIdx === i;
                  const grad =
                    i % 2 === 0
                      ? "var(--gradient-brand)"
                      : "linear-gradient(135deg,#7134f1,#a336ff)";

                  return (
                    <button
                      key={item}
                      onMouseEnter={() => {
                        setHoveredIdx(i);
                        setActiveIdx(i);
                      }}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                      className="group text-left rounded-2xl border overflow-hidden transition-all duration-300"
                      style={{
                        borderColor:
                          isHov || isActive
                            ? "var(--brand)"
                            : "var(--hairline)",
                        boxShadow:
                          isHov || isActive
                            ? "var(--shadow-glow)"
                            : "0 2px 12px rgba(85,9,217,0.04)",
                        transform: isHov
                          ? "translateY(-3px) scale(1.01)"
                          : "none",
                        background: "white",
                      }}
                    >
                      {/* Animated top bar */}
                      <div
                        className="h-0.5 w-full transition-transform duration-500 origin-left"
                        style={{
                          background: grad,
                          transform:
                            isHov || isActive ? "scaleX(1)" : "scaleX(0)",
                        }}
                      />
                      <div className="flex items-start gap-4 p-5">
                        {/* Number badge */}
                        <div
                          className="shrink-0 size-8 rounded-lg flex items-center justify-center text-xs font-display font-bold transition-all duration-300"
                          style={{
                            background:
                              isHov || isActive
                                ? grad
                                : "var(--surface-tinted)",
                            color: isHov || isActive ? "white" : "var(--brand)",
                            transform: isHov
                              ? "scale(1.1) rotate(-5deg)"
                              : "scale(1)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        {/* Label */}
                        <div className="flex-1 min-w-0">
                          <div
                            className="font-semibold text-sm leading-snug transition-colors duration-200"
                            style={{
                              color:
                                isHov || isActive
                                  ? "var(--brand)"
                                  : "var(--ink)",
                            }}
                          >
                            {item}
                          </div>
                        </div>
                        {/* Check */}
                        <div
                          className="shrink-0 size-5 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5"
                          style={{
                            background:
                              isHov || isActive
                                ? grad
                                : "var(--surface-tinted)",
                            transform:
                              isHov || isActive ? "scale(1)" : "scale(0.85)",
                            opacity: isHov || isActive ? 1 : 0.6,
                          }}
                        >
                          <Check
                            size={10}
                            style={{
                              color:
                                isHov || isActive ? "white" : "var(--brand)",
                            }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-6 text-xs text-ink/40 text-center">
                Hover any item to explore · Scope is tailored per engagement
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   DELIVERY FLOW - Interactive step-by-step roadmap
───────────────────────────────────────────── */
function DeliveryFlowSection({
  process,
}: {
  process: { title: string; description: string }[];
}) {
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [Eye, Zap, BarChart3, Shield];

  return (
    <section
      className="py-20 lg:py-28 overflow-hidden"
      style={{ background: "var(--surface-tinted)" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          {/* Header */}
          <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="font-mono text-[11px] tracking-[0.18em] text-brand mb-3">
                How It Works
              </div>
              <h2 className="mt-3 font-display font-bold text-3xl lg:text-4xl">
                Our delivery flow.
              </h2>
              <p className="mt-3 text-ink/60 max-w-md">
                A structured process, not a black box. Every step has a clear
                purpose and a measurable output.
              </p>
            </div>
            <div className="text-sm text-ink/40 font-mono hidden sm:block">
              {activeStep + 1} / {process.length}
            </div>
          </div>

          {/* Timeline track */}
          <div className="reveal relative" style={{ transitionDelay: "80ms" }}>
            {/* Desktop: horizontal roadmap */}
            <div className="hidden lg:block">
              {/* Progress bar track */}
              <div className="relative flex items-start gap-0 mb-10">
                {process.map((step, i) => (
                  <div key={step.title} className="flex items-center flex-1">
                    {/* Step node */}
                    <button
                      onClick={() => setActiveStep(i)}
                      className="relative z-10 flex flex-col items-center gap-3 group w-full"
                      aria-label={`Step ${i + 1}: ${step.title}`}
                    >
                      {/* Circle */}
                      <div
                        className="relative size-14 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer"
                        style={{
                          background:
                            i <= activeStep ? "var(--gradient-brand)" : "white",
                          boxShadow:
                            i === activeStep
                              ? "var(--shadow-glow)"
                              : i < activeStep
                                ? "var(--shadow-card)"
                                : "0 2px 12px rgba(85,9,217,0.08)",
                          border:
                            i > activeStep
                              ? "2px solid var(--hairline)"
                              : "none",
                          transform:
                            i === activeStep ? "scale(1.15)" : "scale(1)",
                        }}
                      >
                        {i < activeStep ? (
                          <Check size={18} className="text-white" />
                        ) : (
                          <span
                            className="font-display font-bold text-sm"
                            style={{
                              color: i <= activeStep ? "white" : "var(--brand)",
                            }}
                          >
                            0{i + 1}
                          </span>
                        )}
                        {/* Pulse ring for active */}
                        {i === activeStep && (
                          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-brand" />
                        )}
                      </div>
                      <span
                        className="font-display font-bold text-sm transition-colors duration-300"
                        style={{
                          color:
                            i === activeStep
                              ? "var(--brand)"
                              : i < activeStep
                                ? "var(--ink)"
                                : "rgba(19,13,38,0.4)",
                        }}
                      >
                        {step.title}
                      </span>
                    </button>

                    {/* Connector line between steps */}
                    {i < process.length - 1 && (
                      <div className="flex-1 relative h-0.5 -mt-8 mx-1 overflow-hidden rounded-full bg-hairline">
                        <div
                          className="absolute inset-0 rounded-full transition-all duration-700 ease-out"
                          style={{
                            background: "var(--gradient-brand)",
                            transform: `scaleX(${i < activeStep ? 1 : 0})`,
                            transformOrigin: "left",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Active step detail card */}
              <div
                key={activeStep}
                className="rounded-2xl bg-white border border-hairline p-8 shadow-card relative overflow-hidden"
                style={{
                  animation: "slideUpFade 350ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {/* Decorative gradient blob */}
                <div
                  className="absolute -right-12 -top-12 size-40 rounded-full opacity-10 pointer-events-none"
                  style={{ background: "var(--gradient-brand)" }}
                />
                <div className="flex items-start gap-6">
                  <div
                    className="size-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    {(() => {
                      const StepIcon = stepIcons[activeStep % stepIcons.length];
                      return <StepIcon size={22} className="text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] tracking-widest text-brand uppercase">
                        Step {activeStep + 1} of {process.length}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-3">
                      {process[activeStep].title}
                    </h3>
                    <p className="text-ink/65 text-base leading-relaxed max-w-2xl">
                      {process[activeStep].description}
                    </p>
                  </div>
                  {activeStep < process.length - 1 && (
                    <button
                      onClick={() => setActiveStep((s) => s + 1)}
                      className="shrink-0 inline-flex items-center gap-2 h-10 px-5 rounded-full text-sm font-semibold text-brand border border-hairline hover:bg-surface-tinted transition-colors"
                    >
                      Next <ChevronRight size={15} />
                    </button>
                  )}
                </div>

                {/* Step dots nav */}
                <div className="flex gap-1.5 mt-6">
                  {process.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeStep ? 24 : 6,
                        height: 6,
                        background:
                          i === activeStep
                            ? "var(--brand)"
                            : i < activeStep
                              ? "rgba(85,9,217,0.35)"
                              : "var(--hairline)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: vertical accordion */}
            <div className="lg:hidden space-y-3">
              {process.map((step, i) => (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(i)}
                  className="w-full text-left rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: i === activeStep ? "white" : "transparent",
                    borderColor:
                      i === activeStep ? "var(--brand)" : "var(--hairline)",
                    boxShadow: i === activeStep ? "var(--shadow-card)" : "none",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="size-10 rounded-full flex items-center justify-center shrink-0 text-sm font-display font-bold transition-all duration-300"
                      style={{
                        background:
                          i <= activeStep
                            ? "var(--gradient-brand)"
                            : "var(--surface-tinted)",
                        color: i <= activeStep ? "white" : "var(--brand)",
                      }}
                    >
                      {i < activeStep ? <Check size={14} /> : `0${i + 1}`}
                    </div>
                    <div>
                      <div className="font-display font-bold text-base mb-1">
                        {step.title}
                      </div>
                      {i === activeStep && (
                        <p className="text-sm text-ink/65 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </div>
                    <ChevronRight
                      size={16}
                      className="ml-auto mt-1 shrink-0 transition-transform duration-300"
                      style={{
                        transform: i === activeStep ? "rotate(90deg)" : "none",
                        color:
                          i === activeStep
                            ? "var(--brand)"
                            : "rgba(19,13,38,0.3)",
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────
   OUTCOMES - Impact comparison cards
───────────────────────────────────────────── */
const outcomeAccentColors = [
  {
    bg: "rgba(85,9,217,0.06)",
    icon: "var(--gradient-brand)",
    text: "var(--brand)",
  },
  {
    bg: "rgba(163,54,255,0.06)",
    icon: "linear-gradient(135deg,#7134f1,#a336ff)",
    text: "#7134f1",
  },
  {
    bg: "rgba(113,52,241,0.06)",
    icon: "linear-gradient(135deg,#5509d9,#7134f1)",
    text: "#5509d9",
  },
];

const outcomeIcons = [Zap, BarChart3, Shield, TrendingUp, Eye];

function OutcomesSection({
  outcomes,
}: {
  outcomes: { title: string; description: string }[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          {/* Header */}
          <div className="reveal mb-14">
            <div className="font-mono text-[11px] tracking-[0.18em] text-brand mb-3">
              Business Outcomes
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <h2 className="font-display font-bold text-3xl lg:text-4xl">
                What changes when we engage.
              </h2>
              <p className="text-ink/55 sm:ml-6 sm:max-w-xs text-sm leading-relaxed">
                Tangible, measurable differences from day one of operation.
              </p>
            </div>
          </div>

          {/* Before → After banner */}
          <div
            className="reveal rounded-2xl mb-8 p-5 sm:p-6 flex items-center gap-4 overflow-hidden relative"
            style={{
              background: "var(--gradient-deep)",
              transitionDelay: "60ms",
            }}
          >
            <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
            <div className="relative flex items-center gap-3 sm:gap-6 text-white text-sm flex-wrap">
              <span className="font-mono text-white/50 text-[11px] tracking-widest uppercase">
                Before
              </span>
              <span className="text-white/60">
                Manual effort, guesswork, visibility gaps
              </span>
              <ArrowRight size={16} className="text-brand-2 shrink-0" />
              <span className="font-mono text-white/50 text-[11px] tracking-widest uppercase">
                After
              </span>
              <span className="text-white font-semibold">
                Automated, measurable, always-on operations
              </span>
            </div>
          </div>

          {/* Outcome cards */}
          <div
            className="reveal grid md:grid-cols-3 gap-5"
            style={{ transitionDelay: "100ms" }}
          >
            {outcomes.map((o, i) => {
              const accent =
                outcomeAccentColors[i % outcomeAccentColors.length];
              const OIcon = outcomeIcons[i % outcomeIcons.length];
              const isHovered = hovered === i;

              return (
                <div
                  key={o.title}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative rounded-2xl border overflow-hidden cursor-default transition-all duration-300 group"
                  style={{
                    borderColor: isHovered ? "var(--brand)" : "var(--hairline)",
                    boxShadow: isHovered
                      ? "var(--shadow-glow)"
                      : "var(--shadow-card)",
                    transform: isHovered ? "translateY(-5px)" : "none",
                  }}
                >
                  {/* Card top accent bar */}
                  <div
                    className="h-1 w-full transition-transform duration-500 origin-left"
                    style={{
                      background: accent.icon,
                      transform: isHovered ? "scaleX(1)" : "scaleX(0.3)",
                    }}
                  />

                  <div className="p-7 bg-white">
                    {/* Icon */}
                    <div
                      className="size-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300"
                      style={{
                        background: accent.icon,
                        transform: isHovered
                          ? "scale(1.1) rotate(-3deg)"
                          : "scale(1)",
                      }}
                    >
                      <OIcon size={20} className="text-white" />
                    </div>

                    {/* Step indicator */}
                    <div
                      className="font-mono text-[10px] tracking-widest mb-2 uppercase"
                      style={{ color: accent.text }}
                    >
                      Outcome {String(i + 1).padStart(2, "0")}
                    </div>

                    <h4 className="font-display font-bold text-xl mb-3 leading-tight">
                      {o.title}
                    </h4>
                    <p className="text-sm text-ink/60 leading-relaxed">
                      {o.description}
                    </p>

                    {/* Hover: reveal a subtle confirmation */}
                    <div
                      className="mt-5 flex items-center gap-1.5 text-xs font-semibold transition-all duration-300"
                      style={{
                        color: accent.text,
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered
                          ? "translateX(0)"
                          : "translateX(-8px)",
                      }}
                    >
                      <Check size={12} /> Included in your engagement
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

/* ─────────────────────────────────────────────
   RELATED SERVICES - Rich Explorer Cards
───────────────────────────────────────────── */
function RelatedSection({ related }: { related: typeof SERVICES }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: "var(--surface-tinted)" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          {/* Header */}
          <div className="reveal mb-14">
            <div className="font-mono text-[11px] tracking-[0.18em] text-brand mb-3">
              Related Services
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2 className="font-display font-bold text-3xl lg:text-4xl">
                Continue exploring.
              </h2>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all duration-200"
              >
                All services <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Service cards */}
          <div
            className="reveal grid md:grid-cols-3 gap-5"
            style={{ transitionDelay: "80ms" }}
          >
            {related.map((s, idx) => {
              const RIcon = s.icon;
              const isHov = hovered === s.slug;
              const gradients = [
                "var(--gradient-brand)",
                "linear-gradient(135deg,#7134f1,#a336ff)",
                "linear-gradient(135deg,#5509d9,#371a74)",
              ];
              const grad = gradients[idx % gradients.length];

              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug as ServiceSlug }}
                  onMouseEnter={() => setHovered(s.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className="block rounded-2xl overflow-hidden border transition-all duration-300 group"
                  style={{
                    borderColor: isHov ? "var(--brand)" : "var(--hairline)",
                    boxShadow: isHov
                      ? "var(--shadow-glow)"
                      : "var(--shadow-card)",
                    transform: isHov ? "translateY(-6px)" : "none",
                    background: "white",
                  }}
                >
                  {/* Header gradient strip */}
                  <div
                    className="relative h-32 flex items-center justify-center overflow-hidden transition-all duration-500"
                    style={{
                      background: isHov ? grad : "var(--surface-tinted)",
                    }}
                  >
                    {/* Dot grid overlay */}
                    <div
                      className="absolute inset-0 bg-dot-grid transition-opacity duration-500 pointer-events-none"
                      style={{ opacity: isHov ? 0.2 : 0.5 }}
                    />
                    <div
                      className="relative size-16 rounded-2xl flex items-center justify-center transition-all duration-500"
                      style={{
                        background: isHov ? "rgba(255,255,255,0.2)" : grad,
                        boxShadow: isHov
                          ? "0 8px 24px rgba(0,0,0,0.15)"
                          : "var(--shadow-card)",
                        transform: isHov
                          ? "scale(1.08) rotate(-4deg)"
                          : "scale(1)",
                      }}
                    >
                      <RIcon size={26} className="text-white" />
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <h4 className="font-display font-bold text-lg mb-2 leading-tight">
                      {s.title}
                    </h4>
                    <p className="text-sm text-ink/60 leading-relaxed mb-5">
                      {s.tagline}
                    </p>

                    {/* Bullets from service */}
                    {s.bullets && (
                      <ul className="space-y-1.5 mb-5">
                        {s.bullets.slice(0, 2).map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2 text-xs text-ink/55"
                          >
                            <div
                              className="size-4 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: "var(--surface-tinted)" }}
                            >
                              <Check size={9} className="text-brand" />
                            </div>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div
                      className="inline-flex items-center text-sm font-semibold text-brand transition-all duration-200"
                      style={{ gap: isHov ? 10 : 6 }}
                    >
                      Learn more <ArrowRight size={14} />
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
