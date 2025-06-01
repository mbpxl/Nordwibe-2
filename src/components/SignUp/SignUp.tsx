import { useState } from "react";
import PhoneStep from "./steps/PhoneStep";
import CodeStep from "./steps/CodeStep";
import GengerStep from "./steps/GengerStep";
import BirthStep from "./steps/BirthStep";
import type { FormDataTypes } from "../../types/SignUpTypes";
import NameStep from "./steps/NameStep";
import PhotoStep from "./steps/PhotoStep";

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

  return <div>{steps[step]}</div>;
};

export default SignUp;
