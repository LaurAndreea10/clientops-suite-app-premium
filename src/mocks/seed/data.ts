export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
export type TaskStatus = 'Backlog' | 'Planned' | 'In Progress' | 'Review' | 'Blocked' | 'Done';
export type Priority = 'High' | 'Medium' | 'Low';
export type Health = 'Healthy' | 'Watch' | 'At Risk';

export type Lead = {
  id: string;
  company: string;
  contact: string;
  email: string;
  stage: LeadStage;
  value: number;
  owner: string;
  priority: Priority;
  source: string;
  probability: number;
  nextStep: string;
  due: string;
};

export type Booking = {
  id: string;
  title: string;
  date: string;
  owner: string;
  status: 'Confirmed' | 'Pending' | 'Conflict';
  client: string;
  channel: string;
};

export type Project = {
  id: string;
  title: string;
  client: string;
  progress: number;
  health: Health;
  budget: number;
  spent: number;
  due: string;
  owner: string;
};

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  owner: string;
  priority: Priority;
  project: string;
};

export const leads: Lead[] = [
  { id: 'l1', company: 'Northstar Studio', contact: 'Ana Ionescu', email: 'ana@northstar.test', stage: 'New', value: 3200, owner: 'Mara', priority: 'High', source: 'LinkedIn', probability: 18, nextStep: 'Send discovery notes', due: 'Today' },
  { id: 'l2', company: 'Pixel Forge', contact: 'Dan Pavel', email: 'dan@pixelforge.test', stage: 'Proposal', value: 5400, owner: 'Radu', priority: 'Medium', source: 'Referral', probability: 58, nextStep: 'Review offer scope', due: 'Tomorrow' },
  { id: 'l3', company: 'Atlas Care', contact: 'Bianca Pop', email: 'bianca@atlascare.test', stage: 'Negotiation', value: 8900, owner: 'Mara', priority: 'High', source: 'Website', probability: 72, nextStep: 'Confirm timeline', due: 'May 22' },
  { id: 'l4', company: 'Nova Build', contact: 'Mihai Ene', email: 'mihai@novabuild.test', stage: 'Qualified', value: 4100, owner: 'Daria', priority: 'Low', source: 'Inbound', probability: 42, nextStep: 'Book technical demo', due: 'May 24' },
  { id: 'l5', company: 'Luma Clinic', contact: 'Irina Matei', email: 'irina@luma.test', stage: 'Contacted', value: 2600, owner: 'Daria', priority: 'Medium', source: 'Campaign', probability: 34, nextStep: 'Send pricing page', due: 'Friday' },
  { id: 'l6', company: 'Craftly Market', contact: 'Sorin Vlad', email: 'sorin@craftly.test', stage: 'Won', value: 12000, owner: 'Radu', priority: 'High', source: 'Partner', probability: 100, nextStep: 'Kickoff call', due: 'Booked' }
];

export const bookings: Booking[] = [
  { id: 'b1', title: 'Discovery Call', date: '2026-05-20 10:00', owner: 'Mara', status: 'Confirmed', client: 'Northstar Studio', channel: 'Google Meet' },
  { id: 'b2', title: 'Sales Demo', date: '2026-05-21 14:30', owner: 'Radu', status: 'Pending', client: 'Pixel Forge', channel: 'Zoom' },
  { id: 'b3', title: 'Implementation Review', date: '2026-05-22 11:00', owner: 'Daria', status: 'Conflict', client: 'Atlas Care', channel: 'Phone' },
  { id: 'b4', title: 'Contract Review', date: '2026-05-24 09:30', owner: 'Mara', status: 'Confirmed', client: 'Craftly Market', channel: 'Google Meet' }
];

