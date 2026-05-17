import { createFileRoute, Link } from "@tanstack/react-router";
import { Cookie, Settings, BarChart2, Shield } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { useState } from "react";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy - RAPTRON Digital Solutions" },
      {
        name: "description",
        content:
          "How RAPTRON Digital Solutions LLC uses cookies and similar technologies on its website.",
      },
    ],
  }),
  component: CookiePolicyPage,
});

const EFFECTIVE = "17 May 2026";

type CookieRow = { name: string; provider: string; purpose: string; duration: string };

const STRICTLY_NECESSARY: CookieRow[] = [
  { name: "session_id", provider: "raptron.com", purpose: "Maintains your authenticated session state.", duration: "Session" },
  { name: "csrf_token", provider: "raptron.com", purpose: "Cross-site request forgery protection for form submissions.", duration: "Session" },
  { name: "cookie_consent", provider: "raptron.com", purpose: "Stores your cookie consent preferences.", duration: "12 months" },
];

const ANALYTICS_COOKIES: CookieRow[] = [
  { name: "_ga", provider: "Google Analytics", purpose: "Distinguishes unique website users for aggregate traffic analysis.", duration: "24 months" },
  { name: "_ga_*", provider: "Google Analytics", purpose: "Maintains session state for Google Analytics 4 (GA4).", duration: "24 months" },
  { name: "_gid", provider: "Google Analytics", purpose: "Distinguishes users for session-level reporting.", duration: "24 hours" },
  { name: "_gat", provider: "Google Analytics", purpose: "Throttles the request rate to Google Analytics.", duration: "1 minute" },
];

const FUNCTIONAL_COOKIES: CookieRow[] = [
  { name: "locale_pref", provider: "raptron.com", purpose: "Remembers your language or region preference.", duration: "12 months" },
  { name: "ui_theme", provider: "raptron.com", purpose: "Stores display preference settings.", duration: "12 months" },
];

