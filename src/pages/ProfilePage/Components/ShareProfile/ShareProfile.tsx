import toast from "react-hot-toast";

import { useState } from "react";
import Error from "../../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../../shared/Components/Loading/Loading";
import { useGetMe } from "../../service/useGetMe";

interface ShareProfileProps {
  onShare?: () => void;
}

const ShareProfile = ({ onShare }: ShareProfileProps) => {
  const { data, isLoading, isError } = useGetMe();
  const [isCopied, setIsCopied] = useState(false);

  const handleShareClick = async () => {
    if (!data?.id) return;

    const profileUrl = `${window.location.origin}/profile/${data.id}`;

    try {
      await navigator.clipboard.writeText(profileUrl);
      setIsCopied(true);

      // Показываем сообщение
      toast.success("Скопировано в буфер обмена");

      if (onShare) {
        onShare();
      }

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка при копировании:", err);
      // Fallback для старых браузеров
      const textArea = document.createElement("textarea");
      textArea.value = profileUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      alert("Ссылка на профиль скопирована в буфер обмена");
      if (onShare) onShare();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (!data?.id) {
    return <div className="text-red-500">Ошибка: ID профиля не найден</div>;
  }

  return (
    <button
      onClick={handleShareClick}
      disabled={isCopied}
      className={`
        flex border-2 border-purple-heading items-center gap-2 px-4 py-2 transition-colors w-full text-left
        ${
          isCopied
            ? "bg-green-100 text-green-800"
            : "bg-gray-50 hover:bg-gray-100 text-gray-800"
        }
      `}
    >
      <span>{isCopied ? "Скопировано!" : "Поделиться профилем"}</span>
    </button>
  );
};

export default ShareProfile;
