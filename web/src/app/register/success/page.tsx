import { SuccessCard } from "@/components/custom/SuccessCard";
import { HiOutlineMail } from "react-icons/hi";

const SuccessPage = () => {
  return (
    <SuccessCard
      title="Mail envoyé"
      description="Un mail a été envoyé à l'adresse indiquée"
      icon={HiOutlineMail({ className: "w-32 h-32 m-auto" })}
    />
  );
};

export default SuccessPage;
