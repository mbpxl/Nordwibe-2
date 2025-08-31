const QuizParagraphs: React.FC<{ paragraphs: string[] }> = ({ paragraphs }) => {
  const paragraphsStyles =
    "text-black-heading text-[1rem] font-medium leading-5 mt-6 max-[352px]:text-[0.87rem]";

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      {paragraphs.map((para, index) => (
        <p key={index} className={paragraphsStyles}>
          {para}
        </p>
      ))}
    </div>
  );
};

export default QuizParagraphs;
