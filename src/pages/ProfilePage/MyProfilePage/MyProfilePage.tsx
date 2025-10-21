//todo import Error from "../../../shared/Components/ErrorPage/ErrorPage";
//todo import Loading from "../../../shared/Components/Loading/Loading";
import Wrapper from "../../../shared/Components/Wrapper/Wrapper";
import AboutMyself from "../Components/AboutMyself/AboutMyself";
import HashTagBar from "../Components/HashTagBar/HashTagBar";
import EditButton from "../Components/OptionsButton/OptionButton";
import { PhotoSlider } from "../Components/ProfilePhotosBar/ProfilePhotosBar";
//todo import { useGetMe } from "../service/useGetMe";
import TopicHeader from "../../../shared/Components/TopicHeader/TopicHeader";
import StatusBar from "../Components/StatusBar/StatusBar";
import AddAboutMySelf from "../Components/AddAboutMySelf/AddAboutMySelf";
import { useState } from "react";
import ToolTip from "../Components/ToolTip/ToolTip";
//todo import { useGetCompletedTest } from "../../TestPage/service/useGetCompletedTests";
import TestsBar from "../Components/TestsBar/TestsBar";
//todo import { useCompletedTests } from "../hooks/useCompletedTests";
import { myProfileMisc } from "./misc/myProfileMock";
import { myCompletedTestsMock } from "./misc/completedTestsMock";

const ProfilePage = () => {
  //todo const { data, isLoading, isError } = useGetMe();
  // const {
  //   data: testsData,
  //   isLoading: isTestsLoading,
  //   isError: isTestsError,
  //todo } = useGetCompletedTest();

  //todo const { data: completedTests, isLoading: isCompletedTestLoading } =
  //   useCompletedTests();

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

  //todo if (isLoading || isTestsLoading) {
  //   return <Loading />;
  // }

  // if (isError || isTestsError) return <Error />;

  const isTestCompleted = true;
  //todo testsData.length > 0;
  const isFilledProfile = true;
  //todo data.username && data.age;

  const myProfileAvatars = [
    "/imgs/misc/my_profile/1.png",
    "/imgs/misc/my_profile/2.jpg",
    "/imgs/misc/my_profile/3.jpg",
  ];

  return (
    <Wrapper
      className={
        "flex flex-col max-w-[475px] m-auto overflow-hidden pb-28 relative"
      }
    >
      <TopicHeader>
        <h1>
          {(myProfileMisc.username || myProfileMisc.name || "") +
            ", " +
            (myProfileMisc.age || "")}
        </h1>
      </TopicHeader>
      <PhotoSlider
        photos={myProfileAvatars}
        username={myProfileMisc.username}
      />

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
        {myProfileMisc.about && !isEditAbouMyself ? (
          <AboutMyself
            about={myProfileMisc.about}
            handleChange={handleChangeEditAboutMyself}
            isMyProfile
          />
        ) : (
          <AddAboutMySelf
            data={myProfileMisc}
            handleChangeEditAboutMyself={handleChangeEditAboutMyself}
          />
        )}
        <HashTagBar hashTags={myProfileMisc.hashtags_list} />
        {myProfileMisc && <StatusBar data={myProfileMisc} />}
      </div>

      <TestsBar tests={myCompletedTestsMock} />
    </Wrapper>
  );
};

export default ProfilePage;
