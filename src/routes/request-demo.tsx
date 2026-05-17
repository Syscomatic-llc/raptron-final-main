import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  User,
  Globe,
  Mail,
  Phone,
  Building2,
  Pencil,
  Check,
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Info,
  Workflow,
  LineChart,
  Package,
  Users,
  BarChart3,
  Receipt,
  AlertCircle,
} from "lucide-react";
import { z } from "zod";
import { SuccessState } from "./contact";
import { INDUSTRIES } from "@/lib/constants";

export const Route = createFileRoute("/request-demo")({
  head: () => ({
    meta: [
      { title: "Request an ERP One Demo - RAPTRON" },
      {
        name: "description",
        content:
          "See RAPTRON ERP One in action. Request a personalized demo tailored to your industry and business workflows.",
      },
    ],
  }),
  component: RequestDemoPage,
});

const ERP_MODULES = [
  { id: "accounting", label: "Accounting & Finance", icon: Receipt },
  { id: "inventory", label: "Inventory & Warehousing", icon: Package },
  { id: "hr-payroll", label: "HR & Payroll", icon: Users },
  { id: "crm", label: "CRM & Sales", icon: Workflow },
  { id: "reporting", label: "Reports & Dashboards", icon: BarChart3 },
  { id: "compliance", label: "VAT & Compliance", icon: LineChart },
];

const NON_DEMO_SERVICES = [
  "Operational Automation",
  "AI Agents",
  "Growth Strategy",
  "Custom Software Development",
];

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  industry: z.string().trim().max(100).optional().or(z.literal("")),
  size: z.string().trim().optional().or(z.literal("")),
  requirements: z.string().trim().max(2000).optional().or(z.literal("")),
});

function RequestDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  // Simple math captcha
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 1;
    return { a, b, answer: a + b };
  }, []);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    if (Number(captchaInput) !== captcha.answer) {
      setCaptchaError("Please answer the verification correctly.");
      return;
    }
    setCaptchaError("");

    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((iss) => {
        errs[String(iss.path[0])] = iss.message;
      });
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-20 lg:pb-28 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Non-demo notice banner */}
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex gap-3 items-start shadow-sm">
          <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-0.5">
              Demo available for ERP One only
            </p>
            <p className="text-xs text-amber-700 leading-relaxed">
              Live demos are currently offered exclusively for{" "}
              <strong>RAPTRON ERP One</strong>. Our other services —{" "}
              {NON_DEMO_SERVICES.join(", ")} — are delivered through a
              structured{" "}
              <Link
                to="/book-consultation"
                className="underline hover:text-amber-900 transition-colors font-semibold"
              >
                free consultation
              </Link>
              , not a product demo.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border border-hairline overflow-hidden flex flex-col lg:flex-row items-stretch">
          {/* Left panel: ERP One Brand Experience */}
          <div className="relative overflow-hidden bg-brand-deep text-white flex flex-col w-full lg:w-5/12 xl:w-[45%] shrink-0">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-brand opacity-20 mix-blend-screen pointer-events-none"></div>
            <div className="absolute inset-0 bg-dot-grid opacity-30 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-2/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            <div className="relative z-10 flex-1 flex flex-col p-8 sm:p-10 lg:p-14">
              {/* Logo Section */}
              <div className="mb-6 lg:mb-8 -mt-6 lg:-mt-10">
                <img
                  src="/logo.png"
                  alt="RAPTRON Logo"
                  className="h-20 w-auto scale-[1.5] origin-left filter drop-shadow-lg brightness-0 invert"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono uppercase tracking-widest mb-6 w-max">
                  <PlayCircle size={14} className="text-brand-2" />
                  <span>ERP One — Live Demo</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-white">
                  See ERP One <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-mist to-brand-2">
                    in action.
                  </span>
                </h1>
                <p className="text-xl text-white/90 italic font-medium mb-6">
                  One system. Every function. Zero compromise.
                </p>
                <p className="text-white/70 text-lg max-w-md font-sans leading-relaxed">
                  RAPTRON ERP One unifies your accounting, operations,
                  inventory, HR, and compliance into a single intelligent
                  platform — built for UAE businesses.
                </p>
              </div>

              <div className="mt-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">
                <div className="font-mono text-[11px] uppercase tracking-widest text-white mb-6">
                  What your demo covers
                </div>
                <ul className="space-y-4">
                  {[
                    "Tailored to your industry and company size",
                    "Live walkthrough of ERP One modules relevant to you",
                    "Real workflows — not slide decks",
                    "Q&A with an ERP specialist at the end",
                  ].map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 text-white/80 text-sm md:text-base group"
                    >
                      <span className="size-6 rounded-full bg-brand/30 border border-brand/50 text-white flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-brand transition-all">
                        <Check size={14} />
                      </span>
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right panel: Premium Form */}
          <div className="flex-1 flex flex-col justify-center bg-white relative z-10">
            <div className="p-8 sm:p-10 lg:p-12 xl:p-14 relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 w-72 h-72 bg-surface-tinted rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              {submitted ? (
                <div className="m-auto">
                  <SuccessState />
                </div>
              ) : (
                <div className="relative z-10 flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="mb-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand/8 border border-brand/15 text-brand text-xs font-semibold mb-3">
                      <Info size={12} />
                      ERP One Demo Request
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-ink mb-2">
                      Book your personalized walkthrough
                    </h2>
                    <p className="text-ink/60 text-sm lg:text-base">
                      Tell us a bit about your business and we'll prepare a demo
                      focused on what matters most to you.
                    </p>
                  </div>

                  <form
                    onSubmit={onSubmit}
                    className="grid sm:grid-cols-2 gap-x-5 gap-y-4"
                  >
                    <IconField
                      name="name"
                      label="Full name"
                      placeholder="John Doe"
                      icon={User}
                      error={errors.name}
                      required
                    />
                    <IconField
                      name="website"
                      label="Company website (optional)"
                      placeholder="acme.com"
                      icon={Globe}
                      error={errors.website}
                    />
                    <IconField
                      name="email"
                      label="Work email"
                      type="email"
                      placeholder="john@acme.com"
                      icon={Mail}
                      error={errors.email}
                      required
                    />
                    <IconField
                      name="phone"
                      label="Phone number (optional)"
                      type="tel"
                      placeholder="+971 50 000 0000"
                      icon={Phone}
                      error={errors.phone}
                    />

                    <IconSelect
                      name="industry"
                      label="Your industry (optional)"
                      icon={Building2}
                      error={errors.industry}
                      options={[...INDUSTRIES.map((i) => i.name), "Other"]}
                    />
                    <IconSelect
                      name="size"
                      label="Company size (optional)"
                      icon={Building2}
                      error={errors.size}
                      options={["1–10", "11–50", "51–200", "201–500", "500+"]}
                    />

                    {/* ERP Module Selector */}
                    <div className="sm:col-span-2">
                      <span className="block text-xs font-semibold text-ink/80 mb-2">
                        Which ERP modules interest you most?{" "}
                        <span className="text-ink/40 font-normal">
                          (select all that apply)
                        </span>
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {ERP_MODULES.map(({ id, label, icon: Icon }) => {
                          const active = selectedModules.includes(id);
                          return (
                            <button
                              key={id}
                              type="button"
                              onClick={() => toggleModule(id)}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 text-left ${
                                active
                                  ? "bg-brand text-white border-brand shadow-sm"
                                  : "bg-ink/5 border-transparent text-ink/70 hover:bg-ink/10 hover:text-ink"
                              }`}
                            >
                              <Icon size={13} className="shrink-0" />
                              <span className="leading-tight">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {/* Hidden input to carry selected modules */}
                      <input
                        type="hidden"
                        name="modules"
                        value={selectedModules.join(", ")}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <IconField
                        name="requirements"
                        label="Anything specific you'd like to see? (optional)"
                        placeholder="e.g. multi-branch inventory, payroll for 80 staff, UAE VAT filing…"
                        icon={Pencil}
                        textarea
                        error={errors.requirements}
                      />
                    </div>

                    <div className="sm:col-span-2 relative overflow-hidden bg-gradient-to-r from-surface-tinted/50 to-white p-5 rounded-2xl border border-brand/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 group hover:border-brand/40 transition-colors">
                      <div className="absolute -right-4 -top-4 text-brand/5 pointer-events-none group-hover:scale-110 transition-transform duration-500 group-hover:text-brand/10 transform rotate-12">
                        <ShieldCheck size={100} />
                      </div>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="size-11 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 shadow-inner">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <span className="block text-[13px] font-bold uppercase tracking-wider text-ink mb-0.5">
                            Security check
                          </span>
                          <span className="block text-sm text-ink/60 font-medium">
                            Please solve:{" "}
                            <strong className="text-brand text-base ml-1">
                              {captcha.a} + {captcha.b}
                            </strong>
                          </span>
                        </div>
                      </div>
                      <div className="relative z-10">
                        <input
                          type="text"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          placeholder="="
                          className="w-full sm:w-24 h-12 rounded-xl bg-white border border-hairline px-4 text-center font-display font-bold text-xl text-ink outline-none transition-all focus:border-brand focus:ring-4 focus:ring-brand/20 shadow-sm hover:border-brand/50"
                        />
                        {captchaError && (
                          <span className="absolute -bottom-6 right-0 text-[11px] font-semibold text-destructive whitespace-nowrap bg-white px-2 py-0.5 rounded shadow-sm border border-destructive/20">
                            {captchaError}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 mt-2 pt-4 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs text-ink/50 max-w-[220px] text-center sm:text-left">
                        By clicking Request Demo, you agree to our{" "}
                        <a
                          href="/privacy-policy"
                          className="underline hover:text-brand transition-colors"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink text-white font-semibold overflow-hidden transition-all hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
                      >
                        <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center gap-2 text-sm">
                          {isSubmitting ? "Submitting…" : "Request ERP Demo"}
                          {!isSubmitting && (
                            <ArrowRight
                              size={16}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom info strip */}
        <div className="mt-6 text-center text-xs text-ink/45 leading-relaxed">
          Looking for a consultation on Operational Automation, AI Agents,
          Growth Strategy, or Custom Software?{" "}
          <Link
            to="/book-consultation"
            className="text-brand font-semibold hover:underline"
          >
            Book a free consultation instead →
          </Link>
        </div>
      </div>
    </div>
  );
}

function IconField({
  name,
  label,
  placeholder,
  icon: Icon,
  type = "text",
  textarea,
  error,
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  icon: typeof User;
  type?: string;
  textarea?: boolean;
  error?: string;
  required?: boolean;
}) {
  const baseClasses =
    "w-full rounded-2xl bg-ink/5 border-2 border-transparent pl-11 pr-4 text-sm text-ink placeholder:text-ink/40 outline-none transition-all duration-300 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/10 hover:bg-ink/10";
  const inputClasses = `${baseClasses} h-12`;
  const textareaClasses = `${baseClasses} py-3 min-h-[90px] resize-y`;

  return (
    <label className="block relative group">
      <span className="block text-xs font-semibold text-ink/80 mb-1.5 transition-colors group-focus-within:text-brand">
        {label}{required && <span className="text-brand ml-0.5">*</span>}
      </span>
      <div className="relative">
        <Icon
          size={16}
          className={`absolute left-3.5 ${textarea ? "top-3.5" : "top-1/2 -translate-y-1/2"} text-ink/40 transition-colors group-focus-within:text-brand`}
        />
        {textarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            className={`${textareaClasses} ${error ? "!border-destructive !bg-destructive/5 focus:!ring-destructive/10" : ""}`}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={`${inputClasses} ${error ? "!border-destructive !bg-destructive/5 focus:!ring-destructive/10" : ""}`}
          />
        )}
      </div>
      {error && (
        <span className="absolute -bottom-4 left-1 text-[10px] font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </label>
  );
}

function IconSelect({
  name,
  label,
  icon: Icon,
  options,
  error,
}: {
  name: string;
  label: string;
  icon: typeof User;
  options: string[];
  error?: string;
}) {
  const cls = `w-full appearance-none rounded-2xl bg-ink/5 border-2 border-transparent pl-11 pr-10 h-12 text-sm text-ink outline-none transition-all duration-300 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/10 hover:bg-ink/10 ${error ? "!border-destructive !bg-destructive/5 focus:!ring-destructive/10" : ""}`;
  return (
    <label className="block relative group">
      <span className="block text-xs font-semibold text-ink/80 mb-1.5 transition-colors group-focus-within:text-brand">
        {label}
      </span>
      <div className="relative">
        <Icon
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40 transition-colors group-focus-within:text-brand pointer-events-none"
        />
        <select name={name} defaultValue="" className={cls}>
          <option value="" disabled className="text-ink/50">
            Select an option
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none transition-transform group-hover:translate-y-0.5"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {error && (
        <span className="absolute -bottom-5 left-1 text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </label>
  );
}
