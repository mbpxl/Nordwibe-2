import { Link } from "react-router-dom";
import HashTag from "../../../../../shared/Components/HashTag/HashTag";
import { useGetUser } from "../../../service/useGetUser";
import Loading from "../../../../../shared/Components/Loading/Loading";
import Error from "../../../../../shared/Components/ErrorPage/ErrorPage";

const SearchPeopleItem = ({ uuid }: { uuid: string }) => {
  const { data, isLoading, isError } = useGetUser(uuid);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || data.length === 0) {
    return <Error />;
  }

  return (
    <>
      <Link
        to={"/profile/" + uuid}
        state={{ user: data[0] }}
        className="bg-white p-2 flex gap-3 max-w-[700px] rounded-[12px] mt-4"
      >
        <div className="w-[100px] h-[100px] bg-purple-sub-button rounded-xl shrink-0">
          {!data[0]?.avatar_url ? (
            <div className="flex justify-center items-center h-full text-white font-semibold text-4xl">
              {data[0].username[0].toUpperCase()}
            </div>
          ) : (
            <img src={"" + data[0]?.avatar_url} alt="avatar" />
          )}
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="text-[0.875rem] font-semibold leading-5 text-left">
              {data[0].username}, {data[0].age}
            </h2>
            {/* <div className="bg-purple-sub-button rounded-[12px] text-[0.875rem] font-semibold leading-[0.75rem] text-white py-1 px-2">
              {compatibility ? compatibility + " %" : ""}
            </div> */}
          </div>
          <div className="text-[0.75rem] leading-4">
            {data[0]?.about?.slice(0, 56) + "..." || ""}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 flex-wrap">
              {data[0]?.hashtags_list?.map((hashtag) => (
                <HashTag key={hashtag} hashtagTitle={hashtag} />
              ))}
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[0.75rem]">
            <img src="/icons/status/status-hometown.svg" alt="" />
            <h2>Родной город - {data[0]?.hometown_name}</h2>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchPeopleItem;
