export type ModuleStatus = "pending" | "completed";

export interface Module {
  id: number;
  name: string;
  date: string; // ISO date
  time: string; // HH:mm
  location: string;
  supervisor: string;
  notes?: string;
  status: ModuleStatus;
}
