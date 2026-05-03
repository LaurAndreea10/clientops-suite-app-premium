import { NavLink, Route, Routes } from 'react-router-dom';
import { bookings, projects, revenueSeries, activity, quote } from '@/mocks/seed/data';
import { useAppStore } from '@/store/useAppStore';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const nav = [
  ['/', 'Home'],
  ['/dashboard', 'Dashboard'],
  ['/pipeline', 'Pipeline'],
  ['/calendar', 'Calendar'],
  ['/projects', 'Projects'],
  ['/quotes', 'Quotes'],
  ['/analytics', 'Analytics'],
  ['/activity', 'Activity']
] as const;

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-r border-slate-200 bg-white p-5">
        <div className="mb-6 text-xl font-bold">ClientOps Suite</div>
        <nav className="space-y-1">
          {nav.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => `block rounded-xl px-3 py-2 text-sm ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="mb-4 text-lg font-semibold">{title}</h2>{children}</section>;
}

function Home() {
  return <Shell><div className="space-y-6"><div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-8 text-white"><h1 className="text-4xl font-bold">A zero-cost SaaS flagship demo</h1><p className="mt-3 max-w-2xl text-indigo-100">CRM, scheduling, projects, quotes, analytics, and activity feed in one portfolio-ready front-end app.</p></div></div></Shell>;
}

function Dashboard() {
  return <Shell><div className="grid gap-6 lg:grid-cols-2"><Card title="Revenue trend"><div style={{ width: '100%', height: 260 }}><ResponsiveContainer><BarChart data={revenueSeries}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="revenue" /></BarChart></ResponsiveContainer></div></Card><Card title="Recent activity"><ul className="space-y-3 text-sm text-slate-700">{activity.map((item) => <li key={item} className="rounded-xl bg-slate-50 p-3">{item}</li>)}</ul></Card><Card title="Upcoming bookings"><ul className="space-y-3">{bookings.map((b) => <li key={b.id} className="flex items-center justify-between rounded-xl border p-3 text-sm"><span>{b.title}</span><span className="text-slate-500">{b.date}</span></li>)}</ul></Card><Card title="Projects at a glance"><ul className="space-y-3">{projects.map((p) => <li key={p.id} className="rounded-xl border p-3"><div className="font-medium">{p.title}</div><div className="text-sm text-slate-500">{p.client} · {p.progress}% · {p.health}</div></li>)}</ul></Card></div></Shell>;
}

function Pipeline() {
  const { leads, moveLead } = useAppStore();
  const stages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Won'] as const;
  return <Shell><div className="grid gap-4 xl:grid-cols-5">{stages.map((stage) => <Card key={stage} title={stage}><div className="space-y-3">{leads.filter((l) => l.stage === stage).map((lead) => <div key={lead.id} className="rounded-xl border p-3 text-sm"><div className="font-semibold">{lead.company}</div><div className="text-slate-500">{lead.contact}</div><div className="mt-2 flex items-center justify-between"><span>€{lead.value}</span><button className="rounded-lg bg-slate-900 px-2 py-1 text-white" onClick={() => moveLead(lead.id, stage === 'Won' ? 'Won' : stages[Math.min(stages.indexOf(stage)+1, stages.length-1)])}>Advance</button></div></div>) || <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-400">No leads</div>}</div></Card>)}</div></Shell>;
}

function Calendar() {
  return <Shell><div className="grid gap-6 lg:grid-cols-2"><Card title="Booking flow"><div className="space-y-3 text-sm"><div className="rounded-xl border p-3">Selected owner: Mara</div><div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-900">10:30 slot unavailable due to buffer conflict.</div><div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-emerald-900">11:00 slot available and confirmed.</div></div></Card><Card title="Upcoming"><ul className="space-y-3">{bookings.map((b) => <li key={b.id} className="rounded-xl border p-3 text-sm">{b.title} · {b.date} · {b.status}</li>)}</ul></Card></div></Shell>;
}

function Projects() {
  const { tasks, moveTask } = useAppStore();
  const columns = ['Backlog', 'In Progress', 'Review', 'Blocked', 'Done'] as const;
  return <Shell><div className="mb-6 grid gap-4 md:grid-cols-2">{projects.map((p) => <Card key={p.id} title={p.title}><div className="text-sm text-slate-600">{p.client}</div><div className="mt-2 text-sm">Progress: {p.progress}%</div><div className="text-sm">Health: {p.health}</div></Card>)}</div><div className="grid gap-4 xl:grid-cols-5">{columns.map((col) => <Card key={col} title={col}><div className="space-y-3">{tasks.filter((t) => t.status === col).map((task) => <div key={task.id} className="rounded-xl border p-3 text-sm"><div className="font-medium">{task.title}</div><button className="mt-2 rounded-lg bg-indigo-600 px-2 py-1 text-white" onClick={() => moveTask(task.id, col === 'Done' ? 'Done' : columns[Math.min(columns.indexOf(col)+1, columns.length-1)])}>Move</button></div>) || <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-400">Empty</div>}</div></Card>)}</div></Shell>;
}

function Quotes() {
  const { promoApplied, togglePromo } = useAppStore();
  const subtotal = quote.items.reduce((s, i) => s + i.qty * i.price, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  return <Shell><div className="grid gap-6 lg:grid-cols-[1.4fr_.8fr]"><Card title="Quote builder"><ul className="space-y-3">{quote.items.map((item) => <li key={item.name} className="flex justify-between rounded-xl border p-3 text-sm"><span>{item.name}</span><span>€{item.price}</span></li>)}</ul><button onClick={togglePromo} className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-white">{promoApplied ? 'Remove promo' : 'Apply SPRINT10'}</button></Card><Card title="Summary"><div className="space-y-2 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>€{subtotal}</span></div><div className="flex justify-between"><span>Discount</span><span>-€{discount}</span></div><div className="flex justify-between font-semibold"><span>Total</span><span>€{subtotal-discount}</span></div></div></Card></div></Shell>;
}

function Analytics() { return <Dashboard />; }
function Activity() { return <Shell><Card title="Activity feed"><ul className="space-y-3 text-sm">{activity.map((item, i) => <li key={i} className="rounded-xl border p-3">{item}</li>)}</ul></Card></Shell>; }

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pipeline" element={<Pipeline />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/quotes" element={<Quotes />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/activity" element={<Activity />} />
    </Routes>
  );
}
