import AsyncStorage from "@react-native-async-storage/async-storage";
import { Module } from "../types/module";

const STORAGE_KEY = "MODULES_STORAGE";

// Helper to load all modules from AsyncStorage
async function loadModules(): Promise<Module[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? (JSON.parse(json) as Module[]) : [];
}

// Helper to save modules array to AsyncStorage
async function saveModules(modules: Module[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
}

// Initialize storage (no-op for AsyncStorage)
export const initDB = async (): Promise<void> => {
  // Optionally clear or ensure key exists
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  if (existing === null) {
    await saveModules([]);
  }
};

// Fetch all modules sorted by date/time
export const getModules = async (): Promise<Module[]> => {
  const modules = await loadModules();
  return modules.sort((a, b) => {
    const dtA = `${a.date}T${a.time}`;
    const dtB = `${b.date}T${b.time}`;
    return dtA.localeCompare(dtB);
  });
};

// Insert a module record, returns new ID
export const insertModule = async (
  module: Omit<Module, "id">
): Promise<number> => {
  const modules = await loadModules();
  const newId = modules.length ? Math.max(...modules.map((m) => m.id)) + 1 : 1;
  const newModule: Module = { id: newId, ...module };
  modules.push(newModule);
  await saveModules(modules);
  return newId;
};

// Delete a module by id
export const deleteModule = async (id: number): Promise<void> => {
  const modules = await loadModules();
  const filtered = modules.filter((m) => m.id !== id);
  await saveModules(filtered);
};

// Update module status
export const updateModuleStatus = async (
  id: number,
  status: Module["status"]
): Promise<void> => {
  const modules = await loadModules();
  const updated = modules.map((m) => (m.id === id ? { ...m, status } : m));
  await saveModules(updated);
};
