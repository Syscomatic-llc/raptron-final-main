import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  RefreshCw,
  Zap,
  Database,
  Mail,
  FileText,
  AlertCircle,
  TrendingUp,
  Users,
} from "lucide-react";

// ─── Workflow node data ───────────────────────────────────────────────────────
const NODES = [
  {
    id: "trigger",
    label: "Trigger",
    sub: "New Order",
    icon: Zap,
    col: 0,
    row: 1,
    color: "bg-brand",
    textColor: "text-white",
    pulse: true,
  },
  {
    id: "validate",
    label: "Validate",
    sub: "Data Check",
    icon: AlertCircle,
    col: 1,
    row: 0,
    color: "bg-amber-400/20 border border-amber-400/40",
    textColor: "text-amber-600",
    pulse: false,
  },
  {
    id: "db",
    label: "Update DB",
    sub: "Inventory",
    icon: Database,
    col: 1,
    row: 1,
    color: "bg-sky-500/15 border border-sky-400/30",
    textColor: "text-sky-600",
    pulse: false,
  },
  {
    id: "notify",
    label: "Notify",
    sub: "Email + SMS",
    icon: Mail,
    col: 2,
    row: 0,
    color: "bg-violet-500/15 border border-violet-400/30",
    textColor: "text-violet-600",
    pulse: false,
  },
  {
    id: "invoice",
    label: "Generate",
    sub: "Invoice PDF",
    icon: FileText,
    col: 2,
    row: 1,
    color: "bg-emerald-500/15 border border-emerald-400/30",
    textColor: "text-emerald-600",
    pulse: false,
  },
  {
    id: "report",
    label: "Report",
    sub: "Analytics",
    icon: TrendingUp,
    col: 3,
    row: 1,
    color: "bg-brand/10 border border-brand/25",
    textColor: "text-brand",
    pulse: false,
  },
];

const CONNECTIONS = [
  { from: "trigger", to: "validate" },
  { from: "trigger", to: "db" },
  { from: "validate", to: "notify" },
  { from: "db", to: "invoice" },
  { from: "notify", to: "report" },
  { from: "invoice", to: "report" },
];

// ─── Live tasks feed ─────────────────────────────────────────────────────────
const TASKS = [
  { id: 1, label: "Invoice #4821 generated", status: "done", ago: "2s" },
  {
    id: 2,
    label: "Inventory synced – 3 SKUs updated",
    status: "done",
    ago: "8s",
  },
  {
    id: 3,
    label: "Order #2934 notification sent",
    status: "running",
    ago: "now",
  },
  { id: 4, label: "Monthly report queued", status: "pending", ago: "-" },
];

// ─── Stats bar ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "12h", label: "Saved per week" },
  { value: "0", label: "Manual errors" },
  { value: "4s", label: "Avg task time" },
];

