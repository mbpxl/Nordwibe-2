import toast from "react-hot-toast";

import { useState } from "react";
import { useParams } from "react-router-dom";

interface ShareProfileProps {
  onShare?: () => void;
  myProfileId?: string;
}

const ShareProfile = ({ onShare, myProfileId }: ShareProfileProps) => {
  const { ids } = useParams();

  const [isCopied, setIsCopied] = useState(false);

  const handleShareClick = async () => {
    var profileUrl = "";

    if (ids) {
      profileUrl = `${window.location.origin}/profile/${ids}`;
    } else {
      profileUrl = `${window.location.origin}/profile/${myProfileId}`;
    }

    try {
      await navigator.clipboard.writeText(profileUrl);
      setIsCopied(true);

      toast.success("Скопировано в буфер обмена");

      if (onShare) {
        onShare();
      }

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка при копировании:", err);
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
