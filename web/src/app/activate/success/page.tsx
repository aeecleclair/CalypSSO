import { SuccessCard } from "@/components/custom/SuccessCard";
import { HiCheck } from "react-icons/hi";

const SuccessPage = () => {
  return (
    <SuccessCard
      title="Inscription réussie"
      description="Votre compte a été créé avec succès"
      icon={HiCheck({ className: "w-32 h-32 m-auto" })}
      showDownloadButtons={true}
    />
  );
};

export default SuccessPage;
