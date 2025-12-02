interface QuizParagraphsProps {
  paragraphs: string[];
  isDesktop?: boolean;
}

const QuizParagraphs: React.FC<QuizParagraphsProps> = ({
  paragraphs,
  isDesktop = false,
}) => {
  const mobileStyles =
    "text-black-heading text-[1rem] font-medium leading-5 mt-6 max-[352px]:text-[0.87rem]";
  const desktopStyles = "text-gray-700 text-base leading-relaxed mt-4";

  return (
    <div className={`${isDesktop ? "pb-6" : "flex-1 overflow-y-auto pb-32"}`}>
      {paragraphs.map((para, index) => (
        <p key={index} className={isDesktop ? desktopStyles : mobileStyles}>
          {para}
        </p>
      ))}
    </div>
  );
};

export default QuizParagraphs;
