import { SuccessCard } from "@/components/custom/SuccessCard";
import { HiOutlineMail } from "react-icons/hi";

const SuccessPage = () => {
  return (
    <SuccessCard
      title="Mail envoyé"
      description="Un mail a été envoyé à l'adresse indiquée"
      icon={HiOutlineMail}
    />
  );
};

export default SuccessPage;
