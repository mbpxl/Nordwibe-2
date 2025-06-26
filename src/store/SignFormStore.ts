import { create } from "zustand";
import type { FormDataTypes } from "../types/SignUpTypes";
import { persist } from "zustand/middleware";

interface SignFormStore {
  formData: FormDataTypes;
  updateForm: (data: Partial<FormDataTypes>) => void;
  resetForm: () => void;
  step: number;
  setStep: (step: number) => void;
}

const initialSignFormData: FormDataTypes = {
  phone: "",
  code: "",
  gender: "",
  birth: "",
  name: "",
  photos: [],
  goal: "",
};

export const useSignFormStore = create<SignFormStore>()(
  persist(
    (set) => ({
      formData: initialSignFormData,
      step: 0,
      setStep: (step) => set({ step }),
      updateForm: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        })),
      resetForm: () =>
        set({
          formData: initialSignFormData,
          step: 0,
        }),
    }),
    {
      name: "signup-form",
      partialize: (state) => {
        const { formData, step } = state;
        // сохраняем все поля, кроме photos
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { photos, ...rest } = formData;
        return { formData: rest, step };
      },
    }
  )
);