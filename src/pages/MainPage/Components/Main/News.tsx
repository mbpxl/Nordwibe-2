import { useState } from "react";
import Stories from "react-insta-stories";

import { storiesMock } from "../../misc/stories/storiesMock";

const News = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState<number | null>(null);

  return (
    <div className="max-w-[630px] m-auto">
      <div className="py-0.5 ml-3 flex flex-col">
        <div className="text-[0.875rem] font-semibold leading-3 text-black-heading self-left">
          Новости сообщества
        </div>

        <div className="mt-[11px] overflow-x-auto scrollbar-none">
          <ul className="flex gap-3.5 w-max px-1">
            {storiesMock?.map((story: any, i: any) => (
              <li key={story.uuid}>
                <button
                  onClick={() => {
                    setCurrentStory(i);
                    setIsOpen(true);
                  }}
                  className="w-[50px] h-[50px] rounded-full overflow-hidden focus:outline-none"
                >
                  <img
                    src={story.cover}
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
            stories={storiesMock[currentStory].story_parts.map((part: any) => ({
              url: part.image_url,
              header: {
                heading: storiesMock[currentStory].title,
                subheading: "",
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
