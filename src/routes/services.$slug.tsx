import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Calendar, TrendingUp } from "lucide-react";
import { SERVICES, type ServiceSlug } from "@/lib/constants";
import { CTABanner, PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} - RAPTRON` },
          { name: "description", content: loaderData.service.description },
          { property: "og:title", content: loaderData.service.title },
          {
            property: "og:description",
            content: loaderData.service.description,
          },
        ]
      : [],
  }),
  errorComponent: ({ error }) => (
    <div className="pt-32 text-center text-ink/60">{error.message}</div>
  ),
  notFoundComponent: () => (
    <div className="pt-32 pb-20 text-center">
      <h1 className="font-display text-4xl font-bold">Service not found</h1>
      <Link
        to="/services"
        className="mt-6 inline-block text-brand font-semibold"
      >
        View all services →
      </Link>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;
  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.shortTitle}
        title={service.headline}
        description={service.description}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/book-consultation"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-gradient-brand text-white font-semibold shadow-card hover:shadow-glow transition"
          >
            <Calendar size={16} /> Book a free consultation
          </Link>
          <Link
            to="/request-demo"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-ink/15 text-ink font-semibold hover:bg-white transition"
          >
            Request a demo <ArrowRight size={16} />
          </Link>
        </div>
        <div className="absolute right-10 bottom-10 hidden lg:block">
          <div className="size-24 rounded-2xl bg-gradient-brand text-white flex items-center justify-center shadow-lift">
            <Icon size={42} />
          </div>
        </div>
      </PageHero>

      {/* What's included */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="reveal lg:col-span-4">
                <div className="font-mono text-[11px] tracking-[0.18em] text-brand">
                  What's included
                </div>
                <h2 className="mt-3 font-display font-bold text-3xl lg:text-4xl">
                  A scope built around outcomes.
                </h2>
                <p className="mt-4 text-ink/65">
                  Every engagement is tailored - these are the building blocks
                  we draw from.
                </p>
              </div>
              <div
                className="reveal lg:col-span-8 grid sm:grid-cols-2 gap-3"
                style={{ transitionDelay: "100ms" }}
              >
                {service.whatsIncluded.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-hairline p-4 bg-white"
                  >
                    <div className="size-6 rounded-md bg-surface-tinted text-brand flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} />
                    </div>
                    <div className="text-sm text-ink/85">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface-tinted py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="reveal max-w-2xl">
              <div className="font-mono text-[11px] tracking-[0.18em] text-brand">
                How It Works
              </div>
              <h2 className="mt-3 font-display font-bold text-3xl lg:text-4xl">
                Our delivery flow.
              </h2>
            </div>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step, i) => (
                <div
                  key={step.title}
                  className="reveal rounded-2xl bg-white border border-hairline p-6 hover-lift"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="size-10 rounded-lg bg-gradient-brand text-white font-display font-bold flex items-center justify-center">
                    0{i + 1}
                  </div>
                  <h4 className="mt-4 font-display font-bold text-lg">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm text-ink/65">{step.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="reveal max-w-2xl">
              <div className="font-mono text-[11px] tracking-[0.18em] text-brand">
                Business Outcomes
              </div>
              <h2 className="mt-3 font-display font-bold text-3xl lg:text-4xl">
                What changes when we engage.
              </h2>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {service.outcomes.map((o, i) => (
                <div
                  key={o.title}
                  className="reveal rounded-2xl border border-hairline p-7 bg-white shadow-card"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="size-11 rounded-xl bg-gradient-brand text-white flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="mt-5 font-display font-bold text-xl">
                    {o.title}
                  </h4>
                  <p className="mt-3 text-ink/65 text-sm">{o.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-surface-tinted py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] tracking-[0.18em] text-brand">
              Related Services
            </div>
            <h2 className="mt-3 font-display font-bold text-3xl lg:text-4xl">
              Continue exploring.
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {related.map((s) => {
              const RIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug as ServiceSlug }}
                  className="rounded-2xl bg-white border border-hairline p-6 hover-lift block"
                >
                  <div className="size-11 rounded-xl bg-gradient-brand text-white flex items-center justify-center">
                    <RIcon size={20} />
                  </div>
                  <h4 className="mt-4 font-display font-bold text-lg">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-sm text-ink/65">{s.tagline}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Learn more <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
