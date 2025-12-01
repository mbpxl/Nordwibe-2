import ShowMore from "../ShowMore/ShowMore";

const AboutMyself = ({
  about,
  handleChange,
  isMyProfile,
  name,
  gender,
}: {
  about: string | null;
  handleChange?: () => void;
  isMyProfile: boolean;
  name?: string | null;
  gender?: "Женский" | "Мужской";
}) => {
  const displayName = gender == null ? "Пользователь" : name;

  if (!about) {
    return (
      <div className="text-black">
        {isMyProfile ? (
          <div className="flex justify-between mb-1">
            <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
              О себе
            </h1>
            <button
              className="w-5 h-5 hover:opacity-70 transition-opacity"
              onClick={handleChange}
            >
              <img src="/icons/profile/edit-about-myself.svg" alt="edit" />
            </button>
          </div>
        ) : (
          <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
            О себе
          </h1>
        )}

        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
          <div className="flex items-center justify-center gap-3 text-gray-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm">
              {isMyProfile
                ? "Расскажите о себе, чтобы другие пользователи узнали вас лучше"
                : `${displayName} ещё не добавил${
                    gender == "Женский" ? "а" : ""
                  } информацию о себе`}
            </span>
          </div>

          {isMyProfile && (
            <button
              onClick={handleChange}
              className="mt-3 text-purple-main hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Добавить информацию
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-black">
      {isMyProfile ? (
        <div className="flex justify-between mb-1">
          <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
            О себе
          </h1>
          <button
            className="w-5 h-5 hover:opacity-70 transition-opacity"
            onClick={handleChange}
          >
            <img src="/icons/profile/edit-about-myself.svg" alt="edit" />
          </button>
        </div>
      ) : (
        <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
          О себе
        </h1>
      )}
      <div className="p-2 border-purple-main border-1 rounded-xl">
        <ShowMore maxHeight={72}>{about}</ShowMore>
      </div>
    </div>
  );
};

export default AboutMyself;
