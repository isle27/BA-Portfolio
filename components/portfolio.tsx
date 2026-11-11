"use client";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Database,
  LineChart,
  Menu,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import type { Experience, PortfolioData, Project, Skill } from "@/lib/data";

const navItems = [
  ["Work", "#work"],
  ["Approach", "#approach"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export function Portfolio({ data }: { data: PortfolioData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Hana Chanyalew home">
          <span className="brand-mark">HC<span>.</span></span>
          <span className="brand-name">Hana Chanyalew | MSIT<small>Business analytics</small></span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Let’s talk <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main>
        {data.isDemo && (
          <div className="demo-notice" role="status">
            <Database size={13} /> Preview content · connect Neon to manage portfolio data
          </div>
        )}
        <Hero />
        <section className="work-section section-shell" id="work">
          <SectionIntro
            number="01"
            kicker="SELECTED WORK"
            title={<>From raw data<br />to a clearer next step.</>}
            copy="Case studies built around real business questions, transparent assumptions, and analysis you can act on."
          />
          <ProjectGrid projects={data.projects} onOpen={setActiveProject} />
          <div className="synthetic-note"><span className="note-dot" /> Metrics and datasets in these portfolio demonstrations are synthetic—not verified business outcomes.</div>
        </section>

        <section className="dashboard-section" id="dashboard">
          <div className="dashboard-layout section-shell">
            <div className="dashboard-copy">
              <span className="eyebrow"><span className="live-dot" /> INTERACTIVE DATA STORY</span>
              <h2>See the shape<br />behind the numbers.</h2>
              <p>A compact look at how a KPI becomes a useful conversation: track the trend, compare the mix, then ask what changed.</p>
              <a className="text-link" href="#approach">My approach <ArrowRight size={16} /></a>
              <p className="mini-disclaimer">Illustrative monthly business data · not a real company</p>
            </div>
            <MetricsDashboard />
          </div>
        </section>

        <section className="approach-section section-shell" id="approach">
          <SectionIntro
            number="02"
            kicker="THE TOOLKIT"
            title={<>Good analysis starts<br />with a better question.</>}
            copy="A practical toolkit across data exploration, business intelligence, and the conversations that make insights useful."
          />
          <SkillMatrix skills={data.skills} />
          <div className="method-strip">
            <div><span>01</span><strong>Frame</strong><small>Align on the decision.</small></div>
            <ArrowRight className="method-arrow" size={17} />
            <div><span>02</span><strong>Explore</strong><small>Test the signal.</small></div>
            <ArrowRight className="method-arrow" size={17} />
            <div><span>03</span><strong>Explain</strong><small>Make the next step clear.</small></div>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-shell">
            <SectionIntro
              number="03"
              kicker="EXPERIENCE"
              title={<>Curiosity, grounded<br />in real-world context.</>}
              copy="A foundation in customer-facing technology, structured investigation, and making complex issues easier to understand."
            />
            <ExperienceTimeline items={data.experience} />
            <div className="education-card">
              <span className="education-icon"><Sparkles size={16} /></span>
              <div><span className="eyebrow">EDUCATION</span><h3>M.S. Information Technology</h3><p>Western Governors University</p></div>
              <div className="education-divider" />
              <div><h3>B.S. Technical Management</h3><p>DeVry University · 2023</p></div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <footer className="site-footer section-shell">
        <a className="brand" href="#home"><span className="brand-mark">HC<span>.</span></span></a>
        <span>Thoughtful analysis. Clearer decisions.</span>
        <span>© {new Date().getFullYear()} Hana Chanyalew</span>
      </footer>
      {activeProject && <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />}
    </>
  );
}

function Hero() {
  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <div className="hero-eyebrow"><span className="availability-dot" /> ATLANTA, GA <span className="eyebrow-divider">/</span> OPEN TO OPPORTUNITIES</div>
        <h1>Better questions.<br />Clearer <span>decisions.</span></h1>
        <p className="hero-lede">I’m Hana—a business analytics professional who turns complex data into clear stories, considered forecasts, and decisions people can move on.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="#work">Explore selected work <ArrowDownRight size={16} /></a>
          <a className="button button-quiet" href="#contact">Let’s connect <ArrowUpRight size={15} /></a>
        </div>
        <div className="hero-specialties"><span>Data storytelling</span><i /> <span>Predictive modeling</span><i /> <span>Business intelligence</span></div>
      </div>
      <HeroVisual />
      <a className="scroll-cue" href="#work" aria-label="Scroll to selected work"><ArrowDown size={15} /><span>SCROLL TO EXPLORE</span></a>
    </section>
  );
}

function HeroVisual() {
  return (
    <Image
      src="/hana-chanyalew.jpg"
      alt="Hana Chanyalew portrait"
      width={640}
      height={640}
      className="hero-visual"
      priority
    />
  );
}

function SectionIntro({ number, kicker, title, copy }: { number: string; kicker: string; title: React.ReactNode; copy: string }) {
  return (
    <div className="section-intro">
      <div className="section-intro-label"><span>{number}</span><span className="intro-rule" /><span className="eyebrow">{kicker}</span></div>
      <div className="section-intro-main"><h2>{title}</h2><p>{copy}</p></div>
    </div>
  );
}

function ProjectGrid({ projects, onOpen }: { projects: Project[]; onOpen: (project: Project) => void }) {
  const [filter, setFilter] = useState("All work");
  const filters = useMemo(() => ["All work", ...new Set(projects.map(project => project.category))], [projects]);
  const visible = filter === "All work" ? projects : projects.filter(project => project.category === filter);
  return (
    <>
      <div className="project-filters" aria-label="Filter projects">
        {filters.map(item => <button type="button" aria-pressed={filter === item} className={filter === item ? "filter-chip active" : "filter-chip"} onClick={() => setFilter(item)} key={item}>{item}</button>)}
        <span className="project-count">{String(visible.length).padStart(2, "0")} PROJECTS</span>
      </div>
      <div className="project-grid">
        {visible.map(project => <ProjectCard key={project.id} project={project} onOpen={() => onOpen(project)} />)}
      </div>
    </>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button className={`project-card accent-${project.accent}`} type="button" onClick={onOpen} aria-label={`Read case study: ${project.title}`}>
      <div className="project-card-top"><span className="project-category">{project.category}</span><span className="project-number">{project.number}</span></div>
      <div className="project-visual" aria-hidden="true">
        <ProjectArtwork id={project.id} />
      </div>
      <div className="project-card-content">
        <h3>{project.title}</h3><p>{project.summary}</p>
        <div className="project-metric"><strong>{project.metric}</strong><span>{project.metric_label}</span></div>
        <div className="project-card-footer"><div className="tool-list">{project.tools.slice(0, 3).map(tool => <span key={tool}>{tool}</span>)}</div><span className="card-arrow"><ArrowUpRight size={17} /></span></div>
      </div>
    </button>
  );
}

function ProjectArtwork({ id }: { id: string }) {
  if (id === "retail-demand") {
    return <div className="art-forecast"><div className="art-legend"><span><i /> Actual</span><span><i /> Forecast</span></div><svg viewBox="0 0 360 130" role="img" aria-label="Illustrative actual and forecast trend"><path d="M0 94H360M0 62H360M0 30H360" className="art-grid" /><path d="M0 99 C26 80 37 92 62 68 S101 77 122 56 S161 72 186 45 S222 64 246 39 S275 54 294 29" className="art-line" /><path d="M294 29 C315 24 333 35 360 13" className="art-line art-dash" /><path d="M294 29 L360 9 L360 49Z" className="art-area" /></svg><span className="art-callout">FORECAST WINDOW</span></div>;
  }
  if (id === "customer-cohorts") {
    return <div className="art-cohort"><span>RETENTION BY COHORT</span><div className="cohort-grid">{[90,75,60,44,32,18,80,68,54,38,21,0,71,55,43,0,0,0,61,46,0,0,0,0,50,0,0,0,0,0].map((v,i)=><i key={i} style={{opacity:v ? 0.18 + v/125 : 0.07}} />)}</div><div className="cohort-months"><span>MONTH 0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div></div>;
  }
  if (id === "executive-scorecard") {
    return <div className="art-scorecard"><span>MONTHLY PULSE</span><div className="art-score-row"><div><small>Revenue</small><strong>$248k <i>↗ 8.2%</i></strong></div><div><small>Gross margin</small><strong>42.6% <i>↗ 1.4%</i></strong></div></div><svg viewBox="0 0 360 84" role="img" aria-label="Illustrative KPI trend"><path d="M0 68 C34 58 51 71 83 48 S132 56 160 35 S210 49 243 24 S298 38 360 7" className="art-line" /><path d="M0 68 C34 58 51 71 83 48 S132 56 160 35 S210 49 243 24 S298 38 360 7 L360 84 L0 84Z" className="art-area" /></svg></div>;
  }
  return <div className="art-operations"><span>OPEN TICKETS BY AGE</span><div className="ops-bars">{[38,66,47,83,56,95,71,51,77,43,63,34].map((v,i)=><i key={i} style={{height:`${v}%`}} />)}</div><div className="ops-baseline"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span></div></div>;
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      className="project-dialog"
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="dialog-title"
      onKeyDown={event => {
        if (event.key === "Escape") {
          event.preventDefault();
          dialogRef.current?.close();
        }
      }}
    >
        <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close case study" autoFocus><X size={18} /></button>
        <span className="eyebrow">{project.number} / {project.category}</span>
        <h2 id="dialog-title">{project.title}</h2><p>{project.description}</p>
        <div className="dialog-callout"><span className="eyebrow">PORTFOLIO DEMONSTRATION</span><strong>{project.metric}</strong><span>{project.metric_label} · based on synthetic data</span></div>
        <h3>Tools & methods</h3><div className="dialog-tags">{[...project.tools, ...project.tags].map(tag => <span key={tag}>{tag}</span>)}</div>
        <button className="button button-dark" onClick={() => dialogRef.current?.close()} type="button">Back to selected work <ArrowLeft size={15} /></button>
    </dialog>
  );
}

