import PhoneStep from "../CommonSteps/PhoneStep";
import CodeStep from "../CommonSteps/CodeStep";
import GengerStep from "./steps/GengerStep";
import BirthStep from "./steps/BirthStep";
import NameStep from "./steps/NameStep";
import PhotoStep from "./steps/PhotoStep";
import GoalStep from "./steps/GoalStep";
import AnimatedStepWrapper from "../../../../shared/Components/AnimatedStepWrapper/AnimatedStepWrapper";

import { useEffect, useState } from "react";
import type { FormDataTypes } from "../../types/SignUpTypes";

// Извлекаем сохранённые данные из localStorage или возаращаем дефолт
const getInitialData = (): { formData: FormDataTypes; step: number } => {
  try {
    const data = localStorage.getItem("signup-form");
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("Ошибка чтения из localStorage", error);
  }

  return {
    step: 0,
    formData: {
      phone: "",
      code: "",
      gender: "",
      birth: "",
      name: "",
      photos: [],
      goal: "",
    },
  };
};

const SignUp = () => {
  const { step: initialStep, formData: initialFormData } = getInitialData();

  const [step, setStep] = useState<number>(initialStep);
  const [formData, setFormData] = useState<FormDataTypes>(initialFormData);

  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Сохраняем formData и step при каждом изменении
  useEffect(() => {
    localStorage.setItem("signup-form", JSON.stringify({ step, formData }));
  }, [step, formData]);

  const nextStep = () => {
    setDirection("forward");
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setDirection("backward");
    setStep((s) => s - 1);
  };

  const updateForm = (data: Partial<FormDataTypes>) => {
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
    <GoalStep
      onNext={nextStep}
      onBack={prevStep}
      formData={formData}
      updateForm={updateForm}
    />,
  ];

  return (
    <AnimatedStepWrapper stepKey={step} direction={direction}>
      {steps[step]}
    </AnimatedStepWrapper>
  );
};

export default SignUp;
