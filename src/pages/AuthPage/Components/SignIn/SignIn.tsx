import { useEffect, useState } from "react";
import AnimatedStepWrapper from "../../../../shared/Components/AnimatedStepWrapper/AnimatedStepWrapper";
import type { FormDataTypes } from "../../types/SignUpTypes";
import PhoneStep from "../CommonSteps/PhoneStep";
import CodeStep from "../CommonSteps/CodeStep";

// Извлекаем сохранённые данные из localStorage или возаращаем дефолт
const getInitialData = (): { formData: FormDataTypes; step: number } => {
  try {
    const data = localStorage.getItem("signin-form");
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
    },
  };
};

const SignIn = () => {
  const { step: initialStep, formData: initialFormData } = getInitialData();

  const [formData, setFormData] = useState<FormDataTypes>(initialFormData);

  const updateForm = (data: Partial<FormDataTypes>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const [step, setStep] = useState<number>(initialStep);

  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Сохраняем formData и step при каждом изменении
  useEffect(() => {
    localStorage.setItem("signin-form", JSON.stringify({ step, formData }));
  }, [step, formData]);

  const nextStep = () => {
    setDirection("forward");
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    setDirection("backward");
    setStep((s) => s - 1);
  };

  const steps = [
    <PhoneStep
      formData={formData}
      onNext={nextStep}
      onBack={prevStep}
      updateForm={updateForm}
    />,
    <CodeStep
      formData={formData}
      onNext={nextStep}
      onBack={prevStep}
      updateForm={updateForm}
    />,
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
