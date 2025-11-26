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

const ProfilePage = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetMe();

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

      {!isCompatibilityTestCompleted && (
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
        <HashTagBar
          hashTags={data.hashtags_list}
          isMyProfile={true}
          userName={data.username || data.name}
          onEdit={() => {
            navigate("/edit");
          }}
        />

        <StatusBar
          data={data}
          isMyProfile={true}
          userName={data.username || data.name}
          onEdit={() => {
            navigate("/edit");
          }}
        />
      </div>

      {!isCompletedTestLoading && (
        <TestsBar
          tests={completedTests}
          isMyProfile={true}
          userName={data.username}
          onEdit={() => navigate("/test")} // или другая функция для перехода к тестам
        />
      )}
    </Wrapper>
  );
};

export default ProfilePage;
