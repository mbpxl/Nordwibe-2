import { useState } from "react";
import type { FormDataTypes } from "../../types/SignUpTypes";
import PhoneStep from "./steps/PhoneStep";
import CodeStep from "./steps/CodeStep";

const SignIn = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormDataTypes>({
    phone: "",
    code: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

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

  return <div>{steps[step]}</div>;
};

export default SignIn;
