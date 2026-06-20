import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  ArrowRight,
  BrainCircuit,
  MessageSquare,
  BarChart2,
  Inbox,
  Zap,
  CheckCircle2,
  Clock,
  ChevronRight,
  Cpu,
  Sparkles,
} from "lucide-react";

// ─── Agent definitions ────────────────────────────────────────────────────────
const AGENTS = [
  {
    id: "sales",
    name: "Sales Agent",
    icon: BarChart2,
    color: "#5509D9",
    badge: "bg-brand/10 text-brand border-brand/20",
    description: "Follows up leads, qualifies prospects, drafts proposals",
    conversations: [
      {
        from: "user",
        text: "We have 40 new leads from last week's campaign. Can you prioritize them?",
      },
      {
        from: "ai",
        text: "Analyzing 40 leads by industry fit, deal size, and engagement signals…",
        thinking: true,
      },
      {
        from: "ai",
        text: "Done. Top 8 high-intent leads flagged. Draft follow-up emails queued for your review. Estimated pipeline value: AED 320,000.",
      },
      { from: "user", text: "Great. Schedule calls for the top 3." },
      {
        from: "ai",
        text: "Calendar invites sent for Monday 10am, Tuesday 2pm, and Wednesday 11am. CRM updated.",
      },
    ],
  },
  {
    id: "ops",
    name: "Ops Agent",
    icon: Cpu,
    color: "#7134f1",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    description: "Monitors operations, triggers workflows, surfaces anomalies",
    conversations: [
      { from: "user", text: "Run the weekly operations health check." },
      {
        from: "ai",
        text: "Scanning 6 operational modules across inventory, procurement, and fulfillment…",
        thinking: true,
      },
      {
        from: "ai",
        text: "3 alerts detected: Low stock on SKU-4821 (reorder triggered), 2 overdue POs, and a 14% drop in warehouse throughput. Full report attached.",
      },
      { from: "user", text: "Auto-approve the reorder and escalate the POs." },
      {
        from: "ai",
        text: "Reorder approved - vendor notified. POs escalated to procurement manager with a deadline reminder. Done.",
      },
    ],
  },
  {
    id: "cx",
    name: "CX Agent",
    icon: MessageSquare,
    color: "#a336ff",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    description:
      "Handles customer queries, escalations and satisfaction surveys",
    conversations: [
      {
        from: "user",
        text: "What's our customer satisfaction score this month?",
      },
      {
        from: "ai",
        text: "Fetching CSAT data across email, chat, and WhatsApp channels…",
        thinking: true,
      },
      {
        from: "ai",
        text: "Overall CSAT: 94.2% (↑ 3.1% vs last month). Top driver: faster response times. 2 open escalations need your attention.",
      },
      { from: "user", text: "Show me the open escalations." },
      {
        from: "ai",
        text: "Escalation 1: Invoice dispute - AED 8,400, Day 3. Escalation 2: Delivery delay - customer contacted 4× this week. Draft responses ready for both.",
      },
    ],
  },
  {
    id: "reporting",
    name: "Report Agent",
    icon: Inbox,
    color: "#371a74",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    description: "Auto-generates daily, weekly, and monthly business reports",
    conversations: [
      { from: "user", text: "Generate this month's executive summary." },
      {
        from: "ai",
        text: "Pulling data from finance, sales, operations, and CRM modules…",
        thinking: true,
      },
      {
        from: "ai",
        text: "Executive summary ready: Revenue AED 1.2M (+8%), Costs –5%, 3 KPIs missed. Key insight: top-line growth driven by UAE market. Full PDF exported.",
      },
      { from: "user", text: "Email it to the board automatically next time." },
      {
        from: "ai",
        text: "Done. Monthly auto-dispatch set for the 1st of each month at 8am. Board email list confirmed.",
      },
    ],
  },
];

