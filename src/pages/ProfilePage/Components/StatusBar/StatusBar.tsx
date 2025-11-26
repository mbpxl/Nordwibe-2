import Status from "../../../../shared/Components/Status/Status";
import type { statusDataTypes } from "../../types/statusDataTypes";
import { statusConfig } from "../../utils/statusConfig";

interface StatusBarProps {
  data: statusDataTypes | null;
  isMyProfile?: boolean;
  userName?: string | null;
  onEdit?: () => void;
  gender?: "Женский" | "Мужской";
}

const StatusBar: React.FC<StatusBarProps> = ({
  data,
  isMyProfile = false,
  userName = null,
  onEdit,
  gender,
}) => {
  const displayName = gender == null ? "Пользователь" : userName;

  const statuses = (Object.keys(statusConfig) as (keyof statusDataTypes)[])
    .map((key) => {
      const value = data![key];
      if (!value) return null;
      return statusConfig[key](value);
    })
    .filter(Boolean);

  // Если статусы не заполнены, показываем красивый блок-заглушку
  if (!statuses.length) {
    return (
      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mt-3">
            Статусы
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
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                fill="currentColor"
              />
              <path
                d="M16 10H8V8H16V10ZM16 12H8V14H16V12ZM16 16H8V18H16V16Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-sm">
              {isMyProfile
                ? "Добавьте статусы, чтобы рассказать о своих привычках и предпочтениях"
                : `${displayName} ещё не добавил${
                    gender == "Женский" ? "а" : ""
                  } статусы`}
            </span>
          </div>

          {isMyProfile && onEdit && (
            <button
              onClick={onEdit}
              className="mt-3 text-purple-main hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Добавить статусы
            </button>
          )}
        </div>
      </div>
    );
  }

  // Если статусы заполнены, показываем обычный блок
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mt-3">
          Статусы
        </h1>
      </div>

      <div className="flex flex-wrap gap-x-3">
        {statuses.map((item, idx) => (
          <Status key={idx} imgSrc={item!.icon} title={item!.title} />
        ))}
      </div>
    </div>
  );
};

export default StatusBar;
