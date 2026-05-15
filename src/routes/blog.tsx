import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Workflow,
  BrainCircuit,
  LineChart,
  TrendingUp,
  Code2,
  Tag,
  ChevronRight,
} from "lucide-react";
import { CTABanner } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog - RAPTRON Digital Solutions" },
      {
        name: "description",
        content:
          "Practical insights on automation, AI, finance compliance, and growth strategy for modern businesses in the UAE and beyond.",
      },
    ],
  }),
  component: BlogPage,
});

const CATEGORIES = ["All", "Automation", "Finance & Tax", "AI", "Strategy", "Software"];

const POSTS = [
  {
    slug: "automate-accounts-payable",
    category: "Automation",
    categoryIcon: Workflow,
    readTime: "7 min read",
    date: "May 12, 2026",
    title: "How to Automate Your Accounts Payable Process Without an ERP",
    excerpt:
      "Most businesses assume AP automation requires a full ERP implementation. It doesn't. Here's a practical, tool-agnostic approach to eliminating manual invoice processing - starting this week.",
    featured: true,
  },
  {
    slug: "uae-corporate-tax-checklist",
    category: "Finance & Tax",
    categoryIcon: LineChart,
    readTime: "5 min read",
    date: "May 8, 2026",
    title: "The UAE Corporate Tax Readiness Checklist for SMEs",
    excerpt:
      "UAE CT is in effect. If your books aren't structured correctly, your first filing will be a problem. We've put together the checklist every SME needs to work through before their first filing date.",
    featured: false,
  },
  {
    slug: "ai-agents-operations",
    category: "AI",
    categoryIcon: BrainCircuit,
    readTime: "9 min read",
    date: "May 3, 2026",
    title: "AI Agents in Business Operations: What Actually Works in 2026",
    excerpt:
      "Beyond the hype - a practical breakdown of which operational tasks are genuinely ready for AI agents today, which need more maturity, and how to evaluate ROI before you build anything.",
    featured: false,
  },
  {
    slug: "growth-strategy-positioning",
    category: "Strategy",
    categoryIcon: TrendingUp,
    readTime: "6 min read",
    date: "Apr 28, 2026",
    title: "Why Most SME Growth Plans Fail (And What to Do Instead)",
    excerpt:
      "The #1 mistake businesses make when building a growth plan is starting with tactics. Before you touch marketing or sales, you need to know exactly who you're for - and who you're not.",
    featured: false,
  },
  {
    slug: "saas-vs-custom-software",
    category: "Software",
    categoryIcon: Code2,
    readTime: "8 min read",
    date: "Apr 22, 2026",
    title: "SaaS vs Custom Software: When to Build and When to Buy",
    excerpt:
      "The answer isn't always 'build custom.' But it's also not always 'use SaaS.' Here's the decision framework we use with every client before recommending a direction.",
    featured: false,
  },
  {
    slug: "vat-filing-mistakes",
    category: "Finance & Tax",
    categoryIcon: LineChart,
    readTime: "4 min read",
    date: "Apr 15, 2026",
    title: "5 VAT Filing Mistakes UAE Businesses Keep Making",
    excerpt:
      "After reviewing dozens of VAT returns, the same errors appear again and again. Here are the five most costly mistakes - and how to avoid each one before your next filing deadline.",
    featured: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Automation: "text-violet-400 bg-violet-500/15 border-violet-500/20",
  "Finance & Tax": "text-emerald-400 bg-emerald-500/15 border-emerald-500/20",
  AI: "text-brand-2 bg-brand-2/15 border-brand-2/20",
  Strategy: "text-amber-400 bg-amber-500/15 border-amber-500/20",
  Software: "text-sky-400 bg-sky-500/15 border-sky-500/20",
};

const CATEGORY_COLORS_LIGHT: Record<string, string> = {
  Automation: "text-violet-600 bg-violet-50 border-violet-200",
  "Finance & Tax": "text-emerald-700 bg-emerald-50 border-emerald-200",
  AI: "text-brand bg-brand/8 border-brand/20",
  Strategy: "text-amber-700 bg-amber-50 border-amber-200",
  Software: "text-sky-700 bg-sky-50 border-sky-200",
};

function BlogPage() {
  return (
    <main className="w-full bg-white overflow-x-hidden">
      <Hero />
      <FeaturedPost />
      <PostGrid />
      <CTABanner />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative pt-36 pb-24 bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:18px_18px]" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-brand-2/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 mb-8">
            <BookOpen size={13} className="text-brand-2" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-white/60 font-semibold">
              Insights & Ideas
            </span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white max-w-4xl">
            Think before you{" "}
            <span className="text-transparent bg-clip-text bg-gradient-brand">
              build, buy, or automate.
            </span>
          </h1>

          <p className="mt-8 text-xl text-white/50 max-w-2xl leading-relaxed font-light">
            Practical writing on automation, AI, finance, and growth - written
            for business operators who move fast and need decisions, not theory.
          </p>

          {/* Category filter */}
          <div className="mt-12 flex flex-wrap gap-3">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  i === 0
                    ? "bg-brand text-white border-brand shadow-[0_4px_16px_rgba(85,9,217,0.4)]"
                    : "bg-white/5 text-white/55 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedPost() {
  const post = POSTS[0];
  const Icon = post.categoryIcon;
  const colorClass = CATEGORY_COLORS[post.category] ?? "text-brand bg-brand/10 border-brand/20";

  return (
    <section className="py-20 bg-mist relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(85,9,217,0.04)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.25em] text-brand mb-8">
            Latest Article
          </div>
          <div className="bg-ink rounded-[2rem] overflow-hidden relative group hover:shadow-[0_0_80px_rgba(85,9,217,0.35)] transition-all duration-500">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand/25 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:18px_18px]" />

            <div className="relative z-10 p-12 lg:p-16">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${colorClass}`}>
                      <Icon size={12} />
                      {post.category}
                    </div>
                    <span className="text-white/30 text-xs font-mono">{post.date}</span>
                    <span className="flex items-center gap-1.5 text-white/30 text-xs font-mono">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl">
                    {post.excerpt}
                  </p>

                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand to-brand-2 text-white font-semibold text-sm shadow-[0_8px_32px_rgba(85,9,217,0.4)] hover:shadow-[0_12px_40px_rgba(85,9,217,0.55)] hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    Read Article
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                <div className="lg:col-span-5">
                  {/* Decorative article preview card */}
                  <div className="bg-white/6 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="font-mono text-[10px] tracking-widest text-white/30 mb-4">
                      In This Article
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Why most AP automation projects fail",
                        "The 3-tool stack that works without ERP",
                        "Step-by-step implementation guide",
                        "ROI calculation template (free)",
                        "Common pitfalls to avoid",
                      ].map((item, i) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                          <span className="font-mono text-[10px] text-brand-2/60 shrink-0 mt-0.5">
                            0{i + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PostGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="font-mono text-[11px] tracking-[0.25em] text-brand mb-3">All Articles</div>
              <h2 className="font-display font-extrabold text-5xl tracking-tight text-ink">
                More to read.
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-ink/50 hover:text-brand transition-colors"
            >
              View all <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {POSTS.slice(1).map((post) => {
              const Icon = post.categoryIcon;
              const colorClass =
                CATEGORY_COLORS_LIGHT[post.category] ??
                "text-brand bg-brand/8 border-brand/20";
              return (
                <Link
                  key={post.slug}
                  to="/blog"
                  className="group bg-white border border-hairline rounded-[1.75rem] p-8 hover:shadow-card hover:-translate-y-1 transition-all duration-400 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${colorClass}`}>
                      <Icon size={11} />
                      {post.category}
                    </div>
                    <ChevronRight size={16} className="text-ink/20 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-ink leading-snug mb-3 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-ink/50 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-5 border-t border-hairline">
                    <div className="flex items-center gap-1.5 text-ink/35 text-xs font-mono">
                      <Clock size={11} /> {post.readTime}
                    </div>
                    <span className="text-ink/20 text-xs">·</span>
                    <span className="text-ink/35 text-xs font-mono">{post.date}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Newsletter block */}
          <div className="mt-16 bg-ink rounded-[2rem] p-12 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-brand/25 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <div className="font-mono text-[11px] tracking-[0.2em] text-brand-2 mb-3">
                  Newsletter
                </div>
                <h3 className="font-display text-3xl font-extrabold text-white mb-2">
                  One insight. Every two weeks.
                </h3>
                <p className="text-white/50 max-w-md">
                  No fluff. We send one practical article on automation, AI, or business operations - only when it's worth your time.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 lg:w-64 px-5 py-3.5 rounded-xl bg-white/8 border border-white/12 text-white placeholder-white/30 text-sm focus:outline-none focus:border-brand-2/50 transition-colors"
                />
                <button className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand to-brand-2 text-white font-semibold text-sm whitespace-nowrap hover:-translate-y-0.5 transition-transform shadow-[0_4px_20px_rgba(85,9,217,0.4)]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
