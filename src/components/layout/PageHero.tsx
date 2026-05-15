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
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 lg:py-28">
        <div className="relative rounded-3xl bg-gradient-brand animate-gradient overflow-hidden p-10 lg:p-16">
          {/* particle dots */}
          <div className="absolute inset-0 opacity-30 bg-dot-grid animate-drift" />
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-brand-deep/40 blur-3xl" />
          <div className="relative max-w-3xl">
            <h2 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Ready to rethink your business technology?
            </h2>
            <p className="mt-4 text-white/85 text-lg max-w-xl">
              Let's design the next phase of your operations - together. Start
              with a free 45-minute strategy session.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book-consultation"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-ink text-white font-semibold hover:bg-black transition"
              >
                <Calendar size={16} /> Book free consultation
              </Link>
              <Link
                to="/request-demo"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition"
              >
                Request a demo <ArrowRight size={16} />
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
