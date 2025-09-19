import { useOAuth } from "../../service/useOAuth";

export const OAuthButtons = () => {
  const { loginWithOAuth2, isAuthenticating } = useOAuth();

  if (isAuthenticating) {
    return <div>Проверка аутентификации...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Войти с помощью</h1>
      <div className="flex gap-5 mt-2">
        <button
          onClick={() => loginWithOAuth2("vk")}
          disabled={isAuthenticating}
        >
          <img className="w-11 h-11" src="/icons/oauth/VK.svg" alt="" />
        </button>
        <button
          onClick={() => loginWithOAuth2("yandex")}
          disabled={isAuthenticating}
        >
          <img className="w-11 h-11" src="/icons/oauth/Yandex.png" alt="" />
        </button>
      </div>
    </div>
  );
};
