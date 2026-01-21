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
                  <img
                    src="/icons/nordwibe/nordwibe.svg"
                    alt={story.title}
                    className="object-cover w-full h-full lg:hidden"
                  />

                  <div className="hidden lg:flex w-full h-full bg-purple-main text-white font-bold text-center items-center justify-center rounded-lg">
                    Что такое Nordwibe?
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && currentStory !== null && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative lg:w-[27%]"
            onClick={(e) => e.stopPropagation()}
          >
            <Stories
              stories={data[currentStory].story_parts.map((part: any) => ({
                url: baseURLforImages + part.image_url,
                header: {
                  heading: data[currentStory].title,
                  subheading: "",
                  profileImage: "/icons/nordwibe/nordwibe.svg",
                  headerStyle: {
                    fontSize: "32px",
                    fontWeight: "bold",
                  },
                  headingStyle: {
                    fontSize: "32px",
                    fontWeight: "bold",
                  },
                },
                duration: (part.auto_scroll_seconds || 5) * 1000,
              }))}
              defaultInterval={5000}
              width="100%"
              height="100%"
              onAllStoriesEnd={() => setIsOpen(false)}
              storyStyles={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000",
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute z-[9999] top-6 right-6 text-white text-3xl w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors lg:top-4 lg:right-4 lg:text-2xl lg:w-10 lg:h-10"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
