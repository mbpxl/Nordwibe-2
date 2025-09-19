import { useAuthRedirect } from "../../service/useAuthRedirect";
import { useOAuth } from "../../service/useOAuth";

export const OAuthButtons = () => {
  const { loginWithOAuth2, isAuthenticating } = useOAuth();
  const isCheckingAuth = useAuthRedirect();

  if (isCheckingAuth || isAuthenticating) {
    return <div>Проверка аутентификации...</div>;
  }

  return (
    <div className="flex gap-5">
      <button onClick={() => loginWithOAuth2("vk")} disabled={isAuthenticating}>
        <img className="w-11 h-11" src="/icons/oauth/VK.svg" alt="" />
      </button>
      <button
        onClick={() => loginWithOAuth2("yandex")}
        disabled={isAuthenticating}
      >
        <img className="w-11 h-11" src="/icons/oauth/Yandex.png" alt="" />
      </button>
    </div>
  );
};
