import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Check,
  Send,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { COMPANY } from "@/lib/constants";
import { PhoneInput } from "@/components/ui/PhoneInput";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - RAPTRON Digital Solutions" },
      {
        name: "description",
        content:
          "Let's start a conversation about your operations, your systems, and your roadmap.",
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  company: z.string().trim().min(1, "Required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Required").refine((val) => {
    try {
      return isValidPhoneNumber(val);
    } catch {
      return false;
    }
  }, "Invalid phone number"),
  subject: z.string().trim().min(1, "Required").max(150),
  message: z.string().trim().min(1, "Required").max(2000),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
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

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 lg:pt-32 lg:pb-28 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Premium Dark Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-brand-deep text-white p-8 sm:p-10 lg:p-12 shadow-2xl">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-brand opacity-20 mix-blend-screen pointer-events-none"></div>
            <div className="absolute inset-0 bg-dot-grid opacity-30 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-2/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

            <div className="relative z-10 h-full flex flex-col justify-between min-h-[500px] lg:min-h-[600px]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono uppercase tracking-widest mb-8">
                  <MessageCircle size={14} className="text-brand-2" />
                  <span>Get in Touch</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
                  Let's build
                  <br />
                  something
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-mist to-brand-3">
                    exceptional.
                  </span>
                </h1>

                <p className="text-white/70 text-lg max-w-md font-sans mb-8">
                  Whether you need a complete ERP overhaul or a cutting-edge AI
                  implementation, we're ready to accelerate your business.
                </p>
              </div>

              <div className="mt-12 lg:mt-0 space-y-6">
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 space-y-4">
                  <ContactRow icon={Mail} label="Email" value={COMPANY.email} />
                  <ContactRow
                    icon={Phone}
                    label="Phone"
                    value={COMPANY.phone}
                  />
                  <ContactRow
                    icon={MapPin}
                    label="Location"
                    value={COMPANY.address}
                  />
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/50 text-sm font-mono uppercase tracking-widest">
                    Follow Us
                  </span>
                  <div className="flex items-center gap-3">
                    {[
                      { Icon: Linkedin, label: "LinkedIn" },
                      { Icon: Twitter, label: "Twitter" },
                      { Icon: Facebook, label: "Facebook" },
                    ].map(({ Icon, label }) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={`Follow us on ${label}`}
                        className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-brand transition-all hover:scale-110 hover:shadow-glow"
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] p-8 sm:p-10 lg:p-14 shadow-lift border border-hairline relative overflow-hidden">
              {/* Form background accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-surface-tinted rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              {submitted ? (
                <SuccessState onReset={() => setSubmitted(false)} />
              ) : (
                <div className="relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div className="mb-10">
                    <h2 className="font-display text-3xl font-bold text-ink mb-3">
                      Send a message
                    </h2>
                    <p className="text-ink/60 text-lg">
                      Fill out the form below and our team will get back to you
                      within 24 hours.
                    </p>
                  </div>

                  <form
                    onSubmit={onSubmit}
                    className="grid sm:grid-cols-2 gap-x-6 gap-y-8"
                  >
                    <Field
                      name="name"
                      label="Full Name"
                      placeholder="John Doe"
                      error={errors.name}
                    />
                    <Field
                      name="company"
                      label="Company Name"
                      placeholder="Acme Corp"
                      error={errors.company}
                    />
                    <Field
                      name="email"
                      label="Work Email"
                      type="email"
                      placeholder="john@example.com"
                      error={errors.email}
                    />
                    <PhoneInput
                      name="phone"
                      label="Phone Number"
                      placeholder="(555) 000-0000"
                      error={errors.phone}
                      labelClassName="block text-sm font-semibold text-ink/80 mb-2 transition-colors group-focus-within:text-brand"
                      buttonClassName="bg-zinc-100 hover:bg-zinc-50 border-2 border-transparent text-ink placeholder:text-ink/30 h-14"
                      inputClassName="bg-zinc-100 hover:bg-zinc-50 h-14"
                    />

                    <div className="sm:col-span-2">
                      <Field
                        name="subject"
                        label="Subject"
                        placeholder="How can we help you?"
                        error={errors.subject}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Field
                        name="message"
                        label="Message"
                        placeholder="Tell us about your project goals, timeline, and requirements..."
                        textarea
                        error={errors.message}
                      />
                    </div>

                    <div className="sm:col-span-2 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-ink text-white font-semibold overflow-hidden transition-all hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? "Sending..." : "Send Message"}
                          {!isSubmitting && (
                            <ArrowRight
                              size={18}
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
      </div>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 group cursor-default">
      <div className="size-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand transition-all duration-300">
        <Icon
          size={16}
          className="text-white group-hover:text-white transition-colors"
        />
      </div>
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-0.5">
          {label}
        </div>
        <div className="text-sm font-medium text-white/90">{value}</div>
      </div>
    </div>
  );
}

export function Field({
  name,
  label,
  type = "text",
  placeholder,
  textarea,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  error?: string;
}) {
  const baseClasses =
    "w-full rounded-2xl bg-zinc-100 border-2 border-transparent px-5 text-ink placeholder:text-ink/30 outline-none transition-all duration-300 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/10 hover:bg-zinc-50";
  const inputClasses = `${baseClasses} h-14`;
  const textareaClasses = `${baseClasses} py-4 min-h-[160px] resize-y`;

  return (
    <label className="block relative group">
      <span className="block text-sm font-semibold text-ink/80 mb-2 transition-colors group-focus-within:text-brand">
        {label}
      </span>
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
      {error && (
        <span className="absolute -bottom-6 left-1 text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </label>
  );
}

export function SuccessState({
  title = "Message Sent",
  text = "Thank you for reaching out. Our team has received your message and will be in touch shortly.",
  onReset,
}: {
  title?: string;
  text?: string;
  onReset?: () => void;
}) {
  return (
    <div className="text-center py-20 px-6 animate-in zoom-in-95 duration-500">
      <div className="relative mx-auto size-28 mb-8">
        <div className="absolute inset-0 bg-brand/20 rounded-full animate-ping"></div>
        <div className="relative z-10 size-full rounded-full bg-gradient-brand text-white flex items-center justify-center shadow-glow animate-float">
          <Check size={48} strokeWidth={3} />
        </div>
      </div>
      <h3 className="font-display font-bold text-4xl text-ink mb-4">{title}</h3>
      <p className="text-ink/60 text-lg max-w-sm mx-auto leading-relaxed">
        {text}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-10 text-brand font-semibold hover:text-brand-2 transition-colors underline underline-offset-4"
        >
          Send another message
        </button>
      )}
    </div>
  );
}
