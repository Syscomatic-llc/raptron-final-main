import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Check,
  Clock,

  ArrowRight,
  User,
  Building2,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Field, SuccessState } from "./contact";
import { PhoneInput } from "@/components/ui/PhoneInput";

export const Route = createFileRoute("/book-consultation")({
  head: () => ({
    meta: [
      { title: "Book Consultation - RAPTRON" },
      {
        name: "description",
        content:
          "Book a free 45-minute strategy session with RAPTRON Digital Solutions.",
      },
    ],
  }),
  component: BookConsultationPage,
});

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const BENEFITS = [
  "45-minute focused strategy session",
  "Understand your current tech challenges",
  "Get a preliminary digital roadmap",
  "Zero commitment - just clarity",
];

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(1, "Required").refine((val) => {
    try {
      return isValidPhoneNumber(val);
    } catch {
      return false;
    }
  }, "Invalid phone number"),
  message: z.string().trim().max(2000).optional(),
});

function BookConsultationPage() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewMonth, setViewMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"pick" | "form" | "done">("pick");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const days = useMemo(() => buildMonthGrid(viewMonth), [viewMonth]);

  const onConfirm = (e: React.FormEvent<HTMLFormElement>) => {
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
    setStep("done");
  };

  return (
    <>
      {/* Orb animation keyframes */}
      <style>{`
        @keyframes orbFloat1 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-30px, 40px) scale(1.3); }
        }
        @keyframes orbFloat2 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(25px,-35px) scale(1.2); }
        }
        @keyframes orbFloat3 {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(-15px,-25px) scale(1.15); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <section className="pt-24 pb-16 min-h-screen bg-mist relative overflow-hidden">
        {/* Page-level ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">

          {/* Page header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-hairline shadow-sm mb-4">
              <Calendar size={13} className="text-brand" />
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-ink/70 font-semibold">
                Free Strategy Session
              </span>
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-ink">
              Book your consultation
            </h1>
            <p className="mt-3 text-ink/60 text-lg">
              45 minutes. No pitch. Just an honest roadmap for your business.
            </p>
          </div>

          {/* Card */}
          <div className="grid lg:grid-cols-[380px_1fr] rounded-[2.5rem] overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.14)] bg-white border border-white/60 min-h-[600px]">

            {/* ── Left panel ── */}
            <div className="relative bg-ink overflow-hidden p-10 flex flex-col justify-between">
              {/* Animated orbs */}
              <div
                className="absolute -top-24 -right-24 w-72 h-72 bg-brand/50 blur-[90px] rounded-full pointer-events-none"
                style={{ animation: "orbFloat1 7s ease-in-out infinite alternate" }}
              />
              <div
                className="absolute -bottom-28 -left-16 w-64 h-64 bg-brand-2/35 blur-[100px] rounded-full pointer-events-none"
                style={{ animation: "orbFloat2 9s ease-in-out infinite alternate" }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand/20 blur-[70px] rounded-full pointer-events-none"
                style={{ animation: "orbFloat3 11s ease-in-out infinite alternate" }}
              />
              {/* Dot grid */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none" />

              {/* Top content */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-white/80 mb-10">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-2 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-2" />
                  </span>
                  Available this month
                </div>

                <h2 className="font-display font-bold text-3xl lg:text-4xl text-white leading-tight">
                  Let's map your digital future.
                </h2>
                <p className="mt-4 text-white/50 text-sm leading-relaxed">
                  Our experts have helped 50+ companies modernise with ERP, AI,
                  and custom software. Your session is complimentary.
                </p>

                <ul className="mt-10 space-y-4">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span className="size-6 rounded-lg bg-brand/30 border border-brand/40 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-brand-2" />
                      </span>
                      <span className="text-white/80 text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom quote */}
              <div className="relative z-10 mt-10 pt-6 border-t border-white/10">
                <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.2em]">
                  No commitment. Just clarity.
                </p>
              </div>
            </div>

            {/* ── Right panel ── */}
            <div className="p-8 lg:p-10 bg-white">

              {/* Step: Pick date & time */}
              {step === "pick" && (
                <div className="h-full flex flex-col">
                  {/* Calendar header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-bold text-2xl text-ink flex items-center gap-2.5">
                      <span className="size-9 rounded-xl bg-brand/10 flex items-center justify-center">
                        <Calendar size={18} className="text-brand" />
                      </span>
                      Pick a date
                    </h2>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setViewMonth(
                            new Date(
                              viewMonth.getFullYear(),
                              viewMonth.getMonth() - 1,
                              1,
                            ),
                          )
                        }
                        className="size-9 rounded-full border border-hairline flex items-center justify-center hover:border-brand/40 hover:bg-surface-tinted transition"
                        aria-label="Previous month"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <div className="text-sm font-semibold w-32 text-center text-ink">
                        {viewMonth.toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <button
                        onClick={() =>
                          setViewMonth(
                            new Date(
                              viewMonth.getFullYear(),
                              viewMonth.getMonth() + 1,
                              1,
                            ),
                          )
                        }
                        className="size-9 rounded-full border border-hairline flex items-center justify-center hover:border-brand/40 hover:bg-surface-tinted transition"
                        aria-label="Next month"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Day-of-week labels */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                      <div
                        key={d}
                        className="font-mono text-[9px] uppercase tracking-widest text-ink/35 py-1"
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {days.map(({ date, currentMonth }, i) => {
                      const disabled =
                        !currentMonth ||
                        date < today ||
                        date.getDay() === 0 ||
                        date.getDay() === 6;
                      const isSelected =
                        selectedDate &&
                        date.toDateString() === selectedDate.toDateString();
                      const isToday =
                        date.toDateString() === today.toDateString();
                      return (
                        <button
                          key={i}
                          disabled={disabled}
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedSlot(null);
                          }}
                          className={`aspect-square rounded-xl text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? "bg-gradient-brand text-white shadow-card scale-105"
                              : disabled
                                ? "text-ink/20 cursor-not-allowed"
                                : isToday
                                  ? "ring-2 ring-brand/40 text-brand font-bold hover:bg-surface-tinted"
                                  : "text-ink hover:bg-surface-tinted hover:scale-105"
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time slots */}
                  <div
                    className={`mt-8 transition-all duration-300 ${selectedDate ? "opacity-100 translate-y-0" : "opacity-40 pointer-events-none translate-y-2"}`}
                  >
                    <h3 className="font-display font-bold text-lg text-ink flex items-center gap-2.5 mb-4">
                      <span className="size-9 rounded-xl bg-brand/10 flex items-center justify-center">
                        <Clock size={18} className="text-brand" />
                      </span>
                      Select a time
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`h-11 rounded-full text-sm font-semibold border transition-all duration-200 ${
                            selectedSlot === slot
                              ? "bg-gradient-brand text-white border-transparent shadow-card scale-105"
                              : "border-hairline text-ink/70 hover:border-brand/40 hover:text-brand hover:bg-surface-tinted hover:scale-105"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected summary pill */}
                  {selectedDate && selectedSlot && (
                    <div className="mt-6 px-4 py-3 rounded-2xl bg-surface-tinted border border-hairline flex items-center gap-3">
                      <Calendar size={15} className="text-brand shrink-0" />
                      <span className="text-sm text-ink font-medium">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                        <span className="text-brand font-bold"> · {selectedSlot}</span>
                      </span>
                    </div>
                  )}

                  <button
                    disabled={!selectedDate || !selectedSlot}
                    onClick={() => setStep("form")}
                    className="mt-6 w-full h-13 rounded-full bg-gradient-brand text-white font-semibold shadow-card hover:shadow-glow transition-all disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[15px]"
                  >
                    Continue <ArrowRight size={17} />
                  </button>
                </div>
              )}

              {/* Step: Form */}
              {step === "form" && selectedDate && selectedSlot && (
                <form onSubmit={onConfirm} className="space-y-4 h-full flex flex-col">
                  <button
                    type="button"
                    onClick={() => setStep("pick")}
                    className="text-sm font-medium text-ink/50 hover:text-brand inline-flex items-center gap-1 transition-colors"
                  >
                    <ChevronLeft size={14} /> Back
                  </button>

                  {/* Booking summary */}
                  <div className="rounded-2xl bg-ink text-white p-5 flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-brand opacity-30" />
                    <div className="relative z-10 size-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                      <Calendar size={18} className="text-white" />
                    </div>
                    <div className="relative z-10">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 mb-0.5">
                        Confirmed slot
                      </div>
                      <div className="font-display font-bold text-base text-white">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                        <span className="text-brand-2"> · {selectedSlot}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="grid sm:grid-cols-2 gap-4 flex-1">
                    <IconField name="name" label="Full Name" icon={User} error={errors.name} />
                    <IconField name="company" label="Company Name" icon={Building2} error={errors.company} />
                    <IconField name="email" label="Work Email" type="email" icon={Mail} error={errors.email} />
                    <PhoneInput
                      name="phone"
                      label="Phone"
                      placeholder="(555) 000-0000"
                      error={errors.phone}
                      labelClassName="font-medium text-xs text-ink/60 uppercase tracking-widest font-mono mb-1.5 block"
                      buttonClassName="bg-white border-hairline h-11"
                      inputClassName="bg-white h-11 border-hairline"
                    />
                  </div>
                  <IconField
                    name="message"
                    label="Brief requirement (optional)"
                    icon={MessageSquare}
                    textarea
                    error={errors.message}
                  />

                  <button
                    type="submit"
                    className="w-full h-13 rounded-full bg-gradient-brand text-white font-semibold shadow-card hover:shadow-glow transition-all flex items-center justify-center gap-2 text-[15px]"
                  >
                    <Check size={17} /> Confirm Booking
                  </button>
                </form>
              )}

              {/* Step: Done */}
              {step === "done" && (
                <SuccessState
                  title="You're booked."
                  text={`We've reserved ${selectedDate?.toLocaleDateString("en-US", { month: "long", day: "numeric" })} at ${selectedSlot}. A confirmation email is on its way.`}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Input field with leading icon, label and error */
function IconField({
  name,
  label,
  type = "text",
  icon: Icon,
  textarea,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  icon: React.ElementType;
  textarea?: boolean;
  error?: string;
}) {
  const base =
    "w-full bg-white border rounded-2xl text-sm text-ink placeholder-ink/30 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-medium text-xs text-ink/60 uppercase tracking-widest font-mono">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30 pointer-events-none">
          <Icon size={15} />
        </span>
        {textarea ? (
          <textarea
            name={name}
            rows={3}
            placeholder={label}
            className={`${base} pl-10 pr-4 py-3 resize-none ${error ? "border-red-400" : "border-hairline"}`}
          />
        ) : (
          <input
            name={name}
            type={type}
            placeholder={label}
            className={`${base} pl-10 pr-4 h-11 ${error ? "border-red-400" : "border-hairline"}`}
          />
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function buildMonthGrid(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDow = first.getDay();
  const start = new Date(first);
  start.setDate(first.getDate() - startDow);
  const out: { date: Date; currentMonth: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    d.setHours(0, 0, 0, 0);
    out.push({ date: d, currentMonth: d.getMonth() === month.getMonth() });
  }
  return out;
}
