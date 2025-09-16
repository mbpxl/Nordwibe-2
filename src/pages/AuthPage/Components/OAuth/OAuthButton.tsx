import { useOAuthStart } from "../../service/useOAuthStart";

export const OAuthButtons = () => {
  const { mutate: startOAuth, isPending } = useOAuthStart();

  return (
    <div className="flex gap-7">
      <button
        className="w-10 h-10"
        onClick={() => startOAuth("vk")}
        disabled={isPending}
      >
        <img src="/icons/oauth/VK.svg" alt="" />
      </button>

      <button
        className="w-10 h-10"
        onClick={() => startOAuth("yandex")}
        disabled={isPending}
      >
        <img src="/icons/oauth/Yandex.png" alt="" />
      </button>
    </div>
  );
};
