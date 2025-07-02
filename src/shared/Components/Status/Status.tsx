const Status: React.FC<{ imgSrc: string; title: string }> = ({
  imgSrc,
  title,
}) => {
  return (
    <div className="flex gap-[4px] items-center">
      <img src={imgSrc} alt="icon" />
      <h1 className="text-black-heading text-[1rem] font-normal leading-3">
        {title}
      </h1>
    </div>
  );
};

export default Status;
