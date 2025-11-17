import ShowMore from "../ShowMore/ShowMore";

const AboutMyself = ({
  about,
  handleChange,
  isMyProfile,
}: {
  about: string;
  handleChange?: () => void;
  isMyProfile: boolean;
}) => {
  return (
    <div className="text-black">
      {isMyProfile ? (
        <div className="flex justify-between mb-1">
          <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
            О себе
          </h1>
          <div className="w-5 h-5" onClick={handleChange}>
            <img src="/icons/profile/edit-about-myself.svg" alt="edit" />
          </div>
        </div>
      ) : (
        <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
          О себе
        </h1>
      )}

      <ShowMore maxHeight={72}>{about}</ShowMore>
    </div>
  );
};

export default AboutMyself;
