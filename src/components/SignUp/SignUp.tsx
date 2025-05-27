import { useState } from "react";
import PhoneStep from "./PhoneStep";
import CodeStep from "./CodeStep";

const SignUp = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState({
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
    <PhoneStep onNext={nextStep} formData={formData} updateForm={updateForm} />,
    <CodeStep
      onNext={nextStep}
      onBack={prevStep}
      formData={formData}
      updateForm={updateForm}
    />,
  ];

  return <div>{steps[step]}</div>;
};

export default SignUp;
