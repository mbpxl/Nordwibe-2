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

const ProfilePage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetMe();

  const { data: completedTests, isLoading: isCompletedTestLoading } =
    useCompletedTests();

  console.log(completedTests);

  const { myTests, isLoading: isMyTestsLoading } = useMyTests();

  const {
    data: allTests,
    isLoading: isAllTestsLoading,
    isError: isAllTestsError,
  } = useGetTests();

  const [showTooltip, setShowTooltip] = useState(
    !!!localStorage.getItem("showToolTip")
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
    (test: any) => test.title === "Тест на совместимость"
  );

  if (isLoading || isAllTestsLoading) {
    return <Loading />;
  }

  if (isError || isAllTestsError) return <Error />;

  const isFilledProfile = data.username && data.gender;

  const isCompatibilityTestCompleted = completedTests.some(
    (test: any) => test.uuid == compatibilityTest.uuid
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
            {data.about && !isEditAbouMyself ? (
              <div className="">
                <h1 className="max-lg:hidden lg:text-2xl lg:font-semibold lg:leading-6 lg:mb-4">
                  {data.username || data.name || ""}
                  {data.birth_date ? ", " : ""} {calculateAge(data.birth_date)}
                </h1>

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
              />
            )}
          </div>
          <div className="lg:p-3 lg:bg-white lg:rounded-xl">
            <QuizzesBar isMyProfile={true} />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProfilePage;
