const EducationTitle: React.FC<{ title: string; isDesktop?: boolean }> = ({
  title,
  isDesktop = false,
}) => {
  return (
    <h2
      className={`text-black-heading ${
        isDesktop
          ? "text-xl font-semibold mb-6"
          : "text-[1rem] max-[352px]:text-[0.85rem] font-semibold leading-5"
      }`}
    >
      {title}
    </h2>
  );
};

export default EducationTitle;
