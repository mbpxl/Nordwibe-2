import { useOAuthStart } from "../../service/useOAuthStart";
import yandex from "/icons/oauth/yandex-logo.svg";
import vk from "/icons/oauth/vk-logo.svg";

export const OAuthButtons = () => {
  const { mutate: startOAuth, isPending } = useOAuthStart();

  const renderButton = (
    provider: "vk" | "yandex",
    label: string,
    icon: string,
  ) => (
    <button
      key={provider}
      type="button"
      disabled={isPending}
      onClick={() => startOAuth(provider)}
      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
    >
      {isPending ? (
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent" />
      ) : (
        <img src={icon} alt={label} className="h-5 w-5" />
      )}
      <span className="font-bold">{label}</span>
    </button>
  );

  return (
    <div className="mt-2 space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-400">Или войдите через</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {renderButton("vk", "VK", vk)}
        {renderButton("yandex", "Яндекс", yandex)}
      </div>
    </div>
  );
};
