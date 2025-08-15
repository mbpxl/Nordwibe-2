import ShowMore from "../ShowMore/ShowMore";

const AboutMyself = ({ about }: { about: string }) => {
  return (
    <div className="text-black">
      <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mb-2">
        О себе
      </h1>
      <ShowMore maxHeight={72}>{about}</ShowMore>
    </div>
  );
};

export default AboutMyself;
