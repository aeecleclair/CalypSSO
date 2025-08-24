"use client";

import { getVariables } from "@/api";
import { useEffect, createContext, useState } from "react";

export const VariablesContext = createContext({
  projectName: "",
  entityName: "",
  emailPlaceholder: "",
  mainActivationForm: { fields: [] as string[], floorChoices: [] as string[] },
});

export default function Variables({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projectName, setProjectName] = useState("MyECL");
  const [entityName, setEntityName] = useState("ÉCLAIR");
  const [emailPlaceholder, setEmailPlaceholder] = useState(
    "prenom.nom@etu.ec-lyon.fr",
  );
  const [mainActivationForm, setMainActivationForm] = useState({
    fields: [] as string[],
    floorChoices: [] as string[],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: variables } = await getVariables();

        setProjectName(variables?.name || "MyECL");
        setEntityName(variables?.entity_name || "ÉCLAIR");
        setEmailPlaceholder(
          variables?.email_placeholder || "prenom.nom@etu.ec-lyon.fr",
        );
        setMainActivationForm({
          fields: variables?.main_activation_form.fields || [],
          floorChoices: variables?.main_activation_form.floor_choices || [],
        });

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
      value={{ projectName, entityName, emailPlaceholder, mainActivationForm }}
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