const MARKETING_COOKIES: CookieRow[] = [
  { name: "_fbp", provider: "Meta (Facebook)", purpose: "Used by Meta to deliver and measure advertising effectiveness.", duration: "3 months" },
  { name: "li_fat_id", provider: "LinkedIn", purpose: "Tracks conversions from LinkedIn advertising campaigns.", duration: "30 days" },
  { name: "_gcl_au", provider: "Google Ads", purpose: "Stores and tracks ad conversion information from Google Ads.", duration: "3 months" },
];

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto my-5">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-surface-tinted">
            <th className="text-left font-semibold text-ink px-4 py-2.5 border border-hairline">Cookie Name</th>
            <th className="text-left font-semibold text-ink px-4 py-2.5 border border-hairline">Provider</th>
            <th className="text-left font-semibold text-ink px-4 py-2.5 border border-hairline">Purpose</th>
            <th className="text-left font-semibold text-ink px-4 py-2.5 border border-hairline">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-surface-tinted/30"}>
              <td className="px-4 py-2.5 border border-hairline font-mono text-xs text-ink/80">{r.name}</td>
              <td className="px-4 py-2.5 border border-hairline text-ink/65">{r.provider}</td>
              <td className="px-4 py-2.5 border border-hairline text-ink/65">{r.purpose}</td>
              <td className="px-4 py-2.5 border border-hairline text-ink/65 whitespace-nowrap">{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PREFS_DEFAULT = { analytics: true, functional: true, marketing: false };

function ConsentPanel() {
  const [prefs, setPrefs] = useState(PREFS_DEFAULT);
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof PREFS_DEFAULT) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const categories = [
    {
      key: "analytics" as const,
      label: "Analytics Cookies",
      desc: "Help us understand how visitors interact with the website through aggregated, anonymised data. No personally identifiable information is collected.",
      required: false,
    },
    {
      key: "functional" as const,
      label: "Functional Cookies",
      desc: "Enable enhanced website functionality and personalisation, such as remembering your preferences.",
      required: false,
    },
    {
      key: "marketing" as const,
      label: "Marketing & Advertising Cookies",
      desc: "Used to measure the effectiveness of advertising campaigns on platforms such as Google Ads, LinkedIn, and Meta.",
      required: false,
    },
  ];

  return (
    <div className="rounded-2xl border-2 border-brand/20 bg-white shadow-card p-6 lg:p-8 my-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-xl bg-brand/10 flex items-center justify-center">
          <Settings size={20} className="text-brand" />
        </div>
        <div>
          <h3 className="font-display font-bold text-ink text-base">Manage Cookie Preferences</h3>
          <p className="text-xs text-ink/50">Strictly necessary cookies are always active.</p>
        </div>
      </div>

      {/* Always on */}
      <div className="flex items-start justify-between gap-4 py-4 border-b border-hairline">
        <div>
          <p className="font-semibold text-sm text-ink">Strictly Necessary Cookies</p>
          <p className="text-xs text-ink/55 mt-0.5 max-w-md">Required for the website to function. They cannot be disabled — no personal data is collected beyond what is essential for operation.</p>
        </div>
        <div className="shrink-0 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">Always on</div>
      </div>

      {categories.map((c) => (
        <div key={c.key} className="flex items-start justify-between gap-4 py-4 border-b border-hairline last:border-0">
          <div>
            <p className="font-semibold text-sm text-ink">{c.label}</p>
            <p className="text-xs text-ink/55 mt-0.5 max-w-md">{c.desc}</p>
          </div>
          <button
            onClick={() => toggle(c.key)}
            role="switch"
            aria-checked={prefs[c.key]}
            className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand/30 ${prefs[c.key] ? "bg-brand" : "bg-ink/20"}`}
          >
            <span className={`inline-block size-4 rounded-full bg-white shadow transition-transform duration-300 ${prefs[c.key] ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>
      ))}

      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={save}
          className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-deep transition-colors"
        >
          {saved ? "✓ Saved" : "Save preferences"}
        </button>
        <button
          onClick={() => { setPrefs({ analytics: false, functional: false, marketing: false }); }}
          className="inline-flex items-center h-10 px-6 rounded-full border border-hairline text-sm font-semibold text-ink/70 hover:border-ink/30 hover:text-ink transition-colors"
        >
          Reject all optional
        </button>
        <button
          onClick={() => { setPrefs({ analytics: true, functional: true, marketing: true }); }}
          className="inline-flex items-center h-10 px-6 rounded-full border border-hairline text-sm font-semibold text-ink/70 hover:border-ink/30 hover:text-ink transition-colors"
        >
          Accept all
        </button>
      </div>
    </div>
  );
}

function S({ id, title, n, children }: { id: string; title: string; n: number; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-28">
      <h2 className="font-display font-bold text-xl lg:text-2xl text-ink mb-4 pb-3 border-b border-hairline flex items-center gap-3">
        <span className="size-7 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 text-xs font-bold">{n}</span>
        {title}
      </h2>
      <div className="text-[15px] text-ink/72 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-ink [&_strong]:font-semibold">
        {children}
      </div>
    </section>
  );
}

function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-white/70 mb-6">
            <Cookie size={13} className="text-brand-2" /> LEGAL DOCUMENT
          </div>
          <h1 className="font-display font-extrabold text-5xl lg:text-6xl text-white mb-5 leading-tight">
            Cookie Policy
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-6">
            This Cookie Policy explains how RAPTRON Digital Solutions LLC uses cookies and similar
            tracking technologies on its website, in accordance with the UAE PDPL and applicable
            data protection law.
          </p>
          <p className="text-white/35 text-sm font-mono">
            Effective Date: {EFFECTIVE} &nbsp;·&nbsp; Version 1.0
          </p>
        </div>
      </section>

      {/* Badges */}
      <div className="bg-surface-tinted border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-wrap gap-3">
          {[
            [Shield, "UAE PDPL Compliant"],
            [BarChart2, "Analytics Transparency"],
            [Cookie, "Consent-First Approach"],
          ].map(([Icon, label]: [any, any]) => (
            <span key={label} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-hairline text-xs font-semibold text-ink/65 shadow-sm">
              <Icon size={12} className="text-brand" />{label}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <div className="max-w-4xl">

          <S id="c1" title="What Are Cookies?" n={1}>
            <p>Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites work more efficiently, to remember your preferences, and to provide analytical information to website owners.</p>
            <p>We also use similar technologies such as <strong>web beacons</strong>, <strong>pixel tags</strong>, and <strong>local storage</strong> that function in a comparable way to cookies. References to &ldquo;cookies&rdquo; in this Policy encompass all such technologies unless otherwise stated.</p>
          </S>

          <S id="c2" title="How We Use Cookies" n={2}>
            <p>We use cookies to:</p>
            <ul>
              <li>Ensure the website functions correctly and securely;</li>
              <li>Remember your preferences and settings;</li>
              <li>Understand how visitors interact with the website through aggregate, anonymised analytics;</li>
              <li>Measure the effectiveness of our marketing campaigns;</li>
              <li>Comply with legal and security obligations.</li>
            </ul>
            <p>We do <strong>not</strong> use cookies to build individual profiles for automated decision-making, to target advertising based on sensitive personal characteristics, or to sell data to third parties.</p>
          </S>

          <S id="c3" title="Categories of Cookies We Use" n={3}>
            <h3 className="font-display font-bold text-ink text-base mt-4 mb-2 flex items-center gap-2">
              <span className="size-5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">A</span>
              Strictly Necessary
            </h3>
            <p>Essential for the operation of the website. They enable core security functions, session management, and form submissions. These cookies cannot be disabled through our preference centre.</p>
            <CookieTable rows={STRICTLY_NECESSARY} />

            <h3 className="font-display font-bold text-ink text-base mt-6 mb-2 flex items-center gap-2">
              <span className="size-5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center">B</span>
              Analytics &amp; Performance
            </h3>
            <p>Help us understand how visitors interact with the website by collecting anonymised, aggregate information. No data is shared with Google in a way that identifies you personally under our implementation.</p>
            <CookieTable rows={ANALYTICS_COOKIES} />

            <h3 className="font-display font-bold text-ink text-base mt-6 mb-2 flex items-center gap-2">
              <span className="size-5 rounded bg-purple-100 text-purple-700 text-[10px] font-bold flex items-center justify-center">C</span>
              Functional
            </h3>
            <p>Enable enhanced functionality and personalisation. Disabling these may affect your experience but will not prevent core website use.</p>
            <CookieTable rows={FUNCTIONAL_COOKIES} />

            <h3 className="font-display font-bold text-ink text-base mt-6 mb-2 flex items-center gap-2">
              <span className="size-5 rounded bg-amber-100 text-amber-700 text-[10px] font-bold flex items-center justify-center">D</span>
              Marketing &amp; Advertising
            </h3>
            <p>Used to measure the effectiveness of advertising campaigns on third-party platforms. These cookies are only set with your explicit consent.</p>
            <CookieTable rows={MARKETING_COOKIES} />
          </S>

          <S id="c4" title="Your Cookie Preferences" n={4}>
            <p>You can manage your cookie preferences at any time using the preference centre below. Note that disabling certain cookies may affect website functionality.</p>
            <ConsentPanel />
          </S>

          <S id="c5" title="Browser-Level Controls" n={5}>
            <p>In addition to our preference centre, you can control and delete cookies through your browser settings. Most modern browsers allow you to:</p>
            <ul>
              <li>View all cookies stored on your device and delete them individually or all at once;</li>
              <li>Block third-party cookies;</li>
              <li>Block all cookies from specific websites;</li>
              <li>Block all cookies from being set.</li>
            </ul>
            <p>Note that if you block all cookies, you may not be able to access all or parts of our website. For browser-specific instructions:</p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Microsoft Edge</a></li>
            </ul>
          </S>

          <S id="c6" title="Opt-Out of Analytics" n={6}>
            <p>To opt out of Google Analytics tracking across all websites, you can install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Google Analytics Opt-out Browser Add-on</a>.</p>
            <p>For opt-out from interest-based advertising more broadly, you may use:</p>
            <ul>
              <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Your Online Choices (EU/UAE)</a></li>
              <li><a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">Digital Advertising Alliance (USA)</a></li>
            </ul>
          </S>

          <S id="c7" title="Updates to This Policy" n={7}>
            <p>We may update this Cookie Policy from time to time to reflect changes in the cookies we use, legal requirements, or our privacy practices. Material updates will be communicated by posting a revised Policy with an updated effective date. We may also display a cookie consent notice on the website if the nature of the cookies we use changes materially.</p>
          </S>

          <S id="c8" title="Contact" n={8}>
            <div className="bg-surface-tinted rounded-2xl border border-hairline p-6 mt-2">
              <p className="font-display font-bold text-ink text-base mb-1">{COMPANY.name}</p>
              <p className="text-ink/65 text-sm">{COMPANY.address}</p>
              <p className="text-ink/65 text-sm mt-3">Email: <a href={`mailto:${COMPANY.email}`} className="text-brand hover:underline">{COMPANY.email}</a></p>
              <p className="text-ink/65 text-sm">Phone: <a href={`tel:${COMPANY.phone}`} className="text-brand hover:underline">{COMPANY.phone}</a></p>
            </div>
          </S>

          <div className="mt-16 pt-8 border-t border-hairline flex flex-wrap gap-4 items-center justify-between">
            <p className="text-xs text-ink/40">Related legal documents:</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-sm font-semibold text-brand hover:underline">Privacy Policy →</Link>
              <Link to="/terms-of-service" className="text-sm font-semibold text-brand hover:underline">Terms of Service →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
