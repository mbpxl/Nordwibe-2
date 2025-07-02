import { useState } from "react";
import PhoneStep from "./steps/PhoneStep";
import CodeStep from "./steps/CodeStep";
import GengerStep from "./steps/GengerStep";
import BirthStep from "./steps/BirthStep";
import NameStep from "./steps/NameStep";
import PhotoStep from "./steps/PhotoStep";
import AnimatedStepWrapper from "../../../../shared/Components/AnimatedStepWrapper/AnimatedStepWrapper";
import GoalStep from "./steps/GoalStep";
import { useSignFormStore } from "../../../../shared/store/SignFormStore";

const SignUp = () => {
  const { step, setStep } = useSignFormStore();

  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const nextStep = () => {
    setDirection("forward");
    setStep(step + 1);
  };

  const prevStep = () => {
    setDirection("backward");
    setStep(step - 1);
  };

  const steps = [
    <PhoneStep onNext={nextStep} onBack={prevStep} />,
    <CodeStep onNext={nextStep} onBack={prevStep} />,
    <GengerStep onNext={nextStep} onBack={prevStep} />,
    <BirthStep onNext={nextStep} onBack={prevStep} />,
    <NameStep onNext={nextStep} onBack={prevStep} />,
    <PhotoStep onNext={nextStep} onBack={prevStep} />,
    <GoalStep onNext={nextStep} onBack={prevStep} />,
  ];

  return (
    <>
      <AnimatedStepWrapper stepKey={step} direction={direction}>
        {steps[step]}
      </AnimatedStepWrapper>
    </>
  );
};

export default SignUp;
