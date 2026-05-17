import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Scale, ShieldCheck } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service - RAPTRON Digital Solutions" },
      {
        name: "description",
        content:
          "Terms governing your engagement with RAPTRON Digital Solutions LLC — UAE-incorporated technology consulting firm.",
      },
    ],
  }),
  component: TermsPage,
});

const EFFECTIVE = "17 May 2026";

const TOC = [
  { id: "t1", label: "1. Acceptance of Terms" },
  { id: "t2", label: "2. Services" },
  { id: "t3", label: "3. Engagement & Proposals" },
  { id: "t4", label: "4. Client Obligations" },
  { id: "t5", label: "5. Fees & Payment" },
  { id: "t6", label: "6. Intellectual Property" },
  { id: "t7", label: "7. Confidentiality" },
  { id: "t8", label: "8. Warranties & Disclaimers" },
  { id: "t9", label: "9. Limitation of Liability" },
  { id: "t10", label: "10. Indemnification" },
  { id: "t11", label: "11. Termination" },
  { id: "t12", label: "12. Force Majeure" },
  { id: "t13", label: "13. Governing Law" },
  { id: "t14", label: "14. Dispute Resolution" },
  { id: "t15", label: "15. General Provisions" },
];

function S({ id, title, n, children }: { id: string; title: string; n: number; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-28">
      <h2 className="font-display font-bold text-xl lg:text-2xl text-ink mb-4 pb-3 border-b border-hairline flex items-center gap-3">
        <span className="size-7 rounded-lg bg-brand/10 text-brand flex items-center justify-center shrink-0 text-xs font-bold">{n}</span>
        {title}
      </h2>
      <div className="text-[15px] text-ink/72 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_strong]:text-ink [&_strong]:font-semibold [&_h4]:font-display [&_h4]:font-bold [&_h4]:text-ink [&_h4]:mt-5 [&_h4]:mb-2">
        {children}
      </div>
    </section>
  );
}

