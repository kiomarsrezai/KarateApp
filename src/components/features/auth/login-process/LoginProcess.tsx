"use client";

import { useState } from "react";
import { PhoneNumberForm } from "./PhoneNumberForm";
import { OtpForm } from "./OtpForm";
import { UserInfoForm } from "./UserInfoForm";

type Step = 1 | 2 | 3;

type LoginProcessProps = {
  onDone: () => void;
};

const LoginProcess = ({ onDone }: LoginProcessProps) => {
  const [step, setStep] = useState<Step>(1);
  const onNext = () =>
    setStep((prev) => {
      const newStep = prev + 1;

      if (newStep === 4) {
        onDone();
      }

      return newStep as Step;
    });
  const onPrev = () => setStep((prev) => (prev - 1) as Step);

  const forms: Record<
    Step,
    React.FC<{
      onNext: () => void;
      onPrev: () => void;
      onDone: () => void;
    }>
  > = {
    "1": UserInfoForm,
    "2": OtpForm,
    "3": UserInfoForm,
  };

  const ActiveForm = forms[step];
  return <ActiveForm onNext={onNext} onPrev={onPrev} onDone={onDone} />;
};

export default LoginProcess;
