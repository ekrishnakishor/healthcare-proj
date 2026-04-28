import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  patientViewMode: 'grid' | 'list';
  setPatientViewMode: (mode: 'grid' | 'list') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      patientViewMode: 'list', // Default state
      setPatientViewMode: (mode) => set({ patientViewMode: mode }),
    }),
    {
      name: 'careos-ui-storage', // Key used in localStorage
    }
  )
);