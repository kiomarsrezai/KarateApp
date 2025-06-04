import { useState } from "react";
import { PhoneNumberForm } from "./PhoneNumberForm";
import { OtpForm } from "./OtpForm";
import { UserInfoForm } from "./UserInfoForm";

type Step = 1 | 2 | 3;
const LoginProcess = () => {
  const [step, setStep] = useState<Step>(1);
  const onNext = () => setStep((prev) => (prev + 1) as Step);
  const onPrev = () => setStep((prev) => (prev - 1) as Step);

  const forms: Record<
    Step,
    React.FC<{
      onNext: () => void;
      onPrev: () => void;
    }>
  > = {
    "1": PhoneNumberForm,
    "2": OtpForm,
    "3": UserInfoForm,
  };

  const ActiveForm = forms[step];
  return <ActiveForm onNext={onNext} onPrev={onPrev} />;
};

export default LoginProcess;