// ─── FlowCanvas – SVG connector layer ────────────────────────────────────────
function FlowCanvas({ active }: { active: string }) {
  // Layout constants: nodes are 140px wide, 76px tall; col gap ~160, row gap ~100
  const COL_W = 160;
  const ROW_H = 104;
  const NODE_W = 136;
  const NODE_H = 72;

  const nodePos = (n: (typeof NODES)[number]) => ({
    cx: n.col * COL_W + NODE_W / 2,
    cy: n.row * ROW_H + NODE_H / 2,
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5509D9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#A336FF" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {CONNECTIONS.map(({ from, to }) => {
        const f = NODES.find((n) => n.id === from)!;
        const t = NODES.find((n) => n.id === to)!;
        const fp = nodePos(f);
        const tp = nodePos(t);
        const isActive = active === from || active === to;
        // Bezier control mid-x
        const mx = (fp.cx + tp.cx) / 2;
        const d = `M ${fp.cx + NODE_W / 2} ${fp.cy} C ${mx + 10} ${fp.cy}, ${mx - 10} ${tp.cy}, ${tp.cx - NODE_W / 2} ${tp.cy}`;
        return (
          <g key={`${from}-${to}`}>
            <path
              d={d}
              fill="none"
              stroke={isActive ? "url(#flow-grad)" : "#e2e0f0"}
              strokeWidth={isActive ? 2.5 : 1.5}
              strokeDasharray={isActive ? "none" : "6 4"}
              filter={isActive ? "url(#glow)" : undefined}
              style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
            />
            {isActive && (
              <circle r="5" fill="#5509D9" opacity="0.9" filter="url(#glow)">
                <animateMotion dur="1.4s" repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── WorkflowNode ─────────────────────────────────────────────────────────────
function WorkflowNode({
  node,
  active,
  onHover,
}: {
  node: (typeof NODES)[number];
  active: string;
  onHover: (id: string) => void;
}) {
  const Icon = node.icon;
  const isActive = active === node.id;
  const COL_W = 160;
  const ROW_H = 104;

  return (
    <div
      className={`absolute w-[136px] rounded-xl p-3 cursor-pointer select-none transition-all duration-300 ${node.color} ${
        isActive
          ? "scale-105 shadow-[0_0_24px_rgba(85,9,217,0.35)]"
          : "hover:scale-[1.03] hover:shadow-md"
      }`}
      style={{
        left: node.col * COL_W,
        top: node.row * ROW_H,
        zIndex: 10,
      }}
      onMouseEnter={() => onHover(node.id)}
    >
      <div className="flex items-center gap-2 mb-1">
        <div
          className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${
            node.id === "trigger"
              ? "bg-white/20"
              : "bg-white/60 backdrop-blur-sm"
          }`}
        >
          <Icon
            size={14}
            className={node.id === "trigger" ? "text-white" : node.textColor}
          />
        </div>
        {node.pulse && (
          <span className="ml-auto flex">
            <span className="size-2 rounded-full bg-white animate-ping opacity-70" />
          </span>
        )}
      </div>
      <div
        className={`font-display font-bold text-sm leading-snug ${
          node.id === "trigger" ? "text-white" : "text-ink"
        }`}
      >
        {node.label}
      </div>
      <div
        className={`text-[10px] font-mono mt-0.5 ${
          node.id === "trigger" ? "text-white/70" : "text-ink/50"
        }`}
      >
        {node.sub}
      </div>
    </div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export function AutomationHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  const [activeNode, setActiveNode] = useState("trigger");
  const [taskList, setTaskList] = useState(TASKS);
  const [counter, setCounter] = useState(4821);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cycle active node automatically
  useEffect(() => {
    const ids = NODES.map((n) => n.id);
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % ids.length;
      setActiveNode(ids[idx]);
    }, 1800);
    return () => clearInterval(intervalRef.current!);
  }, []);

  // Simulate live task ticks
  useEffect(() => {
    const t = setInterval(() => {
      setCounter((c) => c + 1);
      setTaskList((prev) => {
        const updated = prev.map((task) =>
          task.status === "running"
            ? { ...task, status: "done" as const, ago: "just now" }
            : task.status === "pending"
              ? { ...task, status: "running" as const, ago: "now" }
              : task,
        );
        return updated;
      });
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative pt-28 pb-0 lg:pt-36 overflow-hidden bg-mist min-h-[88vh] flex flex-col">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 bg-dot-grid opacity-35 [mask-image:radial-gradient(ellipse_at_60%_40%,black_30%,transparent_75%)]" />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[300px] bg-brand/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 flex-1 flex flex-col">
        {/* Top row: headline left, workflow right */}
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

          {/* ── Right: interactive workflow panel ── */}
          <div className="lg:flex-1 w-full pb-8 lg:pb-16">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-hairline shadow-[0_8px_60px_rgba(85,9,217,0.12)] overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline bg-white/60">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400/70" />
                  <span className="size-2.5 rounded-full bg-amber-400/70" />
                  <span className="size-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="font-mono text-[10px] text-ink/40 tracking-widest">
                  RAPTRON · Workflow Engine
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px]">LIVE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] divide-y md:divide-y-0 md:divide-x divide-hairline">
                {/* Workflow canvas */}
                <div className="p-5 overflow-x-auto">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30 mb-4">
                    Active Workflow - Order Fulfillment
                  </div>
                  <div
                    className="relative"
                    style={{ height: 220, minWidth: 620 }}
                  >
                    <FlowCanvas active={activeNode} />
                    {NODES.map((node) => (
                      <WorkflowNode
                        key={node.id}
                        node={node}
                        active={activeNode}
                        onHover={setActiveNode}
                      />
                    ))}
                  </div>

                  {/* Bottom ticker */}
                  <div className="mt-4 flex items-center gap-3 px-1">
                    <RefreshCw
                      size={11}
                      className="text-brand animate-spin [animation-duration:3s]"
                    />
                    <span className="font-mono text-[10px] text-ink/40">
                      Invoice #{counter} • processed in 3.8s
                    </span>
                    <div className="ml-auto flex items-center gap-1.5 text-emerald-500 font-mono text-[10px]">
                      <CheckCircle2 size={11} />
                      All systems nominal
                    </div>
                  </div>
                </div>

                {/* Right sidebar: task feed + mini stats */}
                <div className="p-4 md:w-[200px] flex flex-col gap-4">
                  {/* Task queue */}
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30 mb-3">
                      Task Queue
                    </div>
                    <div className="flex flex-col gap-2">
                      {taskList.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-mist border border-hairline"
                        >
                          <div className="mt-0.5 shrink-0">
                            {task.status === "done" && (
                              <CheckCircle2
                                size={12}
                                className="text-emerald-500"
                              />
                            )}
                            {task.status === "running" && (
                              <RefreshCw
                                size={12}
                                className="text-brand animate-spin [animation-duration:1s]"
                              />
                            )}
                            {task.status === "pending" && (
                              <Clock size={12} className="text-ink/30" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] font-medium text-ink/80 leading-snug truncate">
                              {task.label}
                            </div>
                            <div className="font-mono text-[9px] text-ink/30 mt-0.5">
                              {task.ago}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mini KPI cards */}
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="rounded-xl bg-brand/8 border border-brand/15 p-3 flex items-center gap-2.5">
                      <div className="size-8 rounded-lg bg-brand flex items-center justify-center shrink-0">
                        <TrendingUp size={14} className="text-white" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-base text-ink">
                          {counter.toLocaleString()}
                        </div>
                        <div className="font-mono text-[9px] text-ink/40">
                          Tasks ran today
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200/60 p-3 flex items-center gap-2.5">
                      <div className="size-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                        <Users size={14} className="text-white" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-base text-ink">
                          98%
                        </div>
                        <div className="font-mono text-[9px] text-ink/40">
                          Accuracy rate
                        </div>
                      </div>
                    </div>
                  </div>
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
