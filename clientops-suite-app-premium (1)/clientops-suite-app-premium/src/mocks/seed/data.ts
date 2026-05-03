export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
export type TaskStatus = 'Backlog' | 'Planned' | 'In Progress' | 'Review' | 'Blocked' | 'Done';

export const leads = [
  { id: 'l1', company: 'Northstar Studio', contact: 'Ana Ionescu', stage: 'New' as LeadStage, value: 3200, owner: 'Mara', priority: 'High' },
  { id: 'l2', company: 'Pixel Forge', contact: 'Dan Pavel', stage: 'Proposal' as LeadStage, value: 5400, owner: 'Radu', priority: 'Medium' },
  { id: 'l3', company: 'Atlas Care', contact: 'Bianca Pop', stage: 'Negotiation' as LeadStage, value: 8900, owner: 'Mara', priority: 'High' },
  { id: 'l4', company: 'Nova Build', contact: 'Mihai Ene', stage: 'Qualified' as LeadStage, value: 4100, owner: 'Daria', priority: 'Low' }
];

export const bookings = [
  { id: 'b1', title: 'Discovery Call', date: '2026-05-05 10:00', owner: 'Mara', status: 'Confirmed' },
  { id: 'b2', title: 'Sales Demo', date: '2026-05-06 14:30', owner: 'Radu', status: 'Pending' }
];

export const projects = [
  { id: 'p1', title: 'Atlas Website Relaunch', client: 'Atlas Care', progress: 62, health: 'At Risk', budget: 12000 },
  { id: 'p2', title: 'Northstar CRM Setup', client: 'Northstar Studio', progress: 28, health: 'Healthy', budget: 6800 }
];

export const tasks = [
  { id: 't1', title: 'Audit analytics stack', status: 'Backlog' as TaskStatus },
  { id: 't2', title: 'Create landing wireframes', status: 'In Progress' as TaskStatus },
  { id: 't3', title: 'Client review deck', status: 'Review' as TaskStatus },
  { id: 't4', title: 'Fix booking conflict states', status: 'Blocked' as TaskStatus },
  { id: 't5', title: 'Publish quote flow', status: 'Done' as TaskStatus }
];

export const quote = {
  items: [
    { name: 'Analytics Audit', qty: 1, price: 1200 },
    { name: 'Dashboard Setup Add-on', qty: 1, price: 350 }
  ],
  promoCode: 'SPRINT10'
};

export const activity = [
  'Lead moved to Proposal',
  'Booking confirmed for May 5',
  'Quote created for Atlas Care',
  'Task marked overdue',
  'Project health changed to At Risk'
];

export const revenueSeries = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 5100 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 7600 },
  { month: 'May', revenue: 8300 }
];
