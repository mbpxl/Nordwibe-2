import { Link } from "react-router-dom";
import HashTag from "../../../../../shared/Components/HashTag/HashTag";
import { baseURLforImages } from "../../../../../shared/plugin/axios";
import { setCompatibilityStyle } from "../../../utils/setCompatibilityStyle";
import OptimizedImage from "../../../../../shared/Components/OptimizedImage/OptimizedImage";
import { calculateAge } from "../../../../../shared/utils/calculateAge";

const SearchPeopleItem = ({
  user,
  compatibility,
  isBlocked = false,
}: {
  user: any;
  compatibility: number;
  isBlocked?: boolean;
}) => {
  console.log(user);
  return (
    <>
      {/* Мобильная версия - без изменений */}
      <Link
        to={"/profile/" + user.id}
        state={{ user }}
        className="lg:hidden bg-white p-2 flex gap-3 max-w-[700px] rounded-[12px] mt-4"
      >
        <div className="w-[100px] h-[100px] bg-purple-sub-button rounded-xl shrink-0">
          {!user.avatar_url ? (
            <div className="flex justify-center items-center h-full text-white font-semibold text-4xl">
              {user.username
                ? user.username[0].toUpperCase()
                : user.name?.charAt(0) || ""}
            </div>
          ) : (
            <OptimizedImage
              className="w-10 h-10 rounded-xl shrink-0"
              src={baseURLforImages + user.avatar_url}
              alt="avatar"
              width={100}
              height={100}
              quality={50}
              priority={true}
            />
          )}
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="text-[0.875rem] font-semibold leading-5 text-left">
              {user.username || user.name || "Неизвестный"}
              {user.birth_date ? ", " : ""} {calculateAge(user.birth_date)}
            </h2>
            <div
              className={`${setCompatibilityStyle(
                compatibility,
                isBlocked
              )} text-nowrap h-5 rounded-[12px] text-[0.875rem] font-semibold leading-[0.75rem] text-white py-1 px-2`}
            >
              {compatibility ? compatibility + " %" : "???"}
            </div>
          </div>
          <div className="text-[0.75rem] leading-4 break-all">
            {user.about?.length > 56
              ? user.about.slice(0, 56) + "..."
              : user.about}
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex gap-1 flex-wrap">
              {user.hashtags_list?.map((hashtag: any) => (
                <HashTag key={hashtag} hashtagTitle={hashtag} />
              ))}
            </div>
          </div>
          {user.hometown_name ? (
            <div className="mt-1 flex items-center gap-1 text-[0.75rem]">
              <img src="/icons/status/status-hometown.svg" alt="" />
              <h2>Родной город - {user.hometown_name}</h2>
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>

      {/* Desktop версия - новая структура */}
      <Link
        to={"/profile/" + user.id}
        state={{ user }}
        className="hidden lg:block bg-white p-6 max-w-[868px] rounded-xl hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex gap-8 items-stretch">
          {/* Левая часть - фото (фиксированная высота) */}
          <div className="w-[252px] h-[252px] flex-shrink-0 flex flex-col">
            <div className="w-full h-full bg-purple-sub-button rounded-xl overflow-hidden">
              {!user.avatar_url ? (
                <div className="flex justify-center items-center h-full text-white font-semibold text-6xl">
                  {user.username
                    ? user.username[0].toUpperCase()
                    : user.name?.charAt(0) || ""}
                </div>
              ) : (
                <OptimizedImage
                  className="w-full h-full object-cover rounded-xl"
                  src={baseURLforImages + user.avatar_url}
                  alt="avatar"
                  width={252}
                  height={252}
                  quality={75}
                  priority={true}
                />
              )}
            </div>
          </div>

          {/* Правая часть - текстовая информация */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Основной контент, который растягивается */}
            <div className="flex-1 min-h-0">
              {/* Верхняя строка: имя, возраст, процент совместимости */}
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.username || user.name || "Неизвестный"}
                  </h2>
                  <div className="text-lg text-gray-600">
                    {user.birth_date
                      ? calculateAge(user.birth_date) + " лет"
                      : ""}
                  </div>
                </div>
                <div
                  className={`${setCompatibilityStyle(
                    compatibility,
                    isBlocked
                  )} text-nowrap rounded-xl text-lg font-bold text-white py-3 px-4`}
                >
                  {compatibility ? compatibility + " %" : "???"}
                </div>
              </div>

              {/* Блок "О себе" */}
              <div className="mb-4">
                <p className="text-base text-gray-600 leading-relaxed">
                  {user.about || "Информация отсутствует"}
                </p>
              </div>

              {/* Интересы (хештеги) */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {user.hashtags_list?.length > 0 ? (
                    user.hashtags_list.map((hashtag: any) => (
                      <div key={hashtag} className="text-sm px-3 py-1.5">
                        <HashTag hashtagTitle={hashtag} />
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500">Интересы не указаны</span>
                  )}
                </div>
              </div>

              {/* Статусы */}
              <div className="mb-2">
                <div className="space-y-3">
                  {user.hometown_name && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-purple-50 rounded-lg">
                        <img
                          src="/icons/status/status-hometown.svg"
                          alt="Родной город"
                          className="w-5 h-5"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Родной город
                        </div>
                        <div className="text-base font-medium text-gray-800">
                          {user.hometown_name}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Можно добавить другие статусы здесь */}
                  {!user.hometown_name && (
                    <span className="text-gray-500">Статусы не указаны</span>
                  )}
                </div>
              </div>
            </div>

            {/* Кнопка "Открыть профиль" - выравнивается по низу */}
            <button
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/profile/${user.id}`;
              }}
              className="mt-auto bg-purple-main hover:bg-purple-600 text-white font-semibold py-4 rounded-xl transition-colors duration-200 w-full"
            >
              Открыть профиль
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchPeopleItem;