function MetricsDashboard() {
  const [period, setPeriod] = useState("12 months");
  const points = period === "12 months"
    ? "0,85 33,76 66,79 99,55 132,64 165,43 198,50 231,26 264,39 297,19 330,29 360,7"
    : "0,79 72,65 144,78 216,48 288,31 360,13";
  const months = period === "12 months"
    ? ["JAN", "MAR", "MAY", "JUL", "SEP", "DEC"]
    : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
  const lastPointIndex = points.split(" ").length - 1;
  return (
    <div className="dashboard-card">
      <div className="dash-top"><div><span className="eyebrow">BUSINESS PULSE</span><h3>Revenue overview</h3></div><label className="period-select"><span className="sr-only">Chart time period</span><select value={period} onChange={event => setPeriod(event.target.value)}><option>12 months</option><option>6 months</option></select><ChevronDown size={13} /></label></div>
      <div className="dash-kpis"><div><span>NET REVENUE</span><strong>$248,420</strong><small><b>↗ 8.2%</b> vs prior period</small></div><div><span>GROSS MARGIN</span><strong>42.6%</strong><small><b>↗ 1.4 pts</b> vs prior period</small></div><div><span>ORDERS</span><strong>1,284</strong><small><b>↗ 5.7%</b> vs prior period</small></div></div>
      <div className="dash-chart-wrap"><div className="dash-chart-y"><span>$250k</span><span>$200k</span><span>$150k</span><span>$100k</span></div><svg className="dash-chart" viewBox="0 0 360 130" preserveAspectRatio="none" role="img" aria-label={`Illustrative revenue trend over ${period}`}><path d="M0 5H360M0 45H360M0 85H360M0 125H360" className="dash-gridline" /><polygon points={`0,130 ${points} 360,130`} className="dash-fill" /><polyline points={points} className="dash-line" />{points.split(" ").map((point,index) => { const [cx,cy] = point.split(","); return index === lastPointIndex ? <circle key={point} cx={cx} cy={cy} r="4" className="dash-point" /> : null; })}</svg></div>
      <div className="dash-months">{months.map(month => <span key={month}>{month}</span>)}</div>
      <div className="dash-bottom"><span><i /> Revenue</span><span className="dash-note"><BarChart3 size={13} /> Illustrative data · synthetic scenario</span></div>
    </div>
  );
}

