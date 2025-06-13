import { SuccessCard } from "@/components/custom/SuccessCard";
import { HiOutlineLockClosed } from "react-icons/hi";

const SuccessPage = () => {
  return (
    <SuccessCard
      title="Nouveau mot de passe"
      description="Votre mot de passe a été modifié avec succès"
      icon={HiOutlineLockClosed}
    />
  );
};

export default SuccessPage;
