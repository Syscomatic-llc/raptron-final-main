import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  ArrowRight,
  TrendingUp,
  Target,
  Map,
  Users,
  DollarSign,
  BarChart2,
  ArrowUpRight,
  CheckCircle2,
  Crosshair,
  Layers,
  Rocket,
} from "lucide-react";

// ─── Revenue projection data ──────────────────────────────────────────────────
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SCENARIOS = {
  conservative: {
    label: "Conservative",
    color: "#7134f1",
    values: [100, 108, 112, 118, 124, 130, 138, 144, 150, 158, 165, 172],
  },
  projected: {
    label: "With RAPTRON",
    color: "#5509D9",
    values: [100, 115, 128, 142, 158, 175, 194, 214, 236, 260, 285, 314],
  },
};

// ─── Market positioning quadrant items ────────────────────────────────────────
const COMPETITORS = [
  { label: "Competitor A", x: 28, y: 62, size: 10, color: "#d1d5f0" },
  { label: "Competitor B", x: 55, y: 38, size: 14, color: "#c7bff5" },
  { label: "Competitor C", x: 18, y: 24, size: 8, color: "#d1d5f0" },
  { label: "You (current)", x: 42, y: 55, size: 12, color: "#a08df5" },
  {
    label: "You (after)",
    x: 72,
    y: 76,
    size: 16,
    color: "#5509D9",
    pulse: true,
  },
];

// ─── Growth levers ────────────────────────────────────────────────────────────
const LEVERS = [
  {
    label: "Market Positioning",
    icon: Crosshair,
    impact: 85,
    color: "#5509D9",
  },
  {
    label: "Revenue Efficiency",
    icon: DollarSign,
    impact: 72,
    color: "#7134f1",
  },
  { label: "Operational Scale", icon: Layers, impact: 68, color: "#a336ff" },
  { label: "Customer Retention", icon: Users, impact: 91, color: "#6320e0" },
];

// ─── Roadmap milestones ───────────────────────────────────────────────────────
const MILESTONES = [
  { week: "Wk 1–2", label: "Audit & Assess", done: true },
  { week: "Wk 3–4", label: "Position & Price", done: true },
  { week: "Wk 5–8", label: "Build Roadmap", done: false, active: true },
  { week: "Wk 9–12", label: "Execute & Track", done: false },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "3×", label: "Avg revenue growth" },
  { value: "90d", label: "To first results" },
  { value: "100%", label: "Custom strategy" },
];

