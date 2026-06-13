import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Calendar,
  ArrowRight,
  Code2,
  Play,
  RefreshCw,
  Layers,
  Database,
  Terminal,
  ShieldCheck,
  ChevronRight,
  Activity,
  Cpu,
  Server,
  Network,
  CheckCircle2,
} from "lucide-react";

// ─── API endpoints for Sandbox ───────────────────────────────────────────────
const ENDPOINTS = [
  {
    path: "GET /api/v1/inventory/status",
    desc: "Fetch real-time stock levels & warehouse allocations.",
    response: {
      status: "success",
      timestamp: "2026-06-07T23:51:00Z",
      data: {
        warehouses: [
          { id: "DXB-01", status: "active", capacity: "84%" },
          { id: "AUH-02", status: "active", capacity: "62%" },
        ],
        lowStockAlerts: 3,
        skusTracked: 14820,
      },
    },
  },
  {
    path: "POST /api/v1/orders/checkout",
    desc: "Processes a cart checkout and generates invoice ledger entries.",
    response: {
      status: "created",
      orderId: "ORD-9482-A",
      ledger: {
        entry: "TX-83021",
        account: "Sales-Revenue-UAE",
        vatAmount: 42.05,
        totalAmount: 883.05,
      },
      notifications: ["email_receipt_queued", "sms_warehouse_triggered"],
    },
  },
  {
    path: "GET /api/v1/analytics/realtime",
    desc: "Aggregated user sessions and latency percentiles.",
    response: {
      status: "success",
      metrics: {
        activeWebSocketConnections: 1840,
        requestCount_5m: 48912,
        p99_latency_ms: 78.4,
        cacheHitRatio: "94.2%",
      },
    },
  },
];

// ─── Architecture layers ──────────────────────────────────────────────────────
const ARCH_LAYERS = [
  {
    id: "edge",
    name: "Edge Network (CDN)",
    tech: "Cloudflare Workers / Next.js Edge",
    desc: "Requests are routed & cached globally at the nearest point of presence for sub-15ms DNS & static assets response.",
    icon: Network,
    color: "#5509D9",
  },
  {
    id: "gateway",
    name: "API Gateway",
    tech: "NestJS / Go Backend",
    desc: "Handles rate-limiting, CORS, authentication hooks, and intelligent routing to downstream microservices.",
    icon: Server,
    color: "#7134f1",
  },
  {
    id: "database",
    name: "Persistant DB & Cache",
    tech: "PostgreSQL + Redis Cluster",
    desc: "PostgreSQL maintains relational consistency. Redis keeps hot data cached for sub-millisecond retrievals.",
    icon: Database,
    color: "#a336ff",
  },
];

// ─── CI/CD Logs Simulation ────────────────────────────────────────────────────
const BUILD_STEPS = [
  "git checkout -b main",
  "npm install --frozen-lockfile",
  "eslint . --max-warnings 0",
  "vitest run --coverage",
  "vite build --outDir dist",
  "prisma migrate deploy",
  "wrangler deploy --env production",
  "Deployment complete: active at https://raptron.ae",
];

// ─── Stats ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: "100%", label: "IP ownership" },
  { value: "< 85ms", label: "P99 latency" },
  { value: "99.99%", label: "SLA uptime" },
];

