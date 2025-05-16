import React, { createContext, useContext, useEffect, useState } from "react";
import {
  deleteModule,
  getModules,
  initDB,
  insertModule,
  updateModuleStatus,
} from "../database/db";
import { Module } from "../types/module";

interface ModuleContextType {
  modules: Module[];
  isLoading: boolean;
  reload: () => Promise<void>;
  createModule: (module: Omit<Module, "id">) => Promise<void>;
  removeModule: (id: number) => Promise<void>;
  changeStatus: (id: number, status: Module["status"]) => Promise<void>;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reload = async () => {
    setIsLoading(true);
    try {
      const mods = await getModules();
      setModules(mods);
    } catch (err) {
      console.error("Failed to load modules:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createModule = async (module: Omit<Module, "id">) => {
    try {
      await insertModule(module);
      await reload();
    } catch (err) {
      console.error("Failed to create module:", err);
    }
  };

  const removeModule = async (id: number) => {
    try {
      await deleteModule(id);
      await reload();
    } catch (err) {
      console.error("Failed to delete module:", err);
    }
  };

  const changeStatus = async (id: number, status: Module["status"]) => {
    try {
      await updateModuleStatus(id, status);
      await reload();
    } catch (err) {
      console.error("Failed to update module status:", err);
    }
  };

  useEffect(() => {
    (async () => {
      await initDB();
      await reload();
    })();
  }, []);

  return (
    <ModuleContext.Provider
      value={{
        modules,
        isLoading,
        reload,
        createModule,
        removeModule,
        changeStatus,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

export const useModules = (): ModuleContextType => {
  const ctx = useContext(ModuleContext);
  if (!ctx) throw new Error("useModules must be used within a ModuleProvider");
  return ctx;
};
