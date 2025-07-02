export type FormDataTypes = {
  phone: string;
  code?: string;
  gender?: string;
  birth?: string;
  name?: string;
  photos?: File[];
  goal?: string;
}

export type HeadingComponentTypes = {
  title?: string;
  subTitle?: string;
  isCodeStep?: boolean;
  formData: FormDataTypes
};

export type StepPropsTypes<Key extends keyof FormDataTypes> = {
  onNext: () => void;
  onBack: () => void;
  // formData: FormDataTypes;
  // updateForm: (data: Pick<FormDataTypes, Key>) => void;
}
