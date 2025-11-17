import AboutMyself from "../Components/AboutMyself/AboutMyself";
import HashTagBar from "../Components/HashTagBar/HashTagBar";
import Wrapper from "../../../shared/Components/Wrapper/Wrapper";
import { useLocation, useParams } from "react-router-dom";
import TopicHeader from "../../../shared/Components/TopicHeader/TopicHeader";
import { PhotoSlider } from "../Components/ProfilePhotosBar/ProfilePhotosBar";
import StatusBar from "../Components/StatusBar/StatusBar";
import { useGetUser } from "../../SearchPage/service/useGetUser";
import Loading from "../../../shared/Components/Loading/Loading";
import Error from "../../../shared/Components/ErrorPage/ErrorPage";
import ActionBar from "../Components/ActionBar/ActionBar";
import { GoBackButton } from "../../../shared/Components/GoBackButton/GoBackButton";

const UserProfilePage = () => {
  const { state } = useLocation();
  const { ids } = useParams<{ ids: string }>();
  const userFromState = state?.user;
  const compatibility = state?.compatibility;

  const shouldFetch = !userFromState && ids;
  const { data, isLoading, isError } = shouldFetch
    ? useGetUser([ids!])
    : { data: null, isLoading: false, isError: false };

  const user = userFromState || data?.[0];

  if (isLoading && !user) {
    return <Loading />;
  }

  if (isError || !user) {
    return <Error />;
  }

  return (
    <div className="">
      <Wrapper
        className={
          "flex flex-col max-w-[475px] m-auto overflow-hidden pb-28 relative"
        }
      >
        <TopicHeader>
          <GoBackButton />
          <h1>
            {(user.username || user.name || "") + ", " + (user.age || "")}
          </h1>
        </TopicHeader>
        <PhotoSlider photos={[user.avatar_url]} username={user.username} />
        <div>
          <AboutMyself about={user.about} isMyProfile={false} />

          <HashTagBar hashTags={user.hashtags_list} />
          {user && <StatusBar data={user} />}
        </div>
      </Wrapper>
      <ActionBar companiodId={user.id} compatibility={compatibility} />
    </div>
  );
};

export default UserProfilePage;
