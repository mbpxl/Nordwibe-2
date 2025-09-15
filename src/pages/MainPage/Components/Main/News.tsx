import { useState } from "react";
import Stories from "react-insta-stories";

import { useGetStories } from "../../service/useGetStories";
import Loading from "../../../../shared/Components/Loading/Loading";
import { baseURLforImages } from "../../../../shared/plugin/axios";

const News = () => {
  const { data, isLoading, isError } = useGetStories();

  const [isOpen, setIsOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState<number | null>(null);

  if (isLoading) return <Loading />;
  if (isError) {
    console.log("Ошибка при получении сторисов");
    return null;
  }

  return (
    <div className="max-w-[630px] m-auto">
      <div className="py-0.5 ml-3 flex flex-col">
        <div className="text-[0.875rem] font-semibold leading-3 text-black-heading self-left">
          Новости сообщества
        </div>

        <div className="mt-[11px] overflow-x-auto scrollbar-none">
          <ul className="flex gap-3.5 w-max px-1">
            {data?.map((story: any, i: any) => (
              <li key={story.uuid}>
                <button
                  onClick={() => {
                    setCurrentStory(i);
                    setIsOpen(true);
                  }}
                  className="w-[50px] h-[50px] rounded-full overflow-hidden focus:outline-none"
                >
                  <img
                    src={"/icons/nordwibe/nordwibe.svg"}
                    alt={story.title}
                    className="object-cover w-full h-full"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && currentStory !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Stories
            stories={data[currentStory].story_parts.map((part: any) => ({
              url: baseURLforImages + part.image_url,
              header: {
                heading: data[currentStory].title,
                subheading: "", // например, сюда можно дату или описание
                profileImage: "/icons/nordwibe/nordwibe.svg", // можно заменить на аватарку автора
              },
              seeMore: ({ close }: any) => (
                <div
                  style={{ padding: 20, color: "#fff", cursor: "pointer" }}
                  onClick={close}
                >
                  {part.description}
                </div>
              ),
              duration: (part.auto_scroll_seconds || 5) * 1000,
            }))}
            defaultInterval={5000}
            width="100%"
            height="100%"
            onAllStoriesEnd={() => setIsOpen(false)}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
