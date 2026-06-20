import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  TrendingUp,
  BookOpen,
  BadgeCheck,
  RefreshCw,
} from "lucide-react";

// ─── Compliance checklist items ───────────────────────────────────────────────
const CHECKLIST = [
  { label: "VAT Return – Q1 2025", status: "done", due: "Jan 28" },
  { label: "Corporate Tax Registration", status: "done", due: "Mar 15" },
  { label: "Monthly Bank Reconciliation", status: "done", due: "Apr 30" },
  { label: "VAT Return – Q2 2025", status: "running", due: "Jul 28" },
  { label: "Audit Pack Preparation", status: "pending", due: "Aug 10" },
  { label: "Year-End Financial Statements", status: "pending", due: "Dec 31" },
];

// ─── VAT Liability mini-chart data (monthly AED 000s) ─────────────────────────
const VAT_BARS = [
  { month: "Jan", amount: 42 },
  { month: "Feb", amount: 38 },
  { month: "Mar", amount: 55 },
  { month: "Apr", amount: 48 },
  { month: "May", amount: 61 },
  { month: "Jun", amount: 53 },
];

// ─── Key metrics ─────────────────────────────────────────────────────────────
const STATS = [
  { value: "100%", label: "VAT compliance" },
  { value: "0", label: "Audit findings" },
  { value: "48h", label: "Filing turnaround" },
];

// ─── Audit health score segments ─────────────────────────────────────────────
const AUDIT_SEGMENTS = [
  { label: "Books of Account", score: 98, color: "#5509D9" },
  { label: "VAT Records", score: 100, color: "#7134f1" },
  { label: "CT Readiness", score: 91, color: "#a336ff" },
  { label: "Supporting Docs", score: 95, color: "#6320e0" },
];