export function CustomSoftwareHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"api" | "architecture" | "cicd">(
    "api",
  );

  // API Sandbox States
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [apiState, setApiState] = useState<"idle" | "sending" | "success">(
    "idle",
  );
  const [latency, setLatency] = useState(0);
  const [typedResponse, setTypedResponse] = useState("");

  // Architecture States
  const [activeLayer, setActiveLayer] = useState("edge");

  // CI/CD States
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [activeStepIdx, setActiveStepIdx] = useState(-1);

  // Live Metrics
  const [cpuUsage, setCpuUsage] = useState(3.4);
  const [reqPerSec, setReqPerSec] = useState(145);

  // Fluctuate live dashboard metrics
  useEffect(() => {
    const iv = setInterval(() => {
      setCpuUsage((c) =>
        parseFloat(
          Math.min(
            9.8,
            Math.max(1.8, c + (Math.random() > 0.5 ? 0.6 : -0.6)),
          ).toFixed(1),
        ),
      );
      setReqPerSec((r) =>
        Math.min(220, Math.max(90, r + Math.floor(Math.random() * 20 - 10))),
      );
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  // API query simulation
  const handleRunQuery = () => {
    if (apiState === "sending") return;
    setApiState("sending");
    setLatency(0);
    setTypedResponse("");

    // Simulate latency timing
    let ms = 0;
    const latencyInterval = setInterval(() => {
      ms += 8;
      setLatency(ms);
    }, 8);

    setTimeout(
      () => {
        clearInterval(latencyInterval);
        setApiState("success");
        const respString = JSON.stringify(
          ENDPOINTS[selectedEndpoint].response,
          null,
          2,
        );

        // Type out response
        let idx = 0;
        const typeInterval = setInterval(() => {
          if (idx < respString.length) {
            setTypedResponse(respString.slice(0, idx + 4));
            idx += 4;
          } else {
            setTypedResponse(respString);
            clearInterval(typeInterval);
          }
        }, 5);
      },
      600 + Math.random() * 400,
    );
  };

  // Run CI/CD build simulation
  const handleTriggerBuild = () => {
    if (isBuilding) return;
    setIsBuilding(true);
    setBuildLogs([]);
    setActiveStepIdx(0);
  };

  // Build log sequencing
  useEffect(() => {
    if (!isBuilding || activeStepIdx === -1) return;

    if (activeStepIdx < BUILD_STEPS.length) {
      const delay = activeStepIdx === BUILD_STEPS.length - 1 ? 1200 : 800;
      const t = setTimeout(() => {
        setBuildLogs((prev) => [...prev, BUILD_STEPS[activeStepIdx]]);
        setActiveStepIdx((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(t);
    } else {
      setIsBuilding(false);
      setActiveStepIdx(-1);
    }
  }, [isBuilding, activeStepIdx]);

  return (
    <section className="relative pt-28 pb-0 lg:pt-36 overflow-hidden bg-mist min-h-[88vh] flex flex-col">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 bg-dot-grid opacity-35 [mask-image:radial-gradient(ellipse_at_65%_40%,black_30%,transparent_75%)]" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[280px] bg-brand/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 flex-1 flex flex-col">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-8 flex-1">
          {/* ── Left: Copy & Call-to-actions ── */}
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

            {/* Stats row */}
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

          {/* ── Right: Interactive Sandbox Panel ── */}
          <div className="lg:flex-1 w-full pb-8 lg:pb-16">
            <div className="relative bg-white/85 backdrop-blur-sm rounded-3xl border border-hairline shadow-[0_8px_60px_rgba(85,9,217,0.12)] overflow-hidden flex flex-col">
              {/* Panel Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline bg-white/60 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-400/70" />
                  <span className="size-2.5 rounded-full bg-amber-400/70" />
                  <span className="size-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <div className="font-mono text-[10px] text-ink/40 tracking-widest">
                  RAPTRON · Custom Software Sandbox
                </div>
                <div className="flex items-center gap-1.5 text-brand">
                  <Code2 size={11} className="animate-pulse" />
                  <span className="font-mono text-[10px]">SANDBOX</span>
                </div>
              </div>

              {/* Console Tabs */}
              <div className="flex border-b border-hairline shrink-0 bg-mist/50">
                {(
                  [
                    { key: "api", label: "API Playground", icon: Play },
                    {
                      key: "architecture",
                      label: "Architecture Map",
                      icon: Layers,
                    },
                    { key: "cicd", label: "CI/CD Monitor", icon: Terminal },
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
                      background: activeTab === key ? "white" : "transparent",
                    }}
                  >
                    <Icon size={13} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Panel Sandbox Content Area */}
              <div className="flex-1 p-5 min-h-[300px] max-h-[380px] overflow-y-auto">
                {/* ── API PLAYGROUND ── */}
                {activeTab === "api" && (
                  <div className="flex flex-col gap-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
                      Query Simulator
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4">
                      {/* Left: endpoint list selector */}
                      <div className="flex flex-col gap-1.5">
                        {ENDPOINTS.map((ep, idx) => (
                          <button
                            key={ep.path}
                            onClick={() => {
                              setSelectedEndpoint(idx);
                              setApiState("idle");
                              setTypedResponse("");
                            }}
                            className={`px-3 py-2 text-left rounded-lg font-mono text-[10px] transition-all border ${
                              selectedEndpoint === idx
                                ? "bg-brand/5 border-brand/20 text-brand font-semibold"
                                : "border-hairline text-ink/65 hover:bg-black/5"
                            }`}
                          >
                            {ep.path.split(" ")[1]}
                          </button>
                        ))}
                      </div>

                      {/* Right: Endpoint detail & payload simulator */}
                      <div className="flex flex-col gap-3">
                        <div className="rounded-xl bg-mist border border-hairline p-3">
                          <span
                            className={`inline-block font-mono text-[9px] font-bold px-1.5 py-0.5 rounded mr-2 ${
                              ENDPOINTS[selectedEndpoint].path.startsWith(
                                "POST",
                              )
                                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                : "bg-brand/10 text-brand border border-brand/20"
                            }`}
                          >
                            {ENDPOINTS[selectedEndpoint].path.split(" ")[0]}
                          </span>
                          <span className="font-mono text-xs text-ink/80">
                            {ENDPOINTS[selectedEndpoint].path.split(" ")[1]}
                          </span>
                          <p className="text-[11px] text-ink/50 mt-1.5">
                            {ENDPOINTS[selectedEndpoint].desc}
                          </p>
                        </div>

                        {/* Send request button & timing display */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleRunQuery}
                            disabled={apiState === "sending"}
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-brand text-white shadow hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
                          >
                            <Play size={10} fill="white" />
                            Send Request
                          </button>

                          {apiState !== "idle" && (
                            <div className="font-mono text-[10px] text-ink/50 flex items-center gap-2">
                              <span>Status:</span>
                              <span
                                className={
                                  apiState === "sending"
                                    ? "text-amber-500 font-semibold"
                                    : "text-emerald-500 font-semibold"
                                }
                              >
                                {apiState === "sending"
                                  ? "PENDING..."
                                  : "200 OK"}
                              </span>
                              <span>Latency:</span>
                              <span className="text-brand font-semibold">
                                {latency}ms
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Query JSON response code preview */}
                        {apiState !== "idle" && (
                          <div className="rounded-xl border border-hairline bg-ink p-4 text-white font-mono text-[10px] overflow-x-auto leading-relaxed relative">
                            <div className="absolute right-3 top-2 text-[8px] text-white/30 uppercase tracking-widest">
                              response.json
                            </div>
                            <pre className="text-white/90">
                              {typedResponse || "// Fetching..."}
                              {apiState === "sending" && (
                                <span className="ml-1 inline-block w-1 h-3 bg-white/70 animate-pulse" />
                              )}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── ARCHITECTURE EXPLORER ── */}
                {activeTab === "architecture" && (
                  <div className="flex flex-col gap-4">
                    <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
                      Edge-to-DB Topology Map
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-center">
                      {/* Flow layout visualization */}
                      <div className="relative flex flex-col gap-8 py-4 items-center">
                        {/* Connecting vertical lines */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px border-l border-dashed border-hairline pointer-events-none" />

                        {ARCH_LAYERS.map((layer) => {
                          const LayerIcon = layer.icon;
                          const isActive = activeLayer === layer.id;
                          return (
                            <button
                              key={layer.id}
                              onMouseEnter={() => setActiveLayer(layer.id)}
                              className={`relative z-10 w-full max-w-[280px] rounded-xl border p-3.5 flex items-center gap-3 transition-all duration-300 ${
                                isActive
                                  ? "bg-white border-brand shadow-[0_4px_20px_rgba(85,9,217,0.12)] scale-[1.03]"
                                  : "bg-white/60 border-hairline hover:bg-white hover:scale-[1.01]"
                              }`}
                            >
                              <div
                                className="size-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                                style={{
                                  background: isActive
                                    ? layer.color
                                    : "rgba(85,9,217,0.06)",
                                }}
                              >
                                <LayerIcon
                                  size={18}
                                  style={{
                                    color: isActive ? "white" : "var(--brand)",
                                  }}
                                />
                              </div>
                              <div className="text-left min-w-0">
                                <div className="font-display font-bold text-xs leading-snug">
                                  {layer.name}
                                </div>
                                <div className="font-mono text-[9px] text-brand mt-0.5 truncate">
                                  {layer.tech}
                                </div>
                              </div>
                              <ChevronRight
                                size={14}
                                className="ml-auto text-ink/30"
                              />
                            </button>
                          );
                        })}
                      </div>

                      {/* Detail pane */}
                      <div className="rounded-xl border border-hairline p-4 bg-white shadow-card self-stretch flex flex-col justify-center">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-brand font-semibold mb-1">
                          Layer Details
                        </span>
                        <h4 className="font-display font-extrabold text-sm text-ink mb-2">
                          {ARCH_LAYERS.find((l) => l.id === activeLayer)?.name}
                        </h4>
                        <p className="text-[11px] text-ink/65 leading-relaxed">
                          {ARCH_LAYERS.find((l) => l.id === activeLayer)?.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── CI/CD MONITOR ── */}
                {activeTab === "cicd" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
                        Production Delivery Runner
                      </div>
                      <button
                        onClick={handleTriggerBuild}
                        disabled={isBuilding}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold border border-hairline rounded-lg hover:bg-white active:scale-95 transition disabled:opacity-50"
                      >
                        <RefreshCw
                          size={10}
                          className={isBuilding ? "animate-spin" : ""}
                        />
                        Trigger Deploy Pipeline
                      </button>
                    </div>

                    {/* CI Pipeline Stages Map */}
                    <div className="flex items-center gap-2 justify-between max-w-md bg-mist/60 border border-hairline p-2.5 rounded-xl">
                      {[
                        {
                          label: "Install",
                          active: activeStepIdx >= 0 && activeStepIdx <= 1,
                          done: activeStepIdx > 1,
                        },
                        {
                          label: "Verify",
                          active: activeStepIdx >= 2 && activeStepIdx <= 3,
                          done: activeStepIdx > 3,
                        },
                        {
                          label: "Build",
                          active: activeStepIdx === 4,
                          done: activeStepIdx > 4,
                        },
                        {
                          label: "Release",
                          active: activeStepIdx >= 5,
                          done: activeStepIdx === -1 && buildLogs.length > 0,
                        },
                      ].map((stage, i) => (
                        <div
                          key={stage.label}
                          className="flex-1 flex items-center gap-1.5"
                        >
                          <div
                            className={`size-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-colors ${
                              stage.done
                                ? "bg-emerald-500 text-white"
                                : stage.active
                                  ? "bg-brand text-white animate-pulse"
                                  : "bg-black/10 text-ink/40"
                            }`}
                          >
                            {stage.done ? "✓" : i + 1}
                          </div>
                          <span
                            className={`text-[9px] font-mono font-semibold ${
                              stage.active
                                ? "text-brand"
                                : stage.done
                                  ? "text-emerald-500"
                                  : "text-ink/45"
                            }`}
                          >
                            {stage.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Terminal Display */}
                    <div className="rounded-xl border border-hairline bg-ink p-4 font-mono text-[10px] text-emerald-400 min-h-[140px] max-h-[180px] overflow-y-auto leading-relaxed relative flex flex-col gap-1.5">
                      <div className="absolute right-3 top-2 text-[8px] text-white/30 uppercase tracking-widest">
                        deploy_pipeline.sh
                      </div>

                      {buildLogs.length === 0 && !isBuilding && (
                        <div className="text-white/45 italic py-4">
                          // Terminal inactive. Click Trigger Deploy above to
                          start.
                        </div>
                      )}

                      {buildLogs.map((log, index) => {
                        const isSuccessLine = log.startsWith(
                          "Deployment complete",
                        );
                        return (
                          <div
                            key={index}
                            className={
                              isSuccessLine
                                ? "text-emerald-300 font-bold flex items-center gap-1"
                                : "text-emerald-400/80"
                            }
                          >
                            {isSuccessLine ? (
                              <CheckCircle2
                                size={10}
                                className="text-emerald-500 shrink-0"
                              />
                            ) : (
                              "$ "
                            )}
                            {log}
                          </div>
                        );
                      })}

                      {isBuilding && (
                        <div className="flex items-center gap-1.5 text-white/50 animate-pulse">
                          <span>Processing build step...</span>
                          <span className="w-1.5 h-3 bg-white/70 inline-block align-middle" />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Console Footer / Live Telemetry metrics */}
              <div className="shrink-0 flex items-center justify-between px-5 py-3 border-t border-hairline bg-white/50 text-[10px] font-mono text-ink/40">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Activity size={12} className="text-brand" />
                    <span>Rate: {reqPerSec} req/s</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Cpu size={12} className="text-brand/70" />
                    <span>Host CPU: {cpuUsage}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <ShieldCheck size={11} />
                  <span>SLA 99.99% Nominal</span>
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
