import { useCallback, useEffect, useRef, useState } from "react";
import type { StepPropsTypes } from "../../types/SignUpTypes";
import Continue from "../Continue/Continue";
import GoBackButton from "../SignUp/GoBackButton";
import Heading from "../SignUp/Heading";
import useFormatUnformatCode from "../../hooks/useFormatCode";
import React from "react";

type Props = StepPropsTypes<"code">;

const CodeStep: React.FC<Props> = React.memo(
  ({ formData, updateForm, onNext, onBack }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // форматирование телефона в вид 0-0-0-0
    const { formatCode, handleChange } = useFormatUnformatCode();

    const [code, setCode] = useState(formData.code || "");
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // Таймер 30 секунд
    useEffect(() => {
      if (timer <= 0) {
        setCanResend(true);
        return;
      }

      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [timer]);

    const handleNext = useCallback(
      (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (code.length < 4) return;

        updateForm({ code });
        onNext();
      },
      [code, onNext, updateForm]
    );

    const isCodeValid = code.length === 4;

    return (
      <main className="pt-[1rem] min-h-screen relative flex flex-col items-center">
        <div className="w-full max-w-md">
          <GoBackButton onBack={onBack} />

          <Heading
            title={"Введите код"}
            subTitle={"Отправили на номер +7"}
            formData={formData}
            isCodeStep={true}
          />

          <section className="mt-6 flex justify-center">
            <form
              className="w-[308px] font-medium text-[1.938rem] leading-10"
              onSubmit={handleNext}
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="tel"
                  inputMode="numeric"
                  value={formatCode(code)}
                  onChange={(e) => handleChange(e, setCode, inputRef)}
                  placeholder="0-0-0-0"
                  className="w-full text-center text-[2rem] tracking-widest py-2 outline-none focus:outline-none"
                />
              </div>
            </form>
          </section>

          <section className="mt-[1.75rem] flex justify-center">
            <h3 className="font-medium text-[1rem] leading-10 text-[#3D3D3D]">
              Никому не сообщайте код
            </h3>
          </section>

          <section className="absolute w-full bottom-[70px] rounded-t-[15px] text-[1.125rem] leading-[1.25rem] px-7">
            <Continue
              handleNext={handleNext}
              isValid={isCodeValid}
              title={"Готово"}
            />

            <div className="text-center text-[#3D3D3D] font-medium h-[40px]">
              {canResend ? (
                <button className="leading-[1.25rem] font-semibold text-purple-heading text-[1rem] underline">
                  Отправить код повторно
                </button>
              ) : (
                <button className="text-purple-main-disabled">
                  Отправить код повторно можно через{" "}
                  <span className="font-semibold text-purple-heading">
                    {timer} сек
                  </span>
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    );
  }
);

export default CodeStep;
