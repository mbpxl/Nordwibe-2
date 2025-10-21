/* eslint-disable @typescript-eslint/no-explicit-any */

//todo import Error from "../../../../../shared/Components/ErrorPage/ErrorPage";
//todo import Loading from "../../../../../shared/Components/Loading/Loading";
//todo import NoResults from "../../../../../shared/Components/NoResults/NoResults";
import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import { rankingMock } from "../../../misc/rankingMock";
import { usersMock } from "../../../misc/usersMock";
//todo import { useGetUser } from "../../../service/useGetUser";
//todo: import { useRanking } from "../../../service/useRanking";
import SearchPeopleItem from "../SearchPeopleItem/SearchPeopleItem";

const SearchPeopleList = () => {
  //todo const {
  //   data: ranking,
  //   isLoading: rankingLoading,
  //   isError: rankingError,
  //todo } = useRanking();

  // вытаскиваем все user_id
  // const userIds = rankingMock?.map((r) => r.user_id) || [];

  // загружаем сразу пачкой
  //todo const {
  //   data: users,
  //   isLoading: usersLoading,
  //   isError: usersError,
  //todo } = useGetUser(userIds);

  // делаем мапинг: user_id → userData
  const usersMap = new Map(usersMock?.map((u) => [u.id, u]));

  return (
    <Wrapper className="bg-purple-background-wrap min-h-screen pt-1 pb-16">
      <div>
        {rankingMock.map((r) => {
          const user = usersMap.get(r.user_id);
          if (!user) return null;
          return (
            <SearchPeopleItem
              key={r.user_id}
              user={user}
              compatibility={r.score}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default SearchPeopleList;
