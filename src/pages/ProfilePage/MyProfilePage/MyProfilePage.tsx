import Error from "../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../shared/Components/Loading/Loading";
import Wrapper from "../../../shared/Components/Wrapper/Wrapper";
import AboutMyself from "../Components/AboutMyself/AboutMyself";
import HashTagBar from "../Components/HashTagBar/HashTagBar";
import EditButton from "../Components/OptionsButton/OptionButton";
import { PhotoSlider } from "../Components/ProfilePhotosBar/ProfilePhotosBar";
import { useGetMe } from "../service/useGetMe";
import TopicHeader from "../../../shared/Components/TopicHeader/TopicHeader";
import StatusBar from "../Components/StatusBar/StatusBar";
import AddAboutMySelf from "../Components/AddAboutMySelf/AddAboutMySelf";
import { useRef, useState } from "react";
import ToolTip from "../Components/ToolTip/ToolTip";
import { useGetCompletedTest } from "../../TestPage/service/useGetCompletedTests";
import TestsBar from "../Components/TestsBar/TestsBar";
import { useCompletedTests } from "../hooks/useCompletedTests";
import AddInfoText from "../Components/AddInfoText/AddInfoText";
import ShareProfile from "../Components/ShareProfile/ShareProfile";
import { useClickOutside } from "../hooks/useClickOutside";

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMe();
  const {
    data: testsData,
    isLoading: isTestsLoading,
    isError: isTestsError,
  } = useGetCompletedTest();

  const { data: completedTests, isLoading: isCompletedTestLoading } =
    useCompletedTests();

  const [showTooltip, setShowTooltip] = useState(
    !!!localStorage.getItem("showToolTip")
  );

  const handleSetShowToolTip = () => {
    setShowTooltip((prev) => !prev);
    localStorage.setItem("showToolTip", "ok");
  };

  const [isEditAbouMyself, setIsEditAboutMyself] = useState<boolean>(false);
  const handleChangeEditAboutMyself = () => {
    setIsEditAboutMyself((prev) => !prev);
  };

  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(shareMenuRef, () => {
    setShowShareMenu(false);
  });

  const handleShowMoreClick = () => {
    setShowShareMenu((prev) => !prev);
  };

  if (isLoading || isTestsLoading) {
    return <Loading />;
  }

  if (isError || isTestsError) return <Error />;

  const isTestCompleted = testsData.length > 0;
  const isFilledProfile = data.username;

  return (
    <Wrapper
      className={
        "flex flex-col max-w-[475px] m-auto overflow-hidden pb-28 relative"
      }
    >
      <TopicHeader>
        <h1>
          {data.username || data.name || ""}
          {data.age ? ", " : ""} {data.age}
        </h1>
        <button onClick={handleShowMoreClick}>
          <img src="/icons/show_more.svg" alt="Показать меню" />
        </button>
      </TopicHeader>

      {showShareMenu && (
        <div
          ref={shareMenuRef}
          className="absolute top-16 right-4 bg-white shadow-lg rounded-lg z-50 min-w-[200px] border border-gray-200"
        >
          <ShareProfile
            myProfileId={data.id}
            onShare={() => setShowShareMenu(false)}
          />
        </div>
      )}

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

      {!isTestCompleted && (
        <EditButton title={"Пройти тест на совместимость"} />
      )}

      <div>
        {data.about && !isEditAbouMyself ? (
          <AboutMyself
            about={data.about}
            handleChange={handleChangeEditAboutMyself}
            isMyProfile
          />
        ) : (
          <AddAboutMySelf
            data={data}
            handleChangeEditAboutMyself={handleChangeEditAboutMyself}
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
