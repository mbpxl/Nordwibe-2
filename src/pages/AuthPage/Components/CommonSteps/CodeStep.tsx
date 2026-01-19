import { useCallback, useRef, useState, useEffect } from "react";
import type { StepPropsTypes } from "../../types/SignUpTypes";
import Continue from "../Continue/Continue";
import React from "react";
import { useConfirmPhone } from "../../service/useConfirmPhone";
import { useLocation } from "react-router-dom";
import { useAccessToken } from "../../../../shared/service/useAuthToken";
import WrongData from "../PhoneErrorMsg/PhoneErrorMsg";
import { useRedirectAfterLogin } from "../../../../shared/hooks/useRedirectAfterLogin";
import { AccountDeletionModal } from "../AccountDeletionModal/AccountDeletionModal";
import {
  clearRedirectTimeout,
  forceRedirectToWelcome,
} from "../../../../shared/plugin/redirectToLogin";
import goBackIcon from "/icons/arrow-left.svg";
import useFormatUnformatCode from "../../hooks/useFormatCode";
import { usePhoneRequest } from "../../service/usePhoneRequest";
import { useGetCaptchaToken } from "../../service/useGetCaptchaToken";
import Modal from "../../../../shared/Components/Modal/Modal";
import { SmartCaptcha } from "@yandex/smart-captcha";

type Props = StepPropsTypes<"code">;