// ─── Main Hero ────────────────────────────────────────────────────────────────
export function GrowthStrategyHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  const [activeTab, setActiveTab] = useState<"chart" | "position" | "roadmap">(
    "chart",
  );
  const [hoveredLever, setHoveredLever] = useState<number | null>(null);
  const [animatedBars, setAnimatedBars] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Animate bars when chart tab is active
  useEffect(() => {
    if (activeTab === "chart") {
      const t = setTimeout(() => setAnimatedBars(true), 200);
      return () => clearTimeout(t);
    } else {
      setAnimatedBars(false);
    }
  }, [activeTab]);

  // Pulse multiplier counter
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setMultiplier((m) => parseFloat(Math.min(3.14, m + 0.07).toFixed(2)));
    }, 120);
    return () => clearInterval(timerRef.current!);
  }, []);

  return (
    <section className="relative pt-28 pb-0 lg:pt-36 overflow-hidden bg-mist min-h-[88vh] flex flex-col">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 bg-dot-grid opacity-35 [mask-image:radial-gradient(ellipse_at_65%_40%,black_30%,transparent_75%)]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[280px] bg-brand/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 flex-1 flex flex-col">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-8 flex-1">
          {/* ── Left: copy ── */}
          <div className="lg:w-[42%] shrink-0 pb-10 lg:pb-20">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 px-3.5 h-8 rounded-full border border-hairline bg-white/70 backdrop-blur text-[11px] font-mono tracking-[0.18em] text-brand mb-5">
                <span className="size-1.5 rounded-full bg-brand animate-pulse-dot" />
                {eyebrow}
              </div>
            )}
            <h1 className="font-display font-bold text-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              {title}
            </h1>
            {description && (
              <p className="mt-5 text-lg text-ink/65 leading-relaxed max-w-lg">
                {description}
              </p>
            )}

            {/* Animated growth multiplier */}
            <div className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-brand/20 bg-brand/5 px-5 py-3.5">
              <div>
                <div
                  className="font-display font-extrabold text-3xl text-brand tabular-nums"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {multiplier >= 3.14 ? "3.1×" : `${multiplier.toFixed(1)}×`}
                </div>
                <div className="text-xs text-ink/50 font-medium mt-0.5">
                  avg client revenue growth
                </div>
              </div>
              <TrendingUp size={32} className="text-brand opacity-30" />
            </div>

            {/* Stats row */}
            <div className="mt-6 flex gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-extrabold text-xl text-ink">
                    {s.value}
                  </div>
                  <div className="text-xs text-ink/50 font-medium mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
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
          </div>

          {/* ── Right: growth strategy dashboard ── */}
          <div className="lg:flex-1 w-full pb-8 lg:pb-16">
            <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl border border-hairline shadow-[0_8px_60px_rgba(85,9,217,0.12)] overflow-hidden flex flex-col">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline bg-white/60 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400/70" />
                  <span className="size-2.5 rounded-full bg-amber-400/70" />
                  <span className="size-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="font-mono text-[10px] text-ink/40 tracking-widest">
                  RAPTRON · Growth Strategy Console
                </div>
                <div className="flex items-center gap-1.5 text-brand">
                  <Rocket size={11} />
                  <span className="font-mono text-[10px]">LIVE PLAN</span>
                </div>
              </div>

              {/* View tabs */}
              <div className="flex border-b border-hairline shrink-0">
                {(
                  [
                    {
                      key: "chart",
                      label: "Revenue Projection",
                      icon: BarChart2,
                    },
                    { key: "position", label: "Market Position", icon: Target },
                    { key: "roadmap", label: "90-Day Roadmap", icon: Map },
                  ] as const
                ).map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 text-[11px] font-semibold transition-all duration-200 border-b-2"
                    style={{
                      color:
                        activeTab === key ? "#5509D9" : "rgba(19,13,38,0.4)",
                      borderBottomColor:
                        activeTab === key ? "#5509D9" : "transparent",
                      background:
                        activeTab === key
                          ? "rgba(85,9,217,0.04)"
                          : "transparent",
                    }}
                  >
                    <Icon size={13} />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {/* Panel body */}
              <div className="flex-1 p-5">
                {/* ── Revenue Projection tab ── */}
                {activeTab === "chart" && (
                  <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30 mb-1">
                          Annual Revenue - Indexed (Base = 100)
                        </div>
                        <div className="flex items-center gap-4">
                          {Object.entries(SCENARIOS).map(([key, s]) => (
                            <div
                              key={key}
                              className="flex items-center gap-1.5 text-[10px] font-semibold"
                              style={{ color: s.color }}
                            >
                              <span
                                className="w-4 h-0.5 rounded-full inline-block"
                                style={{ background: s.color }}
                              />
                              {s.label}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-bold text-lg text-brand">
                          +214%
                        </div>
                        <div className="font-mono text-[9px] text-ink/35">
                          12-month lift
                        </div>
                      </div>
                    </div>

                    {/* Chart area */}
                    <div className="relative flex-1 flex flex-col justify-end gap-1 min-h-[140px]">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
                        {[300, 200, 100].map((v) => (
                          <span
                            key={v}
                            className="font-mono text-[8px] text-ink/20"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                      {/* Bar chart */}
                      <div className="ml-6 flex items-end gap-1 h-full">
                        {MONTHS.map((m, i) => (
                          <div
                            key={m}
                            className="flex-1 flex flex-col items-center gap-0.5"
                          >
                            {/* Conservative bar */}
                            <div
                              className="w-full relative flex flex-col justify-end"
                              style={{ height: "120px" }}
                            >
                              <div
                                className="w-full rounded-t-sm transition-all duration-700 absolute bottom-0"
                                style={{
                                  height: animatedBars
                                    ? `${((SCENARIOS.conservative.values[i] - 95) / (320 - 95)) * 100}%`
                                    : "0%",
                                  background: SCENARIOS.conservative.color,
                                  opacity: 0.25,
                                  transitionDelay: `${i * 40}ms`,
                                }}
                              />
                              {/* With RAPTRON bar */}
                              <div
                                className="w-full rounded-t-sm transition-all duration-700 absolute bottom-0"
                                style={{
                                  height: animatedBars
                                    ? `${((SCENARIOS.projected.values[i] - 95) / (320 - 95)) * 100}%`
                                    : "0%",
                                  background: "var(--gradient-brand)",
                                  opacity: 0.8,
                                  transitionDelay: `${i * 40 + 200}ms`,
                                }}
                              />
                            </div>
                            <span className="font-mono text-[7px] text-ink/25">
                              {m.slice(0, 1)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scenario delta callout */}
                    <div className="flex items-center gap-3 rounded-xl bg-brand/5 border border-brand/10 px-4 py-2.5">
                      <ArrowUpRight size={16} className="text-brand shrink-0" />
                      <div className="text-xs text-ink/70 leading-snug">
                        Businesses working with RAPTRON's growth strategy
                        achieve{" "}
                        <span className="font-semibold text-brand">
                          2–3× faster
                        </span>{" "}
                        revenue growth than industry baseline.
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Market Position tab ── */}
                {activeTab === "position" && (
                  <div className="flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
                        Positioning Matrix - Value vs. Reach
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center gap-1.5 text-[9px] font-semibold text-ink/40">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#a08df5] inline-block" />{" "}
                          Current
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-semibold text-brand">
                          <span className="w-2.5 h-2.5 rounded-full bg-brand inline-block animate-pulse" />{" "}
                          After RAPTRON
                        </div>
                      </div>
                    </div>

                    {/* Quadrant */}
                    <div className="relative flex-1 min-h-[180px] rounded-xl border border-hairline overflow-hidden bg-gradient-to-br from-brand/[0.03] to-transparent">
                      {/* Axis lines */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-hairline" />
                      <div className="absolute top-1/2 left-0 right-0 h-px bg-hairline" />
                      {/* Quadrant labels */}
                      <span className="absolute left-2 top-2 font-mono text-[7px] text-ink/20 uppercase tracking-wider">
                        Low Value · Low Reach
                      </span>
                      <span className="absolute right-2 top-2 font-mono text-[7px] text-ink/20 uppercase tracking-wider text-right">
                        High Reach · Low Value
                      </span>
                      <span className="absolute left-2 bottom-2 font-mono text-[7px] text-ink/20 uppercase tracking-wider">
                        Low Reach · High Value
                      </span>
                      <span className="absolute right-2 bottom-2 font-mono text-[7px] text-brand/50 uppercase tracking-wider text-right">
                        ★ Target Zone
                      </span>

                      {/* Competitor dots */}
                      {COMPETITORS.map((c) => (
                        <div
                          key={c.label}
                          className="absolute flex items-center justify-center rounded-full transition-all duration-700 group"
                          style={{
                            left: `${c.x}%`,
                            bottom: `${c.y}%`,
                            width: c.size,
                            height: c.size,
                            background: c.color,
                            transform: "translate(-50%, 50%)",
                          }}
                        >
                          {c.pulse && (
                            <span className="absolute inset-0 rounded-full animate-ping bg-brand opacity-30" />
                          )}
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[7px] text-ink/50 whitespace-nowrap pointer-events-none">
                            {c.label}
                          </span>
                        </div>
                      ))}

                      {/* Arrow from current → after */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="6"
                            markerHeight="4"
                            refX="3"
                            refY="2"
                            orient="auto"
                          >
                            <polygon
                              points="0 0, 6 2, 0 4"
                              fill="#5509D9"
                              opacity="0.6"
                            />
                          </marker>
                        </defs>
                        <path
                          d="M 42,45 Q 55,38 72,24"
                          fill="none"
                          stroke="#5509D9"
                          strokeWidth="0.8"
                          strokeDasharray="2 1.5"
                          markerEnd="url(#arrowhead)"
                          opacity="0.5"
                        />
                      </svg>
                    </div>

                    {/* Growth levers */}
                    <div className="grid grid-cols-2 gap-2">
                      {LEVERS.map((lever, i) => {
                        const Icon = lever.icon;
                        const isHov = hoveredLever === i;
                        return (
                          <div
                            key={lever.label}
                            onMouseEnter={() => setHoveredLever(i)}
                            onMouseLeave={() => setHoveredLever(null)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-default transition-all duration-200"
                            style={{
                              background: isHov
                                ? `${lever.color}10`
                                : "rgba(0,0,0,0.02)",
                              border: `1px solid ${isHov ? lever.color + "30" : "var(--hairline)"}`,
                            }}
                          >
                            <Icon
                              size={11}
                              style={{ color: lever.color, flexShrink: 0 }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-mono text-[8px] text-ink/40 truncate">
                                {lever.label}
                              </div>
                              <div className="h-1 mt-1 rounded-full bg-hairline overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{
                                    width: isHov ? `${lever.impact}%` : "30%",
                                    background: lever.color,
                                  }}
                                />
                              </div>
                            </div>
                            <span
                              className="font-mono text-[9px] font-bold shrink-0"
                              style={{ color: lever.color }}
                            >
                              {isHov ? `${lever.impact}%` : "-"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── 90-Day Roadmap tab ── */}
                {activeTab === "roadmap" && (
                  <div className="flex flex-col gap-4 h-full">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
                      90-Day Growth Engagement - Live Progress
                    </div>

                    {/* Timeline */}
                    <div className="relative flex flex-col gap-3">
                      {/* Vertical track */}
                      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-hairline rounded-full">
                        <div
                          className="absolute top-0 left-0 right-0 rounded-full transition-all duration-1000 bg-gradient-to-b from-brand to-violet-500"
                          style={{ height: "50%" }}
                        />
                      </div>
                      {MILESTONES.map((m, i) => (
                        <div
                          key={m.week}
                          className="flex items-start gap-4 pl-1"
                        >
                          {/* Node */}
                          <div
                            className="relative z-10 size-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-300"
                            style={{
                              background: m.done
                                ? "var(--gradient-brand)"
                                : m.active
                                  ? "white"
                                  : "var(--surface-tinted)",
                              border: m.active
                                ? "2px solid #5509D9"
                                : "2px solid transparent",
                              boxShadow: m.active
                                ? "0 0 0 4px rgba(85,9,217,0.15)"
                                : "none",
                            }}
                          >
                            {m.done ? (
                              <CheckCircle2 size={16} className="text-white" />
                            ) : m.active ? (
                              <span className="size-2.5 rounded-full bg-brand animate-pulse" />
                            ) : (
                              <span className="font-mono text-[10px] text-ink/30 font-bold">
                                {i + 1}
                              </span>
                            )}
                          </div>
                          {/* Content */}
                          <div
                            className="flex-1 rounded-xl border p-4 transition-all duration-300"
                            style={{
                              background: m.active
                                ? "rgba(85,9,217,0.04)"
                                : "white",
                              borderColor: m.active
                                ? "rgba(85,9,217,0.2)"
                                : "var(--hairline)",
                              boxShadow: m.active
                                ? "var(--shadow-card)"
                                : "none",
                            }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-mono text-[9px] text-ink/30 uppercase tracking-widest">
                                {m.week}
                              </div>
                              {m.done && (
                                <span className="font-mono text-[8px] text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-full">
                                  Complete
                                </span>
                              )}
                              {m.active && (
                                <span className="font-mono text-[8px] text-brand bg-brand/8 border border-brand/15 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                  <span className="size-1 rounded-full bg-brand animate-pulse" />
                                  In progress
                                </span>
                              )}
                            </div>
                            <div
                              className="font-display font-bold text-sm"
                              style={{
                                color: m.active
                                  ? "#5509D9"
                                  : m.done
                                    ? "rgba(19,13,38,0.5)"
                                    : "var(--ink)",
                              }}
                            >
                              {m.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Outcome summary */}
                    <div className="mt-auto rounded-xl bg-gradient-to-r from-brand/8 to-violet-500/5 border border-brand/10 px-4 py-3 flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
                        <Rocket size={14} className="text-white" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-sm text-ink">
                          Strategy delivered in 90 days
                        </div>
                        <div className="text-[11px] text-ink/50 mt-0.5">
                          Clear position · Actionable roadmap · Execution
                          support
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="shrink-0 flex items-center justify-between px-5 py-2.5 border-t border-hairline bg-white/40">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-ink/35">
                  <TrendingUp size={10} />
                  Based on 50+ client engagements across UAE
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-brand">
                  <CheckCircle2 size={10} />
                  Strategy-first approach
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade-to-white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
