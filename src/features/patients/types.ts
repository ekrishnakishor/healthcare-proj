export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  status: 'Stable' | 'Critical' | 'Discharged';
}