function SkillMatrix({ skills }: { skills: Skill[] }) {
  const groups = [...new Set(skills.map(skill => skill.category))];
  const icons = [<LineChart key="line" size={17} />, <BarChart3 key="bar" size={17} />, <Database key="database" size={17} />, <Sparkles key="sparkles" size={17} />];
  return <div className="skills-grid">{groups.map((group,index) => <div className="skill-group" key={group}><span className="skill-icon">{icons[index % icons.length]}</span><h3>{group}</h3><ul>{skills.filter(skill => skill.category === group).map(skill => <li key={skill.name}><Check size={13} /> {skill.name}</li>)}</ul></div>)}</div>;
}

function ExperienceTimeline({ items }: { items: Experience[] }) {
  return <div className="timeline">{items.map((item: Experience,index) => <article className="timeline-item" key={`${item.organization}-${item.role}`}><div className="timeline-marker">{String(index+1).padStart(2,"0")}</div><div className="timeline-main"><div className="timeline-top"><span className="eyebrow">{item.period}{item.location ? ` · ${item.location}` : ""}</span><ArrowUpRight size={15} /></div><h3>{item.organization}</h3><h4>{item.role}</h4><p>{item.summary}</p><ul>{item.highlights.map(text => <li key={text}>{text}</li>)}</ul></div></article>)}</div>;
}

