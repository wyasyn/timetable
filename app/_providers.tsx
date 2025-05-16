import React from "react";
import { ModuleProvider } from "../context/ModuleContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ModuleProvider>{children}</ModuleProvider>;
}
