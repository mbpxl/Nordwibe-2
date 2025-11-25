import AboutMyself from "../Components/AboutMyself/AboutMyself";
import HashTagBar from "../Components/HashTagBar/HashTagBar";
import Wrapper from "../../../shared/Components/Wrapper/Wrapper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopicHeader from "../../../shared/Components/TopicHeader/TopicHeader";
import { PhotoSlider } from "../Components/Photo/ProfilePhotosBar/ProfilePhotosBar";
import StatusBar from "../Components/StatusBar/StatusBar";
import { useGetUser } from "../../SearchPage/service/useGetUser";
import Loading from "../../../shared/Components/Loading/Loading";
import Error from "../../../shared/Components/ErrorPage/ErrorPage";
import ActionBar from "../Components/ActionBar/ActionBar";
import { GoBackButton } from "../../../shared/Components/GoBackButton/GoBackButton";
import { useGetMe } from "../service/useGetMe";
import { useState } from "react";
import { useRanking } from "../../SearchPage/service/useRanking";
import { useBlockUser } from "../service/useBlockUser";
import { useUnblockUser } from "../service/useUnblockUser";
import { useIsUserBlocked } from "../hooks/useIsUserBlocked";
import ProfileActionsMenu from "../Components/ProfileActionsMenu/ProfileActionsMenu";
import BottomSheetModal from "../../../shared/Components/Modal/BottomSheetModal/BottomSheetModal";
import toast from "react-hot-toast";

const UserProfilePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { ids } = useParams<{ ids: string }>();
  const userFromState = state?.user;

  const { data: rankingData, isLoading: isRankingLoading } = useRanking();
  const { isBlocked, isLoading: isBlockedLoading } = useIsUserBlocked(ids);

  const userCompatibility = rankingData?.find((item) => item.user_id === ids);
  const compatibility = userCompatibility?.score;

  const {
    data: myData,
    isLoading: isMyProfileLoading,
    isError: isMyProfileError,
  } = useGetMe();

  if (ids == myData?.id) {
    navigate("/profile");
  }

  const shouldFetch = !userFromState && ids;
  const { data, isLoading, isError } = shouldFetch
    ? useGetUser([ids!])
    : { data: null, isLoading: false, isError: false };

  const user = userFromState || data?.[0];

  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  const { mutate: blockUser, isPending: isBlockPending } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblockPending } = useUnblockUser();

  const handleShowMoreClick = () => {
    setIsActionsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsActionsMenuOpen(false);
  };

  const handleShare = () => {};

  const handleBlock = () => {
    if (ids) {
      blockUser(
        {
          blocked_user_id: ids,
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
    if (ids) {
      unblockUser(ids, {
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

  if (
    (isLoading && !user) ||
    isMyProfileLoading ||
    isRankingLoading ||
    isBlockedLoading
  ) {
    return <Loading />;
  }

  if (isError || !user || isMyProfileError) {
    return <Error />;
  }

  return (
    <div className="">
      <Wrapper
        className={
          "flex flex-col max-w-[475px] m-auto overflow-hidden pb-28 relative"
        }
      >
        <TopicHeader>
          <GoBackButton fromProfile />
          <h1 className={`${isBlocked ? "text-[14px]" : "text-[20px]"}`}>
            {user.username || user.name || ""}
            {user.age ? ", " : ""} {user.age}
            {isBlocked && (
              <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                Заблокирован
              </span>
            )}
          </h1>
          <button onClick={handleShowMoreClick}>
            <img src="/icons/show_more.svg" alt="Показать меню" />
          </button>
        </TopicHeader>

        {/* Баннер, если пользователь заблокирован */}
        {isBlocked && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <img
                src="/icons/block.svg"
                alt="Заблокирован"
                className="w-5 h-5 text-red-500"
              />
              <span className="text-red-700 font-medium">
                Этот пользователь заблокирован
              </span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              Вы не можете отправлять сообщения этому пользователю
            </p>
          </div>
        )}

        <BottomSheetModal isOpen={isActionsMenuOpen} onClose={handleCloseMenu}>
          <ProfileActionsMenu
            onShare={handleShare}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            isBlocking={isBlockPending}
            isUnblocking={isUnblockPending}
            isBlocked={isBlocked}
            userId={user.id}
          />
        </BottomSheetModal>

        <PhotoSlider
          isMyAccount={false}
          photos={[user.avatar_url]}
          username={user.username}
        />
        <div>
          <AboutMyself about={user.about} isMyProfile={false} />

          <HashTagBar hashTags={user.hashtags_list} />
          {user && <StatusBar data={user} />}
        </div>
      </Wrapper>
      <ActionBar
        companionId={user.id}
        compatibility={compatibility!}
        isBlocked={isBlocked}
      />
    </div>
  );
};

export default UserProfilePage;
