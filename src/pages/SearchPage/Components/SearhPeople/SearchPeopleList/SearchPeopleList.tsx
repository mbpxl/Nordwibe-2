// SearchPeopleList.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import Error from "../../../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../../../shared/Components/Loading/Loading";
import NoResults from "../../../../../shared/Components/NoResults/NoResults";
import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import { useGetUser } from "../../../service/useGetUser";
import { useRanking } from "../../../service/useRanking";
import type { FilterType } from "../../../types/filterTypes";
import SearchPeopleItem from "../SearchPeopleItem/SearchPeopleItem";

interface SearchPeopleListProps {
  filters: FilterType;
}

const SearchPeopleList = ({ filters }: SearchPeopleListProps) => {
  const {
    data: ranking,
    isLoading: rankingLoading,
    isError: rankingError,
  } = useRanking(filters);

  // вытаскиваем все user_id
  const userIds = ranking?.map((r) => r.user_id) || [];

  // загружаем сразу пачкой
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUser(userIds);

  if (rankingLoading || usersLoading) {
    return <Loading />;
  }

  if (rankingError || usersError) {
    return <Error />;
  }

  if (!ranking?.length || !users?.length) {
    return <NoResults />;
  }

  // делаем мапинг: user_id → userData
  const usersMap = new Map(users.map((u) => [u.id, u]));

  return (
    <Wrapper className="bg-purple-background-wrap min-h-screen pt-1 pb-16">
      <div>
        {ranking.map((r) => {
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
