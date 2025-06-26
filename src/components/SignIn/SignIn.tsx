import { useState } from "react";
import PhoneStep from "./steps/PhoneStep";
import CodeStep from "./steps/CodeStep";
import AnimatedStepWrapper from "../AnimatedStepWrapper/AnimatedStepWrapper";

const SignIn = () => {
  const [step, setStep] = useState<number>(0);

  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const nextStep = () => {
    setDirection("forward");
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setDirection("backward");
    setStep((s) => s - 1);
  };

  const steps = [
    <PhoneStep onNext={nextStep} onBack={prevStep} />,
    <CodeStep onNext={nextStep} onBack={prevStep} />,
  ];

  return (
    <>
      <AnimatedStepWrapper stepKey={step} direction={direction}>
        {steps[step]}
      </AnimatedStepWrapper>
    </>
  );
};

export default SignIn;