function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-2/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-widest text-white/70 mb-6">
            <Scale size={13} className="text-brand-2" /> LEGAL DOCUMENT
          </div>
          <h1 className="font-display font-extrabold text-5xl lg:text-6xl text-white mb-5 leading-tight">
            Terms of Service
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-6">
            These Terms of Service govern your use of RAPTRON Digital Solutions LLC&apos;s website,
            products, and professional consulting services. By engaging RAPTRON, you agree to be
            bound by these Terms.
          </p>
          <p className="text-white/35 text-sm font-mono">
            Effective Date: {EFFECTIVE} &nbsp;·&nbsp; Version 1.0 &nbsp;·&nbsp; Governed by UAE Law
          </p>
        </div>
      </section>

      {/* Badges */}
      <div className="bg-surface-tinted border-b border-hairline">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-wrap gap-3">
          {[
            [ShieldCheck, "UAE Commercial Law Compliant"],
            [Scale, "ISO 9001:2015 Quality Standards"],
            [FileText, "Jurisdiction: Dubai, UAE"],
          ].map(([Icon, label]: [typeof ShieldCheck, string]) => (
            <span key={label} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-hairline text-xs font-semibold text-ink/65 shadow-sm">
              <Icon size={12} className="text-brand" />{label}
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
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink/40 uppercase mb-4">Contents</p>
              <nav className="space-y-1">
                {TOC.map((t) => (
                  <a key={t.id} href={`#${t.id}`} className="block py-1 text-xs text-ink/55 hover:text-brand transition-colors pl-1 border-l-2 border-transparent hover:border-brand">
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9">

            <S id="t1" title="Acceptance of Terms" n={1}>
              <p>By accessing the RAPTRON website at <strong>raptron.com</strong> (&ldquo;Website&rdquo;), submitting an enquiry, signing a Statement of Work, or otherwise engaging RAPTRON&apos;s services, you (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) acknowledge that you have read, understood, and agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;) and our <Link to="/privacy-policy" className="text-brand hover:underline">Privacy Policy</Link>, which is incorporated herein by reference.</p>
              <p>If you do not agree to these Terms, you must not use the Website or engage RAPTRON&apos;s services. These Terms apply to all visitors, enquirers, prospective clients, and contracted clients.</p>
            </S>

            <S id="t2" title="Services" n={2}>
              <p><strong>RAPTRON Digital Solutions LLC</strong> is a premium technology consulting firm providing the following professional services:</p>
              <ul>
                <li><strong>Operational Automation:</strong> Workflow design, automation deployment, system integration, and real-time operational visibility.</li>
                <li><strong>Finance &amp; Compliance:</strong> Accounting workflow design, VAT &amp; Corporate Tax software readiness, financial reporting workflows, and audit data preparation.</li>
                <li><strong>AI Agents:</strong> Custom AI assistant development, sales and CRM automation, customer service AI workflows, and operations intelligence tools.</li>
                <li><strong>Growth Strategy:</strong> Market positioning, competitive analysis, business model review, operational structure assessment, and growth roadmap development.</li>
                <li><strong>Custom Software Development:</strong> Enterprise web applications, SaaS platforms, mobile apps (iOS, Android, cross-platform), CRM, POS, HRM, inventory systems, API platforms, and DevOps solutions.</li>
              </ul>
              <p>The specific scope of services for any engagement shall be defined in a mutually executed <strong>Statement of Work (SOW)</strong>, Proposal, or Service Agreement, which together with these Terms forms the entire agreement between the parties.</p>
            </S>

            <S id="t3" title="Engagement &amp; Proposals" n={3}>
              <p>All proposals, quotes, and estimates issued by RAPTRON are valid for <strong>30 calendar days</strong> from the date of issue unless otherwise specified in writing. A project commences only upon:</p>
              <ul>
                <li>Written acceptance of a Proposal or Statement of Work by an authorised representative of the Client; and</li>
                <li>Receipt of any required initial deposit or retainer as specified in the SOW.</li>
              </ul>
              <p>RAPTRON reserves the right to decline any engagement at its sole discretion without obligation to provide reasons.</p>
            </S>

            <S id="t4" title="Client Obligations" n={4}>
              <p>To enable RAPTRON to deliver services effectively, the Client agrees to:</p>
              <ul>
                <li>Provide accurate, complete, and timely information, access, and resources reasonably required by RAPTRON;</li>
                <li>Appoint a designated project contact with authority to provide approvals and decisions;</li>
                <li>Review and approve deliverables within agreed timelines. Silence beyond 10 business days of delivery shall constitute deemed approval;</li>
                <li>Ensure all Client-provided data, software, and systems comply with applicable laws and do not infringe third-party rights;</li>
                <li>Refrain from soliciting, hiring, or contracting with RAPTRON personnel, sub-contractors, or associates on an individual basis during an engagement and for 12 months thereafter.</li>
              </ul>
            </S>

            <S id="t5" title="Fees &amp; Payment" n={5}>
              <h4>5.1 Fees</h4>
              <p>Fees for services are set out in the applicable SOW or Proposal. All amounts are stated in UAE Dirhams (AED) unless otherwise agreed in writing. RAPTRON&apos;s fees are exclusive of applicable taxes, including UAE Value Added Tax (VAT), which will be added at the prevailing rate.</p>
              <h4>5.2 Payment Terms</h4>
              <ul>
                <li>Invoices are due within <strong>14 calendar days</strong> of issue unless otherwise specified in the SOW.</li>
                <li>RAPTRON may require advance deposits of up to 50% of the total project value before commencing work.</li>
                <li>Late payments shall accrue interest at <strong>12% per annum</strong> on the outstanding balance, or the maximum rate permitted by UAE law, whichever is lower.</li>
                <li>RAPTRON reserves the right to suspend services where invoices remain unpaid beyond the due date and after providing 5 business days&apos; written notice.</li>
              </ul>
              <h4>5.3 Expenses</h4>
              <p>Pre-approved out-of-pocket expenses (travel, accommodation, third-party licences) will be billed at cost with supporting receipts.</p>
            </S>

            <S id="t6" title="Intellectual Property" n={6}>
              <h4>6.1 Client-Owned Deliverables</h4>
              <p>Upon receipt of full payment, RAPTRON assigns to the Client all right, title, and interest in custom deliverables specifically created for the Client under a SOW (&ldquo;Work Product&rdquo;), including all associated intellectual property rights.</p>
              <h4>6.2 RAPTRON IP</h4>
              <p>RAPTRON retains all rights to its pre-existing intellectual property, proprietary frameworks, methodologies, tools, templates, libraries, and know-how (&ldquo;Background IP&rdquo;). Where Background IP is incorporated into Work Product, RAPTRON grants the Client a perpetual, non-exclusive, royalty-free licence to use such Background IP solely as part of the Work Product.</p>
              <h4>6.3 Restrictions</h4>
              <p>The Client may not reverse engineer, decompile, sublicence, or otherwise exploit RAPTRON&apos;s Background IP outside the scope of the granted licence without prior written consent.</p>
            </S>

            <S id="t7" title="Confidentiality" n={7}>
              <p>Each party (&ldquo;Receiving Party&rdquo;) agrees to hold the other party&apos;s Confidential Information in strict confidence and not to disclose it to any third party without the Disclosing Party&apos;s prior written consent. <strong>&ldquo;Confidential Information&rdquo;</strong> means all non-public technical, commercial, financial, operational, and strategic information disclosed in connection with an engagement.</p>
              <p>Obligations do not apply to information that: (a) is or becomes publicly known through no breach by the Receiving Party; (b) was rightfully known before disclosure; (c) is independently developed without reference to Confidential Information; or (d) must be disclosed by law or court order, provided the Disclosing Party is given advance notice where lawfully permissible.</p>
              <p>These confidentiality obligations survive for <strong>5 years</strong> following the termination or expiry of any engagement.</p>
            </S>

            <S id="t8" title="Warranties &amp; Disclaimers" n={8}>
              <p>RAPTRON warrants that:</p>
              <ul>
                <li>It has the legal right and authority to enter into engagements under these Terms;</li>
                <li>Services will be delivered with reasonable skill, care, and diligence consistent with industry standards;</li>
                <li>Deliverables will substantially conform to the agreed specifications in the applicable SOW.</li>
              </ul>
              <p>The Website and any informational content are provided on an &ldquo;<strong>as-is</strong>&rdquo; basis without warranty of any kind. RAPTRON does not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
              <p>RAPTRON does not provide legal, financial, tax, or regulatory advice. Clients should seek independent professional advice for such matters.</p>
            </S>

            <S id="t9" title="Limitation of Liability" n={9}>
              <p>To the fullest extent permitted by applicable law:</p>
              <ul>
                <li>RAPTRON&apos;s total aggregate liability to the Client arising out of or in connection with any engagement shall not exceed the <strong>fees paid by the Client to RAPTRON in the 3 months immediately preceding the event giving rise to the claim</strong>;</li>
                <li>RAPTRON shall not be liable for any indirect, incidental, special, consequential, or punitive loss or damages, including loss of profit, revenue, data, business opportunity, or goodwill, even if RAPTRON has been advised of the possibility of such damages.</li>
              </ul>
              <p>The limitations above do not apply to liability arising from gross negligence, wilful misconduct, death or personal injury caused by negligence, or fraud.</p>
            </S>

            <S id="t10" title="Indemnification" n={10}>
              <p>The Client agrees to indemnify, defend, and hold harmless RAPTRON, its officers, directors, employees, and sub-contractors from and against any claims, damages, losses, penalties, and costs (including reasonable legal fees) arising from:</p>
              <ul>
                <li>The Client&apos;s breach of these Terms or any applicable law;</li>
                <li>Inaccurate, incomplete, or misleading information provided by the Client;</li>
                <li>The Client&apos;s use of deliverables in a manner not authorised or contemplated by the SOW;</li>
                <li>Third-party claims arising from Client-provided data, content, or systems.</li>
              </ul>
            </S>

            <S id="t11" title="Termination" n={11}>
              <h4>11.1 Termination for Convenience</h4>
              <p>Either party may terminate an ongoing engagement by providing <strong>30 calendar days&apos;</strong> written notice. The Client remains liable for all fees accrued to the date of termination, including a fair value assessment of work in progress.</p>
              <h4>11.2 Termination for Cause</h4>
              <p>Either party may terminate immediately upon written notice if the other party: (a) materially breaches these Terms and fails to cure the breach within 14 days of written notice; (b) becomes insolvent, makes an assignment for the benefit of creditors, or is subject to liquidation or administration proceedings.</p>
              <h4>11.3 Effect of Termination</h4>
              <p>Upon termination, all licences granted under these Terms cease (except as expressly stated); each party shall return or securely destroy the other&apos;s Confidential Information; and any provisions intended to survive termination (IP, confidentiality, liability, governing law) shall do so.</p>
            </S>

            <S id="t12" title="Force Majeure" n={12}>
              <p>Neither party shall be in breach or liable for delay or failure to perform any obligations under these Terms to the extent such failure results from events beyond the reasonable control of that party, including natural disasters, government actions, pandemic, cyber-attacks by third parties, or widespread infrastructure failure, provided the affected party gives prompt written notice and uses reasonable efforts to mitigate the impact.</p>
            </S>

            <S id="t13" title="Governing Law" n={13}>
              <p>These Terms and all engagements between the parties shall be governed by and construed in accordance with the <strong>laws of the United Arab Emirates</strong>, and specifically the laws of the <strong>Emirate of Dubai</strong>, without regard to conflict of law principles.</p>
            </S>

            <S id="t14" title="Dispute Resolution" n={14}>
              <p>The parties agree to first attempt to resolve any dispute through good faith negotiation. If a dispute is not resolved within <strong>30 days</strong> of written notice by either party, it shall be referred to and finally resolved by arbitration under the <strong>DIAC (Dubai International Arbitration Centre) Arbitration Rules</strong> in force at the time of the dispute. The seat of arbitration shall be Dubai, UAE. The language of arbitration shall be English. The arbitral award shall be final and binding.</p>
              <p>Nothing in this clause prevents either party from seeking urgent injunctive or interim relief from a court of competent jurisdiction.</p>
            </S>

            <S id="t15" title="General Provisions" n={15}>
              <ul>
                <li><strong>Entire Agreement:</strong> These Terms, together with any applicable SOW, Proposal, or Service Agreement, constitute the entire agreement between the parties and supersede all prior negotiations, representations, and agreements.</li>
                <li><strong>Amendments:</strong> RAPTRON may update these Terms at any time by posting the revised version on the Website. Material changes affecting existing engagements will be notified in writing with 30 days&apos; notice.</li>
                <li><strong>Waiver:</strong> Failure to enforce any provision of these Terms shall not constitute a waiver of that right.</li>
                <li><strong>Severability:</strong> If any provision is found unenforceable, it shall be modified to the minimum extent necessary, and the remaining provisions shall continue in full force.</li>
                <li><strong>No Partnership:</strong> Nothing in these Terms creates a partnership, joint venture, agency, franchise, or employment relationship between the parties.</li>
                <li><strong>Assignment:</strong> The Client may not assign its rights or obligations without RAPTRON&apos;s prior written consent. RAPTRON may assign its obligations to an affiliate or in connection with a business transfer.</li>
                <li><strong>Notices:</strong> All legal notices must be in writing and sent to the addresses set out in the applicable SOW or to {COMPANY.email}.</li>
              </ul>

              <div className="bg-surface-tinted rounded-2xl border border-hairline p-6 mt-6">
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
                <Link to="/cookie-policy" className="text-sm font-semibold text-brand hover:underline">Cookie Policy →</Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
