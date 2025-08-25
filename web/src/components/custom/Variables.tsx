"use client";

import { getVariables } from "@/api";
import { useEffect, createContext, useState } from "react";

export const VariablesContext = createContext({
  projectName: "",
  entityName: "",
  emailPlaceholder: "",
  studentEmailRegex: "",
  staffEmailRegex: null as null | string,
  formerStudentEmailRegex: null as null | string,
  mainActivationForm: { fields: [] as string[], floorChoices: [] as string[] },
});

export default function Variables({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projectName, setProjectName] = useState("MyECL");
  const [entityName, setEntityName] = useState("ÉCLAIR");
  const [emailPlaceholder, setEmailPlaceholder] = useState(
    "prenom.nom@etu.ec-lyon.fr",
  );
  const [studentEmailRegex, setStudentEmailRegex] = useState("");
  const [staffEmailRegex, setStaffEmailRegex] = useState<null | string>(null);
  const [formerStudentEmailRegex, setFormerStudentEmailRegex] = useState<
    null | string
  >(null);
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
        setStudentEmailRegex(variables?.student_email_regex || "");
        setStaffEmailRegex(variables?.staff_email_regex || null);
        setFormerStudentEmailRegex(
          variables?.former_student_email_regex || null,
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
      value={{
        projectName,
        entityName,
        emailPlaceholder,
        studentEmailRegex,
        staffEmailRegex,
        formerStudentEmailRegex,
        mainActivationForm,
      }}
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
