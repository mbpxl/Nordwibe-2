import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { SmartCaptcha } from "@yandex/smart-captcha";
import { usePhoneRequest } from "../../service/usePhoneRequest";
import { useGetCaptchaToken } from "../../service/useGetCaptchaToken";
import { usePhoneFormatter } from "../../hooks/usePhoneNumber";
import { useBackspacePhoneFix } from "../../hooks/useBackspacePhoneFix";
import type { StepPropsTypes } from "../../types/SignUpTypes";

import goBackIcon from "/icons/arrow-left.svg";
import Continue from "../Continue/Continue";
import Heading from "../SignUp/Heading";
import UserAgreement from "../UserAgreement/UserAgreement";
import { WELCOME_ROUTE } from "../../../../shared/utils/consts";
import React from "react";
import { OAuthButtons } from "../OAuth/OAuthButtons";
import { clearUserData } from "../../../../shared/plugin/clearUserData";
import ContinueWrapper from "../ContinueWrapper/ContinueWrapper";
import WrongData from "../PhoneErrorMsg/PhoneErrorMsg";

type Props = StepPropsTypes<"phone">;

const PhoneStep: React.FC<Props> = ({ formData, updateForm, onNext }) => {
  const [phone, setPhone] = useState(formData.phone);
  const [captchaToken, setCaptchaToken] = useState(() => {
    return localStorage.getItem("captcha_token") || "";
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPhone, handleInputChange } = usePhoneFormatter();
  const handleKeyDown = useCallback(
    useBackspacePhoneFix(inputRef, phone, formatPhone),
    []
  );

  // Получаем публичный токен капчиdasdsa
  const {
    data: captchaPublicToken,
    isError: isCaptchaError, //todo:  добавить toast для ошибки
  } = useGetCaptchaToken();

  // Сохраняем капчy токен в localStorage
  useEffect(() => {
    if (captchaToken) {
      localStorage.setItem("captcha_token", captchaToken);
    }
  }, [captchaToken]);

  const handleSuccess = useCallback(() => {
    updateForm({ phone });
    onNext();
  }, [phone, updateForm, onNext]);

  if (isCaptchaError) {
    console.error("Ошибка получения токена капчи");
  }
  const {
    sendPhoneRequest,
    isPending,
    isError: isPhoneError,
  } = usePhoneRequest(handleSuccess);

  const handleNext = useCallback(() => {
    // чистим localStorage, если остались данные с прошлой сессии, иначе не получим токен
    clearUserData();

    const fullPhoneNumber = `+7${phone}`;
    if (!captchaToken) return;

    sendPhoneRequest({
      phone: fullPhoneNumber,
      captcha_token: captchaToken,
    });
  }, [phone, captchaToken, sendPhoneRequest]);

  const isPhoneValid = phone.length === 10 || !!captchaToken || !isPending;

  return (
    <main className="pt-[1rem]">
      <article className="pl-3">
        <Link to={WELCOME_ROUTE}>
          <img src={goBackIcon} alt="Go Back" />
        </Link>
      </article>

      <Heading title="Введите номер телефона" subTitle="" />

      <section className="mt-6 flex flex-col items-center gap-2">
        <form
          className="w-[308px] font-medium text-[1.938rem] leading-10"
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
        >
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A] font-semibold">
              +7
            </span>
            <input
              type="tel"
              inputMode="numeric"
              ref={inputRef}
              value={formatPhone(phone)}
              onChange={(e) => handleInputChange(e, setPhone, inputRef)}
              onKeyDown={handleKeyDown}
              placeholder="(000) 000-00-00"
              className="w-full pl-[3.5rem] pr-4 py-0.5 text-[#1A1A1A] outline-none focus:outline-none"
            />
          </div>
        </form>

        <SmartCaptcha
          sitekey={captchaPublicToken}
          language="ru"
          onSuccess={setCaptchaToken}
        />
      </section>

      <div className="mt-3 flex justify-center">
        <OAuthButtons />
      </div>

      <WrongData
        isError={isPhoneError}
        message={"Неправильный номер телефона!"}
      />

      <ContinueWrapper>
        <Continue
          handleNext={handleNext}
          isPending={isPending}
          isValid={isPhoneValid && !!captchaToken}
          title="Получить код"
        />
        <UserAgreement />
      </ContinueWrapper>
    </main>
  );
};

export default PhoneStep;
