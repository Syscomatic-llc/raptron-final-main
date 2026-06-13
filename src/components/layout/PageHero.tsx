import { Link } from "@tanstack/react-router";
import { Calendar, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-mist" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-70" />
      <div className="absolute inset-0 bg-dot-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3.5 h-8 rounded-full border border-hairline bg-white/70 backdrop-blur text-[11px] font-mono tracking-[0.18em] text-brand">
            <span className="size-1.5 rounded-full bg-brand animate-pulse-dot" />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-5 font-display font-bold text-ink text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-ink/65 leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="relative rounded-[2.5rem] bg-ink overflow-hidden">
          {/* Background glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_0%_50%,rgba(85,9,217,0.45),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_100%_20%,rgba(163,54,255,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-2/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-center gap-10 p-10 lg:p-16">
            {/* Left: copy */}
            <div>
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-[10px] font-mono tracking-[0.18em] text-white/50 font-semibold uppercase">
                  Now taking new clients - Dubai & UAE
                </span>
              </div>

              <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.06] tracking-tight">
                Ready to rethink your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-2 via-violet-400 to-brand-2">
                  business technology?
                </span>
              </h2>
              <p className="mt-4 text-white/50 text-base lg:text-lg max-w-2xl leading-relaxed">
                Let's design the next phase of your operations - together. Start
                with a free 45-minute strategy session.
              </p>

              {/* Trust pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "No long-term contract",
                  "Live in 4 weeks",
                  "UAE-registered team",
                ].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-[11px] font-mono text-white/40"
                  >
                    <span className="size-1 rounded-full bg-emerald-400/70" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                to="/book-consultation"
                className="btn-lucrative inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full text-white font-semibold text-base whitespace-nowrap"
              >
                <Calendar size={17} /> Book a free consultation
              </Link>
              <Link
                to="/request-demo"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border border-white/15 bg-white/5 text-white font-semibold text-base hover:bg-white/10 hover:border-white/25 hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                Request ERP demo <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PrimaryCTA({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-brand text-white font-semibold shadow-card hover:shadow-glow transition ${className}`}
    >
      {children}
    </span>
  );
}
