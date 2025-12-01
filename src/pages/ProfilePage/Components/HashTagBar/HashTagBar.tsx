import HashTag from "../../../../shared/Components/HashTag/HashTag";
import ShowMore from "../ShowMore/ShowMore";

interface HashTagBarProps {
  hashTags: string[];
  isMyProfile?: boolean;
  userName?: string | null;
  onEdit?: () => void;
  gender?: "Женский" | "Мужской";
}

const HashTagBar = ({
  hashTags,
  isMyProfile = false,
  userName = null,
  onEdit,
  gender,
}: HashTagBarProps) => {
  const displayName = gender == null ? "Пользователь" : userName;

  // Если интересы не заполнены, показываем красивый блок-заглушку
  if (!hashTags || hashTags.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mt-3">
            Интересы
          </h1>
        </div>

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
                d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                fill="currentColor"
              />
              <path
                d="M12.5 7H11V13L16.25 16.15L17 15.08L12.5 12.25V7Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm">
              {isMyProfile
                ? "Добавьте интересы, чтобы найти людей с похожими увлечениями"
                : `${displayName} ещё не добавил${
                    gender == "Женский" ? "а" : ""
                  } интересы`}
            </span>
          </div>

          {isMyProfile && onEdit && (
            <button
              onClick={onEdit}
              className="mt-3 text-purple-main hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Добавить интересы
            </button>
          )}
        </div>
      </div>
    );
  }

  // Если интересы заполнены, показываем обычный блок
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mt-3">
          Интересы
        </h1>
      </div>

      <ShowMore maxHeight={50}>
        <div className="flex flex-wrap gap-x-2 gap-y-2">
          {hashTags.map((hashTag: any) => (
            <div key={hashTag} className="shrink-0">
              <HashTag hashtagTitle={hashTag} isMyProfile={isMyProfile} />
            </div>
          ))}
        </div>
      </ShowMore>
    </div>
  );
};

export default HashTagBar;
