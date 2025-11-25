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
import { useGetCompletedTest } from "../../TestPage/service/useGetCompletedTests";
import TestsBar from "../Components/TestsBar/TestsBar";
import { useCompletedTests } from "../hooks/useCompletedTests";
import AddInfoText from "../Components/AddInfoText/AddInfoText";
import { GoBackButton } from "../../../shared/Components/GoBackButton/GoBackButton";
import { useGetTests } from "../../TestPage/service/useGetTests";
import BottomSheetModal from "../../../shared/Components/Modal/BottomSheetModal/BottomSheetModal";
import ProfileActionsMenu from "../Components/ProfileActionsMenu/ProfileActionsMenu";

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMe();
  const {
    data: testsData,
    isLoading: isTestsLoading,
    isError: isTestsError,
  } = useGetCompletedTest();

  const { data: completedTests, isLoading: isCompletedTestLoading } =
    useCompletedTests();

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
    localStorage.setItem("showToolTip", "ok");
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

  if (isLoading || isTestsLoading || isAllTestsLoading) {
    return <Loading />;
  }

  if (isError || isTestsError || isAllTestsError) return <Error />;

  const isTestCompleted = testsData.length > 0;
  const isFilledProfile = data.username;

  return (
    <Wrapper
      className={
        "flex flex-col max-w-[475px] m-auto overflow-hidden pb-28 relative"
      }
    >
      <TopicHeader>
        <GoBackButton fromProfile />
        <h1>
          {data.username || data.name || ""}
          {data.age ? ", " : ""} {data.age}
        </h1>
        <button onClick={handleShowMoreClick}>
          <img src="/icons/show_more.svg" alt="Показать меню" />
        </button>
      </TopicHeader>

      <BottomSheetModal isOpen={isActionsMenuOpen} onClose={handleCloseMenu}>
        <ProfileActionsMenu
          isMyProfile={true}
          onShare={handleShare}
          userId={data.id}
        />
      </BottomSheetModal>

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

      {compatibilityTest && (
        <EditButton
          title={"Пройти тест на совместимость"}
          testId={compatibilityTest.uuid}
        />
      )}

      <div>
        {data.about && !isEditAbouMyself ? (
          <AboutMyself
            about={data.about}
            handleChange={handleStartEditing}
            isMyProfile
          />
        ) : (
          <AddAboutMySelf
            data={data}
            isEditing={isEditAbouMyself}
            onCancel={handleCancelEditing}
            onSave={handleSaveEditing}
            onStartEditing={handleStartEditing}
          />
        )}
        {data.hashtags_list ? (
          <HashTagBar hashTags={data.hashtags_list} />
        ) : (
          <AddInfoText text={"интересы"} title={"Интересы"} />
        )}
        {data && <StatusBar data={data} />}
      </div>

      {!isCompletedTestLoading && <TestsBar tests={completedTests} />}
    </Wrapper>
  );
};

export default ProfilePage;
