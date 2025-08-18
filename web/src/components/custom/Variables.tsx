"use client";

import { getVariables } from "@/api";
import { useEffect, createContext, useState } from "react";

export const VariablesContext = createContext({
  projectName: "",
  entityName: "",
  emailPlaceholder: "",
});

export default function Variables({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projectName, setProjectName] = useState("MyECL");
  const [entityName, setEntityName] = useState("ÉCLAIR");
  const [emailPlaceholder, setEmailPlaceholder] = useState(
    "prenom.nom@etu.ec-lyon.fr",
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: variables } = await getVariables();

        setProjectName(variables?.name || "MyECL");
        setEntityName(variables?.entity_name || "ÉCLAIR");
        setEmailPlaceholder(
          variables?.email_placeholder || "prenom.nom@etu.ec-lyon.fr",
        );

        if (variables?.primary_color) {
          document.documentElement.style.setProperty(
            "--primary",
            variables.primary_color,
          );
          document.documentElement.style.setProperty(
            "--ring",
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
    <VariablesContext.Provider
      value={{ projectName, entityName, emailPlaceholder }}
    >
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
