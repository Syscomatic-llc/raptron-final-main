import { Link } from "@tanstack/react-router";
import { ArrowLeft, SearchX } from "lucide-react";

export function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mist px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="text-center relative z-10 max-w-lg mx-auto">
        <div className="size-20 rounded-3xl bg-brand/10 text-brand flex items-center justify-center mx-auto mb-8 border border-brand/20 shadow-sm animate-in fade-in zoom-in duration-500">
          <SearchX size={36} />
        </div>

        <h1 className="font-display font-extrabold text-7xl md:text-8xl text-ink tracking-tighter mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          404
        </h1>

        <h2 className="text-2xl font-bold text-ink mb-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Page not found
        </h2>

        <p className="text-ink/60 mb-10 text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          We couldn't find the page you're looking for. It might have been moved
          or doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-brand text-white font-semibold hover:bg-brand-2 transition-colors duration-300 shadow-lg shadow-brand/25 hover:shadow-brand/40 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
        >
          <ArrowLeft size={18} />
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