// ─── Live stats ───────────────────────────────────────────────────────────────
const STATS = [
  { value: "24/7", label: "Always on" },
  { value: "< 4s", label: "Avg response" },
  { value: "0", label: "Missed tasks" },
];

// ─── Typing effect hook ───────────────────────────────────────────────────────
function useTypingText(text: string, speed = 28, start = true) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  useEffect(() => {
    if (!start) {
      setDisplayed("");
      idx.current = 0;
      return;
    }
    idx.current = 0;
    setDisplayed("");
    const iv = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(iv);
      }
    }, speed);
    return () => clearInterval(iv);
  }, [text, speed, start]);
  return displayed;
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function Bubble({
  msg,
  agentColor,
  animate = false,
}: {
  msg: { from: string; text: string; thinking?: boolean };
  agentColor: string;
  animate?: boolean;
}) {
  const typed = useTypingText(msg.text, 18, animate);
  const displayed = animate ? typed : msg.text;

  if (msg.from === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-ink text-white text-[11px] leading-relaxed px-3.5 py-2.5 font-medium">
          {msg.text}
        </div>
      </div>
    );
  }

  if (msg.thinking) {
    return (
      <div className="flex items-end gap-2">
        <div
          className="size-6 rounded-full shrink-0 flex items-center justify-center"
          style={{ background: agentColor }}
        >
          <BrainCircuit size={12} className="text-white" />
        </div>
        <div className="rounded-2xl rounded-bl-sm border border-hairline bg-white px-3.5 py-2.5 text-[11px] text-ink/50 italic flex items-center gap-2">
          <span className="flex gap-1">
            <span className="size-1.5 rounded-full bg-current animate-bounce [animation-delay:0ms]" />
            <span className="size-1.5 rounded-full bg-current animate-bounce [animation-delay:150ms]" />
            <span className="size-1.5 rounded-full bg-current animate-bounce [animation-delay:300ms]" />
          </span>
          {displayed}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2">
      <div
        className="size-6 rounded-full shrink-0 flex items-center justify-center"
        style={{ background: agentColor }}
      >
        <Sparkles size={10} className="text-white" />
      </div>
      <div
        className="max-w-[82%] rounded-2xl rounded-bl-sm border text-[11px] leading-relaxed px-3.5 py-2.5 text-ink/85"
        style={{
          borderColor: `${agentColor}30`,
          background: `${agentColor}08`,
        }}
      >
        {displayed}
        {animate && displayed.length < msg.text.length && (
          <span className="ml-0.5 inline-block w-0.5 h-3 bg-current animate-pulse align-middle" />
        )}
      </div>
    </div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export function AIAgentsHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  const [activeAgent, setActiveAgent] = useState(0);
  const [visibleMsgs, setVisibleMsgs] = useState(2);
  const [tasksDone, setTasksDone] = useState(1847);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const agent = AGENTS[activeAgent];

  // When agent changes, reset chat
  useEffect(() => {
    setVisibleMsgs(2);
  }, [activeAgent]);

  // Drip in next message
  useEffect(() => {
    if (visibleMsgs >= agent.conversations.length) return;
    const delay = agent.conversations[visibleMsgs - 1]?.thinking ? 2200 : 1600;
    const t = setTimeout(() => setVisibleMsgs((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [visibleMsgs, agent]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMsgs]);

  // Live task counter
  useEffect(() => {
    const iv = setInterval(() => setTasksDone((n) => n + 1), 3800);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative pt-28 pb-0 lg:pt-36 overflow-hidden bg-mist min-h-[88vh] flex flex-col">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 bg-dot-grid opacity-35 [mask-image:radial-gradient(ellipse_at_65%_40%,black_30%,transparent_75%)]" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[280px] bg-brand/12 blur-[100px] rounded-full pointer-events-none" />

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

            {/* Agent type pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {AGENTS.map((ag, i) => {
                const AgIcon = ag.icon;
                return (
                  <button
                    key={ag.id}
                    onClick={() => setActiveAgent(i)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                      activeAgent === i
                        ? "text-white border-transparent shadow-[0_4px_16px_rgba(85,9,217,0.35)]"
                        : "bg-white/70 text-ink/60 border-hairline hover:text-ink"
                    }`}
                    style={activeAgent === i ? { background: ag.color } : {}}
                  >
                    <AgIcon size={11} />
                    {ag.name}
                  </button>
                );
              })}
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

          {/* ── Right: AI Agent terminal ── */}
          <div className="lg:flex-1 w-full pb-8 lg:pb-16">
            <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl border border-hairline shadow-[0_8px_60px_rgba(85,9,217,0.14)] overflow-hidden flex flex-col">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline bg-white/60 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400/70" />
                  <span className="size-2.5 rounded-full bg-amber-400/70" />
                  <span className="size-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="font-mono text-[10px] text-ink/40 tracking-widest">
                  RAPTRON · AI Agent Console
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px]">LIVE</span>
                </div>
              </div>

              {/* Agent selector tabs */}
              <div className="flex border-b border-hairline bg-mist/50 shrink-0">
                {AGENTS.map((ag, i) => {
                  const AgIcon = ag.icon;
                  const isActive = activeAgent === i;
                  return (
                    <button
                      key={ag.id}
                      onClick={() => setActiveAgent(i)}
                      className="flex-1 flex flex-col items-center gap-1 py-3 px-2 text-center transition-all duration-200 relative"
                      style={{
                        background: isActive ? "white" : "transparent",
                        borderBottom: isActive
                          ? `2px solid ${ag.color}`
                          : "2px solid transparent",
                      }}
                    >
                      <div
                        className="size-7 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isActive ? ag.color : "transparent",
                        }}
                      >
                        <AgIcon
                          size={14}
                          style={{ color: isActive ? "white" : ag.color }}
                        />
                      </div>
                      <span
                        className="font-mono text-[8px] uppercase tracking-widest transition-colors duration-200 hidden sm:block"
                        style={{
                          color: isActive ? ag.color : "rgba(19,13,38,0.35)",
                        }}
                      >
                        {ag.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Agent info strip */}
              <div
                className="px-4 py-2.5 flex items-center gap-2.5 shrink-0 border-b border-hairline"
                style={{ background: `${agent.color}08` }}
              >
                <div
                  className="size-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: agent.color }}
                >
                  <BrainCircuit size={13} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div
                    className="font-display font-bold text-xs"
                    style={{ color: agent.color }}
                  >
                    {agent.name}
                  </div>
                  <div className="text-[10px] text-ink/45 truncate">
                    {agent.description}
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-1 shrink-0">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-emerald-600">
                    Active
                  </span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-[220px] max-h-[280px]">
                {agent.conversations.slice(0, visibleMsgs).map((msg, i) => (
                  <Bubble
                    key={`${agent.id}-${i}`}
                    msg={msg}
                    agentColor={agent.color}
                    animate={i === visibleMsgs - 1}
                  />
                ))}
                {visibleMsgs < agent.conversations.length && (
                  <div className="flex items-center gap-1.5 text-ink/30">
                    <Zap size={10} className="animate-pulse" />
                    <span className="font-mono text-[9px]">
                      Agent processing…
                    </span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Footer: stats + replay */}
              <div className="shrink-0 flex items-center justify-between px-4 py-3 border-t border-hairline bg-white/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={11} className="text-emerald-500" />
                    <span className="font-mono text-[9px] text-ink/40">
                      {tasksDone.toLocaleString()} tasks completed today
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-brand/60" />
                    <span className="font-mono text-[9px] text-ink/40">
                      avg 3.7s
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setVisibleMsgs(2)}
                  className="inline-flex items-center gap-1 font-mono text-[9px] text-brand hover:text-brand/70 transition-colors"
                >
                  Replay <ChevronRight size={10} />
                </button>
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
