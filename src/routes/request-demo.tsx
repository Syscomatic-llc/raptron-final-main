import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { findOrCreatePartner, findOrCreateTag, createLead } from "@/lib/odoo";
import {
  User,
  Globe,
  Mail,
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
import { isValidPhoneNumber } from "libphonenumber-js";
import { SuccessState } from "./contact";
import { INDUSTRIES } from "@/lib/constants";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { useLoadingMessage } from "@/hooks/useLoadingMessage";

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
  company: z.string().trim().min(1, "Required").max(120),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val) return true;
      try {
        return isValidPhoneNumber(val);
      } catch {
        return false;
      }
    }, "Invalid phone number"),
  industry: z.string().trim().max(100).optional().or(z.literal("")),
  size: z.string().trim().optional().or(z.literal("")),
  requirements: z.string().trim().max(2000).optional().or(z.literal("")),
});

function RequestDemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadingMessage = useLoadingMessage([
    "Preparing request...",
    "Gathering information...",
    "Routing to specialists...",
    "Almost there..."
  ], isSubmitting);

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
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
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
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const {
        name,
        company,
        email,
        phone,
        website,
        industry,
        size,
        requirements,
      } = result.data;

      const modules = selectedModules
        .map((m) => {
          const mod = ERP_MODULES.find((em) => em.id === m);
          return mod ? mod.label : m;
        })
        .join(", ");

      const partnerId = await findOrCreatePartner(name, email, phone);

      let tagIds: [number, boolean, number[]][] = [];
      if (industry) {
        const tagId = await findOrCreateTag(industry);
        if (tagId) tagIds = [[6, false, [tagId]]];
      }

      const description = [
        `<p>Company Size: ${size || "Not provided"}</p>`,
        `<p>ERP Modules of Interest: ${modules || "None selected"}</p>`,
        `<p>Specific Requirements: ${requirements || "None specified"}</p>`,
      ].join("");

      await createLead({
        name: `ERP Demo Request: ${company}`,
        partner_id: partnerId,
        contact_name: name,
        email_from: email,
        phone: phone || "",
        partner_name: company,
        website: website || "",
        tag_ids: tagIds,
        description,
      });

      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong submitting your request. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24 pb-20 lg:pb-28 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Non-demo notice banner */}
        <div className="mb-6 bg-brand/5 border border-brand/20 rounded-2xl px-5 py-4 flex gap-3 items-start shadow-sm">
          <AlertCircle size={18} className="text-brand shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-ink mb-0.5">
              Odoo ERP Implementation Demo
            </p>
            <p className="text-xs text-ink/70 leading-relaxed">
              Raptron provides world-class <strong>Odoo ERP</strong> implementations driven by expert consulting and strategy tailored to your industry standards. See how we can transform your business processes.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] rounded-2xl overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.12)] bg-white border border-hairline">
          {/* Left panel: ERP One Brand Experience */}
          <div className="relative overflow-hidden bg-brand-deep text-white flex flex-col shrink-0">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-brand opacity-20 mix-blend-screen pointer-events-none"></div>
            <div className="absolute inset-0 bg-dot-grid opacity-30 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-2/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            <div className="relative z-10 flex-1 flex flex-col p-8">
              <div className="mb-2 lg:mb-4 -mt-2 shrink-0">
                <img
                  src="/logo.png"
                  alt="RAPTRON Logo"
                  className="h-24 md:h-32 lg:h-40 w-auto object-contain origin-left filter drop-shadow-lg brightness-0 invert"
                />
              </div>

              <div className="flex flex-col shrink-0 mt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest mb-4 w-max">
                  <PlayCircle size={12} className="text-brand-2" />
                  <span>Odoo ERP - Live Demo</span>
                </div>

                <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight mb-4 text-white">
                  See Odoo <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-mist to-brand-2">
                    in action.
                  </span>
                </h1>
                <p className="text-white/70 text-sm font-sans leading-relaxed">
                  We don't just sell software; we implement Odoo to perfection. Get expert consulting, strategic insights, and advice tailored to your specific business needs and industry standards.
                </p>
              </div>

              <div className="mt-auto pt-8">
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white mb-4">
                    What your demo covers
                  </div>
                <ul className="space-y-3">
                  {[
                    "Strategic advice tailored to your industry",
                    "Live walkthrough of relevant Odoo modules",
                    "Implementation planning and consulting",
                    "Q&A with an Odoo specialist",
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
          </div>

          {/* Right panel: Premium Form */}
          <div className="flex-1 flex flex-col justify-center bg-white relative z-10">
            <div className="p-6 lg:p-8 relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 right-0 w-72 h-72 bg-surface-tinted rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              {submitted ? (
                <div className="m-auto">
                  <SuccessState />
                </div>
              ) : (
                <div className="relative z-10 flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand/8 border border-brand/15 text-brand text-[10px] font-semibold mb-2">
                      <Info size={10} />
                      Odoo Implementation Demo
                    </div>
                    <h2 className="font-display text-xl font-bold text-ink mb-1">
                      Book your personalized walkthrough
                    </h2>
                    <p className="text-ink/60 text-xs">
                      Tell us a bit about your business and we'll prepare a demo
                      focused on what matters most to you.
                    </p>
                  </div>

                  <form
                    onSubmit={onSubmit}
                    className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3"
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
                      name="company"
                      label="Company name"
                      placeholder="Acme Corp"
                      icon={Building2}
                      error={errors.company}
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
                    <PhoneInput
                      name="phone"
                      label="Phone number (optional)"
                      placeholder="(555) 000-0000"
                      error={errors.phone}
                      labelClassName="block text-xs font-semibold text-ink/80 mb-1.5 transition-colors group-focus-within:text-brand"
                      buttonClassName="bg-ink/5 hover:bg-ink/10 border-transparent h-11"
                      inputClassName="bg-ink/5 hover:bg-ink/10 h-11 border-transparent"
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

                    {/* Odoo Module Selector */}
                    <div className="sm:col-span-2 md:col-span-3 mt-1">
                      <span className="block text-xs font-semibold text-ink/80 mb-2">
                        Which Odoo modules interest you most?{" "}
                        <span className="text-ink/40 font-normal">
                          (select all that apply)
                        </span>
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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

                    <div className="sm:col-span-2 md:col-span-3">
                      <IconField
                        name="requirements"
                        label="Anything specific you'd like to see? (optional)"
                        placeholder="e.g. multi-branch inventory, payroll for 80 staff, UAE VAT filing…"
                        icon={Pencil}
                        textarea
                        error={errors.requirements}
                      />
                    </div>

                    <div className="sm:col-span-2 md:col-span-3 relative overflow-hidden bg-gradient-to-r from-surface-tinted/50 to-white p-3 rounded-xl border border-brand/20 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1 group hover:border-brand/40 transition-colors">
                      <div className="absolute -right-4 -top-4 text-brand/5 pointer-events-none group-hover:scale-110 transition-transform duration-500 group-hover:text-brand/10 transform rotate-12">
                        <ShieldCheck size={80} />
                      </div>
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="size-9 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0 shadow-inner">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <span className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-0.5">
                            Security check
                          </span>
                          <span className="block text-xs text-ink/60 font-medium">
                            Please solve:{" "}
                            <strong className="text-brand text-sm ml-1">
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
                          className="w-full sm:w-20 h-10 rounded-lg bg-white border border-hairline px-3 text-center font-display font-bold text-lg text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20 shadow-sm hover:border-brand/50"
                        />
                        {captchaError && (
                          <span className="absolute -bottom-5 right-0 text-[10px] font-semibold text-destructive whitespace-nowrap bg-white px-2 py-0.5 rounded shadow-sm border border-destructive/20">
                            {captchaError}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 md:col-span-3 mt-1 pt-3 border-t border-hairline flex flex-col gap-3">
                      {submitError && (
                        <div className="flex items-start gap-3 p-4 rounded-2xl bg-destructive/5 border border-destructive/20 text-destructive text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <span>{submitError}</span>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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
                          className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-8 rounded-full bg-ink text-white font-semibold overflow-hidden transition-all hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
                        >
                          <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative z-10 flex items-center gap-2 text-sm">
                            {isSubmitting ? loadingMessage : "Request Odoo Demo"}
                            {!isSubmitting && (
                              <ArrowRight
                                size={16}
                                className="group-hover:translate-x-1 transition-transform"
                              />
                            )}
                          </span>
                        </button>
                      </div>
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
  const inputClasses = `${baseClasses} h-11`;
  const textareaClasses = `${baseClasses} py-2.5 min-h-[70px] resize-y`;

  return (
    <label className="block relative group">
      <span className="block text-xs font-semibold text-ink/80 mb-1.5 transition-colors group-focus-within:text-brand">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
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
  const cls = `w-full appearance-none rounded-2xl bg-ink/5 border-2 border-transparent pl-11 pr-10 h-11 text-sm text-ink outline-none transition-all duration-300 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/10 hover:bg-ink/10 ${error ? "!border-destructive !bg-destructive/5 focus:!ring-destructive/10" : ""}`;
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
