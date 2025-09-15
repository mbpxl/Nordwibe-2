import { Link, useParams } from "react-router-dom";
import { useGetUser } from "../SearchPage/service/useGetUser";
import TopicHeader from "../../shared/Components/TopicHeader/TopicHeader";
import { GoBackButton } from "../../shared/Components/GoBackButton/GoBackButton";
import Loading from "../../shared/Components/Loading/Loading";
import Error from "../../shared/Components/ErrorPage/ErrorPage";
import ChatContent from "./components/ChatContent/ChatContent";
import InputMessage from "./components/InputMessage/InputMessage";
import { baseURLforImages } from "../../shared/plugin/axios";

const ChatDialogPage = () => {
  const { companionId } = useParams<{ companionId: string }>();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUser(companionId!);

  if (isUserLoading) {
    return <Loading />;
  }

  if (isUserError || !user) {
    return <Error />;
  }

  return (
    <div className="">
      <TopicHeader>
        <GoBackButton />
        <h1>
          <div className="flex gap-x-3 items-center w-full">
            {user[0].avatar_url ? (
              <img
                className="w-10 h-10 rounded-[50%] shrink-0"
                src={baseURLforImages + user[0].avatar_url}
                alt="avatar"
              />
            ) : (
              <div className="w-10 h-10 bg-purple-sub-button text-white font-semibold text-3xl flex items-center justify-center rounded-[50%] shrink-0">
                {user[0].username ? user[0].username[0].toUpperCase() : ""}
              </div>
            )}

            <Link
              className="text-[1.25rem] font-semibold leading-5"
              to={"/profile/" + companionId}
            >
              {user[0].username}, {user[0].age}
            </Link>
          </div>
        </h1>
      </TopicHeader>

      <ChatContent companionId={companionId!} />
      <InputMessage toUserId={companionId!} />
    </div>
  );
};

export default ChatDialogPage;
