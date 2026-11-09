import "server-only";

import { neon } from "@neondatabase/serverless";

export type Project = {
  id: string;
  number: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  metric: string;
  metric_label: string;
  tools: string[];
  tags: string[];
  accent: string;
};

export type Skill = { category: string; name: string };
export type Experience = {
  organization: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type PortfolioData = {
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  isDemo: boolean;
};

const demoData: PortfolioData = {
  isDemo: true,
  projects: [
    { id: "retail-demand", number: "01", category: "Forecasting", title: "A clearer signal in seasonal demand", summary: "A practical forecasting workflow for turning weekly sales history into inventory planning signals.", description: "This portfolio demonstration explores a synthetic retail dataset, compares a seasonal baseline with a rolling forecast, and frames the output as a decision aid—not a replacement for operational judgment.", metric: "12.8%", metric_label: "illustrative forecast error", tools: ["Python", "Pandas", "Statsmodels"], tags: ["Time series", "Inventory", "Forecasting"], accent: "blue" },
    { id: "customer-cohorts", number: "02", category: "Customer analytics", title: "Finding the customers behind the curve", summary: "RFM scoring and cohort analysis reveal how repeat purchase behavior changes over time.", description: "A synthetic order history is transformed into customer-level recency, frequency, and monetary features. Cohort retention and segment profiles turn the analysis into testable questions for a marketing team.", metric: "4", metric_label: "illustrative customer segments", tools: ["SQL", "Python", "Pandas"], tags: ["Segmentation", "Cohorts", "RFM"], accent: "violet" },
    { id: "executive-scorecard", number: "03", category: "Business intelligence", title: "One scorecard. A more useful conversation.", summary: "An executive dashboard connects revenue, margin, and channel mix in a single decision-ready view.", description: "This dashboard concept uses synthetic monthly data and a consistent set of KPI definitions to show what changed, where it changed, and which questions a leadership review should ask next.", metric: "3", metric_label: "connected business KPIs", tools: ["Power BI", "DAX", "SQL"], tags: ["KPI design", "Data storytelling", "BI"], accent: "mint" },
    { id: "support-operations", number: "04", category: "Operations analytics", title: "Making the service queue easier to read", summary: "A lightweight SLA and backlog analysis maps arrival patterns to service-level risk.", description: "A synthetic support-ticket dataset is cleaned, grouped by priority and age, and translated into a triage view that helps teams spot where unresolved demand is accumulating.", metric: "2.4×", metric_label: "illustrative peak-to-low volume", tools: ["SQL", "Excel", "Tableau"], tags: ["Operations", "SLA", "Data quality"], accent: "amber" },
  ],
  skills: [
    ...["Exploratory data analysis", "Forecasting fundamentals", "Customer segmentation", "Statistical reasoning"].map(name => ({ category: "Analysis & modeling", name })),
    ...["Power BI", "Tableau", "Dashboard design", "KPI definition"].map(name => ({ category: "BI & visualization", name })),
    ...["SQL", "Python", "Pandas", "Excel"].map(name => ({ category: "Languages & data", name })),
    ...["Requirements discovery", "Data storytelling", "Root-cause analysis", "Stakeholder communication"].map(name => ({ category: "Business practice", name })),
  ],
  experience: [
    { organization: "VelocityEHS", role: "SaaS Technical Support", period: "Professional experience", location: "", summary: "Partnered with enterprise customers to investigate SaaS issues, clarify requirements, and communicate evidence-led findings across ESG and EHS applications.", highlights: ["Worked directly with Fortune 1000 customers", "Reproduced and escalated issues across 10+ web applications", "Built a customer-first foundation for analytical problem solving"] },
    { organization: "eSafe Ethiopia · Jegna Cyber Labs", role: "Quality Assurance & Security Testing", period: "Project experience", location: "Ethiopia", summary: "Applied structured testing to an endpoint detection and response platform, with attention to threat alerts, incident workflows, and clear documentation.", highlights: ["Created and executed structured test cases", "Validated alert and incident response workflows", "Used SQL and API checks to investigate application behavior"] },
  ],
};

export async function getPortfolioData(): Promise<PortfolioData> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return demoData;

  const sql = neon(connectionString);
  const [projects, skills, experience] = await Promise.all([
    sql`SELECT id, number, category, title, summary, description, metric, metric_label, tools, tags, accent
        FROM projects WHERE is_published = TRUE ORDER BY sort_order, created_at DESC`,
    sql`SELECT category, name FROM skills ORDER BY category, sort_order, name`,
    sql`SELECT organization, role, period, location, summary, highlights
        FROM experience ORDER BY sort_order, id`,
  ]);

  return {
    projects: projects as Project[],
    skills: skills as Skill[],
    experience: experience as Experience[],
    isDemo: false,
  };
}
