"use client";

import { getVariables } from "@/api";
import { useEffect, createContext, useState } from "react";

export const VariablesContext = createContext({
  projectName: "CalypSSO",
  entityName: "Eclair",
});

export default function Variables({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projectName, setProjectName] = useState("CalypSSO");
  const [entityName, setEntityName] = useState("Eclair");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: variables } = await getVariables();

        setProjectName(variables?.name || "CalypSSO");
        setEntityName(variables?.entity_name || "Eclair");

        if (variables?.primary_color) {
          document.documentElement.style.setProperty(
            "--primary",
            variables.primary_color,
          );
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <VariablesContext.Provider value={{ projectName, entityName }}>
      {isLoading ? (
        <></>
      ) : (
        <>
          <title>{projectName}</title>
          {children}
        </>
      )}
    </VariablesContext.Provider>
  );
}
