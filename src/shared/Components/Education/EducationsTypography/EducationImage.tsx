const EducationImage: React.FC<{ image_url: string; isDesktop?: boolean }> = ({
  image_url,
  isDesktop = false,
}) => {
  return (
    <div className={`flex justify-center ${isDesktop ? "mb-6" : "mb-3"}`}>
      <img
        src={image_url}
        alt={`Quiz Image`}
        className={`${
          isDesktop
            ? "w-full h-[300px] object-cover object-center"
            : "w-full max-w-[300px] h-[200px] object-cover "
        } rounded-lg`}
      />
    </div>
  );
};

export default EducationImage;
