import { create } from 'zustand';
import { leads as seedLeads, tasks as seedTasks, quote as seedQuote, type LeadStage, type TaskStatus } from '@/mocks/seed/data';

type Lead = typeof seedLeads[number];
type Task = typeof seedTasks[number];

type AppState = {
  leads: Lead[];
  tasks: Task[];
  promoApplied: boolean;
  moveLead: (id: string, stage: LeadStage) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  togglePromo: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  leads: seedLeads,
  tasks: seedTasks,
  promoApplied: !!seedQuote.promoCode,
  moveLead: (id, stage) => set((state) => ({ leads: state.leads.map((l) => l.id === id ? { ...l, stage } : l) })),
  moveTask: (id, status) => set((state) => ({ tasks: state.tasks.map((t) => t.id === id ? { ...t, status } : t) })),
  togglePromo: () => set((state) => ({ promoApplied: !state.promoApplied }))
}));
