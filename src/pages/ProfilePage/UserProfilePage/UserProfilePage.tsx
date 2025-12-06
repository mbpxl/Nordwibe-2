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
import { GoBackButton } from "../../../shared/Components/GoBackButton/GoBackButton";
import { useGetMe } from "../service/useGetMe";
import { useEffect, useState } from "react";
import { useRanking } from "../../SearchPage/service/useRanking";
import { useBlockUser } from "../service/useBlockUser";
import { useUnblockUser } from "../service/useUnblockUser";
import { useIsUserBlocked } from "../hooks/useIsUserBlocked";
import ProfileActionsMenu from "../Components/ProfileActionsMenu/ProfileActionsMenu";
import BottomSheetModal from "../../../shared/Components/Modal/BottomSheetModal/BottomSheetModal";
import toast from "react-hot-toast";
import { useUserTests } from "../hooks/useUserTests";
import TestsBar from "../Components/TestsBar/TestsBar";
import { calculateAge } from "../../../shared/utils/calculateAge";
import ActionBar from "../Components/ActionBar/ActionBar";
import { useUserTestResults } from "../../../shared/hooks/useUserTestResults";
import Modal from "../../../shared/Components/Modal/Modal";

const UserProfilePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { ids } = useParams<{ ids: string }>();
  const userFromState = state?.user;

  const { userTests, isLoading: isUserTestsLoading } = useUserTests(ids);
  const { results: userTestResults, isLoading: isResultsLoading } =
    useUserTestResults(ids!);

  const [selectedResult, setSelectedResult] = useState<{
    testTitle: string;
    test_title: string;
    description: string;
    imageUrl?: string;
  } | null>(null);

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
          toast.error("Ошибка при разблокировке");
        },
      });
    }
  };

  const handleTestResultClick = (testId: string) => {
    const result = userTestResults.find((r: any) => r.testId === testId);

    if (!result) {
      toast.error("Результат теста не найден");
      return;
    }

    setSelectedResult({
      testTitle: result.title,
      test_title: result.result.test_title,
      description: result.result.description,
      imageUrl: result.result.imageUrl,
    });
  };

  if (
    (isLoading && !user) ||
    isMyProfileLoading ||
    isRankingLoading ||
    isBlockedLoading ||
    isResultsLoading
  ) {
    return <Loading />;
  }

  if (isError || !user || isMyProfileError) {
    return <Error />;
  }

  return (
    <div className="lg:bg-purple-background-wrap min-h-[100vh]">
      <Wrapper
        className={
          "flex flex-col max-w-[475px] m-auto overflow-hidden pb-28 relative lg:max-w-[1340px] lg:mt-20"
        }
      >
        <div className="lg:hidden">
          <TopicHeader>
            <GoBackButton fromProfile />
            <h1 className={`${isBlocked ? "text-[14px]" : "text-[20px]"}`}>
              {user.username || user.name || ""}
              {user.birth_date ? ", " : ""} {calculateAge(user.birth_date)}
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
        </div>

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

        <div className="lg:flex lg:gap-3 lg:mt-4 lg:h-[460px]">
          <div className="lg:grow-1 lg:p-5 lg:bg-white lg:rounded-xl ">
            <PhotoSlider
              isMyAccount={false}
              photos={[user.avatar_url]}
              username={user.username}
            />
            <div className="lg:p-5  lg:mt-0">
              <div className="max-lg:hidden">
                <ActionBar
                  companionId={user.id}
                  compatibility={compatibility!}
                  isBlocked={isBlocked}
                />
              </div>
            </div>
          </div>

          <div className="lg:basis-[980px] lg:p-5 lg:bg-white lg:rounded-xl">
            <h1 className={`${isBlocked ? "text-[14px]" : "text-[20px]"}`}>
              {user.username || user.name || ""}
              {user.birth_date ? ", " : ""} {calculateAge(user.birth_date)}
              {isBlocked && (
                <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                  Заблокирован
                </span>
              )}
            </h1>

            <div className="lg:mt-4">
              <AboutMyself
                gender={user.gender}
                about={user.about}
                name={user.username || user.name}
                isMyProfile={false}
              />
            </div>

            <div className="lg:mt-4">
              <HashTagBar
                gender={user.gender}
                userName={user.username || user.name}
                hashTags={user.hashtags_list}
              />
            </div>

            <div className="lg:mt-4">
              <StatusBar
                gender={user.gender}
                userName={user.username || user.name}
                data={user}
              />
            </div>
          </div>
        </div>
        <div>
          {!isUserTestsLoading && (
            <TestsBar
              gender={user.gender}
              userTests={userTests}
              isMyProfile={false}
              userName={user.username || user.name}
              onResultClick={handleTestResultClick}
            />
          )}
        </div>
        
        <Modal closeModal={() => setSelectedResult(null)} isOpen={!!selectedResult}>
  <div
    className=""
    onClick={() => setSelectedResult(null)}
  >
    <div
      className="bg-white rounded-2xl w-full max-w-md mx-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-5 sm:p-6">
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {selectedResult?.testTitle}
          </h3>

          <div className="bg-purple-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
            <p className="text-base sm:text-lg font-semibold text-purple-800">
              {selectedResult?.test_title}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {selectedResult?.description}
            </p>
          </div>

          <button
            onClick={() => setSelectedResult(null)}
            className="w-full bg-purple-main text-white font-medium py-3 rounded-xl hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <span className="text-base font-medium">Понятно</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</Modal>
      </Wrapper>
      <div className="lg:hidden">
        <ActionBar
          companionId={user.id}
          compatibility={compatibility!}
          isBlocked={isBlocked}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;