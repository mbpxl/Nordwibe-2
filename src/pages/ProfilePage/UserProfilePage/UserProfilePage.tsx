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
import { TestResultModal } from "../Components/TestsBar/TestResultModal";

const UserProfilePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { ids } = useParams<{ ids: string }>(); // получаем id текущего пользователя
  const userFromState = state?.user;

  const { userTests, isLoading: isUserTestsLoading } = useUserTests(ids);

  const { results: userTestResults, isLoading: isResultsLoading } =
    useUserTestResults(ids!);

  const [selectedResult, setSelectedResult] = useState<{
    testTitle: string;
    letter: string;
    description: string;
    imageUrl?: string;
  } | null>(null);

  useEffect(() => {
    if (!isResultsLoading && userTestResults.length > 0) {
      console.log("=== Результаты тестов успешно загружены ===");
      userTestResults.forEach((result: any, index: any) => {
        console.log(`Результат #${index + 1}:`);
        console.log(`- Тест: ${result.title} (${result.testId})`);
        console.log(`- Буква: ${result.result.letter}`);
        console.log(`- Описание: ${result.result.description}`);
      });
    } else if (!isResultsLoading) {
      console.log("=== Нет результатов тестов ===");
    }
  }, [isResultsLoading, userTestResults]);

  const handleTestResultClick = (testId: string) => {
    console.log("\n=== Обработка клика по тесту ===");
    console.log("ID теста из клика:", testId);
    console.log(
      "Доступные результаты:",
      userTestResults.map((r: any) => ({ id: r.testId, title: r.title }))
    );

    const result = userTestResults.find((r: any) => r.testId === testId);

    if (!result) {
      console.error(`❌ Результат не найден для теста ${testId}`);
      // Попробуем найти по частичному совпадению (на случай проблем с UUID)
      const similarResults = userTestResults.filter(
        (r: any) =>
          r.testId.includes(testId.substring(0, 8)) ||
          r.title.toLowerCase().includes("сосед")
      );

      if (similarResults.length > 0) {
        console.log("🔍 Найдены похожие результаты:", similarResults);
      }

      toast.error("Результат теста не найден");
      return;
    }

    console.log("✅ Найденный результат:", result);

    setSelectedResult({
      testTitle: result.title,
      letter: result.result.letter,
      description: result.result.description,
      imageUrl: result.result.imageUrl,
    });
  };

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
        {selectedResult && (
          <TestResultModal
            isOpen={!!selectedResult}
            onClose={() => setSelectedResult(null)}
            testTitle={selectedResult.testTitle}
            resultLetter={selectedResult.letter}
            resultDescription={selectedResult.description}
            resultImage={selectedResult.imageUrl}
          />
        )}
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
