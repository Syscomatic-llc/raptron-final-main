import type { LucideIcon } from "lucide-react";
import {
  Workflow,
  Code2,
  BrainCircuit,
  LineChart,
  TrendingUp,
  Factory,
  ShoppingBag,
  Building2,
  HardHat,
  Wrench,
} from "lucide-react";

export type ServiceSlug =
  | "operational-automation"
  | "finance-compliance"
  | "ai-agents"
  | "growth-strategy"
  | "custom-software-development";

export interface Service {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  tagline: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  whatsIncluded: string[];
  process: { title: string; description: string }[];
  outcomes: { title: string; description: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "operational-automation",
    title: "Operational Automation",
    shortTitle: "Automation",
    tagline: "Automate what slows you down.",
    headline: "Stop Doing It Manually",
    description:
      "We design and deploy automated workflows that eliminate repetitive work, reduce errors, and give your team back the hours that matter.",
    icon: Workflow,
    bullets: [
      "Workflow design & automation",
      "Process bottleneck elimination",
      "Real-time operational visibility",
    ],
    whatsIncluded: [
      "Business process mapping & analysis",
      "Workflow automation design & deployment",
      "System integration & data sync",
      "SOP documentation",
      "KPI dashboards & reporting",
      "Ongoing optimisation planning",
    ],
    process: [
      { title: "Observe", description: "Walk the process. Measure where time is lost." },
      { title: "Redesign", description: "Re-architect flows for speed and clarity." },
      { title: "Automate", description: "Deploy automations and integrations." },
      { title: "Monitor", description: "Track gains and iterate continuously." },
    ],
    outcomes: [
      { title: "Hours saved per week", description: "Measurable reduction in manual, repetitive tasks." },
      { title: "Fewer errors", description: "Automation removes human error from recurring processes." },
      { title: "Full operational visibility", description: "See what's happening in real time - always." },
    ],
  },
  {
    slug: "finance-compliance",
    title: "Finance & Compliance",
    shortTitle: "Finance & Compliance",
    tagline: "Structured finances. Confident compliance.",
    headline: "Get Your Finances in Order - and Keep Them That Way",
    description:
      "We help businesses build structured accounting workflows, prepare for VAT and corporate tax obligations, and maintain audit-ready financial records year-round.",
    icon: LineChart,
    bullets: [
      "VAT & corporate tax readiness",
      "Structured accounting workflows",
      "Audit preparation & financial reporting",
    ],
    whatsIncluded: [
      "Accounting workflow design & implementation",
      "VAT software configuration & reporting setup",
      "Corporate Tax (UAE CT) software readiness",
      "Financial reporting & dashboards",
      "Audit preparation & documentation",
      "Compliance calendar & controls",
    ],
    process: [
      { title: "Assess", description: "Review current financial processes and compliance gaps." },
      { title: "Structure", description: "Design accounting workflows and control frameworks." },
      { title: "Implement", description: "Deploy tools and processes with your team." },
      { title: "Maintain", description: "Ongoing compliance monitoring and reporting." },
    ],
    outcomes: [
      { title: "Audit-ready records", description: "Accurate, organised financial documentation at all times." },
      { title: "Tax compliance", description: "VAT and corporate tax obligations met with confidence." },
      { title: "Financial clarity", description: "Real-time visibility into your business financial position." },
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    shortTitle: "AI Agents",
    tagline: "Make your business work smarter.",
    headline: "AI That Works For Your Business - Not Against It",
    description:
      "We build task-focused AI assistants that handle sales follow-ups, operations tasks, customer service, and internal reporting - so your team can focus on higher-value work.",
    icon: BrainCircuit,
    bullets: [
      "Task-focused AI assistants",
      "Sales & operations automation",
      "Customer service intelligence",
    ],
    whatsIncluded: [
      "AI use-case identification & scoping",
      "Custom AI agent development",
      "Sales & CRM AI automation",
      "Customer service AI workflows",
      "Internal operations AI tools",
      "Reporting & insight automation",
    ],
    process: [
      { title: "Identify", description: "Find the highest-ROI AI opportunities in your workflow." },
      { title: "Design", description: "Spec the agent behaviour and integration points." },
      { title: "Build", description: "Develop and test the AI agent in your environment." },
      { title: "Deploy", description: "Launch, monitor, and refine for performance." },
    ],
    outcomes: [
      { title: "Faster response times", description: "AI handles routine tasks instantly, 24/7." },
      { title: "Reduced manual overhead", description: "Less admin work for your team every day." },
      { title: "Smarter decisions", description: "AI-generated insights that drive action." },
    ],
  },
  {
    slug: "growth-strategy",
    title: "Growth Strategy",
    shortTitle: "Growth Strategy",
    tagline: "Build momentum that compounds.",
    headline: "Define Where You're Going - Then Build the Path",
    description:
      "We help business owners define their market position, improve operational structure, and build practical growth plans they can actually execute.",
    icon: TrendingUp,
    bullets: [
      "Market positioning & strategy",
      "Operational structure review",
      "Actionable growth roadmapping",
    ],
    whatsIncluded: [
      "Market positioning & competitive analysis",
      "Business model review",
      "Operational structure assessment",
      "Growth roadmap development",
      "Revenue strategy planning",
      "Execution support & accountability",
    ],
    process: [
      { title: "Assess", description: "Understand where you are and what's holding you back." },
      { title: "Position", description: "Define your market edge and ideal customer." },
      { title: "Plan", description: "Build a prioritised, practical growth roadmap." },
      { title: "Execute", description: "Implement with support and track what moves the needle." },
    ],
    outcomes: [
      { title: "Clear market position", description: "A defined edge that attracts the right clients." },
      { title: "Operational leverage", description: "A structure that grows without breaking." },
      { title: "Actionable roadmap", description: "A plan you can start executing next week." },
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    tagline: "Software shaped to your exact business logic.",
    headline: "When Off-The-Shelf Doesn't Fit",
    description:
      "We build resilient, scalable, ownable systems - web, mobile, and cloud-native - engineered around your exact operational requirements.",
    icon: Code2,
    bullets: [
      "Web & SaaS platforms",
      "Mobile (iOS / Android / cross-platform)",
      "Cloud-native architectures",
    ],
    whatsIncluded: [
      "Enterprise web applications & SaaS platforms",
      "Mobile apps (Android, iOS, cross-platform)",
      "CRM, POS, HRM, Inventory systems",
      "Cloud & on-premise tailored solutions",
      "API platforms and developer tooling",
      "DevOps, CI/CD, and observability",
    ],
    process: [
      { title: "Define", description: "Translate goals into product specs and architecture." },
      { title: "Design", description: "Wireframes, UX flows, and design systems." },
      { title: "Engineer", description: "Iterative builds with production-grade quality bars." },
      { title: "Operate", description: "Launch, monitor, and evolve in production." },
    ],
    outcomes: [
      { title: "Scalable custom systems", description: "Architecture engineered for growth." },
      { title: "Cross-platform reach", description: "Reach customers wherever they work." },
      { title: "Full ownership & IP", description: "You own the code, the data, and the roadmap." },
    ],
  },
];

export const INDUSTRIES = [
  { name: "Real Estate", icon: Building2 },
  { name: "Trading", icon: LineChart },
  { name: "Manufacturing", icon: Factory },
  { name: "Retail", icon: ShoppingBag },
  { name: "Construction", icon: HardHat },
  { name: "Facilities Management", icon: Wrench },
];

export const STATS = [
  { value: 50, suffix: "+", label: "Businesses automated" },
  { value: 98, suffix: "%", label: "Client retention rate" },
  { value: 12, suffix: "+", label: "Industries served" },
  { value: 40, suffix: "%", label: "Avg. efficiency gain" },
];

export const TESTIMONIALS = [
  {
    quote:
      "RAPTRON treated our ERP rollout like an operations problem first and a software project second. That's why it actually worked.",
    name: "Lorem Ipsum",
    title: "VP Operations",
    company: "Placeholder Manufacturing Co.",
  },
  {
    quote:
      "They rebuilt processes we'd lived with for a decade. The new flow is faster, cleaner, and finally measurable.",
    name: "Dolor Sit",
    title: "Chief Operating Officer",
    company: "Placeholder Logistics Group",
  },
  {
    quote:
      "Their AI consulting cut through the hype. We shipped two production use-cases in a quarter - both already paying for themselves.",
    name: "Amet Consectetur",
    title: "Director, Digital Strategy",
    company: "Placeholder Retail Holdings",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Discovery & Audit",
    description: "Understand the business, the people, the data.",
  },
  {
    title: "Solution Architecture",
    description: "Design systems and processes that fit how you operate.",
  },
  {
    title: "Implementation & Configuration",
    description: "Build, integrate, and validate against real workflows.",
  },
  {
    title: "Training & Change Management",
    description: "Equip teams to own the new way of working.",
  },
  {
    title: "Optimization & Growth",
    description: "Measure, iterate, and compound the value.",
  },
];

export const VALUES = [
  {
    title: "Client-First Thinking",
    description: "Your outcomes shape every recommendation we make.",
  },
  {
    title: "Engineering Integrity",
    description: "We build what we'd be proud to operate ourselves.",
  },
  {
    title: "Continuous Improvement",
    description: "Every engagement leaves an organization stronger.",
  },
  {
    title: "Transparent Partnership",
    description: "Honest scopes, honest tradeoffs, honest reporting.",
  },
];

export const COMPANY = {
  name: "RAPTRON Digital Solutions LLC",
  email: "consult@raptron.com",
  phone: "+971 55 614 4097",
  address: "Dubai Food District, Shop No. 40, Building 01, Al Aweer, Ras Al Khor, Dubai, UAE",
  shortDescription:
    "A premium technology consulting firm specializing in ERP, business process re-engineering, AI consulting, and custom software.",
};
