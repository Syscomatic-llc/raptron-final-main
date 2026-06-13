import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";
import { getConsent, setConsent } from "@/lib/cookies";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = getConsent();
    if (!consent) {
      // Small delay for entrance effect
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setConsent({ analytics: true, functional: true, marketing: true });
    setShow(false);
  };

  const handleRejectAll = () => {
    setConsent({ analytics: false, functional: false, marketing: false });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md bg-white/90 border border-hairline rounded-3xl p-6 shadow-2xl backdrop-blur-md z-[100] animate-in slide-in-from-bottom-8 fade-in duration-500 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <div className="size-10 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
          <Cookie size={20} className="text-brand" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-display font-bold text-ink text-sm">
              We value your privacy
            </h4>
            <button
              onClick={() => setShow(false)}
              className="text-ink/30 hover:text-ink/65 transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-ink/60 mt-2 leading-relaxed">
            We use cookies to enhance your browsing experience, serve
            personalized content, and analyze our traffic in accordance with the
            UAE PDPL. View our{" "}
            <Link
              to="/cookie-policy"
              className="text-brand font-semibold hover:underline"
            >
              Cookie Policy
            </Link>{" "}
            for details.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 justify-end">
        <button
          onClick={handleRejectAll}
          className="h-9 px-4 rounded-full border border-hairline text-xs font-semibold text-ink/75 hover:border-ink/30 hover:text-ink transition-all hover:bg-zinc-50 cursor-pointer"
        >
          Reject All
        </button>
        <Link
          to="/cookie-policy"
          onClick={() => setShow(false)}
          className="inline-flex items-center justify-center h-9 px-4 rounded-full border border-hairline text-xs font-semibold text-ink/75 hover:border-ink/30 hover:text-ink transition-all hover:bg-zinc-50 cursor-pointer"
        >
          Customize
        </Link>
        <button
          onClick={handleAcceptAll}
          className="h-9 px-4 rounded-full bg-ink text-white hover:bg-ink/90 text-xs font-semibold shadow-sm hover:shadow transition-all hover:scale-102 cursor-pointer"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
