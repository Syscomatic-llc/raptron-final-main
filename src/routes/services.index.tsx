import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Database,
  Workflow,
  LayoutGrid,
  BrainCircuit,
  TrendingUp,
  Code2,
  Play,
  Activity,
  Cpu,
  Sparkles,
} from "lucide-react";
import { SERVICES, PROCESS_STEPS, INDUSTRIES } from "@/lib/constants";
import { CTABanner } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { useRef, useEffect, useState, useCallback } from "react";

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
  const [activeTab, setActiveTab] = useState<number>(0);

  // API query simulator state
  const [apiState, setApiState] = useState<"idle" | "sending" | "done">("idle");
  const [apiLatency, setApiLatency] = useState(0);

  // AI Agent terminal simulator state
  const [aiStep, setAiStep] = useState(0);

  // Growth scenario state
  const [scenario, setScenario] = useState<"standard" | "raptron">("raptron");

  // Cycle active tab when idle (every 10 seconds unless hovered)
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 5);
    }, 9000);
    return () => clearInterval(interval);
  }, [isHovered]);

  // AI text sequence loop
  useEffect(() => {
    if (activeTab !== 2) return;
    setAiStep(0);
    const t1 = setTimeout(() => setAiStep(1), 1200);
    const t2 = setTimeout(() => setAiStep(2), 2600);
    const t3 = setTimeout(() => setAiStep(3), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeTab]);

  // Send request helper for API tab
  const handleTriggerApi = () => {
    if (apiState === "sending") return;
    setApiState("sending");
    setApiLatency(0);
    let ms = 0;
    const latencyInterval = setInterval(() => {
      ms += 8;
      setApiLatency(ms);
    }, 8);

    setTimeout(
      () => {
        clearInterval(latencyInterval);
        setApiState("done");
      },
      600 + Math.random() * 400,
    );
  };

  // Helper to get corresponding service metrics / details for active tab
  const getActiveData = () => {
    switch (activeTab) {
      case 0: // Automation
        return {
          badgeText: "10x Workflow Speed",
          badgeIcon: Workflow,
          badgeColor: "bg-brand text-white border-brand/20",
          floatingMetrics: [
            { text: "0 manual steps", x: "-8%", y: "18%" },
            { text: "Trigger: Webhook", x: "88%", y: "72%" },
          ],
        };
      case 1: // Finance
        return {
          badgeText: "Zero-Loss Migration",
          badgeIcon: Database,
          badgeColor: "bg-white/95 text-ink border-hairline shadow-md",
          floatingMetrics: [
            { text: "100% Tax Ready", x: "-6%", y: "20%" },
            { text: "VAT Audit Pack: Ready", x: "85%", y: "76%" },
          ],
        };
      case 2: // AI Agents
        return {
          badgeText: "24/7 Autonomous Operations",
          badgeIcon: BrainCircuit,
          badgeColor:
            "bg-gradient-brand text-white border-transparent shadow-glow",
          floatingMetrics: [
            { text: "< 4s response time", x: "-8%", y: "16%" },
            { text: "Model: UAE-Scale", x: "88%", y: "74%" },
          ],
        };
      case 3: // Growth
        return {
          badgeText: "3.1x Revenue Lift",
          badgeIcon: TrendingUp,
          badgeColor: "bg-ink/90 text-white border-white/10 shadow-xl",
          floatingMetrics: [
            { text: "90-Day Blueprint", x: "-8%", y: "20%" },
            { text: "Execution Score: 98%", x: "86%", y: "72%" },
          ],
        };
      case 4: // Custom Software
      default:
        return {
          badgeText: "Scalable Architecture",
          badgeIcon: Code2,
          badgeColor: "bg-brand-deep text-white border-white/10",
          floatingMetrics: [
            { text: "< 85ms P99 Latency", x: "-8%", y: "18%" },
            { text: "SLA: 99.99%", x: "88%", y: "74%" },
          ],
        };
    }
  };

  const activeData = getActiveData();
  const ActiveIcon = activeData.badgeIcon;

  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-mist">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.04)_1px,transparent_1px)] bg-[size:20px_20px] opacity-80 mix-blend-overlay" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ── Left Column (Completely untouched layout/copy) ── */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/10 bg-white/50 backdrop-blur-md mb-8 shadow-sm">
              <LayoutGrid size={16} className="text-brand" />
              <span className="text-xs font-mono tracking-[0.2em] text-ink font-bold">
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

          {/* ── Right Column (Upgraded High-Fidelity Showcase) ── */}
          <Reveal delay={200} className="relative hidden lg:block">
            <div
              className="relative w-full aspect-square flex flex-col justify-center items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Backglow blobs */}
              <div className="absolute top-10 right-10 w-64 h-64 bg-brand rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
              <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-2 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />

              {/* Central capabilities showcase panel */}
              <div className="relative w-[480px] h-[360px] bg-white/80 backdrop-blur-xl border border-hairline rounded-[2.5rem] shadow-[0_20px_50px_rgba(85,9,217,0.12)] overflow-hidden flex flex-col z-30 transition-all duration-300">
                {/* Selector Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-hairline bg-white/40">
                  <div className="flex gap-1.5">
                    {SERVICES.map((s, idx) => {
                      const TabIcon = s.icon;
                      const isTabActive = activeTab === idx;
                      return (
                        <button
                          key={s.slug}
                          onClick={() => {
                            setActiveTab(idx);
                            setApiState("idle");
                          }}
                          className={`size-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                            isTabActive
                              ? "bg-brand border-brand text-white shadow-lift"
                              : "bg-white/60 border-hairline text-ink/40 hover:text-brand"
                          }`}
                          title={s.shortTitle}
                        >
                          <TabIcon size={14} />
                        </button>
                      );
                    })}
                  </div>
                  <span className="font-mono text-[9px] text-ink/35 tracking-widest uppercase">
                    CAPABILITY ENGINE
                  </span>
                </div>

                {/* Main dynamic visualization body */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  {/* Title / Description */}
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-brand font-bold mb-1">
                      {SERVICES[activeTab].shortTitle} Spec
                    </div>
                    <h3 className="font-display font-extrabold text-xl leading-tight text-ink">
                      {SERVICES[activeTab].headline}
                    </h3>
                  </div>

                  {/* Dynamic interactive components per tab */}
                  <div className="my-4 flex-1 flex flex-col justify-center">
                    {/* Automation (0): workflow animation */}
                    {activeTab === 0 && (
                      <div className="relative h-20 w-full flex items-center justify-between px-6 bg-mist/60 border border-hairline rounded-2xl overflow-hidden">
                        {/* Connector line */}
                        <div className="absolute left-12 right-12 h-0.5 border-t border-dashed border-brand/30" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-[39px] size-2 bg-brand rounded-full animate-ping pointer-events-none" />

                        <div className="relative z-10 size-10 rounded-xl bg-brand/10 border border-brand/20 text-brand flex items-center justify-center">
                          <Zap size={16} className="animate-pulse" />
                        </div>
                        <div className="relative z-10 size-10 rounded-xl bg-indigo-50 border border-indigo-150 text-indigo-600 flex items-center justify-center font-bold font-mono text-xs shadow-sm">
                          API
                        </div>
                        <div className="relative z-10 size-10 rounded-xl bg-emerald-50 border border-emerald-150 text-emerald-600 flex items-center justify-center">
                          <CheckCircle2 size={16} />
                        </div>
                      </div>
                    )}

                    {/* Finance (1): compliance status checklist */}
                    {activeTab === 1 && (
                      <div className="grid grid-cols-2 gap-4 items-center h-20 px-4">
                        <div className="flex flex-col gap-1.5">
                          {[
                            "VAT Return Filing",
                            "Accounting Sync",
                            "Audit Ledger Pack",
                          ].map((label) => (
                            <div
                              key={label}
                              className="flex items-center gap-2 text-[10px] text-ink/75 font-mono"
                            >
                              <CheckCircle2
                                size={11}
                                className="text-emerald-500 shrink-0"
                              />
                              <span>{label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-brand/5 border border-brand/15">
                          <span className="font-display font-black text-lg text-brand leading-none">
                            100%
                          </span>
                          <span className="text-[8px] font-mono tracking-wider text-ink/45 uppercase mt-1">
                            Tax Compliant
                          </span>
                        </div>
                      </div>
                    )}

                    {/* AI Agents (2): chat interaction bubbles */}
                    {activeTab === 2 && (
                      <div className="flex flex-col gap-1.5 font-mono text-[9px] bg-ink/90 text-emerald-400 p-3.5 rounded-2xl h-24 overflow-y-auto leading-relaxed shadow-inner">
                        <div className="text-white/40">// Auto-Ops active</div>
                        {aiStep >= 1 && (
                          <div>
                            <span className="text-emerald-300 font-bold">
                              ${" "}
                            </span>
                            Lead validation started...
                          </div>
                        )}
                        {aiStep >= 2 && (
                          <div className="text-amber-300 italic">
                            Agent: Found 8 high-intent leads in CRM
                          </div>
                        )}
                        {aiStep >= 3 && (
                          <div className="text-emerald-200 font-bold flex items-center gap-1">
                            <Sparkles size={9} /> Auto-messaging queued. Ready.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Growth (3): line scenario chart */}
                    {activeTab === 3 && (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-end gap-1.5 h-16 justify-between border-b border-hairline px-4">
                          {[30, 42, 38, 55, 78, 120].map((h, idx) => (
                            <div
                              key={idx}
                              className="flex-1 flex flex-col items-center"
                            >
                              <div
                                className="w-full rounded-t-md transition-all duration-500"
                                style={{
                                  height:
                                    scenario === "raptron"
                                      ? `${h}%`
                                      : `${Math.min(45, h * 0.7)}%`,
                                  background:
                                    idx === 5
                                      ? "var(--gradient-brand)"
                                      : "rgba(85,9,217,0.15)",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-[9px] font-mono px-1">
                          <span className="text-ink/40">
                            Scenario Projection
                          </span>
                          <button
                            onClick={() =>
                              setScenario(
                                scenario === "raptron" ? "standard" : "raptron",
                              )
                            }
                            className="text-brand font-bold border-b border-brand hover:border-transparent transition-all"
                          >
                            Toggle:{" "}
                            {scenario === "raptron"
                              ? "With RAPTRON"
                              : "Standard"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Custom Software (4): API play container */}
                    {activeTab === 4 && (
                      <div className="flex gap-4 items-center justify-between px-3 py-2 bg-mist border border-hairline rounded-2xl h-20">
                        <div className="flex flex-col gap-1 min-w-0">
                          <span className="font-mono text-[9px] text-brand font-bold uppercase">
                            POST /orders/checkout
                          </span>
                          <span className="text-[10px] text-ink/50 truncate">
                            {apiState === "idle" &&
                              "Click Run to simulate API transaction."}
                            {apiState === "sending" && "Evaluating latency..."}
                            {apiState === "done" &&
                              `Success: { status: 201, latency: ${apiLatency}ms }`}
                          </span>
                        </div>
                        <button
                          onClick={handleTriggerApi}
                          disabled={apiState === "sending"}
                          className="size-10 rounded-xl bg-gradient-brand text-white flex items-center justify-center hover:scale-105 active:scale-95 transition shadow disabled:opacity-50 shrink-0"
                        >
                          <Play size={12} fill="white" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Interactive details button links to active service */}
                  <div className="flex items-center justify-between border-t border-hairline pt-3 mt-auto">
                    <span className="text-[10px] text-ink/45 leading-none">
                      Deploy engineering teams for outcomes.
                    </span>
                    <Link
                      to="/services/$slug"
                      params={{ slug: SERVICES[activeTab].slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:gap-2.5 transition-all duration-200"
                    >
                      Capability specs <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>

                {/* Host telemetry metrics bar */}
                <div className="px-6 py-2.5 border-t border-hairline bg-white/40 flex items-center justify-between text-[8px] font-mono text-ink/40">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Cpu size={10} className="text-brand/60" />
                      <span>Host load: nominal</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity size={10} className="text-brand/60" />
                      <span>Status: active</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ENGINE ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Contextual Floating Badge (replaces static Zero-Loss Migration) */}
              <div
                key={activeTab}
                className={`absolute top-16 p-5 rounded-[2rem] border shadow-2xl transition-all duration-700 select-none z-40 flex items-center gap-3 animate-fade-in ${activeData.badgeColor}`}
                style={{
                  left: "-60px",
                  transform: "rotate(-6deg) translateY(-30px)",
                }}
              >
                <div
                  className="size-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background:
                      activeTab === 1
                        ? "rgba(85,9,217,0.1)"
                        : "rgba(255,255,255,0.2)",
                  }}
                >
                  <ActiveIcon
                    size={18}
                    className={activeTab === 1 ? "text-brand" : "text-white"}
                  />
                </div>
                <div>
                  <div className="font-bold text-base leading-none">
                    {activeData.badgeText.split(" ")[0]}{" "}
                    {activeData.badgeText.split(" ")[1]}
                  </div>
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">
                    {activeData.badgeText.split(" ").slice(2).join(" ") ||
                      "Verified Spec"}
                  </span>
                </div>
              </div>

              {/* Contextual secondary floating text metrics badges */}
              {activeData.floatingMetrics.map((fm, idx) => (
                <div
                  key={fm.text}
                  className="absolute bg-white/80 border border-white/50 backdrop-blur-md px-3.5 py-2 rounded-full font-mono text-[9px] text-brand font-semibold shadow-md pointer-events-none select-none z-50 whitespace-nowrap"
                  style={{
                    left: fm.x,
                    top: fm.y,
                    transform: `rotate(${idx % 2 === 0 ? 5 : -4}deg)`,
                    animation: "floatAnimation 4s ease-in-out infinite",
                    animationDelay: `${idx * 1.5}s`,
                  }}
                >
                  {fm.text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes floatAnimation {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-6px) rotate(-3deg); }
        }
      `}</style>
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

  const totalCards = SERVICES.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(() =>
    new Array(totalCards).fill(1),
  );

  const handleScroll = useCallback(() => {
    // Only apply on desktop (lg breakpoint = 1024px)
    if (window.innerWidth < 1024) return;

    const newScales = cardRefs.current.map((el, i) => {
      if (!el) return 1;

      const rect = el.getBoundingClientRect();
      const stickyTop = i * 40; // matches the top offset (i * 2.5rem = i * 40px)
      const distanceFromStick = stickyTop - rect.top;

      // Card hasn't reached its sticky point yet, or is right at it
      if (distanceFromStick <= 0) return 1;

      // Scale down progressively as the card is scrolled past
      // Max scale reduction: 0.06 per card layer above
      const progress = Math.min(distanceFromStick / 400, 1);
      const scale = 1 - progress * 0.06;
      return Math.max(scale, 0.88); // minimum scale
    });

    setScales(newScales);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

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

        <div ref={containerRef} className="flex flex-col gap-10 lg:gap-0 pb-32">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const colorClass = CARD_COLORS[i % CARD_COLORS.length];
            const isDark = colorClass.includes("text-white");
            const scale = scales[i];
            const brightness = 1 - (1 - scale) * 2.5; // dim slightly as it scales down

            return (
              <div
                key={s.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="lg:sticky flex items-center justify-center pt-10 will-change-transform"
                style={{
                  top: `calc(${i * 2.5}rem)`,
                  zIndex: i,
                }}
              >
                <div
                  className={`w-full rounded-[3rem] p-10 lg:p-16 border shadow-2xl relative overflow-hidden group transition-shadow duration-700 ${colorClass}`}
                  style={{
                    transform: `scale(${scale})`,
                    filter: `brightness(${brightness})`,
                    transformOrigin: "top center",
                    transition:
                      "transform 0.15s cubic-bezier(0.22,1,0.36,1), filter 0.15s ease-out",
                  }}
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
                      <h4 className="font-mono text-sm tracking-widest mb-8 opacity-60">
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
    <section className="py-24 md:py-32 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-deep rounded-full blur-[200px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="mb-20 md:mb-32 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 shadow-sm">
              <span className="size-2 rounded-full bg-brand animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 font-semibold mt-0.5">
                Delivery Framework
              </span>
            </div>
            <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight">
              The Blueprint.
            </h2>
          </div>
        </Reveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand/80 via-brand-2/80 to-ink/0 -translate-x-1/2" />

          {PROCESS_STEPS.map((step, i) => {
            const isEven = i % 2 === 0;
            return (
              <Reveal key={step.title} delay={100}>
                <div
                  className={`relative flex items-center justify-between w-full mb-16 md:mb-24 last:mb-0 ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Center Node */}
                  <div className="absolute left-[38px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 size-14 md:size-20 rounded-full bg-ink border-2 border-white/10 flex items-center justify-center font-display font-bold text-xl md:text-3xl z-10 group shadow-[0_0_30px_rgba(85,9,217,0.3)] transition-all duration-500 hover:scale-110 hover:border-brand-2 hover:shadow-[0_0_50px_rgba(163,54,255,0.6)] cursor-default">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand/20 to-brand-2/20 scale-0 group-hover:scale-100 transition-transform duration-500" />
                    <span className="text-white/80 group-hover:text-white relative z-10 transition-colors">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Empty Space for alignment */}
                  <div className="hidden md:block w-[42%]" />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-[42%] pl-24 md:pl-0 ${
                      isEven ? "text-left md:text-right" : "text-left"
                    }`}
                  >
                    <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] p-6 md:p-8 hover:bg-white/10 transition-all duration-500 group-hover:border-brand/40 shadow-2xl hover:-translate-y-1 relative overflow-hidden group/card">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div
                          className={`font-mono text-[10px] tracking-widest text-brand-2 mb-3 uppercase flex ${
                            isEven ? "md:justify-end" : "justify-start"
                          }`}
                        >
                          Phase 0{i + 1}
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white tracking-tight leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
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
  const CARD_STYLES = [
    {
      span: "md:col-span-2 md:row-span-2",
      bg: "bg-mist border-hairline hover:border-brand/40",
      text: "text-ink",
      iconBg: "bg-white text-brand border-hairline shadow-sm",
      watermark: "text-ink/[0.03] group-hover:text-brand/[0.05]",
      size: "lg:text-5xl text-4xl",
    },
    {
      span: "md:col-span-2 md:row-span-1",
      bg: "bg-ink border-transparent shadow-xl hover:shadow-2xl hover:border-brand-2/30",
      text: "text-white",
      iconBg: "bg-white/10 text-brand-2 border-white/10",
      watermark: "text-white/[0.02] group-hover:text-brand-2/[0.08]",
      size: "lg:text-4xl text-3xl",
    },
    {
      span: "md:col-span-1 md:row-span-1",
      bg: "bg-gradient-brand border-transparent shadow-glow hover:shadow-xl",
      text: "text-white",
      iconBg: "bg-white/20 text-white border-white/20 backdrop-blur-md",
      watermark: "text-white/10 group-hover:text-white/20",
      size: "text-2xl lg:text-3xl",
    },
    {
      span: "md:col-span-1 md:row-span-1",
      bg: "bg-white border-hairline hover:border-brand/30",
      text: "text-ink",
      iconBg: "bg-mist text-brand border-hairline",
      watermark: "text-ink/[0.03] group-hover:text-brand/[0.05]",
      size: "text-2xl lg:text-3xl",
    },
    {
      span: "md:col-span-2 md:row-span-1",
      bg: "bg-surface-tinted border-hairline hover:border-brand/30",
      text: "text-ink",
      iconBg: "bg-white text-brand border-hairline shadow-sm",
      watermark: "text-ink/[0.03] group-hover:text-brand/[0.05]",
      size: "lg:text-4xl text-3xl",
    },
    {
      span: "md:col-span-2 md:row-span-1",
      bg: "bg-white border-hairline hover:border-brand/30 hover:shadow-xl",
      text: "text-ink",
      iconBg: "bg-brand/5 text-brand border-brand/10",
      watermark: "text-ink/[0.03] group-hover:text-brand/[0.05]",
      size: "lg:text-4xl text-3xl",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white relative z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 mix-blend-overlay pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 border-b border-hairline pb-10 lg:pb-12">
            <div>
              <h2 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[5.5rem] tracking-tight text-ink leading-none">
                Domains of <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-brand">
                  Expertise.
                </span>
              </h2>
            </div>
            <p className="text-xl lg:text-2xl text-ink/60 max-w-lg font-light leading-relaxed">
              We don't do generic tech. We build for the specific operational
              realities of these sectors.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[200px] lg:auto-rows-[240px]">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            const style = CARD_STYLES[i % CARD_STYLES.length];
            return (
              <Reveal
                key={ind.name}
                delay={i * 50}
                className={`${style.span} h-full`}
              >
                <div
                  className={`w-full h-full rounded-[2rem] lg:rounded-[2.5rem] border p-6 lg:p-10 relative overflow-hidden group transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between ${style.bg} ${style.text}`}
                >
                  <div className="absolute -bottom-10 -right-10 lg:-bottom-12 lg:-right-12 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none z-0">
                    <Icon
                      className={`w-64 h-64 lg:w-80 lg:h-80 ${style.watermark}`}
                    />
                  </div>

                  <div className="relative z-10">
                    <div
                      className={`size-12 lg:size-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 border ${style.iconBg}`}
                    >
                      <Icon size={28} className="w-6 h-6 lg:w-7 lg:h-7" />
                    </div>
                  </div>

                  <div className="relative z-10 flex items-end justify-between gap-4">
                    <h3
                      className={`font-display font-bold leading-tight ${style.size}`}
                    >
                      {ind.name}
                    </h3>
                    <div
                      className={`hidden sm:flex size-10 rounded-full shrink-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 border ${style.iconBg}`}
                    >
                      <ArrowUpRight size={18} />
                    </div>
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
