import { useCallback, useRef, useState } from "react";
import type { StepPropsTypes } from "../../types/SignUpTypes";
import Continue from "../Continue/Continue";
import GoBackButton from "../SignUp/GoBackButton";
import Heading from "../SignUp/Heading";
import useFormatUnformatCode from "../../hooks/useFormatCode";
import React from "react";
import { useConfirmPhone } from "../../service/useConfirmPhone";
import { useLocation, useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../../../../shared/utils/consts";
import { useAccessToken } from "../../../../shared/service/useAuthToken";
import ContinueWrapper from "../ContinueWrapper/ContinueWrapper";
import WrongData from "../PhoneErrorMsg/PhoneErrorMsg";

type Props = StepPropsTypes<"code">;

const CodeStep: React.FC<Props> = ({
  formData,
  updateForm,
  onNext,
  onBack,
}) => {
  const fullPhoneNumber = `+7${formData.phone}`;

  const inputRef = useRef<HTMLInputElement>(null);

  // форматирование телефона в вид 0-0-0-0
  const { formatCode, handleChange } = useFormatUnformatCode();

  const [code, setCode] = useState(formData.code || "");

  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: getToken } = useAccessToken();

  const handleSuccess = () => {
    updateForm({ code });

    getToken(undefined, {
      onSuccess: () => {
        onNext();
        if (location.pathname === "/sign-in") {
          navigate(MAIN_ROUTE);
          localStorage.removeItem("signin-form");
        }
      },
      onError: () => {
        alert("Ошибка получения access токена"); // todo: Исправить данный функционал
      },
    });
  };

  const captcha_token = localStorage.getItem("captcha_token");

  const { mutate, isError, isPending } = useConfirmPhone(handleSuccess);

  const handleNext = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (code.length < 4) return;

      if (captcha_token) {
        mutate({ phone: fullPhoneNumber, code, captcha_token });
      }
    },
    [captcha_token, code, fullPhoneNumber, mutate]
  );

  const isCodeValid = code.length === 4 && !isPending && !!captcha_token;

  return (
    <main className="pt-[1rem] min-h-screen relative flex flex-col items-center">
      <div className="w-full max-w-md">
        <GoBackButton onBack={onBack} />

        <Heading
          title={"Вам поступит звонок-сброс"}
          subTitle={
            "Введите последние четыре цифры номера, с которого поступил звонок-сброс"
          }
          isCodeStep
        />

        <section className="mt-6 flex flex-col items-center gap-2 justify-center">
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

          <WrongData
            isError={isError}
            message={"Неправильный код. Попробуйте ещё раз"}
          />
        </section>

        <section className="mt-4 flex justify-center">
          <h3 className="font-medium text-[1rem] leading-10 text-[#3D3D3D]">
            Никому не сообщайте номер
          </h3>
        </section>

        <ContinueWrapper>
          <Continue
            handleNext={handleNext}
            isValid={isCodeValid}
            title={"Готово"}
          />
        </ContinueWrapper>
      </div>
    </main>
  );
};

export default CodeStep;
