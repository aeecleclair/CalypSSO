import { MotionField } from "./MotionField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneCustomInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PhoneCustomInput = ({
  value,
  onChange,
}: PhoneCustomInputProps) => {
  return (
    <MotionField>
      <PhoneInput
        value={value}
        onChange={onChange}
        country={"fr"}
        enableSearch
        specialLabel=""
        placeholder="+33 6 06 06 06 06"
        inputStyle={{
          width: "100%",
          border: "none",
          background: "white",
          padding: "8px 12px",
          paddingLeft: "48px",
          height: "40px",
          borderRadius: "6px",
        }}
        buttonStyle={{
          border: "none",
          background: "white",
          borderRight: "1px solid #d1d5db",
          borderRadius: "6px 0 0 6px",
        }}
      />
    </MotionField>
  );
};
