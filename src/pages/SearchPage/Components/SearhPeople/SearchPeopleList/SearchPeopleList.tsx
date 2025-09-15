/* eslint-disable @typescript-eslint/no-explicit-any */

import Error from "../../../../../shared/Components/ErrorPage/ErrorPage";
import Loading from "../../../../../shared/Components/Loading/Loading";
import NoResults from "../../../../../shared/Components/NoResults/NoResults";
import Wrapper from "../../../../../shared/Components/Wrapper/Wrapper";
import { useRanking } from "../../../service/useRanking";
import SearchPeopleItem from "../SearchPeopleItem/SearchPeopleItem";

const SearchPeopleList = () => {
  const { data: users, isLoading, isError } = useRanking();
  console.log(users);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (users?.length === 0) {
    return <NoResults />;
  }

  return (
    <>
      <Wrapper className="bg-purple-background-wrap min-h-screen pt-1 pb-16">
        <div>
          {users?.map((user) => (
            <SearchPeopleItem key={user.user_id} uuid={user.user_id} />
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default SearchPeopleList;
