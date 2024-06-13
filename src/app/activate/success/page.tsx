import { SuccessCard } from "@/components/custom/SuccessCard";
import { HiCheck } from "react-icons/hi";

const SuccessPage = () => {
  return (
    <SuccessCard
      title="Inscription réussie"
      description="Votre compte a été créé avec succès"
      icon={HiCheck}
    />
  );
};

export default SuccessPage;
