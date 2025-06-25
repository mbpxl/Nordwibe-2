import { useState } from "react";
import type { FormDataTypes } from "../../types/SignUpTypes";
import PhoneStep from "./steps/PhoneStep";
import CodeStep from "./steps/CodeStep";
import AnimatedStepWrapper from "../AnimatedStepWrapper/AnimatedStepWrapper";

const SignIn = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataTypes>({
    phone: "",
    code: "",
  });

  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const nextStep = () => {
    setDirection("forward");
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setDirection("backward");
    setStep((s) => s - 1);
  };

  const updateForm = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const steps = [
    <PhoneStep
      onNext={nextStep}
      onBack={prevStep}
      formData={formData}
      updateForm={updateForm}
    />,
    <CodeStep
      onNext={nextStep}
      onBack={prevStep}
      formData={formData}
      updateForm={updateForm}
    />,
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <AnimatedStepWrapper stepKey={step} direction={direction}>
        {steps[step]}
      </AnimatedStepWrapper>
    </div>
  );
};

export default SignIn;
