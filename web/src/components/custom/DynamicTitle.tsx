"use client";

import { getVariables } from "@/api";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const getTitle = (route: string) => {
  switch (route) {
    case "register":
      return "S'inscrire";
    case "activate":
      return "Activer le compte";
    case "login":
      return "Se connecter";
    case "recover":
      return "Récupérer le compte";
    case "change-password":
      return "Changer le mot de passe";
    case "reset-password":
      return "Réinitialiser le mot de passe";
    case "payment":
      return "Paiement";
    case "message":
      return "Message";
    default:
      return "Erreur";
  }
};

export default function DynamicTitle() {
  const [name, setName] = useState("CalypSSO");

  const [title, setTitle] = useState("CalypSSO");
  const pathname = usePathname();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Loading settings...");
        const { data: variables } = await getVariables();
        console.log("Settings loaded:", variables);

        setName(variables?.name || "CalypSSO");

        if (variables?.primary_color) {
          document.documentElement.style.setProperty(
            "--primary",
            variables.primary_color,
          );
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const foundTitle = pathname.split("/")[1];
    if (foundTitle) {
      setTitle(`${name} - ${getTitle(foundTitle)}`);
    } else {
      setTitle(name);
    }
  }, [pathname, name]);

  return <title>{title}</title>;
}
