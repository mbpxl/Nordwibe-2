import PhoneStep from "../CommonSteps/PhoneStep";
import CodeStep from "../CommonSteps/CodeStep";
import GengerStep from "./steps/GengerStep";
import BirthStep from "./steps/BirthStep";
import NameStep from "./steps/NameStep";
import PhotoStep from "./steps/PhotoStep";
import GoalStep from "./steps/GoalStep";
import AnimatedStepWrapper from "../../../../shared/Components/AnimatedStepWrapper/AnimatedStepWrapper";

import { useCallback, useEffect, useState } from "react";
import type { FormDataTypes } from "../../types/SignUpTypes";

// Читаем из localStorage, НО photos всегда инициализируем как []
const getInitialData = (): { formData: FormDataTypes; step: number } => {
  try {
    const data = localStorage.getItem("signup-form");
    if (data) {
      const parsed = JSON.parse(data);
      return {
        step: parsed.step ?? 0,
        formData: {
          phone: parsed.formData?.phone ?? "",
          code: parsed.formData?.code ?? "",
          gender: parsed.formData?.gender ?? null,
          birth: parsed.formData?.birth ?? "",
          name: parsed.formData?.name ?? "",
          photos: [], // ❗️фото не восстанавливаем из localStorage
          goal: parsed.formData?.goal ?? null,
        },
      };
    }
  } catch (error) {
    console.log("Ошибка чтения из localStorage", error);
  }

  return {
    step: 0,
    formData: {
      phone: "",
      code: "",
      gender: null,
      birth: "",
      name: "",
      photos: [], // по умолчанию пусто
      goal: null,
    },
  };
};

const SignUp = () => {
  const { step: initialStep, formData: initialFormData } = getInitialData();

  const [step, setStep] = useState<number>(initialStep);
  const [formData, setFormData] = useState<FormDataTypes>(initialFormData);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  // Сохраняем всё, КРОМЕ photos (File нельзя сериализовать)
  useEffect(() => {
    const { photos: _omit, ...rest } = formData;
    localStorage.setItem(
      "signup-form",
      JSON.stringify({ step, formData: rest })
    );
  }, [step, formData]);

  const nextStep = useCallback(() => {
    setDirection("forward");
    setStep((s) => s + 1);
  }, []);

  const prevStep = useCallback(() => {
    setDirection("backward");
    setStep((s) => s - 1);
  }, []);

  const updateForm = useCallback((data: Partial<FormDataTypes>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

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
    <div className="lg:bg-[url(/imgs/desktop/sign-background.jpg)] bg-cover">
      <AnimatedStepWrapper stepKey={step} direction={direction}>
        {steps[step]}
      </AnimatedStepWrapper>
    </div>
  );
};

export default SignUp;
