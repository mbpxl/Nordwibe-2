import { Link } from "react-router-dom";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../../../shared/utils/consts";

const Welcome = () => {
  return (
    <main className="px-2 min-h-screen lg:bg-[url(/imgs/desktop/sign-background.jpg)] bg-cover flex items-center justify-center">
      <div
        className="
          flex flex-col items-center justify-between h-screen
          lg:h-[500px] lg:w-[736px] lg:overflow-visible lg:bg-white lg:rounded-2xl lg:shadow-xl lg:flex lg:flex-col lg:items-center lg:justify-center
        "
      >
        {/* Контейнер всего содержимого (616px на desktop) */}
        <div
          className="
            w-full h-full flex flex-col items-center justify-between
            lg:w-[616px] lg:h-auto lg:flex lg:flex-col lg:items-center lg:justify-center
          "
        >
          {/* Первый блок - текст с верхним отступом */}
          <section
            className="
              flex flex-col items-center text-center
              pt-[13.1vh] min-h-0
              lg:pt-0 lg:mb-10
            "
            style={{
              // Для S8+ (740px): 97px, для других - пропорционально
              paddingTop: "clamp(40px, 13.1vh, 97px)",
            }}
          >
            {/* Mobile текстовое название */}
            <h1 className="text-[2rem] font-semibold leading-[2.5rem] text-black-heading mb-[1.75rem] lg:hidden">
              Nordwibe
            </h1>

            {/* Desktop: изображение вместо h1 */}
            <img
              src="/imgs/desktop/logo.png"
              alt="Nordwibe"
              className="hidden lg:block w-auto h-[64px] mb-[1.75rem]"
            />

            {/* Текст "Мы больше, чем соседи" с обновлёнными стилями */}
            <h2
              className="
                font-semibold text-[24px] leading-[24px]
                text-[#35339B] mb-[1.75rem]
              "
            >
              Соседи, которых выбираешь ты.
            </h2>

            {/* Нижний текст — обновлённые стили */}
            <h3
              className="
                w-[18.2rem] lg:w-full
                font-semibold text-[20px] leading-[24px]
                text-[#35339B]
              "
            >
              Не просто переехать, а создать своё пространство
            </h3>
          </section>

          {/* Второй блок - кнопки с нижним отступом */}
          <section
            className="
              w-[18rem] flex flex-col gap-[1rem] font-bold text-[1.125rem] leading-[1.25rem] text-white
              pb-[5.4vh]
              lg:pb-0 lg:w-full lg:mt-0
            "
            style={{
              paddingBottom: "clamp(20px, 5.4vh, 40px)",
            }}
          >
            <Link
              to={SIGN_UP_ROUTE}
              className="px-[1.25rem] py-[0.75rem] text-center bg-purple-main rounded-[30px]"
            >
              Зарегистрироваться
            </Link>

            <Link
              to={SIGN_IN_ROUTE}
              className="px-[1.25rem] text-center py-[0.75rem] bg-purple-main rounded-[30px]"
            >
              Войти
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Welcome;
