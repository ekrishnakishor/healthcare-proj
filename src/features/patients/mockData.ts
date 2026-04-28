import type { Patient } from './types';

export const MOCK_PATIENTS: Patient[] = [
  { id: 'PT-001', name: 'Marcus Johnson', age: 45, condition: 'Hypertension', status: 'Stable' },
  { id: 'PT-002', name: 'Sarah Williams', age: 32, condition: 'Post-op Recovery', status: 'Stable' },
  { id: 'PT-003', name: 'James Smith', age: 58, condition: 'Cardiac Arrhythmia', status: 'Critical' },
  { id: 'PT-004', name: 'Emily Davis', age: 24, condition: 'Asthma', status: 'Discharged' },
  { id: 'PT-005', name: 'Michael Brown', age: 61, condition: 'Type 2 Diabetes', status: 'Stable' },
  { id: 'PT-006', name: 'Linda Taylor', age: 72, condition: 'Pneumonia', status: 'Critical' }
];