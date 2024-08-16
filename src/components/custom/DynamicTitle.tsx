"use client";
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
        case "reset-password":
            return "Réinitialiser le mot de passe";
        default:
            return "Erreur";
    }   
}

export default function DynamicTitle() {
  const [title, setTitle] = useState("MyECL");
  const pathname = usePathname();

  useEffect(() => {
    const foundTitle = pathname.split("/")[1];
    if (foundTitle) {
      setTitle(`Myecl - ${getTitle(foundTitle)}`);
    } else {
      setTitle("MyECL");
    }
  }, [pathname]);

  return <title>{title}</title>;
}