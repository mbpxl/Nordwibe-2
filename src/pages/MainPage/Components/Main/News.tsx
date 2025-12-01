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
    <div className="max-w-[630px] m-auto lg:p-5 lg:mt-10 lg:max-w-[1340px] lg:border lg:border-gray-200 lg:bg-white lg:rounded-lg lg:shadow-sm">
      <div className="py-0.5 ml-3 flex flex-col lg:ml-0">
        <div className="text-[0.875rem] font-semibold leading-3 text-black-heading lg:text-[1.5rem] lg:leading-none lg:font-bold">
          Новости сообщества
        </div>

        <div className="mt-[11px] overflow-x-auto scrollbar-none">
          <ul className="flex gap-3.5 w-max px-1 lg:gap-4 lg:px-0">
            {data?.map((story: any, i: number) => (
              <li key={story.uuid}>
                <button
                  onClick={() => {
                    setCurrentStory(i);
                    setIsOpen(true);
                  }}
                  className="
                    w-[50px] h-[50px] rounded-full overflow-hidden focus:outline-none
                    lg:w-[152px] lg:h-[196px] lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-200
                    flex items-center justify-center
                  "
                >
                  {/* Мобильная версия — иконка */}
                  <img
                    src="/icons/nordwibe/nordwibe.svg"
                    alt={story.title}
                    className="object-cover w-full h-full lg:hidden"
                  />

                  {/* Desktop версия — текст на фиолетовом фоне */}
                  <div className="hidden lg:flex w-full h-full bg-purple-main text-white font-bold text-center items-center justify-center rounded-lg">
                    Что такое Nordwibe?
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Модалка Stories */}
      {isOpen && currentStory !== null && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Stories
            stories={data[currentStory].story_parts.map((part: any) => ({
              url: baseURLforImages + part.image_url,
              header: {
                heading: data[currentStory].title,
                subheading: "",
                profileImage: "/icons/nordwibe/nordwibe.svg",
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
