import { Link } from "react-router-dom";
import HashTag from "../../../../../shared/Components/HashTag/HashTag";
import { baseURLforImages } from "../../../../../shared/plugin/axios";
import type { userTypes } from "../../../types/userTypes";
import { setCompatibilityStyle } from "../../../utils/setCompatibilityStyle";

const SearchPeopleItem = ({
  user,
  compatibility,
  isBlocked = false,
}: {
  user: userTypes;
  compatibility: number;
  isBlocked?: boolean;
}) => {
  console.log(user);
  return (
    <Link
      to={"/profile/" + user.id}
      state={{ user }}
      className="bg-white p-2 flex gap-3 max-w-[700px] rounded-[12px] mt-4"
    >
      <div className="w-[100px] h-[100px] bg-purple-sub-button rounded-xl shrink-0">
        {!user.avatar_url ? (
          <div className="flex justify-center items-center h-full text-white font-semibold text-4xl">
            {user.username
              ? user.username[0].toUpperCase()
              : user.name?.charAt(0) || ""}
          </div>
        ) : (
          <img
            className="w-[100px] h-[100px] rounded-xl"
            src={baseURLforImages + user.avatar_url}
            alt="avatar"
          />
        )}
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="text-[0.875rem] font-semibold leading-5 text-left">
            {user.username || user.name || "Неизвестный"}
            {user.age ? ", " : ""} {user.age}
          </h2>
          <div
            className={`${setCompatibilityStyle(
              compatibility,
              isBlocked
            )} text-nowrap h-5 rounded-[12px] text-[0.875rem] font-semibold leading-[0.75rem] text-white py-1 px-2`}
          >
            {compatibility ? compatibility + " %" : "???"}
          </div>
        </div>
        <div className="text-[0.75rem] leading-4 break-all">
          {user.about?.length > 56
            ? user.about.slice(0, 56) + "..."
            : user.about}
        </div>
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex gap-1 flex-wrap">
            {user.hashtags_list?.map((hashtag) => (
              <HashTag key={hashtag} hashtagTitle={hashtag} />
            ))}
          </div>
        </div>
        {user.hometown_name ? (
          <div className="mt-1 flex items-center gap-1 text-[0.75rem]">
            <img src="/icons/status/status-hometown.svg" alt="" />
            <h2>Родной город - {user.hometown_name}</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default SearchPeopleItem;
