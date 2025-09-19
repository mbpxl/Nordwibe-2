export type FormDataTypes = {
  phone: string;
  code: string;
  gender?: "Женский" | "Мужской" | null | undefined;
  birth?: string;
  name?: string;
  photos?: Array<File | string>;
  goal?:
    | "Поиск жилья"
    | "Поиск соседа"
    | "Сдать жильё"
    | "Поиск комнаты"
    | null
    | undefined;
};
export type GenderType = FormDataTypes["gender"];
export type GoalType = FormDataTypes["goal"];

export type HeadingComponentTypes = {
  title?: string;
  subTitle?: string;
  isCodeStep?: boolean;
};

export type StepPropsTypes<Key extends keyof FormDataTypes> = {
  onNext: () => void;
  onBack: () => void;
  formData: FormDataTypes;
  updateForm: (data: Pick<FormDataTypes, Key>) => void;
};
