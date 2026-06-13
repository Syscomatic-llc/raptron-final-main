import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Lock, Eye, Database, Globe } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - RAPTRON Digital Solutions" },
      {
        name: "description",
        content:
          "How RAPTRON Digital Solutions LLC collects, processes, and protects your personal data under UAE PDPL and international privacy standards.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

const EFFECTIVE = "17 May 2026";

const TOC = [
  { id: "s1", label: "1. Identity of Controller" },
  { id: "s2", label: "2. Scope" },
  { id: "s3", label: "3. Data We Collect" },
  { id: "s4", label: "4. Legal Basis" },
  { id: "s5", label: "5. Purposes of Processing" },
  { id: "s6", label: "6. Data Sharing" },
  { id: "s7", label: "7. International Transfers" },
  { id: "s8", label: "8. Data Retention" },
  { id: "s9", label: "9. Security (ISO 27001)" },
  { id: "s10", label: "10. Your Rights" },
  { id: "s11", label: "11. Cookies" },
  { id: "s12", label: "12. Children's Privacy" },
  { id: "s13", label: "13. Policy Changes" },
  { id: "s14", label: "14. Contact Us" },
];

function S({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-28">
      <h2 className="font-display font-bold text-xl lg:text-2xl text-ink mb-4 pb-3 border-b border-hairline flex items-center gap-3">
        <span className="size-7 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 text-xs font-bold">
          {id.replace("s", "")}
        </span>
        {title}
      </h2>
      <div className="text-[15px] text-ink/72 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-ink [&_strong]:font-semibold [&_h4]:font-display [&_h4]:font-bold [&_h4]:text-ink [&_h4]:mt-5 [&_h4]:mb-2">
        {children}
      </div>
    </section>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-surface-tinted">
            <th className="text-left font-semibold text-ink px-4 py-3 border border-hairline">
              Category / Activity
            </th>
            <th className="text-left font-semibold text-ink px-4 py-3 border border-hairline">
              Detail / Legal Basis
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr
              key={i}
              className={i % 2 === 0 ? "bg-white" : "bg-surface-tinted/40"}
            >
              <td className="px-4 py-2.5 border border-hairline text-ink/75">
                {a}
              </td>
              <td className="px-4 py-2.5 border border-hairline text-ink/65">
                {b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-white/70 mb-6">
            <Shield size={13} className="text-brand-2" /> LEGAL DOCUMENT
          </div>
          <h1 className="font-display font-extrabold text-5xl lg:text-6xl text-white mb-5 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-6">
            RAPTRON Digital Solutions LLC is committed to the responsible
            handling of your personal data in full compliance with the UAE
            Federal Decree-Law No. 45 of 2021 (PDPL), applicable GDPR
            obligations, and our ISO/IEC 27001:2022 information security
            management framework.
          </p>
          <p className="text-white/35 text-sm font-mono">
            Effective Date: {EFFECTIVE} &nbsp;·&nbsp; Version 1.0
          </p>
        </div>
      </section>

      {/* Badges */}
      <div className="bg-surface-tinted border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-wrap gap-3">
          {(
            [
              [Shield, "UAE PDPL Compliant"],
              [Globe, "GDPR Aligned"],
              [Lock, "ISO/IEC 27001:2022"],
              [Eye, "ISO/IEC 27701:2019"],
              [Database, "ISO 9001:2015"],
            ] as const
          ).map(([Icon, label]) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-hairline text-xs font-semibold text-ink/65 shadow-sm"
            >
              <Icon size={12} className="text-brand" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* TOC */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 rounded-2xl border border-hairline bg-surface-tinted p-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink/40 uppercase mb-4">
                Contents
              </p>
              <nav className="space-y-1">
                {TOC.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className="block py-1 text-xs text-ink/55 hover:text-brand transition-colors pl-1 border-l-2 border-transparent hover:border-brand"
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9">
            <S id="s1" title="Identity of Controller">
              <p>
                <strong>RAPTRON Digital Solutions LLC</strong>{" "}
                (&ldquo;RAPTRON,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
                &ldquo;our&rdquo;) is a limited liability company incorporated
                under the laws of the United Arab Emirates, with its principal
                office at {COMPANY.address}.
              </p>
              <p>
                RAPTRON acts as the <strong>data controller</strong> for
                personal data processed in connection with its website,
                marketing, client onboarding, and service delivery. Where
                processing is performed on behalf of a client, RAPTRON acts as a{" "}
                <strong>data processor</strong> under a separately executed Data
                Processing Agreement (DPA).
              </p>
            </S>

            <S id="s2" title="Scope">
              <p>
                This Policy applies to all personal data RAPTRON collects via
                its website, client portals, email and phone communications,
                sales and onboarding processes, and events.
              </p>
            </S>

            <S id="s3" title="Personal Data We Collect">
              <h4>Identity &amp; Contact</h4>
              <ul>
                <li>Full name, job title, business email, telephone number</li>
                <li>
                  Company name, registered address, and trade licence number
                </li>
              </ul>
              <h4>Technical &amp; Usage</h4>
              <ul>
                <li>
                  IP address, browser type, device identifiers, session data
                </li>
                <li>
                  Pages visited, referral source, clickstream, and cookie
                  identifiers
                </li>
              </ul>
              <h4>Commercial &amp; Transactional</h4>
              <ul>
                <li>
                  Service scope, project briefs, contracts, pricing, invoices
                </li>
              </ul>
              <h4>Communication</h4>
              <ul>
                <li>
                  Email content, form submissions, support tickets, meeting
                  notes
                </li>
                <li>
                  Video call recordings (only where prior consent is obtained)
                </li>
              </ul>
              <p>
                <strong>Special categories:</strong> We do not intentionally
                collect special category data. If received inadvertently, it
                will be deleted promptly.
              </p>
            </S>

            <S id="s4" title="Legal Basis for Processing">
              <Table
                rows={[
                  [
                    "Responding to enquiries and demo requests",
                    "Consent / Legitimate Interests",
                  ],
                  ["Executing service contracts", "Performance of Contract"],
                  [
                    "Invoicing and financial record-keeping",
                    "Legal Obligation (UAE Commercial Law)",
                  ],
                  ["Marketing communications", "Consent (opt-in)"],
                  ["Website analytics", "Legitimate Interests (anonymised)"],
                  [
                    "Fraud prevention and security monitoring",
                    "Legitimate Interests / Legal Obligation",
                  ],
                ]}
              />
            </S>

            <S id="s5" title="Purposes of Processing">
              <ul>
                <li>
                  Deliver, manage, and improve consulting and technology
                  services
                </li>
                <li>
                  Manage client accounts, contracts, projects, and billing
                </li>
                <li>
                  Respond to enquiries, demo requests, and support tickets
                </li>
                <li>
                  Send service-related communications (updates, invoices,
                  notices)
                </li>
                <li>
                  Send marketing communications with your explicit consent
                </li>
                <li>Conduct anonymised website analytics</li>
                <li>
                  Meet legal, tax, regulatory, and audit obligations under UAE
                  law
                </li>
                <li>
                  Protect the rights, property, and safety of RAPTRON and our
                  clients
                </li>
              </ul>
            </S>

            <S id="s6" title="Data Sharing &amp; Third Parties">
              <p>
                RAPTRON does not sell, rent, or trade personal data. We share
                data only as described below, under binding contractual
                obligations:
              </p>
              <ul>
                <li>
                  <strong>Sub-processors:</strong> Cloud infrastructure (AWS,
                  Google Cloud, Azure), CRM, email delivery, project management
                  tools - all bound by DPAs aligned to UAE PDPL Article 14.
                </li>
                <li>
                  <strong>Professional advisors:</strong> Legal counsel,
                  accountants, auditors, and insurers - subject to professional
                  confidentiality.
                </li>
                <li>
                  <strong>Regulatory authorities:</strong> Where required by UAE
                  law, court order, or competent authority.
                </li>
                <li>
                  <strong>Business transfers:</strong> In mergers or
                  acquisitions, subject to equivalent privacy protections.
                </li>
              </ul>
            </S>

            <S id="s7" title="International Data Transfers">
              <p>
                Where personal data is transferred outside the UAE, we apply:
              </p>
              <ul>
                <li>
                  Standard Contractual Clauses (SCCs) for non-adequate countries
                  under GDPR;
                </li>
                <li>
                  Adequacy assessments per UAE PDPL Chapter 5 for cross-border
                  data flows;
                </li>
                <li>
                  Binding corporate rules or equivalent mechanisms where
                  applicable.
                </li>
              </ul>
            </S>

            <S id="s8" title="Data Retention">
              <Table
                rows={[
                  [
                    "Enquiry and pre-sales records",
                    "2 years from last contact",
                  ],
                  [
                    "Client contracts and project records",
                    "7 years from contract end (UAE law)",
                  ],
                  [
                    "Financial and invoicing records",
                    "5 to 7 years (Federal Decree-Law No. 32 of 2021 & No. 28 of 2022)",
                  ],
                  ["Marketing consent records", "Until withdrawal + 1 year"],
                  ["Website analytics (anonymised)", "26 months"],
                  [
                    "Support and correspondence records",
                    "3 years from resolution",
                  ],
                ]}
              />
            </S>

            <S id="s9" title="Data Security - ISO/IEC 27001:2022">
              <p>
                Our information security management system (ISMS) is aligned to{" "}
                <strong>ISO/IEC 27001:2022</strong> and privacy information
                management principles of <strong>ISO/IEC 27701:2019</strong>.
                Controls include:
              </p>
              <ul>
                <li>
                  <strong>Encryption:</strong> TLS 1.3 in transit; AES-256 at
                  rest.
                </li>
                <li>
                  <strong>Access control:</strong> Role-based access (RBAC) with
                  mandatory multi-factor authentication (MFA).
                </li>
                <li>
                  <strong>Vulnerability management:</strong> Regular penetration
                  testing, vulnerability scanning, and structured patch cycles.
                </li>
                <li>
                  <strong>Incident response:</strong> Documented breach response
                  procedure with regulatory notification within timeframes
                  mandated by applicable law.
                </li>
                <li>
                  <strong>Staff training:</strong> Mandatory data protection and
                  security awareness training on joining and annually
                  thereafter.
                </li>
                <li>
                  <strong>Supplier due diligence:</strong> All sub-processors
                  are vetted and contractually required to maintain equivalent
                  security standards.
                </li>
              </ul>
            </S>

            <S id="s10" title="Your Rights">
              <ul>
                <li>
                  <strong>Access:</strong> Receive a copy of personal data we
                  hold about you.
                </li>
                <li>
                  <strong>Rectification:</strong> Correct inaccurate or
                  incomplete data.
                </li>
                <li>
                  <strong>Erasure:</strong> Request deletion where no legitimate
                  ground for retention exists.
                </li>
                <li>
                  <strong>Restriction:</strong> Limit processing in certain
                  circumstances.
                </li>
                <li>
                  <strong>Portability:</strong> Receive your data in a
                  machine-readable format (contract/consent basis).
                </li>
                <li>
                  <strong>Object:</strong> Object to processing on legitimate
                  interest grounds, including direct marketing.
                </li>
                <li>
                  <strong>Withdraw consent:</strong> Withdraw at any time
                  without affecting prior lawful processing.
                </li>
              </ul>
              <p>
                Submit requests to{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-brand hover:underline"
                >
                  {COMPANY.email}
                </a>
                . We respond within 30 days. Identity verification may be
                required. Unresolved complaints may be escalated to the{" "}
                <strong>UAE Data Office</strong>, or for EU residents, your
                national Data Protection Authority.
              </p>
            </S>

            <S id="s11" title="Cookies &amp; Tracking">
              <p>
                We use cookies and similar technologies. See our{" "}
                <Link
                  to="/cookie-policy"
                  className="text-brand hover:underline font-semibold"
                >
                  Cookie Policy
                </Link>{" "}
                for full details, categories, and how to manage your
                preferences.
              </p>
            </S>

            <S id="s12" title="Children's Privacy">
              <p>
                Our services are directed exclusively at business professionals
                and organisations. We do not knowingly collect personal data
                from individuals under 18. If you believe we have inadvertently
                done so, contact us immediately for prompt deletion.
              </p>
            </S>

            <S id="s13" title="Policy Changes">
              <p>
                We may update this Policy to reflect changes in law, technology,
                or our practices. Material changes will be communicated by
                posting an updated Policy with a revised effective date and,
                where appropriate, notifying registered users by email.
                Continued use of our services constitutes acceptance.
              </p>
            </S>

            <S id="s14" title="Contact Us">
              <div className="bg-surface-tinted rounded-2xl border border-hairline p-6 mt-2">
                <p className="font-display font-bold text-ink text-base mb-1">
                  {COMPANY.name}
                </p>
                <p className="text-ink/65 text-sm">{COMPANY.address}</p>
                <p className="text-ink/65 text-sm mt-3">
                  Email:{" "}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-brand hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </p>
                <p className="text-ink/65 text-sm">
                  Phone:{" "}
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="text-brand hover:underline"
                  >
                    {COMPANY.phone}
                  </a>
                </p>
              </div>
            </S>

            <div className="mt-16 pt-8 border-t border-hairline flex flex-wrap gap-4 items-center justify-between">
              <p className="text-xs text-ink/40">Related legal documents:</p>
              <div className="flex gap-6">
                <Link
                  to="/terms-of-service"
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  Terms of Service →
                </Link>
                <Link
                  to="/cookie-policy"
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  Cookie Policy →
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
