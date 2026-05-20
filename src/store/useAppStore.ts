import { create } from 'zustand';
import { leads as seedLeads, tasks as seedTasks, quote as seedQuote, type Lead, type LeadStage, type Task, type TaskStatus } from '@/mocks/seed/data';

type AppState = {
  leads: Lead[];
  tasks: Task[];
  promoApplied: boolean;
  commandOpen: boolean;
  lastAction: string;
  moveLead: (id: string, stage: LeadStage) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  togglePromo: () => void;
  toggleCommand: () => void;
  setCommandOpen: (open: boolean) => void;
  resetDemo: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  leads: seedLeads,
  tasks: seedTasks,
  promoApplied: !!seedQuote.promoCode,
  commandOpen: false,
  lastAction: 'Demo loaded',
  moveLead: (id, stage) => set((state) => ({
    leads: state.leads.map((lead) => lead.id === id ? { ...lead, stage, probability: stage === 'Won' ? 100 : Math.max(lead.probability, 20) } : lead),
    lastAction: `Lead moved to ${stage}`
  })),
  moveTask: (id, status) => set((state) => ({
    tasks: state.tasks.map((task) => task.id === id ? { ...task, status } : task),
    lastAction: `Task moved to ${status}`
  })),
  togglePromo: () => set((state) => ({
    promoApplied: !state.promoApplied,
    lastAction: state.promoApplied ? 'Promo removed' : 'Promo applied'
  })),
  toggleCommand: () => set((state) => ({ commandOpen: !state.commandOpen })),
  setCommandOpen: (open) => set({ commandOpen: open }),
  resetDemo: () => set({ leads: seedLeads, tasks: seedTasks, promoApplied: !!seedQuote.promoCode, lastAction: 'Demo reset' })
}));