function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setErrorMessage("");
    setFieldErrors({});
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = await response.json() as { success?: boolean; error?: string; fieldErrors?: Record<string, string[]> };
      if (!response.ok) {
        setErrorMessage(result.error || "Your message could not be sent.");
        setFieldErrors(result.fieldErrors || {});
        setStatus("error");
        return;
      }
      setStatus("success");
      setFieldErrors({});
      form.reset();
    } catch {
      setErrorMessage("A network error interrupted your message. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-glow" />
      <div className="section-shell contact-layout">
        <div className="contact-copy"><span className="eyebrow"><span className="availability-dot" /> OPEN TO OPPORTUNITIES</span><h2>Let’s make the<br />numbers mean<br /><em>something.</em></h2><p>Have a business question worth exploring? I’d love to hear what you’re working on.</p><div className="contact-signoff">Hana Chanyalew <ArrowDownRight size={18} /></div></div>
        <form className="contact-form" onSubmit={submit}>
          <div className="form-heading"><span className="eyebrow">START A CONVERSATION</span><span>Fields marked <b>*</b> are required</span></div>
          <div className="form-row"><label>Your name <b>*</b><input name="name" autoComplete="name" placeholder="Jane Smith" minLength={2} maxLength={100} required aria-invalid={Boolean(fieldErrors.name?.length)} aria-describedby={fieldErrors.name?.length ? "name-error" : undefined} />{fieldErrors.name?.map(error => <small className="field-error" id="name-error" key={error}>{error}</small>)}</label><label>Email address <b>*</b><input name="email" type="email" autoComplete="email" placeholder="jane@company.com" maxLength={254} required aria-invalid={Boolean(fieldErrors.email?.length)} aria-describedby={fieldErrors.email?.length ? "email-error" : undefined} />{fieldErrors.email?.map(error => <small className="field-error" id="email-error" key={error}>{error}</small>)}</label></div>
          <label>What’s on your mind? <b>*</b><select name="topic" defaultValue="" required aria-invalid={Boolean(fieldErrors.topic?.length)} aria-describedby={fieldErrors.topic?.length ? "topic-error" : undefined}><option value="" disabled>Select a conversation topic</option><option>Analytics opportunity</option><option>Project collaboration</option><option>Something else</option></select>{fieldErrors.topic?.map(error => <small className="field-error" id="topic-error" key={error}>{error}</small>)}</label>
          <label>A little more context <b>*</b><textarea name="message" rows={4} minLength={20} maxLength={3000} placeholder="Tell me a little about the challenge, question, or opportunity..." required aria-invalid={Boolean(fieldErrors.message?.length)} aria-describedby={fieldErrors.message?.length ? "message-error" : undefined} />{fieldErrors.message?.map(error => <small className="field-error" id="message-error" key={error}>{error}</small>)}</label>
          {status === "success" && <p className="form-success" role="status"><Check size={15} /> Thanks for reaching out. Your message has been received.</p>}
          {status === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
          <div className="form-submit-row"><span>Your details stay private.</span><button type="submit" className="button button-light" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send inquiry"} <Send size={14} /></button></div>
        </form>
      </div>
    </section>
  );
}
