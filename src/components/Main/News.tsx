import story_bg_1 from "/imgs/stories-bg/story-bg_1.png";
import story_bg_2 from "/imgs/stories-bg/story-bg_2.png";
import story_bg_3 from "/imgs/stories-bg/story-bg_3.png";
import story_bg_4 from "/imgs/stories-bg/story-bg_4.png";
import story_bg_5 from "/imgs/stories-bg/story-bg_5.png";
import story_bg_6 from "/imgs/stories-bg/story-bg_6.png";

const News = () => {
  return (
    <div className="py-0.5 ml-3 flex flex-col">
      <div className="text-[0.875rem] font-semibold leading-3 text-black-heading self-left">
        Новости сообщества
      </div>

      <div className="mt-[11px] overflow-x-auto scrollbar-none">
        <ul className="flex gap-3.5 w-max px-1">
          {[
            story_bg_1,
            story_bg_2,
            story_bg_3,
            story_bg_4,
            story_bg_5,
            story_bg_6,
            story_bg_2,
          ].map((src, i) => (
            <li key={i}>
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <img
                  src={src}
                  alt={`story-${i}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default News;
