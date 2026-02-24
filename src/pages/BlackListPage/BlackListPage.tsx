import Error from "../../shared/Components/ErrorPage/ErrorPage";
import { GoBackButton } from "../../shared/Components/GoBackButton/GoBackButton";
import Loading from "../../shared/Components/Loading/Loading";
import NoResults from "../../shared/Components/NoResults/NoResults";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import Wrapper from "../../shared/Components/Wrapper/Wrapper";
import { useBlockedUsers } from "../ProfilePage/service/useBlockedUsers";
import SearchPeopleItem from "../SearchPage/Components/SearhPeople/SearchPeopleItem/SearchPeopleItem";

const BlackListPage = () => {
  const { blockedUsers, isLoading, isError } = useBlockedUsers();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  if (!blockedUsers.length) {
    return <NoResults message={"Заблокированных пользователей нет"} />;
  }

  return (
    <>
      <TopicHeader>
        <GoBackButton />
        <h1>Чёрный список</h1>
      </TopicHeader>

      <Wrapper className={"bg-purple-background-wrap min-h-screen pt-1 pb-16"}>
        <div className="flex flex-col items-center gap-2 w-full max-w-[600px] mx-auto">
          {blockedUsers.map((user) => (
            <div key={user.id} className="w-full">
              <SearchPeopleItem
                user={user}
                compatibility={0}
                isBlocked={true}
              />
            </div>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default BlackListPage;
