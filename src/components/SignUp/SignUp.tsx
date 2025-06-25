import { useState } from "react";
import PhoneStep from "./steps/PhoneStep";
import CodeStep from "./steps/CodeStep";
import GengerStep from "./steps/GengerStep";
import BirthStep from "./steps/BirthStep";
import NameStep from "./steps/NameStep";
import PhotoStep from "./steps/PhotoStep";
import type { FormDataTypes } from "../../types/SignUpTypes";
import AnimatedStepWrapper from "../AnimatedStepWrapper/AnimatedStepWrapper";

const SignUp = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataTypes>({
    phone: "",
    code: "",
    gender: "",
    birth: "",
    name: "",
    photos: [],
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
    <GengerStep
      onNext={nextStep}
      onBack={prevStep}
      formData={formData}
      updateForm={updateForm}
    />,
    <BirthStep
      onNext={nextStep}
      onBack={prevStep}
      formData={formData}
      updateForm={updateForm}
    />,
    <NameStep
      onNext={nextStep}
      onBack={prevStep}
      formData={formData}
      updateForm={updateForm}
    />,
    <PhotoStep
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

export default SignUp;
