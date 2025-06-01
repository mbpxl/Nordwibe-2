import { useEffect, useRef, useState } from "react";
import type { StepPropsTypes } from "../../../types/SignUpTypes";
import GoBackButton from "../../SignUp/GoBackButton";
import Heading from "../../SignUp/Heading";

type Props = StepPropsTypes<"code">;

const CodeStep: React.FC<Props> = ({
  onNext,
  onBack,
  formData,
  updateForm,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
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

  const formatCode = (input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 4);
    return digits.split("").join("-");
  };

  const unformatCode = (formatted: string) => {
    return formatted.replace(/\D/g, "").slice(0, 4);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const cleaned = unformatCode(raw);
    setCode(cleaned);

    if (cleaned.length === 4) {
      inputRef.current?.blur(); // Скрытие клавиатуры
    }
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (code.length < 4) return;

    updateForm({ code });
    onNext();
  };

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
                onChange={handleChange}
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
          <button
            onClick={handleNext}
            disabled={!isCodeValid}
            className={`w-full py-[0.75rem] mb-[20px] rounded-[30px] font-bold text-white transition 
              ${
                isCodeValid
                  ? "bg-[#3D3D3D] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              }`}
          >
            Готово
          </button>

          <div className="text-center text-[#3D3D3D] font-medium h-[40px]">
            {canResend ? (
              <button className="leading-[1.25rem] font-semibold text-[#3D3D3D] text-[1rem] underline">
                Отправить код повторно
              </button>
            ) : (
              <button>
                Отправить код повторно можно через{" "}
                <span className="font-semibold">{timer} сек</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default CodeStep;
