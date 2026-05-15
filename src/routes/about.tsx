import { createFileRoute } from "@tanstack/react-router";
import {
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Target,
  Globe,
  Database,
  Workflow,
  Crosshair,
  ArrowRight,
} from "lucide-react";
import { CTABanner } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";
import { VALUES } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - RAPTRON Digital Solutions" },
      {
        name: "description",
        content:
          "RAPTRON Digital Solutions LLC - built for the businesses that power the world.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="w-full bg-white overflow-x-hidden">
      <Hero />
      <StorySection />
      <MissionVision />
      <ValuesBento />
      <StatsSection />
      <CTABanner />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-mist">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50 mix-blend-multiply" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />

      <div className="relative z-20 w-full max-w-7xl px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-16">
        <Reveal className="lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-hairline shadow-sm mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-2 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-2"></span>
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-ink font-semibold">
              About Raptron
            </span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink">
            Built for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-brand">
              businesses
            </span>{" "}
            that power the world.
          </h1>

          <p className="mt-8 text-xl text-ink/60 max-w-xl font-light leading-relaxed">
            We exist to make modern technology behave like it was designed for
            the way real businesses actually run. We are engineers, strategists,
            and operational experts.
          </p>
        </Reveal>

        <Reveal className="lg:w-1/2" delay={200}>
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-brand-2/20 blur-3xl rounded-full" />
            <div className="relative h-full w-full rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 mix-blend-overlay" />
              <div className="relative z-10">
                <div className="size-16 rounded-2xl bg-gradient-brand text-white flex items-center justify-center shadow-lg mb-8">
                  <Target size={32} />
                </div>
                <h3 className="font-display text-3xl font-bold text-ink mb-4">
                  Precision over buzzwords.
                </h3>
                <p className="text-ink/70 text-lg leading-relaxed">
                  While others chase trends, we focus on deterministic outcomes.
                  We map value flows, then architect systems to amplify them.
                </p>
              </div>

              <div className="relative z-10 mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/80 rounded-xl p-4 border border-hairline shadow-sm">
                  <Database className="text-brand-2 mb-2" size={24} />
                  <div className="font-bold text-ink">Data First</div>
                </div>
                <div className="bg-white/80 rounded-xl p-4 border border-hairline shadow-sm">
                  <Workflow className="text-brand mb-2" size={24} />
                  <div className="font-bold text-ink">Systems Design</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-5 relative">
          <div className="absolute -left-10 -top-10 size-64 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-ink leading-tight">
            A consulting firm with the discipline of an{" "}
            <span className="italic text-brand-2">engineering team.</span>
          </h2>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={100}>
          <div className="space-y-8 text-lg text-ink/70 leading-relaxed max-w-2xl">
            <p>
              RAPTRON Digital Solutions LLC is a premium technology partner
              specializing in ERP, business process re-engineering, AI
              consulting, and custom software. We work with leadership teams
              that want a partner who is opinionated, vendor-neutral, and
              accountable for outcomes - not just deliverables.
            </p>
            <p>
              Our work begins where most consulting ends: with the operational
              reality. We don't believe in abstract strategy decks. We believe
              in shipping robust, scalable systems that directly impact the
              bottom line.
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-hairline">
              <div className="size-12 rounded-full bg-mist flex items-center justify-center text-brand">
                <Crosshair size={24} />
              </div>
              <div className="font-semibold text-ink">
                Laser-focused on operational excellence.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="py-24 bg-surface-tinted relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-deep/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-[2.5rem] bg-white border border-hairline p-12 lg:p-16 shadow-sm hover:shadow-card transition-shadow duration-500 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 text-mist/50 group-hover:text-mist transition-colors duration-500">
                <Globe size={240} />
              </div>
              <div className="relative z-10">
                <div className="font-mono text-[13px] tracking-[0.2em] text-brand font-semibold mb-6">
                  Our Mission
                </div>
                <p className="font-display text-3xl lg:text-4xl leading-tight text-ink font-bold">
                  We help business owners reduce manual work, improve
                  visibility, and bring their daily activities into one
                  connected, intelligent operating structure.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-brand font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Read our manifesto <ArrowRight size={18} />
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-ink text-white p-12 lg:p-16 shadow-card relative overflow-hidden group hover:shadow-glow transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 size-64 rounded-full bg-brand-2/30 blur-3xl group-hover:bg-brand-2/50 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="font-mono text-[13px] tracking-[0.2em] text-brand-2 font-semibold mb-6">
                  Our Vision
                </div>
                <p className="font-display text-3xl lg:text-4xl leading-tight font-bold">
                  To build RAPTRON into a trusted UAE-born technology company
                  that helps businesses modernize, scale, and compete
                  confidently in a digital future.
                </p>
                <div className="mt-8 inline-flex items-center gap-2 text-brand-2 font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Explore our capabilities <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ValuesBento() {
  const VALUE_ICONS = [Handshake, ShieldCheck, RefreshCw, TrendingUp];

  return (
    <section className="py-28 lg:py-36 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="font-mono text-[11px] tracking-[0.2em] text-brand mb-4">
              Core Values
            </div>
            <h2 className="font-display font-extrabold text-5xl lg:text-6xl tracking-tight text-ink">
              The things we won't compromise on.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div
                  key={v.title}
                  className="group relative rounded-[2rem] border border-hairline bg-surface-tinted p-8 overflow-hidden hover:shadow-card transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-10 -right-10 text-mist/30 group-hover:text-mist/60 transition-colors duration-500">
                    <Icon size={180} />
                  </div>
                  <div className="relative z-10">
                    <div className="size-14 rounded-xl bg-gradient-brand text-white flex items-center justify-center shadow-md mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Icon size={24} />
                    </div>
                    <h4 className="font-display font-bold text-2xl text-ink mb-4">
                      {v.title}
                    </h4>
                    <p className="text-ink/65 leading-relaxed">
                      {v.description}
                    </p>
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

function StatsSection() {
  const STATS = [
    { value: 10, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Enterprise Deployments" },
    { value: 99, suffix: "%", label: "Client Retention" },
    { value: 24, suffix: "/7", label: "System Uptime" },
  ];

  return (
    <section className="py-24 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-20 mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 divide-x-0 md:divide-x divide-white/10 text-center">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center">
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
              const eased = 1 - Math.pow(1 - t, 4);
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
      <div className="font-display font-extrabold text-5xl lg:text-6xl tracking-tighter text-white drop-shadow-md">
        {count}
        <span className="text-brand-2">{suffix}</span>
      </div>
      <div className="mt-3 text-sm lg:text-base font-mono uppercase tracking-widest text-white/50">
        {label}
      </div>
    </div>
  );
}
