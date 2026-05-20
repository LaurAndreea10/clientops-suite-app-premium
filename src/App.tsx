import { useEffect, useMemo } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { activity, automationRules, bookings, projects, quote, revenueSeries, type LeadStage, type TaskStatus } from '@/mocks/seed/data';
import { useAppStore } from '@/store/useAppStore';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const nav = [
  ['/', 'Command Center', '⌘'],
  ['/dashboard', 'Dashboard', '◈'],
  ['/pipeline', 'Pipeline', '◎'],
  ['/calendar', 'Calendar', '◷'],
  ['/projects', 'Projects', '▦'],
  ['/quotes', 'Quotes', '€'],
  ['/automations', 'Automations', '⚡'],
  ['/analytics', 'Analytics', '↗'],
  ['/activity', 'Activity', '☷']
] as const;

const leadStages: LeadStage[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
const taskStages: TaskStatus[] = ['Backlog', 'Planned', 'In Progress', 'Review', 'Blocked', 'Done'];

function currency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

function priorityClass(priority: string) {
  if (priority === 'High') return 'bg-rose-50 text-rose-700 ring-rose-200';
  if (priority === 'Medium') return 'bg-amber-50 text-amber-700 ring-amber-200';
  return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
}

function healthClass(health: string) {
  if (health === 'At Risk') return 'bg-rose-50 text-rose-700 ring-rose-200';
  if (health === 'Watch') return 'bg-amber-50 text-amber-700 ring-amber-200';
  return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
}

function Pill({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${className}`}>{children}</span>;
}

function Card({ title, eyebrow, action, children, className = '' }: { title: string; eyebrow?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-sm shadow-slate-200/60 backdrop-blur ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {eyebrow && <p className="mb-1 text-[11px] font-black uppercase tracking-[0.22em] text-indigo-500">{eyebrow}</p>}
          <h2 className="text-lg font-black tracking-tight text-slate-950">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Metric({ label, value, detail, tone = 'indigo' }: { label: string; value: string; detail: string; tone?: 'indigo' | 'emerald' | 'amber' | 'rose' }) {
  const tones = {
    indigo: 'from-indigo-600 to-violet-600 text-indigo-100',
    emerald: 'from-emerald-500 to-teal-500 text-emerald-50',
    amber: 'from-amber-500 to-orange-500 text-amber-50',
    rose: 'from-rose-500 to-pink-500 text-rose-50'
  };
  return (
    <div className={`rounded-3xl bg-gradient-to-br ${tones[tone]} p-5 text-white shadow-sm`}>
      <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">{label}</p>
      <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
      <p className="mt-2 text-sm opacity-90">{detail}</p>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const { commandOpen, setCommandOpen, toggleCommand, lastAction, resetDemo } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.tagName === 'SELECT';
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        toggleCommand();
      }
      if (!isTyping && event.key === '?') setCommandOpen(true);
      if (event.key === 'Escape') setCommandOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setCommandOpen, toggleCommand]);

  const go = (path: string) => {
    navigate(path);
    setCommandOpen(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#e0e7ff,transparent_32%),linear-gradient(180deg,#f8fafc,#eef2ff)] text-slate-950 md:grid md:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 hidden h-screen border-r border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl md:flex md:flex-col">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-black text-white shadow-lg shadow-indigo-200">CO</div>
          <div>
            <div className="text-lg font-black tracking-tight">ClientOps Suite</div>
            <div className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">Premium demo</div>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map(([to, label, icon]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition ${isActive ? 'bg-slate-950 text-white shadow-lg shadow-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}>
              <span className="grid h-7 w-7 place-items-center rounded-xl bg-white/10 text-base">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Last action</p>
          <p className="mt-2 text-sm font-bold text-slate-700">{lastAction}</p>
          <button onClick={resetDemo} className="mt-4 w-full rounded-2xl bg-white px-3 py-2 text-sm font-black text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">Reset demo</button>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200/80 bg-white/75 px-5 py-4 backdrop-blur-xl md:px-8">
          <button onClick={toggleCommand} className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg shadow-slate-200">⌘K Command</button>
          <div className="hidden text-sm font-bold text-slate-500 sm:block">CRM · Projects · Quotes · Automations</div>
          <div className="ml-auto flex items-center gap-2">
            <Pill className="bg-emerald-50 text-emerald-700 ring-emerald-200">Live demo</Pill>
            <a href="https://github.com/LaurAndreea10/clientops-suite-app-premium" target="_blank" rel="noreferrer" className="rounded-2xl bg-white px-3 py-2 text-sm font-black text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100">GitHub</a>
          </div>
        </header>
        <div className="p-5 md:p-8">{children}</div>
      </main>

      {commandOpen && (
        <div className="fixed inset-0 z-50 grid place-items-start bg-slate-950/40 p-4 pt-24 backdrop-blur-sm" onClick={() => setCommandOpen(false)}>
          <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="border-b border-slate-100 p-3">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Command palette</p>
              <p className="mt-1 text-sm text-slate-500">Jump to modules, simulate owner workflows, or reset the demo.</p>
            </div>
            <div className="grid gap-2 p-2">
              {nav.map(([to, label, icon]) => (
                <button key={to} onClick={() => go(to)} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-left font-bold text-slate-700 hover:bg-slate-100">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-indigo-50 text-indigo-700">{icon}</span>
                  Open {label}
                </button>
              ))}
              <button onClick={() => { resetDemo(); setCommandOpen(false); }} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-left font-bold text-rose-700 hover:bg-rose-50">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-rose-50">↺</span>
                Reset demo state
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Home() {
  const { leads, tasks } = useAppStore();
  const pipeline = leads.reduce((sum, lead) => sum + lead.value, 0);
  const won = leads.filter((lead) => lead.stage === 'Won').reduce((sum, lead) => sum + lead.value, 0);
  const blocked = tasks.filter((task) => task.status === 'Blocked').length;

  return (
    <Shell>
      <section className="overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-indigo-200 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-indigo-300">ClientOps Suite Premium</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">A CRM command center for client work, pipeline, quotes and delivery.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">A portfolio-ready SaaS front-end prototype built with React, TypeScript, Vite, Zustand, Recharts and Tailwind. It demonstrates product thinking, operational UX and zero-cost GitHub Pages deployment.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <NavLink to="/dashboard" className="rounded-2xl bg-white px-5 py-3 font-black text-slate-950">Open dashboard</NavLink>
          <NavLink to="/pipeline" className="rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/20">View pipeline</NavLink>
        </div>
      </section>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Metric label="Pipeline" value={currency(pipeline)} detail="Open + won opportunity value" />
        <Metric label="Won revenue" value={currency(won)} detail="Closed from current sample data" tone="emerald" />
        <Metric label="Active projects" value={String(projects.length)} detail="Delivery tracked by health" tone="amber" />
        <Metric label="Blocked tasks" value={String(blocked)} detail="Operational risk surfaced early" tone="rose" />
      </div>
    </Shell>
  );
}

function Dashboard() {
  const { leads, tasks } = useAppStore();
  const pipeline = leads.reduce((sum, lead) => sum + lead.value, 0);
  const weighted = leads.reduce((sum, lead) => sum + lead.value * (lead.probability / 100), 0);
  const overdue = tasks.filter((task) => task.status === 'Blocked').length;

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-500">Executive dashboard</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">One screen for sales, delivery and client risk.</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Pipeline" value={currency(pipeline)} detail="Total opportunity value" />
        <Metric label="Weighted" value={currency(Math.round(weighted))} detail="Probability-adjusted forecast" tone="emerald" />
        <Metric label="Bookings" value={String(bookings.length)} detail="Upcoming meetings" tone="amber" />
        <Metric label="Risks" value={String(overdue)} detail="Blocked tasks" tone="rose" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <Card title="Revenue + pipeline trend" eyebrow="Forecast">
          <div className="h-80">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="pipeline" stroke="#6366f1" fill="#c7d2fe" />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#bbf7d0" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Recent activity" eyebrow="Live feed">
          <ActivityList />
        </Card>
      </div>
    </Shell>
  );
}

function Pipeline() {
  const { leads, moveLead } = useAppStore();
  return (
    <Shell>
      <PageTitle eyebrow="Sales pipeline" title="Move leads from first touch to won without losing context." />
      <div className="grid gap-4 xl:grid-cols-6">
        {leadStages.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.stage === stage);
          return (
            <Card key={stage} title={stage} action={<Pill className="bg-slate-50 text-slate-600 ring-slate-200">{stageLeads.length}</Pill>}>
              <div className="space-y-3">
                {stageLeads.map((lead) => (
                  <div key={lead.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-black text-slate-950">{lead.company}</div>
                        <div className="text-xs font-bold text-slate-500">{lead.contact}</div>
                      </div>
                      <Pill className={priorityClass(lead.priority)}>{lead.priority}</Pill>
                    </div>
                    <div className="mt-3 text-sm font-black text-slate-900">{currency(lead.value)}</div>
                    <div className="mt-1 text-xs text-slate-500">{lead.source} · {lead.probability}% · {lead.due}</div>
                    <div className="mt-3 h-2 rounded-full bg-white"><div className="h-2 rounded-full bg-indigo-500" style={{ width: `${lead.probability}%` }} /></div>
                    <button className="mt-3 w-full rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white" onClick={() => moveLead(lead.id, stage === 'Won' ? 'Won' : leadStages[Math.min(leadStages.indexOf(stage) + 1, leadStages.length - 1)])}>Advance</button>
                  </div>
                ))}
                {!stageLeads.length && <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-center text-sm font-bold text-slate-400">Empty stage</div>}
              </div>
            </Card>
          );
        })}
      </div>
    </Shell>
  );
}

function Calendar() {
  return (
    <Shell>
      <PageTitle eyebrow="Scheduling" title="Booking flow with conflict visibility and owner context." />
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Card title="Booking health" eyebrow="Scheduling guardrails">
          <div className="space-y-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">11:00 slot available and confirmed.</div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800">10:30 slot blocked by buffer conflict.</div>
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm font-bold text-indigo-800">Auto-suggest owner based on pipeline stage.</div>
          </div>
        </Card>
        <Card title="Upcoming bookings" eyebrow="Calendar">
          <div className="grid gap-3 md:grid-cols-2">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-black">{booking.title}</div>
                    <div className="text-sm text-slate-500">{booking.client}</div>
                  </div>
                  <Pill className={booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : booking.status === 'Conflict' ? 'bg-rose-50 text-rose-700 ring-rose-200' : 'bg-amber-50 text-amber-700 ring-amber-200'}>{booking.status}</Pill>
                </div>
                <div className="mt-4 text-sm font-bold text-slate-700">{booking.date}</div>
                <div className="text-xs text-slate-500">{booking.owner} · {booking.channel}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function Projects() {
  const { tasks, moveTask } = useAppStore();
  return (
    <Shell>
      <PageTitle eyebrow="Delivery ops" title="Project health and task movement in the same workspace." />
      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project) => (
          <Card key={project.id} title={project.title} action={<Pill className={healthClass(project.health)}>{project.health}</Pill>}>
            <div className="text-sm font-bold text-slate-500">{project.client} · {project.owner}</div>
            <div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-indigo-500" style={{ width: `${project.progress}%` }} /></div>
            <div className="mt-3 flex justify-between text-sm font-bold"><span>{project.progress}% complete</span><span>{currency(project.spent)} / {currency(project.budget)}</span></div>
            <div className="mt-1 text-xs text-slate-500">Due {project.due}</div>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-6">
        {taskStages.map((stage) => {
          const columnTasks = tasks.filter((task) => task.status === stage);
          return (
            <Card key={stage} title={stage} action={<Pill className="bg-slate-50 text-slate-600 ring-slate-200">{columnTasks.length}</Pill>}>
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div key={task.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="font-black">{task.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{task.project} · {task.owner}</div>
                    <Pill className={`mt-3 ${priorityClass(task.priority)}`}>{task.priority}</Pill>
                    <button className="mt-3 w-full rounded-xl bg-indigo-600 px-3 py-2 text-xs font-black text-white" onClick={() => moveTask(task.id, stage === 'Done' ? 'Done' : taskStages[Math.min(taskStages.indexOf(stage) + 1, taskStages.length - 1)])}>Move</button>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </Shell>
  );
}

function Quotes() {
  const { promoApplied, togglePromo } = useAppStore();
  const subtotal = quote.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;
  const copyQuote = () => {
    const lines = [`${quote.id} · ${quote.client}`, ...quote.items.map((item) => `${item.name}: ${currency(item.price)}`), `Total: ${currency(total)}`];
    void navigator.clipboard?.writeText(lines.join('\n'));
  };

  return (
    <Shell>
      <PageTitle eyebrow="Quote builder" title="Estimate, discount and copy a client-ready quote." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <Card title={`Quote ${quote.id}`} eyebrow={quote.status}>
          <div className="space-y-3">
            {quote.items.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                <div>
                  <div className="font-black">{item.name}</div>
                  <div className="text-slate-500">Qty {item.qty}</div>
                </div>
                <div className="font-black">{currency(item.price)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={togglePromo} className="rounded-2xl bg-indigo-600 px-4 py-2 font-black text-white">{promoApplied ? 'Remove promo' : 'Apply SPRINT10'}</button>
            <button onClick={copyQuote} className="rounded-2xl bg-white px-4 py-2 font-black text-slate-700 ring-1 ring-slate-200">Copy quote</button>
          </div>
        </Card>
        <Card title="Summary" eyebrow="Commercials">
          <div className="space-y-3 text-sm">
            <Row label="Client" value={quote.client} />
            <Row label="Subtotal" value={currency(subtotal)} />
            <Row label="Discount" value={`-${currency(discount)}`} />
            <div className="rounded-3xl bg-slate-950 p-5 text-white"><div className="text-xs font-black uppercase tracking-[0.2em] text-indigo-200">Total</div><div className="mt-2 text-4xl font-black">{currency(total)}</div></div>
          </div>
        </Card>
      </div>
    </Shell>
  );
}

function Automations() {
  return (
    <Shell>
      <PageTitle eyebrow="Automation hub" title="Business rules shown as understandable operational cards." />
      <div className="grid gap-4 md:grid-cols-3">
        {automationRules.map((rule) => (
          <Card key={rule.id} title={rule.name} action={<Pill className={rule.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-amber-50 text-amber-700 ring-amber-200'}>{rule.status}</Pill>}>
            <p className="text-sm font-bold text-slate-500">{rule.impact}</p>
            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">IF trigger happens → validate context → create action → write activity event.</div>
          </Card>
        ))}
      </div>
    </Shell>
  );
}

function Analytics() {
  const stageData = leadStages.map((stage) => ({ stage, value: useAppStore.getState().leads.filter((lead) => lead.stage === stage).reduce((sum, lead) => sum + lead.value, 0) }));
  return (
    <Shell>
      <PageTitle eyebrow="Analytics" title="Revenue, pipeline and stage distribution." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Stage value">
          <div className="h-80"><ResponsiveContainer><BarChart data={stageData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="stage" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#6366f1" /></BarChart></ResponsiveContainer></div>
        </Card>
        <Card title="Revenue line">
          <div className="h-80"><ResponsiveContainer><LineChart data={revenueSeries}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} /><Line type="monotone" dataKey="pipeline" stroke="#6366f1" strokeWidth={3} /></LineChart></ResponsiveContainer></div>
        </Card>
      </div>
    </Shell>
  );
}

function Activity() {
  return (
    <Shell>
      <PageTitle eyebrow="Audit trail" title="Every important move becomes a readable event." />
      <Card title="Activity feed">
        <ActivityList />
      </Card>
    </Shell>
  );
}

function ActivityList() {
  return (
    <ul className="space-y-3">
      {activity.map((item) => (
        <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-black text-slate-900">{item.title}</div>
              <div className="mt-1 text-sm text-slate-500">{item.detail}</div>
            </div>
            <Pill className="bg-white text-slate-500 ring-slate-200">{item.time}</Pill>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between border-b border-slate-100 py-2"><span className="text-slate-500">{label}</span><span className="font-black text-slate-900">{value}</span></div>;
}

function PageTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div className="mb-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-500">{eyebrow}</p><h1 className="mt-2 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">{title}</h1></div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pipeline" element={<Pipeline />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/quotes" element={<Quotes />} />
      <Route path="/automations" element={<Automations />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/activity" element={<Activity />} />
    </Routes>
  );
}
