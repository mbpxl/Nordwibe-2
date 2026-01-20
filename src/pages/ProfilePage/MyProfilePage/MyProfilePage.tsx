import Error from "../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../shared/Components/Loading/Loading";
import Wrapper from "../../../shared/Components/Wrapper/Wrapper";
import AboutMyself from "../Components/AboutMyself/AboutMyself";
import HashTagBar from "../Components/HashTagBar/HashTagBar";
import EditButton from "../Components/OptionsButton/OptionButton";
import { PhotoSlider } from "../Components/Photo/ProfilePhotosBar/ProfilePhotosBar";
import { useGetMe } from "../service/useGetMe";
import TopicHeader from "../../../shared/Components/TopicHeader/TopicHeader";
import StatusBar from "../Components/StatusBar/StatusBar";
import AddAboutMySelf from "../Components/AddAboutMySelf/AddAboutMySelf";
import { useState } from "react";
import ToolTip from "../Components/ToolTip/ToolTip";
import TestsBar from "../Components/TestsBar/TestsBar";
import { useCompletedTests } from "../hooks/useCompletedTests";
import { GoBackButton } from "../../../shared/Components/GoBackButton/GoBackButton";
import { useGetTests } from "../../TestPage/service/useGetTests";
import BottomSheetModal from "../../../shared/Components/Modal/BottomSheetModal/BottomSheetModal";
import ProfileActionsMenu from "../Components/ProfileActionsMenu/ProfileActionsMenu";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../../../shared/utils/calculateAge";
import { useMyTests } from "../hooks/useMyTests";
import QuizzesBar from "../Components/QuizzesBar/QuizzesBar";
import { useMyQuizzes } from "../hooks/useMyQuizzes";
import { useMyTestResults } from "../../../shared/hooks/useMyTestResults";
import Modal from "../../../shared/Components/Modal/Modal";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetMe();

  const { data: completedTests, isLoading: isCompletedTestLoading } =
    useCompletedTests();

  const { results: myTestResults } = useMyTestResults();
  const [selectedResult, setSelectedResult] = useState<{
    testTitle: string;
    test_title: string;
    description: string;
    imageUrl?: string;
  } | null>(null);

  const handleMyTestResultClick = (testId: string) => {
    if (testId === "cfd48889-06ca-4edf-832e-248b7ed534b2") {
      return;
    }

    const result = myTestResults.find((r: any) => r.testId === testId);
    if (result) {
      setSelectedResult({
        testTitle: result.title,
        test_title: result.result.test_title,
        description: result.result.description,
        imageUrl: result.result.imageUrl,
      });
    } else {
      toast.error("Результат теста не найден");
    }
  };

  const { myTests, isLoading: isMyTestsLoading } = useMyTests();
  const { myQuizzes, isLoading: isQuizzesLoading } = useMyQuizzes();

  const {
    data: allTests,
    isLoading: isAllTestsLoading,
    isError: isAllTestsError,
  } = useGetTests();

  const [showTooltip, setShowTooltip] = useState(
    !!!localStorage.getItem("showToolTip"),
  );

  const handleSetShowToolTip = () => {
    setShowTooltip((prev) => !prev);
    sessionStorage.setItem("showToolTip", "ok");
  };

  const [isEditAbouMyself, setIsEditAboutMyself] = useState<boolean>(false);
  const handleStartEditing = () => {
    setIsEditAboutMyself(true);
  };

  const handleCancelEditing = () => {
    setIsEditAboutMyself(false);
  };

  const handleSaveEditing = () => {
    setIsEditAboutMyself(false);
  };

  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  const handleShowMoreClick = () => {
    setIsActionsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsActionsMenuOpen(false);
  };

  const handleShare = () => {};

  const compatibilityTest = allTests?.find(
    (test: any) => test.title === "Тест на совместимость",
  );

  if (isLoading || isAllTestsLoading || isMyTestsLoading || isQuizzesLoading) {
    return <Loading />;
  }

  if (isError || isAllTestsError) return <Error />;

  const isFilledProfile = data.username && data.gender;

  const isCompatibilityTestCompleted = completedTests.some(
    (test: any) => test.uuid == compatibilityTest.uuid,
  );

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
            <h1>
              {data.username || data.name || ""}
              {data.birth_date ? ", " : ""} {calculateAge(data.birth_date)}
            </h1>
            <button onClick={handleShowMoreClick}>
              <img src="/icons/show_more.svg" alt="Показать меню" />
            </button>
          </TopicHeader>
        </div>

        <BottomSheetModal isOpen={isActionsMenuOpen} onClose={handleCloseMenu}>
          <ProfileActionsMenu
            isMyProfile={true}
            onShare={handleShare}
            userId={data.id}
          />
        </BottomSheetModal>

        <div className="lg:flex lg:gap-3 lg:mt-4 lg:h-[460px]">
          <div className="lg:grow-1 lg:p-5 lg:bg-white lg:rounded-xl">
            <PhotoSlider photos={[data.avatar_url]} username={data.username} />

            <div className="relative">
              <EditButton
                title={`${isFilledProfile ? "Редактировать" : "Заполнить"}`}
              />

              <ToolTip
                isFilledProfile={isFilledProfile}
                showTooltip={showTooltip}
                handleSetShowToolTip={handleSetShowToolTip}
              />
            </div>

            {!isCompatibilityTestCompleted && (
              <EditButton
                title={"Пройти тест на совместимость"}
                testId={compatibilityTest.uuid}
              />
            )}
          </div>

          <div className="lg:basis-[980px] lg:p-5 lg:bg-white lg:rounded-xl">
            {/* Добавляем контейнер для заголовка и кнопки в desktop версии */}
            <div className="max-lg:hidden flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold leading-6">
                {data.username || data.name || ""}
                {data.birth_date ? ", " : ""} {calculateAge(data.birth_date)}
              </h1>
              {/* Добавляем кнопку для desktop версии */}
              <button
                onClick={handleShowMoreClick}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img
                  src="/icons/show_more.svg"
                  alt="Показать меню"
                  className="w-6 h-6"
                />
              </button>
            </div>

            {data.about && !isEditAbouMyself ? (
              <div className="">
                {/* Убираем дублирующий заголовок в desktop версии, т.к. мы уже добавили его выше */}
                <AboutMyself
                  about={data.about}
                  handleChange={handleStartEditing}
                  isMyProfile
                />
              </div>
            ) : (
              <AddAboutMySelf
                data={data}
                isEditing={isEditAbouMyself}
                onCancel={handleCancelEditing}
                onSave={handleSaveEditing}
                onStartEditing={handleStartEditing}
              />
            )}
            <div className="lg:mt-4">
              <HashTagBar
                hashTags={data.hashtags_list}
                isMyProfile={true}
                userName={data.username || data.name}
                onEdit={() => {
                  navigate("/edit");
                }}
              />
            </div>

            <div className="lg:mt-4">
              <StatusBar
                data={data}
                isMyProfile={true}
                userName={data.username || data.name}
                onEdit={() => {
                  navigate("/edit");
                }}
              />
            </div>
          </div>
        </div>

        <div className="lg:flex lg:justify-between lg:mt-3">
          <div className="lg:p-3 lg:bg-white lg:rounded-xl">
            {!isCompletedTestLoading && (
              <TestsBar
                userTests={myTests}
                isMyProfile={true}
                userName={data.username || data.name}
                onEdit={() => navigate("/test")}
                onResultClick={handleMyTestResultClick}
              />
            )}
            <Modal
              closeModal={() => setSelectedResult(null)}
              isOpen={!!selectedResult}
            >
              <div className="" onClick={() => setSelectedResult(null)}>
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
          </div>
          <div className="lg:p-3 lg:bg-white lg:rounded-xl">
            {!isQuizzesLoading && (
              <QuizzesBar
                userQuizzes={myQuizzes}
                isMyProfile={true}
                userName={data.username || data.name}
                onEdit={() => navigate("/quizzes")}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProfilePage;
