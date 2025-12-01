import React from "react";

type QuizzesBarProps = {
  gender?: "Женский" | "Мужской";
  isMyProfile?: boolean;
  userName?: string | null;
  onEdit?: () => void;
};

const QuizzesBar: React.FC<QuizzesBarProps> = ({
  isMyProfile = false,
  userName = null,
  onEdit,
  gender,
}) => {
  const displayName = gender == null ? "Пользователь" : userName;

  // Всегда 6 заглушек для квизов
  const maxItems = 6;
  const placeholderItems = Array(maxItems).fill({
    type: "placeholder" as const,
  });

  // Компонент заглушки для десктопной версии
  const PlaceholderItemDesktop = () => (
    <div
      className="
        flex flex-col items-center justify-center
        border border-dashed border-gray-300 rounded-xl
        p-6 text-center
        w-[196px] h-[196px]
        hover:border-gray-400 transition-colors
        bg-gradient-to-br from-gray-50 to-gray-100
      "
    >
      <div className="mb-4">
        <div className="relative w-12 h-12 mx-auto mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-60"></div>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="#3B82F6"
              fillOpacity="0.6"
            />
            <path
              d="M12 17L13.56 13.58L17 13L14 10.15L14.88 7L12 9.12L9.12 7L10 10.15L7 13L10.44 13.58L12 17Z"
              fill="#3B82F6"
            />
          </svg>
        </div>

        <h3 className="text-base font-semibold text-gray-700 mb-1">
          Квиз в разработке
        </h3>

        <p className="text-sm text-gray-500 mb-4">Скоро появится</p>
      </div>

      <div className="flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <span className="px-3 py-1 bg-white rounded-full shadow-sm">Скоро</span>
      </div>
    </div>
  );

  // Компонент заглушки для мобильной версии
  const PlaceholderItemMobile = () => (
    <div
      className="
        flex-shrink-0
        flex flex-col items-center justify-center
        border border-dashed border-gray-300 rounded-lg
        p-4 text-center
        min-w-[140px] h-[100px]
        hover:border-gray-400 transition-colors
        bg-gradient-to-br from-gray-50 to-gray-100
      "
    >
      <div className="mb-3">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="#9CA3AF"
          />
          <path
            d="M12 17L13.56 13.58L17 13L14 10.15L14.88 7L12 9.12L9.12 7L10 10.15L7 13L10.44 13.58L12 17Z"
            fill="#9CA3AF"
          />
        </svg>
      </div>

      <h3 className="text-sm font-medium text-gray-600 mb-1">Новый квиз</h3>

      <p className="text-xs text-gray-500">Скоро</p>

      <div className="mt-3">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse delay-150"></div>
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[0.875rem] font-semibold text-black-heading leading-3">
            Квизы
          </h2>
          {isMyProfile && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              0/{maxItems} пройдено
            </span>
          )}
          {!isMyProfile && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              0/{maxItems} пройдено
            </span>
          )}
        </div>
      </div>

      {/* MOBILE — горизонтальный скролл (всегда 6 элементов) */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide xl:hidden">
        {placeholderItems.map((_, index) => (
          <PlaceholderItemMobile key={`quiz-placeholder-mobile-${index}`} />
        ))}
      </div>

      {/* DESKTOP — сетка 3×2 */}
      <div
        className="
          hidden xl:grid
          grid-cols-3 grid-rows-2
          gap-3
          w-[630px]
        "
      >
        {placeholderItems.map((_, index) => (
          <div key={`quiz-placeholder-desktop-${index}`} className="h-full">
            <PlaceholderItemDesktop />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzesBar;
