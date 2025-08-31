const EducationTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h2 className="text-black-heading text-[1rem] max-[352px]:text-[0.85rem] font-semibold leading-5">
      {title}
    </h2>
  );
};

export default EducationTitle;