const CodeStep: React.FC<Props> = ({
  formData,
  updateForm,
  onNext,
  onBack,
}) => {
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [showCaptchaModal, setShowCaptchaModal] = useState(false);

  const fullPhoneNumber = `+7${formData.phone}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const { formatCode, handleChange } = useFormatUnformatCode();
  const [code, setCode] = useState(formData.code || "");

  const location = useLocation();

  const { mutate: getToken } = useAccessToken();
  const { performRedirect } = useRedirectAfterLogin();

  // Состояния для капчи
  //@ts-ignore
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaKey, setCaptchaKey] = useState(0);
  const [isResendAfterCaptcha, setIsResendAfterCaptcha] = useState(false);

  // Таймер для кнопки повторной отправки
  const [timer, setTimer] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Получаем публичный ключ для капчи
  const { data: captchaPublicToken } = useGetCaptchaToken();

  // Инициализируем капчу из localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("captcha_token");
    if (savedToken) {
      setCaptchaToken(savedToken);
    }
  }, []);

  // Запускаем таймер при монтировании компонента
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive]);

  const handleSuccess = () => {
    updateForm({ code });

    getToken(undefined, {
      onSuccess: () => {
        clearRedirectTimeout();
        onNext();

        if (location.pathname === "/sign-in") {
          performRedirect();
          localStorage.removeItem("signin-form");
        }
      },
      onError: () => {
        setShowDeletionModal(true);
      },
    });
  };

  // Обработчик успеха для повторной отправки
  const handleResendSuccess = useCallback(() => {
    console.log("Код успешно отправлен повторно");
    // Сбрасываем таймер
    setTimer(30);
    setIsTimerActive(true);
  }, []);

  // Обработчик ошибок для повторной отправки
  const handleResendError = useCallback((error: any) => {
    // Если ошибка связана с капчей, показываем модальное окно
    if (error?.response?.data?.ru_message?.includes("Неверная капча")) {
      localStorage.removeItem("captcha_token");
      setCaptchaToken("");
      setIsResendAfterCaptcha(true);
      setShowCaptchaModal(true);
    }
  }, []);

  // Обработчик успешной капчи
  const handleCaptchaSuccess = useCallback(
    (token: string) => {
      setCaptchaToken(token);
      localStorage.setItem("captcha_token", token);

      // Если капча была вызвана для повторной отправки, сразу отправляем запрос
      if (isResendAfterCaptcha) {
        sendResendRequest({
          phone: fullPhoneNumber,
          captcha_token: token,
        });
        setIsResendAfterCaptcha(false);
      }

      setShowCaptchaModal(false);
    },
    [fullPhoneNumber, isResendAfterCaptcha]
  );

  // Функция для обновления капчи
  const handleRefreshCaptcha = useCallback(() => {
    setCaptchaKey((prev) => prev + 1);
  }, []);

  const captcha_token = localStorage.getItem("captcha_token");
  const { mutate, isError, isPending, error } = useConfirmPhone(handleSuccess);

  // Хук для повторной отправки кода
  const { sendPhoneRequest: sendResendRequest, isPending: isResendPending } =
    usePhoneRequest(handleResendSuccess, handleResendError);

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

  const handleResentCode = useCallback(() => {
    // Если таймер активен, не отправляем запрос
    if (isTimerActive && timer > 0) return;

    const currentToken = localStorage.getItem("captcha_token");

    if (currentToken) {
      sendResendRequest({
        phone: fullPhoneNumber,
        captcha_token: currentToken,
      });
    } else {
      setIsResendAfterCaptcha(true);
      setShowCaptchaModal(true);
    }
  }, [fullPhoneNumber, sendResendRequest, isTimerActive, timer]);

  // Обработчик закрытия модального окна капчи
  const handleCloseCaptchaModal = useCallback(() => {
    setShowCaptchaModal(false);
    setIsResendAfterCaptcha(false);
  }, []);

  const handleCloseDeletionModal = () => {
    forceRedirectToWelcome();
    setShowDeletionModal(false);
  };

  const isCodeValid = code.length === 4 && !isPending && !!captcha_token;

  return (
    <main className="px-2 min-h-screen flex items-center justify-center">
      <div
        className="flex flex-col items-center justify-between h-screen
                      lg:h-[500px] lg:w-[736px] lg:overflow-visible 
                      lg:bg-white lg:rounded-2xl lg:shadow-xl lg:justify-start"
      >
        <div
          className="w-full h-full flex flex-col items-center justify-between
                      lg:w-[616px] lg:h-auto lg:mx-auto lg:flex lg:flex-col lg:items-center lg:relative"
        >
          {/* === Первый блок - заголовок, текст, поле ввода, сообщение === */}
          <div className="flex flex-col items-center w-full text-center pt-[8vh] lg:pt-0 lg:flex-1 lg:gap-10 lg:justify-center">
            {/* === Заголовок + кнопка назад === */}
            <div className="relative flex items-center justify-center w-full lg:mt-8 lg:mb-6">
              <button
                onClick={onBack}
                className="absolute left-0 top-1/2 -translate-y-1/2
                           lg:w-[44px] lg:h-[44px] lg:bg-[#E1E1F3] lg:rounded-xl lg:flex lg:items-center lg:justify-center"
              >
                <img src={goBackIcon} alt="Назад" className="w-5 h-5" />
              </button>

              <h1
                className="font-semibold text-[1.55rem] leading-[2rem] text-black-heading
                             lg:text-[32px] lg:leading-[40px]"
              >
                Вам поступит звонок
              </h1>
            </div>

            {/* === Подзаголовок === */}
            <h2 className="w-[18.2rem] font-medium text-[1.25rem] leading-[1.5rem] text-[#3D3D3D] mb-6 lg:w-full lg:mb-4">
              Введите последние четыре цифры номера, с которого поступил звонок
            </h2>

            {/* === Поле ввода кода === */}
            <section className="mt-2 flex flex-col items-center gap-2 lg:mt-0">
              <form
                className="w-[308px] font-medium text-[1.938rem] leading-10 mx-auto"
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
                    className="w-full text-center text-[2rem] tracking-widest py-2 outline-none focus:outline-none
                               lg:border-b-2 lg:border-gray-300 lg:focus:border-purple-main lg:text-[31px] lg:leading-[40px]"
                  />
                </div>
              </form>
            </section>

            {/* === Ошибки === */}
            <WrongData
              //@ts-ignore
              errorCode={error?.status}
              isError={isError}
            />

            {/* === Кнопка повторной отправки === */}
            <button
              onClick={handleResentCode}
              disabled={isResendPending || (isTimerActive && timer > 0)}
              className={`mt-4 text-[1rem] font-medium lg:mt-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isResendPending || (isTimerActive && timer > 0)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  : "text-purple-main hover:text-white hover:bg-purple-main border border-purple-main hover:border-purple-dark"
              }`}
            >
              {isResendPending
                ? "Отправка..."
                : isTimerActive && timer > 0
                ? `Отправить повторно (${timer} сек)`
                : "Отправить повторно"}
            </button>
          </div>

          {/* === Второй блок - кнопка "Готово" === */}
          <div className="w-full flex flex-col items-center pb-[6.8vh] lg:pb-0">
            <div className="w-full lg:mt-2">
              <Continue
                handleNext={handleNext}
                isValid={isCodeValid}
                title="Готово"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для капчи */}
      <Modal
        isOpen={showCaptchaModal}
        closeModal={handleCloseCaptchaModal}
        className="max-w-md"
      >
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {isResendAfterCaptcha
              ? "Подтвердите отправку кода"
              : "Подтвердите, что вы не робот"}
          </h3>

          <div className="w-full mb-6">
            <SmartCaptcha
              key={captchaKey}
              sitekey={captchaPublicToken}
              language="ru"
              onSuccess={handleCaptchaSuccess}
            />
          </div>

          <div className="flex justify-between items-center w-full">
            <button
              onClick={handleRefreshCaptcha}
              className="text-sm text-purple-main hover:text-purple-dark font-medium"
            >
              Обновить капчу
            </button>

            <p className="text-sm text-gray-600 text-center">
              {isResendAfterCaptcha
                ? "После подтверждения код будет отправлен повторно"
                : "Требуется для повторной отправки кода"}
            </p>
          </div>
        </div>
      </Modal>

      <AccountDeletionModal
        isOpen={showDeletionModal}
        onClose={handleCloseDeletionModal}
      />
    </main>
  );
};

export default CodeStep;