// ─── Mini arc gauge ───────────────────────────────────────────────────────────
function ArcGauge({ value }: { value: number }) {
  return (
    <svg
      width="100"
      height="70"
      viewBox="0 0 100 70"
      className="overflow-visible"
    >
      {/* track */}
      <path
        d="M 10,60 A 40,40 0 1,1 90,60"
        fill="none"
        stroke="#e8e4f8"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* fill */}
      <path
        d="M 10,60 A 40,40 0 1,1 90,60"
        fill="none"
        stroke="url(#gauge-grad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * 188} 188`}
        style={{
          transition: "stroke-dasharray 1s cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <defs>
        <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5509D9" />
          <stop offset="100%" stopColor="#a336ff" />
        </linearGradient>
      </defs>
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="16"
        fontWeight="800"
        fontFamily="var(--font-display, sans-serif)"
        fill="#130D26"
      >
        {value}%
      </text>
    </svg>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export function FinanceComplianceHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  const [checklist, setChecklist] = useState(CHECKLIST);
  const [auditScore, setAuditScore] = useState(96);
  const [tick, setTick] = useState(0);
  const maxBar = Math.max(...VAT_BARS.map((b) => b.amount));

  // Simulate a live compliance tick
  useEffect(() => {
    const t = setInterval(() => {
      setTick((n) => n + 1);
      // Occasionally nudge audit score ±1
      setAuditScore((s) =>
        Math.min(100, Math.max(93, s + (Math.random() > 0.5 ? 1 : -1))),
      );
      // Advance the running item after enough ticks
      setChecklist((prev) =>
        prev.map((item) =>
          item.status === "running" && tick > 0 && tick % 8 === 0
            ? { ...item, status: "done" as const }
            : item,
        ),
      );
    }, 2400);
    return () => clearInterval(t);
  }, [tick]);

  return (
    <section className="relative pt-28 pb-0 lg:pt-36 overflow-hidden bg-mist min-h-[88vh] flex flex-col">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 bg-dot-grid opacity-35 [mask-image:radial-gradient(ellipse_at_60%_40%,black_30%,transparent_75%)]" />
      <div className="absolute top-1/4 right-1/3 w-[500px] h-[300px] bg-brand/10 blur-[100px] rounded-full pointer-events-none" />

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

            {/* Stats bar */}
            <div className="mt-8 flex gap-6">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-extrabold text-2xl text-brand">
                    {s.value}
                  </div>
                  <div className="text-xs text-ink/55 font-medium mt-0.5">
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

          {/* ── Right: interactive compliance dashboard ── */}
          <div className="lg:flex-1 w-full pb-8 lg:pb-16">
            <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl border border-hairline shadow-[0_8px_60px_rgba(85,9,217,0.12)] overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline bg-white/60">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400/70" />
                  <span className="size-2.5 rounded-full bg-amber-400/70" />
                  <span className="size-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="font-mono text-[10px] text-ink/40 tracking-widest">
                  RAPTRON · Finance & Compliance Hub
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px]">LIVE</span>
                </div>
              </div>

              {/* Dashboard grid */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] divide-y md:divide-y-0 md:divide-x divide-hairline">
                {/* Left panel: Compliance checklist + VAT chart */}
                <div className="p-5 flex flex-col gap-5">
                  {/* Compliance checklist */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
                        Compliance Calendar
                      </div>
                      <div className="flex items-center gap-1 text-brand font-mono text-[9px]">
                        <RefreshCw
                          size={9}
                          className="animate-spin [animation-duration:4s]"
                        />
                        Auto-monitored
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {checklist.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-300"
                          style={{
                            background:
                              item.status === "running"
                                ? "rgba(85,9,217,0.06)"
                                : "rgba(0,0,0,0.02)",
                            borderLeft:
                              item.status === "running"
                                ? "2px solid #5509D9"
                                : "2px solid transparent",
                          }}
                        >
                          {item.status === "done" && (
                            <CheckCircle2
                              size={13}
                              className="text-emerald-500 shrink-0"
                            />
                          )}
                          {item.status === "running" && (
                            <RefreshCw
                              size={13}
                              className="text-brand shrink-0 animate-spin [animation-duration:2s]"
                            />
                          )}
                          {item.status === "pending" && (
                            <Clock size={13} className="text-ink/25 shrink-0" />
                          )}
                          <span
                            className="text-[11px] font-medium flex-1 truncate"
                            style={{
                              color:
                                item.status === "done"
                                  ? "rgba(19,13,38,0.5)"
                                  : item.status === "running"
                                    ? "#5509D9"
                                    : "rgba(19,13,38,0.4)",
                              textDecoration:
                                item.status === "done"
                                  ? "line-through"
                                  : "none",
                            }}
                          >
                            {item.label}
                          </span>
                          <span className="font-mono text-[9px] text-ink/25 shrink-0 ml-auto">
                            Due {item.due}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VAT liability mini chart */}
                  <div className="border-t border-hairline pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
                        VAT Liability - AED 000s
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[9px] text-emerald-600">
                        <TrendingUp size={9} />
                        Tracked
                      </div>
                    </div>
                    <div className="flex items-end gap-2 h-16">
                      {VAT_BARS.map((bar, i) => (
                        <div
                          key={bar.month}
                          className="flex-1 flex flex-col items-center gap-1"
                        >
                          <div
                            className="w-full rounded-t-md transition-all duration-700"
                            style={{
                              height: `${(bar.amount / maxBar) * 100}%`,
                              background:
                                i === VAT_BARS.length - 1
                                  ? "var(--gradient-brand)"
                                  : "rgba(85,9,217,0.15)",
                            }}
                          />
                          <span className="font-mono text-[8px] text-ink/30">
                            {bar.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right sidebar: Audit health + module badges */}
                <div className="p-4 flex flex-col gap-4">
                  {/* Audit health score */}
                  <div className="rounded-xl bg-brand/5 border border-brand/10 p-3 flex flex-col items-center">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/35 mb-1">
                      Audit Health
                    </div>
                    <ArcGauge value={auditScore} />
                    <div className="font-mono text-[9px] text-ink/40 mt-1 text-center">
                      Overall score
                    </div>
                  </div>

                  {/* Audit segment bars */}
                  <div className="flex flex-col gap-2">
                    {AUDIT_SEGMENTS.map((seg) => (
                      <div key={seg.label}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-mono text-[8px] text-ink/35 truncate">
                            {seg.label}
                          </span>
                          <span
                            className="font-mono text-[9px] font-bold"
                            style={{ color: seg.color }}
                          >
                            {seg.score}%
                          </span>
                        </div>
                        <div className="h-1 rounded-full bg-hairline overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${seg.score}%`,
                              background: seg.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Compliance module badges */}
                  <div className="mt-auto flex flex-col gap-1.5">
                    {[
                      {
                        label: "VAT Compliant",
                        icon: ShieldCheck,
                        color: "text-emerald-600",
                        bg: "bg-emerald-50 border-emerald-200/60",
                      },
                      {
                        label: "CT Registered",
                        icon: BadgeCheck,
                        color: "text-brand",
                        bg: "bg-brand/5 border-brand/15",
                      },
                      {
                        label: "Books Up-to-date",
                        icon: BookOpen,
                        color: "text-sky-600",
                        bg: "bg-sky-50 border-sky-200/60",
                      },
                    ].map(({ label, icon: Icon, color, bg }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 border text-[10px] font-semibold ${bg} ${color}`}
                      >
                        <Icon size={11} />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer ticker */}
              <div className="flex items-center justify-between px-5 py-2.5 border-t border-hairline bg-white/40">
                <div className="flex items-center gap-2 font-mono text-[9px] text-ink/35">
                  <FileText size={10} />
                  {checklist.filter((c) => c.status === "done").length} of{" "}
                  {checklist.length} compliance tasks completed
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-600">
                  <ShieldCheck size={10} />
                  No overdue items
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
