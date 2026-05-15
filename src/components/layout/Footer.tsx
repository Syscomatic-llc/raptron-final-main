import { Link } from "@tanstack/react-router";
import {
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Zap,
} from "lucide-react";
import { SERVICES, COMPANY } from "@/lib/constants";

const SOCIALS = [
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Twitter, label: "Twitter / X", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
];

function NavDot() {
  return (
    <span className="size-1.5 rounded-full bg-brand-2/0 group-hover:bg-brand-2 ring-1 ring-white/15 group-hover:ring-brand-2/50 transition-all duration-300 shrink-0" />
  );
}

export function Footer() {
  return (
    <footer className="relative bg-ink text-white overflow-hidden">
      {/* ── Ambient glow layer ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-brand-2/5 blur-[100px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: `linear-gradient(rgba(163,54,255,0.8) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(163,54,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Main 4-Column Grid ─────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6">

          {/* ── Brand Column ── */}
          <div className="lg:col-span-4 lg:pr-8">
            <div className="-mt-2 mb-3">
              <img
                src="/logo.png"
                alt="Raptron Logo"
                className="h-28 w-auto scale-[1.8] origin-left brightness-0 invert opacity-90 object-contain"
              />
            </div>
            <p className="text-sm text-white/55 leading-relaxed mb-8">
              {COMPANY.shortDescription}
            </p>

            <div className="flex items-center gap-3 mb-8">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Follow us on ${label}`}
                  className="group relative size-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-brand to-brand-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon size={17} className="relative z-10 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Services Column ── */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] tracking-[0.18em] text-white/35 mb-7 font-semibold">
              Services
            </h4>
            <ul className="space-y-3.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <NavDot />
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                      {s.shortTitle}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company Column ── */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-[11px] tracking-[0.18em] text-white/35 mb-7 font-semibold">
              Company
            </h4>
            <ul className="space-y-3.5">
              <li>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <NavDot />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <NavDot />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">Services</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <NavDot />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">Contact</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <NavDot />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">Blog</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="group inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <NavDot />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">Case Studies</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Contact Column ── */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-[11px] tracking-[0.18em] text-white/35 mb-7 font-semibold">
              Get In Touch
            </h4>
            <ul className="space-y-5">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="group flex items-start gap-3.5"
                >
                  <div className="mt-0.5 size-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 group-hover:bg-brand/20 group-hover:border-brand/30 transition-all duration-300">
                    <Mail size={14} className="text-brand-2" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-white/28 mb-0.5">
                      Email
                    </p>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors break-all leading-snug">
                      {COMPANY.email}
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="group flex items-start gap-3.5"
                >
                  <div className="mt-0.5 size-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 group-hover:bg-brand/20 group-hover:border-brand/30 transition-all duration-300">
                    <Phone size={14} className="text-brand-2" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-white/28 mb-0.5">
                      Phone
                    </p>
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors leading-snug">
                      {COMPANY.phone}
                    </span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3.5">
                <div className="mt-0.5 size-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-brand-2 shrink-0" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-white/28 mb-0.5">
                    Location
                  </p>
                  <span className="text-sm text-white/55 leading-snug block">
                    {COMPANY.address}
                  </span>
                </div>
              </li>
            </ul>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/4 border border-white/8 mt-6">
              <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/45 font-medium">
                Serving clients across UAE &amp; beyond
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA Band ───────────────────────────────────────────── */}
      <div className="relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-2/10 border border-brand-2/20 mb-6">
              <Zap size={12} className="text-brand-2 fill-brand-2" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-brand-2 font-semibold">
                Ready to Transform?
              </span>
            </div>
            <h2
              className="text-4xl lg:text-5xl font-display font-bold text-white leading-[1.1] tracking-tight"
              style={{ color: "white" }}
            >
              Let&apos;s architect your{" "}
              <span className="text-gradient">next breakthrough</span>
            </h2>

          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              to="/book-consultation"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand to-brand-2 text-white font-semibold text-sm shadow-[0_8px_32px_rgba(85,9,217,0.4)] hover:shadow-[0_12px_40px_rgba(85,9,217,0.55)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Consultation
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/80 font-semibold text-sm hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────────────────── */}
      <div className="relative border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/28 font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-white/45">{COMPANY.name}</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            {[
              { label: "Privacy Policy", href: "#" },
              { label: "Terms of Service", href: "#" },
              { label: "Cookie Settings", href: "#" },
            ].map((link, i) => (
              <span key={link.label} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/15 text-xs select-none">·</span>}
                <a
                  href={link.href}
                  className="text-xs text-white/28 hover:text-white/65 transition-colors px-2 py-1"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
