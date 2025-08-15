import Error from "../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../shared/Components/Loading/Loading";
import Wrapper from "../../../shared/Components/Wrapper/Wrapper";
import AboutMyself from "../Components/AboutMyself/AboutMyself";
import HashTagBar from "../Components/HashTagBar/HashTagBar";
import EditButton from "../Components/OptionsButton/OptionButton";
import { PhotoSlider } from "../Components/ProfilePhotosBar/ProfilePhotosBar";
import { useGetMe } from "../service/useGetMe";
import TopicHeader from "../../../shared/Components/TopicHeader/TopicHeader";

const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMe();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) return <Error />;
  const isTestCompleted = true;

  return (
    <Wrapper>
      <TopicHeader>
        <h1>{data.name + ", " + data.age}</h1>
      </TopicHeader>
      <PhotoSlider
        photos={[
          "/imgs/profile-photos/slider1.jpg",
          "/imgs/profile-photos/slider2.jpg",
          "/imgs/profile-photos/slider3.jpg",
        ]}
      />
      <EditButton title={"Редактировать"} />
      {isTestCompleted && <EditButton title={"Пройти тест на совместимость"} />}
      {/* скрываем полностью блок о себе, если поле about пустое */}
      {data.about && <AboutMyself about={data.about} />}
      <HashTagBar hashTags={data.hashtags} />
    </Wrapper>
  );
};

export default ProfilePage;
