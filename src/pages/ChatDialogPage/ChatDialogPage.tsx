import { Link, useParams } from "react-router-dom";
import { useGetUser } from "../SearchPage/service/useGetUser";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import { GoBackButton } from "../../shared/Components/GoBackButton/GoBackButton";
import Loading from "../../shared/Components/Loading/Loading";
import Error from "../../shared/Components/ErrorPage/ErrorPage";
import ChatContent from "./components/ChatContent/ChatContent";
import InputMessage from "./components/InputMessage/InputMessage";
import { baseURLforImages } from "../../shared/plugin/axios";
import { useChatBlockStatus } from "./hooks/useChatBlockStatus";
import { useState } from "react";
import BottomSheetModal from "../../shared/Components/Modal/BottomSheetModal/BottomSheetModal";
import ProfileActionsMenu from "../ProfilePage/Components/ProfileActionsMenu/ProfileActionsMenu";
import toast from "react-hot-toast";
import { useBlockUser } from "../ProfilePage/service/useBlockUser";
import { useUnblockUser } from "../ProfilePage/service/useUnblockUser";
import { useIsUserBlocked } from "../ProfilePage/hooks/useIsUserBlocked";
import OptimizedImage from "../../shared/Components/OptimizedImage/OptimizedImage";
import { calculateAge } from "../../shared/utils/calculateAge";

const ChatDialogPage = () => {
  const { companionId } = useParams<{ companionId: string }>();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUser([companionId!]);

  const {
    isChatBlocked,
    isBlockedByMe,
    isLoading: isBlockStatusLoading,
  } = useChatBlockStatus(companionId);

  const { mutate: blockUser, isPending: isBlockPending } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblockPending } = useUnblockUser();

  const { isBlocked } = useIsUserBlocked(companionId);

  const handleShare = () => {};

  const handleBlock = () => {
    if (companionId) {
      blockUser(
        {
          blocked_user_id: companionId,
          reason: "Заблокировать",
        },
        {
          onSuccess: () => {
            toast("Пользователь заблокирован!", {
              icon: "💔",
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
            });
            handleCloseMenu();
          },
          onError: (error) => {
            console.error("Ошибка при блокировке:", error);
            toast.error("Ошибка при блокировке");
          },
        }
      );
    }
  };

  const handleUnblock = () => {
    if (companionId) {
      unblockUser(companionId, {
        onSuccess: () => {
          toast("Пользователь разблокирован!", {
            icon: "👌",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          handleCloseMenu();
        },
        onError: (error) => {
          console.error("Ошибка при разблокировке:", error);
          toast.error("Ошибка при разблокировке");
        },
      });
    }
  };

  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  const handleShowMoreClick = () => {
    setIsActionsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsActionsMenuOpen(false);
  };

  if (isUserLoading || isBlockStatusLoading) {
    return <Loading />;
  }

  if (isUserError || !user) {
    return <Error />;
  }

  const userData: any = user[0];

  return (
    <div className="h-screen flex flex-col">
      <div className="sticky top-0 z-40 bg-white">
        <TopicHeader>
          <GoBackButton />
          <h1>
            <div className="flex gap-x-3 items-center w-full">
              {userData.avatar_url ? (
                <OptimizedImage
                  className="rounded-[50%] shrink-0"
                  src={baseURLforImages + userData.avatar_url}
                  alt="avatar"
                  width={40}
                  height={40}
                  quality={10}
                  priority={true}
                />
              ) : (
                <div className="w-10 h-10 bg-purple-sub-button text-white font-semibold text-3xl flex items-center justify-center rounded-[50%] shrink-0">
                  {userData.username
                    ? userData.username[0].toUpperCase()
                    : userData.name?.charAt(0) || "Н"}
                </div>
              )}

              <div className="flex flex-col">
                <Link
                  className="text-[1.25rem] font-semibold leading-5"
                  to={"/profile/" + companionId}
                >
                  {userData.username || userData.name || ""}
                  {userData.birth_date ? `, ${calculateAge(userData.birth_date)}` : ""}
                </Link>

                {/* Статус блокировки в заголовке */}
                {isChatBlocked && (
                  <span className="text-xs text-red-600 font-medium">
                    {isBlockedByMe
                      ? "Вы заблокировали этого пользователя"
                      : "Пользователь заблокировал вас"}
                  </span>
                )}
              </div>
            </div>
          </h1>
          <button onClick={handleShowMoreClick}>
            <img src="/icons/show_more.svg" alt="Показать меню" />
          </button>
        </TopicHeader>
      </div>

      {/* Контент чата */}
      <div className="flex-1 min-h-0">
        <ChatContent
          companionId={companionId!}
          isChatBlocked={isChatBlocked}
          blockReason={isBlockedByMe ? "blocked_by_me" : "blocked_by_them"}
        />
      </div>

      {/* Поле ввода */}
      <div className="sticky bottom-0 z-30 bg-white border-t border-gray-200">
        <InputMessage
          toUserId={companionId!}
          isChatBlocked={isChatBlocked}
          blockReason={isBlockedByMe ? "blocked_by_me" : "blocked_by_them"}
        />
      </div>

      <BottomSheetModal isOpen={isActionsMenuOpen} onClose={handleCloseMenu}>
        <ProfileActionsMenu
          onShare={handleShare}
          onBlock={handleBlock}
          onUnblock={handleUnblock}
          isBlocking={isBlockPending}
          isUnblocking={isUnblockPending}
          isBlocked={isBlocked}
          userId={companionId!}
        />
      </BottomSheetModal>
    </div>
  );
};

export default ChatDialogPage;
