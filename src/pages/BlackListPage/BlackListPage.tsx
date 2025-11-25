import Error from "../../shared/Components/ErrorPage/ErrorPage";
import { GoBackButton } from "../../shared/Components/GoBackButton/GoBackButton";
import Loading from "../../shared/Components/Loading/Loading";
import NoResults from "../../shared/Components/NoResults/NoResults";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Wrapper from "../../shared/Components/Wrapper/Wrapper";
import { useBlockedUsers } from "../ProfilePage/service/useBlockedUsers";
import SearchPeopleItem from "../SearchPage/Components/SearhPeople/SearchPeopleItem/SearchPeopleItem";
import { useRanking } from "../SearchPage/service/useRanking";

const BlackListPage = () => {
  const {
    data: ranking,
    isLoading: rankingLoading,
    isError: rankingError,
  } = useRanking();

  const { blockedUsers, isLoading, isError } = useBlockedUsers();

  const usersMap = new Map(blockedUsers.map((u) => [u.id, u]));

  if (rankingLoading || isLoading) {
    return <Loading />;
  }

  if (rankingError || isError) {
    return <Error />;
  }

  if (!ranking?.length || !blockedUsers?.length) {
    return <NoResults />;
  }

  return (
    <>
      <TopicHeader>
        <GoBackButton />
        <h1>Чёрный список</h1>
      </TopicHeader>

      <Wrapper className={"bg-purple-background-wrap min-h-screen pt-1 pb-16"}>
        {ranking.map((r) => {
          const user = usersMap.get(r.user_id);
          if (!user) return null;
          return (
            <SearchPeopleItem
              key={r.user_id}
              user={user}
              compatibility={r.score}
              isBlocked={true}
            />
          );
        })}
      </Wrapper>
    </>
  );
};

export default BlackListPage;
