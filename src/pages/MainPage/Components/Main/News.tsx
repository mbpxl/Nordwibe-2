import { useState } from "react";
import Stories from "react-insta-stories";
import { useGetStories } from "../../service/useGetStories";
import Loading from "../../../../shared/Components/Loading/Loading";
import { baseURLforImages } from "../../../../shared/plugin/axios";
import OptimizedImage from "../../../../shared/Components/OptimizedImage/OptimizedImage";

const STORIES_PER_GROUP = 5;

const groupStories = (data: any[]) => {
  const allParts = data.flatMap((story: any) =>
    story.story_parts.map((part: any) => ({
      ...part,
      title: story.title,
    })),
  );

  const groups = [];
  for (let i = 0; i < allParts.length; i += STORIES_PER_GROUP) {
    const chunk = allParts.slice(i, i + STORIES_PER_GROUP);
    groups.push({
      uuid: `group-${i}`,
      title: chunk[0].title,
      desktopCover: chunk[0].image_url
        ? baseURLforImages + chunk[0].image_url
        : null,
      mobileCover: chunk[1]?.image_url
        ? baseURLforImages + chunk[1].image_url
        : null,
      story_parts: chunk.slice(2),
    });
  }
  return groups;
};

const News = () => {
  const { data, isLoading, isError } = useGetStories();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState<number | null>(null);

  if (isLoading) return <Loading />;
  if (isError) {
    console.log("Ошибка при получении сторисов");
    return null;
  }

  const groups = groupStories(data ?? []);

  return (
    <div className="max-w-[630px] m-auto lg:p-5 lg:mt-10 lg:max-w-[1340px] lg:border lg:border-gray-200 lg:bg-white lg:rounded-lg lg:shadow-sm">
      <div className="py-0.5 ml-3 flex flex-col lg:ml-0">
        <div className="text-[0.875rem] font-semibold leading-3 text-black-heading lg:text-[1.5rem] lg:leading-none lg:font-bold">
          Новости сообщества
        </div>

        <div className="mt-[11px] overflow-x-auto scrollbar-none">
          <ul className="flex gap-3.5 w-max px-1 lg:gap-4 lg:px-0">
            {groups.map((group, i) => (
              <li key={group.uuid}>
                <button
                  onClick={() => {
                    setCurrentStory(i);
                    setIsOpen(true);
                  }}
                  className="w-[50px] h-[50px] rounded-full overflow-hidden focus:outline-none
                    lg:w-[152px] lg:h-[196px] lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-200
                    flex items-center justify-center"
                >
                  {group.mobileCover ? (
                    <OptimizedImage
                      src={group.mobileCover}
                      alt={group.title}
                      width={50}
                      height={50}
                      priority={i === 0}
                      className="w-full h-full rounded-full lg:hidden [&_img]:object-top"
                    />
                  ) : (
                    <img
                      src="/icons/nordwibe/nordwibe.svg"
                      alt={group.title}
                      className="object-cover w-full h-full lg:hidden"
                    />
                  )}

                  {group.desktopCover ? (
                    <OptimizedImage
                      src={group.desktopCover}
                      alt={group.title}
                      width={152}
                      height={196}
                      priority={i === 0}
                      className="w-full h-full rounded-xl hidden lg:block [&_img]:object-top"
                    />
                  ) : (
                    <div className="hidden lg:flex w-full h-full bg-purple-main text-white font-bold text-center items-center justify-center rounded-lg">
                      {group.title}
                    </div>
                  )}
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
              stories={groups[currentStory].story_parts.map((part: any) => ({
                url: baseURLforImages + part.image_url,
                header: {
                  heading: groups[currentStory!].title,
                  subheading: "",
                  profileImage: "/icons/nordwibe/nordwibe.svg",
                  headerStyle: { fontSize: "32px", fontWeight: "bold" },
                  headingStyle: { fontSize: "32px", fontWeight: "bold" },
                },
                seeMore: part.description
                  ? ({ close }: any) => (
                      <div
                        style={{
                          padding: 20,
                          color: "#fff",
                          cursor: "pointer",
                        }}
                        onClick={close}
                      >
                        {part.description}
                      </div>
                    )
                  : undefined,
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
