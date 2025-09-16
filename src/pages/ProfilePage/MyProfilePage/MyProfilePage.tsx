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
import { useState } from "react";
import ToolTip from "../Components/ToolTip/ToolTip";
import { useGetCompletedTest } from "../../TestPage/service/useGetCompletedTests";
import TestsBar from "../Components/TestsBar/TestsBar";
import { useCompletedTests } from "../hooks/useCompletedTests";

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

  if (isLoading || isTestsLoading) {
    return <Loading />;
  }

  if (isError || isTestsError) return <Error />;

  const isTestCompleted = testsData.length > 0;
  const isFilledProfile = data.username && data.age;

  return (
    <Wrapper
      className={
        "flex flex-col max-w-[475px] m-auto overflow-hidden pb-28 relative"
      }
    >
      <TopicHeader>
        <h1>{(data.username || data.name || "") + " " + (data.age || "")}</h1>
      </TopicHeader>
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
        {data.about ? (
          <AboutMyself about={data.about} />
        ) : (
          <AddAboutMySelf data={data} />
        )}
        <HashTagBar hashTags={data.hashtags_list} />
        {data && <StatusBar data={data} />}
      </div>

      {!isCompletedTestLoading && <TestsBar tests={completedTests} />}
    </Wrapper>
  );
};

export default ProfilePage;