export const projects: Project[] = [
  { id: 'p1', title: 'Atlas Website Relaunch', client: 'Atlas Care', progress: 62, health: 'At Risk', budget: 12000, spent: 7900, due: '2026-06-04', owner: 'Mara' },
  { id: 'p2', title: 'Northstar CRM Setup', client: 'Northstar Studio', progress: 28, health: 'Healthy', budget: 6800, spent: 2100, due: '2026-06-18', owner: 'Daria' },
  { id: 'p3', title: 'Craftly Onboarding Hub', client: 'Craftly Market', progress: 86, health: 'Healthy', budget: 14500, spent: 11900, due: '2026-05-30', owner: 'Radu' },
  { id: 'p4', title: 'Pixel Forge Analytics', client: 'Pixel Forge', progress: 44, health: 'Watch', budget: 9200, spent: 4700, due: '2026-06-11', owner: 'Mara' }
];

export const tasks: Task[] = [
  { id: 't1', title: 'Audit analytics stack', status: 'Backlog', owner: 'Mara', priority: 'Medium', project: 'Pixel Forge Analytics' },
  { id: 't2', title: 'Create landing wireframes', status: 'In Progress', owner: 'Daria', priority: 'High', project: 'Northstar CRM Setup' },
  { id: 't3', title: 'Client review deck', status: 'Review', owner: 'Radu', priority: 'Medium', project: 'Craftly Onboarding Hub' },
  { id: 't4', title: 'Fix booking conflict states', status: 'Blocked', owner: 'Mara', priority: 'High', project: 'Atlas Website Relaunch' },
  { id: 't5', title: 'Publish quote flow', status: 'Done', owner: 'Daria', priority: 'Low', project: 'Northstar CRM Setup' },
  { id: 't6', title: 'Prepare kickoff checklist', status: 'Planned', owner: 'Radu', priority: 'Medium', project: 'Craftly Onboarding Hub' },
  { id: 't7', title: 'Map invoice line items', status: 'Backlog', owner: 'Mara', priority: 'Medium', project: 'Atlas Website Relaunch' }
];

export const quote = {
  id: 'q-2048',
  client: 'Atlas Care',
  status: 'Ready to send',
  promoCode: 'SPRINT10',
  items: [
    { name: 'Analytics Audit', qty: 1, price: 1200 },
    { name: 'Dashboard Setup Add-on', qty: 1, price: 350 },
    { name: 'CRM Pipeline Configuration', qty: 1, price: 980 },
    { name: 'Client Portal Prototype', qty: 1, price: 1450 }
  ]
};

export const activity = [
  { id: 'a1', type: 'lead', title: 'Lead moved to Proposal', detail: 'Pixel Forge advanced after pricing review', time: '2m ago' },
  { id: 'a2', type: 'booking', title: 'Booking confirmed', detail: 'Northstar discovery call confirmed for 10:00', time: '14m ago' },
  { id: 'a3', type: 'quote', title: 'Quote created', detail: 'Atlas Care quote q-2048 ready to send', time: '1h ago' },
  { id: 'a4', type: 'task', title: 'Task marked overdue', detail: 'Booking conflict states needs owner review', time: '3h ago' },
  { id: 'a5', type: 'project', title: 'Project health changed', detail: 'Atlas Website Relaunch moved to At Risk', time: 'Yesterday' }
];

export const revenueSeries = [
  { month: 'Jan', revenue: 4200, pipeline: 8100 },
  { month: 'Feb', revenue: 5100, pipeline: 9400 },
  { month: 'Mar', revenue: 4800, pipeline: 10300 },
  { month: 'Apr', revenue: 7600, pipeline: 12800 },
  { month: 'May', revenue: 8300, pipeline: 15100 },
  { month: 'Jun', revenue: 9800, pipeline: 17600 }
];

export const automationRules = [
  { id: 'r1', name: 'Won lead → create kickoff project', status: 'Active', impact: '4h saved / week' },
  { id: 'r2', name: 'Booking conflict → notify owner', status: 'Active', impact: '12 conflicts caught' },
  { id: 'r3', name: 'Quote sent → follow-up in 48h', status: 'Draft', impact: 'Expected +9% reply rate' }
];
